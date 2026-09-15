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
    title: isNl ? 'Testamenten van de 12 Aartsvaders' : 'Testaments of the 12 Patriarchs',
    description: isNl
      ? 'De stervende woorden van elk van de twaalf zonen van Ya\'aqob — vol profetieën over de Mashiach die in Yahusha vervuld werden.'
      : 'The dying words of each of the twelve sons of Ya\'aqob — full of prophecies about the Mashiach fulfilled in Yahusha.',
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

  const getBookChapter = async (bookSlug: string, chNum: number) => {
    const { data: book } = await supabase.from('books').select('id').eq('slug', bookSlug).single()
    if (!book) return null
    const { data: ch } = await supabase.from('chapters').select('id').eq('book_id', book.id).eq('number', chNum).single()
    return ch
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

  const [leviCh18, yahudahCh24, yosephCh19] = await Promise.all([
    getBookChapter('testament-levi', 18),
    getBookChapter('testament-judah', 24),
    getBookChapter('testament-joseph', 19),
  ])

  const [levi18, yahudah24, yoseph19] = await Promise.all([
    leviCh18  ? fetchVv(leviCh18.id,  [1,2,3,4,5,6,7,8,9,10,11,12]) : [],
    yahudahCh24 ? fetchVv(yahudahCh24.id, [1,2,3,4,5,6]) : [],
    yosephCh19  ? fetchVv(yosephCh19.id,  [1,2,3,4,5,6,7,8]) : [],
  ])

  return { levi18, yahudah24, yoseph19 }
}

