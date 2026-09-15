import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { createClient } from '@/lib/supabase/server'
import { renderWithTooltips } from '@/components/scripture/RichText'
import { normalizeVerseText } from '@/lib/text-utils'
import { getTooltips } from '@/lib/names/tooltips'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl ? 'Het Boek van Toḇiyah' : 'The Book of Tobiyah',
    description: isNl
      ? 'De engel Raphael in menselijke gedaante — genezing, bescherming en de trouw van Yahuah aan Zijn volk in ballingschap.'
      : 'The angel Raphael in human form — healing, protection, and the faithfulness of Yahuah to His people in exile.',
  }
}

type Verse = { verse_number: number; text: string }

function VerseBlock({
  verses, label, href, locale, tooltips, expectedStart = 1,
}: {
  verses: Verse[]; label: string; href?: string; locale: string; tooltips: Record<string, string>; expectedStart?: number
}) {
  const visible = verses.filter(v => v.text?.trim())
  if (!visible.length) return null
  const firstNum = visible[0].verse_number
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p style={{ fontSize: '11px', color: 'var(--th-gold)', fontWeight: 700, letterSpacing: '0.08em', margin: 0 }}>{label}</p>
        {href && (
          <Link href={href} style={{ fontSize: '12px', color: 'var(--th-accent)', textDecoration: 'none', fontWeight: 600 }}>
            {locale === 'nl' ? 'Lees heel hoofdstuk →' : 'Read full chapter →'}
          </Link>
        )}
      </div>
      {firstNum > expectedStart && (
        <p style={{ fontSize: '12px', color: 'var(--th-muted)', fontStyle: 'italic', margin: '0 0 0.6rem' }}>
          {locale === 'nl'
            ? `[Vers${firstNum - expectedStart > 1 ? 'en' : ''} ${expectedStart}${firstNum - expectedStart > 1 ? '–' + (firstNum - 1) : ''} ontbreekt in de brondata]`
            : `[Verse${firstNum - expectedStart > 1 ? 's' : ''} ${expectedStart}${firstNum - expectedStart > 1 ? '–' + (firstNum - 1) : ''} missing from source data]`}
        </p>
      )}
      {visible.map((v) => (
        <div key={v.verse_number} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '11px', color: 'var(--th-gold)', fontWeight: 700, minWidth: '1.4rem', paddingTop: '3px', flexShrink: 0 }}>
            {v.verse_number}
          </span>
          <span style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8 }}>
            {renderWithTooltips(v.text, tooltips)}
          </span>
        </div>
      ))}
    </div>
  )
}

async function getVerses(locale: string) {
  const supabase = await createClient()
  const { data: book } = await supabase.from('books').select('id').eq('slug', 'tobiyah').single()
  if (!book) return { ch1: [], ch12: [] }

  const getChapter = async (num: number) => {
    const { data } = await supabase.from('chapters').select('id').eq('book_id', book.id).eq('number', num).single()
    return data
  }

  const fetchVv = async (chapterId: number, verseNums: number[]): Promise<Verse[]> => {
    if (locale === 'en') {
      const { data } = await supabase.from('verses').select('verse_number, text')
        .eq('chapter_id', chapterId).in('verse_number', verseNums).order('verse_number')
      return (data || []).map((v: any) => ({ ...v, text: normalizeVerseText(v.text || '') })) as Verse[]
    }
    const { data: vv } = await supabase.from('verses').select('id, verse_number, text')
      .eq('chapter_id', chapterId).in('verse_number', verseNums).order('verse_number')
    if (!vv?.length) return []
    const { data: trs } = await supabase.from('translations').select('verse_id, text')
      .eq('locale', locale).in('verse_id', vv.map((v) => v.id))
    const trMap = Object.fromEntries((trs || []).map((t) => [t.verse_id, t.text]))
    // Fall back to English source text if Dutch translation is missing (matches read page behaviour)
    return vv.map((v) => ({ verse_number: v.verse_number, text: normalizeVerseText(trMap[v.id] || v.text || '') }))
  }

  const [ch1data, ch12data] = await Promise.all([
    getChapter(1),
    getChapter(12),
  ])

  const [ch1, ch12] = await Promise.all([
    ch1data  ? fetchVv(ch1data.id,  [1,2,3,4,5,6,7,8]) : [],
    ch12data ? fetchVv(ch12data.id, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]) : [],
  ])

  return { ch1, ch12 }
}

