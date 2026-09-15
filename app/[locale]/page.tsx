import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl ? 'Geschriften van Yahuah' : 'Scriptures of Yahuah',
    description: isNl
      ? 'Lees de Geschriften met herstelde Hebreeuwse namen — voor alle leeftijden, gratis.'
      : 'Read the Scriptures with restored Hebrew names — for all ages, free.',
  }
}

import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { renderWithTooltips } from '@/components/scripture/RichText'
import { getTooltips } from '@/lib/names/tooltips'

async function getVerseOfDay(locale: string) {
  try {
    const supabase = await createClient()
    const today = new Date()
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

    let text: string
    let chapterId: number
    let verseNumber: number

    if (locale === 'en') {
      const { count } = await supabase.from('verses').select('*', { count: 'exact', head: true })
      if (!count) return null
      const { data: verse } = await supabase
        .from('verses').select('verse_number, text, chapter_id').range(seed % count, seed % count).single()
      if (!verse) return null
      text = verse.text; chapterId = verse.chapter_id; verseNumber = verse.verse_number
    } else {
      const { count } = await supabase.from('translations').select('*', { count: 'exact', head: true }).eq('locale', locale)
      if (!count) return null
      const { data: tr } = await supabase
        .from('translations').select('text, verse_id').eq('locale', locale).range(seed % count, seed % count).single()
      if (!tr) return null
      const { data: verse } = await supabase.from('verses').select('verse_number, chapter_id').eq('id', tr.verse_id).single()
      if (!verse) return null
      text = tr.text; chapterId = verse.chapter_id; verseNumber = verse.verse_number
    }

    const { data: chapter } = await supabase.from('chapters').select('number, book_id').eq('id', chapterId).single()
    if (!chapter) return null
    const { data: book } = await supabase.from('books').select('name_original, slug').eq('id', chapter.book_id).single()
    if (!book) return null

    return { text, ref: `${book.name_original} ${chapter.number}:${verseNumber}`, href: `/${locale}/read/${book.slug}/${chapter.number}` }
  } catch { return null }
}