export default async function TestamentsPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'
  const tooltips = getTooltips(locale)
  const { levi18, yahudah24, yoseph19 } = await getVerses(locale)

  const patriarchs = [
    { slug: 'testament-reuben',   name: "Re'uḇen",   theme: isNl ? 'Waarschuwt zijn zonen tegen de gevaren van vrouwen en jaloezie'   : 'Warns his sons against the dangers of women and jealousy' },
    { slug: 'testament-simeon',   name: 'Shim\'on',   theme: isNl ? 'Belijdt zijn jaloezie op Yoseph; waarschuwt ertegen'                : 'Confesses his jealousy of Yoseph; warns against it' },
    { slug: 'testament-levi',     name: 'Lĕwi',       theme: isNl ? 'Zijn hemelse reis; profetie van het nieuwe priesterschap van Yahusha' : "His heavenly journey; prophecy of Yahusha's new priesthood" },
    { slug: 'testament-judah',    name: 'Yahuḏah',    theme: isNl ? 'De ster en scepter uit Yahudah — de Mashiach zal uit zijn stam komen' : 'The star and scepter from Yahudah — the Mashiach will come from his tribe' },
    { slug: 'testament-dan',      name: 'Dan',         theme: isNl ? 'Woede en leugen verderven de ziel; de verlossing zal komen uit Lĕwi en Yahudah' : 'Anger and lies corrupt the soul; salvation will come from Lĕwi and Yahudah' },
    { slug: 'testament-naphtali', name: 'Naphtali',    theme: isNl ? 'Hemelse visioenen; de zon, maan en sterren als tekenen van orde'   : 'Heavenly visions; the sun, moon, and stars as signs of order' },
    { slug: 'testament-gad',      name: 'Gaḏ',         theme: isNl ? 'Haat als wortel van alle kwaad; liefde als geneesmiddel'            : 'Hatred as root of all evil; love as the remedy' },
    { slug: 'testament-asher',    name: 'Ashĕr',       theme: isNl ? 'De twee wegen: goed en kwaad; wees niet dubbelzinnig'              : 'The two ways: good and evil; be not double-faced' },
    { slug: 'testament-issachar', name: 'Yissaḵar',    theme: isNl ? 'Eenvoud van hart; eerlijk landwerk als weg naar Yahuah'            : 'Singleness of heart; honest farming as a path to Yahuah' },
    { slug: 'testament-zebulun',  name: 'Zeḇulun',     theme: isNl ? 'Barmhartigheid en medeleven voor alle mensen'                     : 'Compassion and mercy toward all people' },
    { slug: 'testament-joseph',   name: 'Yosĕph',      theme: isNl ? 'Kuisheid onder verleiding; zijn visioenen van de Mashiach als lam' : 'Chastity under temptation; his visions of the Mashiach as a lamb' },
    { slug: 'testament-benjamin', name: 'Binyamin',    theme: isNl ? 'Reinheid van gedachten; profetie van de opstanding'               : 'Purity of mind; prophecy of the resurrection' },
  ]

  return (
    <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />

      <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '2rem' }}>🏺</span></div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0 0 0.4rem' }}>
        {isNl ? 'Testamenten van de 12 Aartsvaders' : 'Testaments of the 12 Patriarchs'}
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
        {isNl
          ? 'Twaalf sterfbedden. Twaalf bekentenissen. Twaalf profetieën over de Mashiach.'
          : 'Twelve deathbeds. Twelve confessions. Twelve prophecies about the Mashiach.'}
      </p>

      {/* What is it */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Wat zijn de Testamenten?' : 'What are the Testaments?'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
          {isNl
            ? 'Elk van de twaalf zonen van Ya\'aqob roept op zijn sterfbed zijn kinderen samen en spreekt een "testament" — zijn laatste woorden, zijn biecht over zijn grootste zonde, zijn wijsheid voor het leven, en een profetie over de toekomst van zijn stam en over de komende Mashiach.'
            : "Each of the twelve sons of Ya'aqob gathers his children at his deathbed and delivers a 'testament' — his final words, his confession of his greatest sin, his wisdom for life, and a prophecy about the future of his tribe and the coming Mashiach."}
        </p>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: 0 }}>
          {isNl
            ? 'Deze testamenten zijn bewaard in Grieks, Armeens en in de Dode Zee-rollen (Aramees). Fragmenten van het Testament van Lĕwi (4Q213) en het Testament van Naphtali werden gevonden in Grot 4 bij Qumran — wat bevestigt dat ze al vóór de eerste eeuw voor de gewone tijdrekening circuleerden.'
            : 'These testaments survive in Greek, Armenian, and in the Dead Sea Scrolls (Aramaic). Fragments of the Testament of Lĕwi (4Q213) and Testament of Naphtali were found in Cave 4 at Qumran — confirming they were circulating before the first century BCE.'}
        </p>
      </section>

      {/* The 12 patriarchs grid */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '1rem' }}>
          {isNl ? 'De twaalf testamenten' : 'The twelve testaments'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {patriarchs.map((p) => (
            <Link key={p.slug} href={`/${locale}/read/${p.slug}/1`} style={{ textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.6rem 0.75rem', borderRadius: '6px', background: 'var(--th-bg)', border: '1px solid var(--th-border)' }}>
              <strong style={{ fontSize: '13px', color: 'var(--th-gold)', minWidth: '6rem', flexShrink: 0 }}>{p.name}</strong>
              <span style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.6 }}>{p.theme}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Levi 18 */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Het nieuwe priesterschap — Lĕwi 18' : 'The new priesthood — Lĕwi 18'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Het Testament van Lĕwi profeteert een nieuw priester-koninklijk figuur — geen erfelijk Levitiaans priesterschap, maar een eeuwig hogepriester die ook koning is. De brief aan de Iḇrim (Hebreeën) bouwt rechtstreeks op deze traditie voort wanneer het Yahusha vergelijkt met Melkitsedek.'
            : 'The Testament of Lĕwi prophesies a new priestly-royal figure — not a hereditary Levitical priesthood, but an eternal high priest who is also king. The letter to the Iḇrim (Hebrews) builds directly on this tradition when it compares Yahusha to Melkitsedek.'}
        </p>
        <VerseBlock verses={levi18} label="TESTAMENT VAN LĔWI 18" href={`/${locale}/read/testament-levi/18`} locale={locale} tooltips={tooltips} />
      </section>

      {/* Yahudah 24 */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'De ster uit Yahudah — Yahuḏah 24' : 'The star from Yahudah — Yahuḏah 24'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Yahuḏah profeteert de Mashiach als een ster die opgaat, een man die in gerechtigheid wandelt. Dit is dezelfde profetie als Bemidbar 24:17 ("een ster zal uit Ya\'aqob oprezen") — maar hier in detail uitgewerkt. De wijzen uit het oosten die de ster van de Mashiach volgden, kenden waarschijnlijk deze tekst.'
            : "Yahuḏah prophesies the Mashiach as a star rising, a man walking in righteousness. This is the same prophecy as Bemidbar 24:17 ('a star shall rise from Ya'aqob') — but developed in detail here. The wise men from the east who followed the star of the Mashiach almost certainly knew this text."}
        </p>
        <VerseBlock verses={yahudah24} label="TESTAMENT VAN YAHUḎAH 24" href={`/${locale}/read/testament-judah/24`} locale={locale} tooltips={tooltips} />
      </section>

      {/* Yoseph 19 */}
      {yoseph19.length > 0 && (
        <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
            {isNl ? 'De maagd en het lam — Yosĕph 19' : 'The virgin and the lamb — Yosĕph 19'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
            {isNl
              ? 'Het Testament van Yosĕph bevat een visioen van een maagd die een lam baart — een directe profetie van de geboorte van Yahusha. Dit visioen staat ver vóór de eerste-eeuwse geschriften van de apostelen.'
              : 'The Testament of Yosĕph contains a vision of a virgin who gives birth to a lamb — a direct prophecy of the birth of Yahusha. This vision stands far before the first-century writings of the apostles.'}
          </p>
          <VerseBlock verses={yoseph19} label="TESTAMENT VAN YOSĔPH 19" href={`/${locale}/read/testament-joseph/19`} locale={locale} tooltips={tooltips} />
        </section>
      )}

      {/* Read links */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { href: `/${locale}/read/testament-levi/1`,    label: isNl ? 'Testament van Lĕwi lezen →' : 'Read Testament of Lĕwi →' },
          { href: `/${locale}/read/testament-judah/1`,   label: isNl ? 'Testament van Yahuḏah lezen →' : 'Read Testament of Yahuḏah →' },
          { href: `/${locale}/read/testament-joseph/1`,  label: isNl ? 'Testament van Yosĕph lezen →' : 'Read Testament of Yosĕph →' },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{ fontSize: '13px', color: 'var(--th-accent)', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid var(--th-border)', borderRadius: '6px' }}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