export default async function TobiyahPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'
  const tooltips = getTooltips(locale)
  const { ch1, ch12 } = await getVerses(locale)

  const connections = isNl ? [
    {
      title: 'Raphael in Ḥanok',
      body: "Raphael verschijnt als een van de vier aartsengelen in Ḥanok 9:1 — hij is belast met genezing. Zijn naam betekent letterlijk 'Yahuah heelt'. In Ḥanok 10:4-7 bindt Raphael de gevallen engel Aza'zel vast.",
      href: `/${locale}/read/hanok/9`,
      link: 'Ḥanok 9 lezen →',
    },
    {
      title: 'Genezing door vis — echo van het Boek van Noaḥ',
      body: 'De gal, hart en lever van de vis die Raphael Toḇiyah laat vangen en gebruiken als medicijn — dit heeft dezelfde theologie als het Boek van Noaḥ: genezing zit in de schepping, als de mensen maar weten waar te kijken. Beide boeken zeggen: Yahuah heeft remedies ingebouwd.',
      href: `/${locale}/learn/book-of-noah`,
      link: isNl ? 'Boek van Noaḥ →' : 'Book of Noah →',
    },
    {
      title: "Geboortebescherming — Asmodeus en de rook",
      body: "De demon Asmodeus doodt zeven mannen die de weduwe Sarah trouwen. Raphael leert Toḇiyah hoe de rook van het hart en de lever van de vis de demon verjaagt op de bruiloftsnacht. Bescherming door kennis van de schepping.",
      href: null,
      link: null,
    },
  ] : [
    {
      title: 'Raphael in Ḥanok',
      body: "Raphael appears as one of the four archangels in Ḥanok 9:1 — he is charged with healing. His name literally means 'Yahuah heals'. In Ḥanok 10:4-7, Raphael binds the fallen angel Aza'zel.",
      href: `/${locale}/read/hanok/9`,
      link: 'Read Ḥanok 9 →',
    },
    {
      title: 'Healing through fish — echo of the Book of Noah',
      body: "The gall, heart, and liver of the fish that Raphael has Toḇiyah catch and use as medicine shares the same theology as the Book of Noah: healing is built into creation, if people only know where to look. Both books say: Yahuah has placed remedies within His creation.",
      href: `/${locale}/learn/book-of-noah`,
      link: 'Book of Noah →',
    },
    {
      title: 'Protection at marriage — Asmodeus and the smoke',
      body: 'The demon Asmodeus kills seven husbands of the widow Sarah. Raphael teaches Toḇiyah how the smoke from the heart and liver of the fish drives the demon away on the wedding night. Protection through knowledge of creation.',
      href: null,
      link: null,
    },
  ]

  return (
    <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />

      <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '2rem' }}>🐟</span></div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0 0 0.4rem' }}>
        {isNl ? 'Het Boek van Toḇiyah' : 'The Book of Tobiyah'}
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
        {isNl
          ? 'Een engel in vermomming, een vis als medicijn, en trouw aan Yahuah in de ballingschap'
          : 'An angel in disguise, a fish as medicine, and faithfulness to Yahuah in exile'}
      </p>

      {/* What is it */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Wat is het Boek van Toḇiyah?' : 'What is the Book of Tobiyah?'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
          {isNl
            ? 'Het verhaal van Toḇit — een vrome Yisraëliet in de Assyrische ballingschap die blind wordt terwijl hij het goede doet. Zijn zoon Toḇiyah wordt gestuurd op een verre reis en ontmoet onderweg een vreemdeling die zich later als de aartsengel Raphael openbaart. Met een vis als geneesmiddel geneest Raphael Toḇits blindheid en verdrijft hij een demon die de verloofde van Toḇiyah kwelt.'
            : "The story of Toḇit — a devout Yisraelite in the Assyrian exile who goes blind while doing good. His son Toḇiyah is sent on a long journey and meets a stranger on the way who later reveals himself as the archangel Raphael. Using a fish as medicine, Raphael heals Toḇit's blindness and drives away a demon tormenting Toḇiyah's betrothed."}
        </p>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: 0 }}>
          {isNl
            ? 'Het boek wordt aangehaald in de Dode Zee-rollen (4Q196-200) in zowel Aramees als Hebreeuws — wat aantoont dat het vroeg en wijd verspreid was in Yisrael. Sirach en de vroege gemeente citeerden het als gezaghebbend.'
            : 'The book is cited in the Dead Sea Scrolls (4Q196-200) in both Aramaic and Hebrew — showing it was early and widely spread in Yisrael. Sirach and the early assembly quoted it as authoritative.'}
        </p>
      </section>

      {/* Chapter 1 */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Toḇit in de ballingschap — het begin' : 'Toḇit in exile — the beginning'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Hoofdstuk 1 stelt Toḇit voor als een man die zelfs in Assyrische gevangenschap trouw blijft aan de Torah — de tienden betaalt, de feesten houdt, zijn medegevangenen begraaft. Het geeft een zeldzaam inkijkje in het geloofsleven van Yisraëlieten in ballingschap.'
            : 'Chapter 1 introduces Toḇit as a man who remains faithful to the Torah even in Assyrian captivity — paying tithes, keeping the feasts, burying his fellow captives. It offers a rare glimpse into the faith life of Yisraelites in exile.'}
        </p>
        <VerseBlock verses={ch1} label="TOḆIYAH 1:1-8" href={`/${locale}/read/tobiyah/1`} locale={locale} tooltips={tooltips} />
      </section>

      {/* Chapter 12 - Raphael reveals himself */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Raphael openbaart zich — hoofdstuk 12' : 'Raphael reveals himself — chapter 12'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Na de genezing en de bruiloft onthult de "vreemdeling" Azaryah zijn ware identiteit: hij is Raphael, een van de zeven engelen die voor de troon van Yahuah staan. Zijn woorden over gebed, aalmoezen en trouw zijn een van de meest directe engelenpreken in de hele Geschriften.'
            : "After the healing and the wedding, the 'stranger' Azaryah reveals his true identity: he is Raphael, one of the seven angels who stand before the throne of Yahuah. His words about prayer, almsgiving, and faithfulness are among the most direct angelic sermons in all of Scripture."}
        </p>
        <VerseBlock verses={ch12} label="TOḆIYAH 12 — RAPHAEL SPREEKT" href={`/${locale}/read/tobiyah/12`} locale={locale} tooltips={tooltips} />
      </section>

      {/* Connections */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '1rem' }}>
          {isNl ? 'Verbindingen met andere Geschriften' : 'Connections to other Scriptures'}
        </h2>
        {connections.map((c, i) => (
          <div key={i} style={{ marginBottom: i < connections.length - 1 ? '1.1rem' : 0, paddingBottom: i < connections.length - 1 ? '1.1rem' : 0, borderBottom: i < connections.length - 1 ? '1px solid var(--th-border)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <strong style={{ fontSize: '13px', color: 'var(--th-text)' }}>{c.title}</strong>
              {c.href && c.link && (
                <Link href={c.href} style={{ fontSize: '11px', color: 'var(--th-gold)', textDecoration: 'none', fontWeight: 700, flexShrink: 0 }}>{c.link}</Link>
              )}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--th-muted)', lineHeight: 1.7, margin: 0 }}>{c.body}</p>
          </div>
        ))}
      </section>

      {/* Read links */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { href: `/${locale}/read/tobiyah/1`,  label: isNl ? 'Toḇiyah lezen →' : 'Read Tobiyah →' },
          { href: `/${locale}/read/hanok/9`,    label: isNl ? 'Raphael in Ḥanok 9 →' : 'Raphael in Ḥanok 9 →' },
          { href: `/${locale}/learn/book-of-noah`, label: isNl ? 'Boek van Noaḥ →' : 'Book of Noah →' },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{ fontSize: '13px', color: 'var(--th-accent)', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid var(--th-border)', borderRadius: '6px' }}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