const divider: React.CSSProperties = {
  width: '4rem', height: '2px', background: 'var(--th-gold)', margin: '0 auto',
  opacity: 0.4, borderRadius: '1px',
}

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getTranslations('home')
  const votd = await getVerseOfDay(locale)
  const tooltips = getTooltips(locale)
  const isNl = locale === 'nl'

  const paths = [
    {
      icon: '🌱',
      title: t('path_new_title'),
      desc: t('path_new_desc'),
      cta: t('path_new_cta'),
      href: `/${locale}/learn`,
    },
    {
      icon: '📖',
      title: t('path_familiar_title'),
      desc: t('path_familiar_desc'),
      cta: t('path_familiar_cta'),
      href: `/${locale}/learn/names`,
    },
    {
      icon: '🔍',
      title: t('path_deep_title'),
      desc: t('path_deep_desc'),
      cta: t('path_deep_cta'),
      href: `/${locale}/search`,
    },
  ]

  const revelations = isNl ? [
    {
      number: '6.828×',
      heading: 'De Naam werd verborgen',
      body: 'De Naam van de Schepper — 𐤉𐤄𐤅𐤄 — staat 6.828 keer in de oorspronkelijke Hebreeuwse Geschriften. In de meeste vertalingen werd Hij vervangen door het woord "HEER". Hier staat Hij hersteld.',
    },
    {
      number: '"Yahusha"',
      heading: 'Zijn Naam betekent iets',
      body: 'De naam van de Zoon betekent letterlijk "Yahuah redt". Die verbinding — de Vader in de naam van de Zoon — verdween toen zijn naam "Jezus" werd. Hier klinkt hij zoals hij altijd heeft geklonken.',
    },
    {
      number: '101 boeken',
      heading: 'Meer dan u werd gegeven',
      body: 'De meeste Bijbels bevatten 66 boeken. De apostelen kenden er meer. Ḥanok, Yubilees, Yashar, de Testamenten van de twaalf Aartsvaders — aangehaald in de Schrift, maar weggelaten in de meeste kanons. Hier zijn ze leesbaar.',
    },
  ] : [
    {
      number: '6,828×',
      heading: 'The Name was hidden',
      body: "The Creator's Name — 𐤉𐤄𐤅𐤄 — appears 6,828 times in the original Hebrew Scriptures. In most translations it was replaced with the word 'LORD'. Here it is restored.",
    },
    {
      number: '"Yahusha"',
      heading: 'His Name means something',
      body: "The Son's name literally means 'Yahuah saves'. That connection — the Father's Name inside the Son's — was lost when his name became 'Jesus'. Here it sounds as it always did.",
    },
    {
      number: '101 books',
      heading: 'More than you were given',
      body: "Most Bibles contain 66 books. The apostles knew more. Ḥanok, Jubilees, Jasher, the Testaments of the Twelve Patriarchs — quoted in Scripture, omitted from most canons. Here they are readable.",
    },
  ]

  return (
    <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '3rem 0 2rem' }}>
        <p style={{ fontSize: '2.2rem', letterSpacing: '0.15em', color: 'var(--th-gold)', marginBottom: '0.5rem', lineHeight: 1 }}>
          𐤉𐤄𐤅𐤄
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-text)', margin: '0 0 1.5rem' }}>
          {t('title')}
        </h1>
        <div style={divider} />
      </section>

      {/* ── Universal welcome — for everyone ── */}
      <section style={{ marginBottom: '2rem', padding: '1.75rem', background: 'var(--th-card)', borderRadius: '10px', border: '1px solid var(--th-border)' }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-text)', lineHeight: 1.85, margin: '0 0 1.25rem', fontStyle: 'italic' }}>
          {isNl
            ? '"Mijn volk gaat te gronde bij gebrek aan kennis."'
            : '"My people are destroyed for lack of knowledge."'}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--th-gold)', fontWeight: 600, letterSpacing: '0.08em', margin: '0 0 1.25rem' }}>
          {isNl ? '— Hoshea 4:6' : '— Hoshea (Hosea) 4:6'}
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--th-muted)', lineHeight: 1.8, margin: 0 }}>
          {isNl
            ? 'Of u nu voor het eerst in deze woorden kijkt, of al jaren de Geschriften bestudeert — dit is een plek voor u. Voor iedereen die zich afvraagt: wie heeft mij geschapen? Waarom ben ik hier? Is er meer dan wat de wereld laat zien? De antwoorden liggen hier, in de oudste woorden die er zijn.'
            : 'Whether you are looking at these words for the very first time, or have studied Scripture for years — this is a place for you. For everyone who has ever asked: who made me? Why am I here? Is there more than what the world shows? The answers are here, in the oldest words that exist.'}
        </p>
      </section>

      {/* ── Attention: three revelation cards ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <p style={{
          fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em',
          color: 'var(--th-gold)', marginBottom: '1rem', opacity: 0.8,
        }}>
          {isNl ? 'Wist u dit?' : 'Did you know?'}
        </p>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {revelations.map((r, i) => (
            <div
              key={i}
              className="theme-card"
              style={{
                padding: '1.25rem 1.5rem',
                textAlign: 'left',
                borderLeft: '3px solid var(--th-gold)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}
            >
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--th-gold)',
                flexShrink: 0,
                minWidth: '4.5rem',
                paddingTop: '1px',
              }}>
                {r.number}
              </span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--th-text)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                  {r.heading}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--th-muted)', lineHeight: 1.65 }}>
                  {r.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Introduction ── */}
      <section style={{ padding: '0 0 2rem', textAlign: 'left' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', color: 'var(--th-gold)', marginBottom: '0.75rem', textAlign: 'center' }}>
          {t('intro_heading')}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--th-text)', lineHeight: 1.85, margin: 0, textAlign: 'center' }}>
          {t('intro_body')}
        </p>
      </section>

      {/* ── Quick actions ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '0 0 2.5rem' }}>
        {[
          { href: `/${locale}/read`,   icon: '📖', label: t('action_read')   },
          { href: `/${locale}/search`, icon: '🔍', label: t('action_search') },
          { href: `/${locale}/learn`,  icon: '💡', label: t('action_learn')  },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="theme-card"
            style={{ display: 'block', padding: '1.25rem 0.75rem', textDecoration: 'none' }}
          >
            <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{item.icon}</div>
            <div style={{ fontWeight: 600, color: 'var(--th-text)', fontSize: '13px' }}>{item.label}</div>
          </Link>
        ))}
      </section>

      {/* ── Path cards ── */}
      <section style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', color: 'var(--th-gold)', marginBottom: '1.25rem', textAlign: 'center' }}>
          {t('path_heading')}
        </h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {paths.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="theme-card"
              style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1.5rem', textDecoration: 'none' }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--th-text)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--th-muted)', lineHeight: 1.6 }}>
                  {p.desc}
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--th-gold)', fontWeight: 600, flexShrink: 0, marginTop: '2px', alignSelf: 'center' }}>
                {p.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Verse of the Day ── */}
      {votd && (
        <Link
          href={votd.href}
          className="theme-card"
          style={{ display: 'block', padding: '1.75rem', margin: '0 0 2rem', textAlign: 'left', textDecoration: 'none' }}
        >
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
            {t('verse_of_day')}
          </p>
          <blockquote className="verse-text" style={{ fontStyle: 'italic', margin: 0, lineHeight: 1.8 }}>
            &ldquo;{renderWithTooltips(votd.text, tooltips)}&rdquo;
          </blockquote>
          <cite style={{ display: 'block', marginTop: '0.75rem', fontSize: '14px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600 }}>
            &mdash; {votd.ref}
          </cite>
        </Link>
      )}

      {/* ── Reading Guide ── */}
      <section
        className="theme-card"
        style={{ padding: '1.75rem', marginBottom: '2rem', textAlign: 'left', borderLeft: '3px solid var(--th-gold)' }}
      >
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {t('guide_heading')}
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--th-text)', lineHeight: 1.85, margin: '0 0 1rem' }}>
          {t('guide_body')}
        </p>
        <Link
          href={`/${locale}/read/bereshit/1`}
          style={{ fontSize: '0.85rem', color: 'var(--th-gold)', fontWeight: 600, textDecoration: 'none' }}
        >
          {t('guide_cta')}
        </Link>
      </section>

      {/* ── About link ── */}
      <div style={{ paddingBottom: '1rem' }}>
        <Link href={`/${locale}/about`} style={{ fontSize: '13px', color: 'var(--th-muted)', textDecoration: 'none' }}>
          {isNl ? 'Over dit project →' : 'About this project →'}
        </Link>
      </div>

    </div>
  )
}
