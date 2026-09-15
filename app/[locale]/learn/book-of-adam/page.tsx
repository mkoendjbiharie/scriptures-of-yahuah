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
    title: isNl ? 'Het Boek van Aḏam en Ḥawwah' : 'The Books of Adam and Hawwah',
    description: isNl
      ? 'Wat gebeurde er na Eden? Satan legt uit waarom hij weigerde te buigen voor Aḏam — en Yahuah verbande hem.'
      : 'What happened after Eden? Satan explains why he refused to bow to Aḏam — and Yahuah cast him out.',
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
  const { data: bookA } = await supabase.from('books').select('id').eq('slug', 'adam-hawwah-a').single()
  if (!bookA) return { ch1: [], ch12: [], ch13: [], ch14: [] }

  const getChapter = async (bookId: number, num: number) => {
    const { data } = await supabase.from('chapters').select('id').eq('book_id', bookId).eq('number', num).single()
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

  const [ch1data, ch12data, ch13data, ch14data] = await Promise.all([
    getChapter(bookA.id, 1),
    getChapter(bookA.id, 12),
    getChapter(bookA.id, 13),
    getChapter(bookA.id, 14),
  ])

  const [ch1, ch12, ch13, ch14] = await Promise.all([
    ch1data  ? fetchVv(ch1data.id,  [1,2,3,4,5,6]) : [],
    ch12data ? fetchVv(ch12data.id, [1,2,3,4,5,6,7]) : [],
    ch13data ? fetchVv(ch13data.id, [1,2,3,4,5,6,7,8]) : [],
    ch14data ? fetchVv(ch14data.id, [1,2,3,4,5]) : [],
  ])

  return { ch1, ch12, ch13, ch14 }
}

export default async function BookOfAdamPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'
  const tooltips = getTooltips(locale)
  const { ch1, ch12, ch13, ch14 } = await getVerses(locale)

  const manuscripts = isNl ? [
    { name: "Ethiopisch (Ge'ez) — volledigste versie", where: 'British Library (Londen), Nationale Bibliotheek van Ethiopië, Ethiopisch-orthodoxe kloosters bij het Tanameer. De Halleluyah Scriptures versie volgt deze traditie.' },
    { name: 'Grieks — Apocalypse van Mosheh', where: 'Meerdere manuscripten in Europese bibliotheken (Athene, Parijs, Wenen). Concentreert zich op de dood van Aḏam en het hemelse visioen van Ḥawwah.' },
    { name: 'Latijn — Vita Adae et Evae', where: 'Bewaard in tientallen middeleeuwse manuscripten. Bevat de penitentieverhalen: veertig dagen vasten in de rivier.' },
    { name: 'Slavisch, Armeens, Georgisch', where: 'Meerdere onafhankelijke versies tonen hoe wijd deze teksten verspreid waren in de vroege gemeente.' },
  ] : [
    { name: "Ethiopic (Ge'ez) — most complete version", where: 'British Library (London), National Library of Ethiopia, Ethiopian Orthodox monasteries at Lake Tana. The Halleluyah Scriptures version follows this tradition.' },
    { name: 'Greek — Apocalypse of Moses', where: 'Multiple manuscripts in European libraries (Athens, Paris, Vienna). Focuses on the death of Aḏam and the heavenly vision of Ḥawwah.' },
    { name: 'Latin — Vita Adae et Evae', where: 'Preserved in dozens of medieval manuscripts. Contains the penance stories: forty days fasting in the river.' },
    { name: 'Slavonic, Armenian, Georgian', where: 'Multiple independent versions show how widely these texts spread through the early assembly.' },
  ]

  return (
    <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />

      <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '2rem' }}>🌱</span></div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0 0 0.4rem' }}>
        {isNl ? 'De Boeken van Aḏam en Ḥawwah' : 'The Books of Adam and Hawwah'}
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
        {isNl
          ? 'Wat er werkelijk gebeurde na de tuin — inclusief het verhaal dat Satan zelf vertelt'
          : 'What really happened after the garden — including the account Satan himself gives'}
      </p>

      {/* What is it */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Wat zijn de Boeken van Aḏam en Ḥawwah?' : 'What are the Books of Adam and Hawwah?'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
          {isNl
            ? 'Twee boeken die het leven van Aḏam en Ḥawwah na de tuin van Eden beschrijven — hun boete in de rivier, de geboorte van Qayin en Heḇel, de moord, en de dood van Aḏam. Ze beantwoorden vragen die Bereshit openlaat: wat zei de slang precies? Waarom weigerde de Satan te buigen voor Aḏam? Wat voelde Ḥawwah toen Yahuah haar confronteerde?'
            : 'Two books describing the life of Aḏam and Ḥawwah after the garden of Eden — their penance in the river, the births of Qayin and Heḇel, the murder, and the death of Aḏam. They answer questions Bereshit leaves open: what exactly did the serpent say? Why did Satan refuse to bow to Aḏam? What did Ḥawwah feel when Yahuah confronted her?'}
        </p>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: 0 }}>
          {isNl
            ? 'Yobelim 3:28 verwijst naar "de geschriften van Aḏam" als bron voor de leer over onreinheid na de geboorte. De vroege gemeente kende deze teksten goed — ze worden aangehaald in de Dode Zee-rollen en door vroege kerkvaders.'
            : 'Yubilees 3:28 references "the writings of Aḏam" as a source for teaching about uncleanness after birth. The early assembly knew these texts well — they are cited in the Dead Sea Scrolls and by early church fathers.'}
        </p>
      </section>

      {/* Chapter 1 verses */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Na de tuin — het begin' : 'After the garden — the beginning'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Direct na de verdrijving uit Eden doet Aḏam boete door veertig dagen in de koude rivier de Yarden te staan. Ḥawwah doet hetzelfde in de Tigris. Wat volgt onthult hoe diep de val het leven van het eerste paar veranderde.'
            : 'Immediately after the expulsion from Eden, Aḏam does penance by standing forty days in the cold river Yarden. Ḥawwah does the same in the Tigris. What follows reveals how deeply the fall changed the life of the first couple.'}
        </p>
        <VerseBlock verses={ch1} label={isNl ? '1 AḎAM EN ḤAWWAH 1:1-6' : '1 AḎAM AND ḤAWWAH 1:1-6'} href={`/${locale}/read/adam-hawwah-a/1`} locale={locale} tooltips={tooltips} />
      </section>

      {/* Satan's account */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? "Satan legt het uit — zijn eigen versie" : "Satan explains it — his own account"}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Hoofdstukken 12-14 bevatten een van de meest fascinerende passages in de hele extra-canonieke literatuur: Satan vertelt zelf waarom hij weigerde te buigen voor Aḏam. Hij werd als eerste geschapen, hij staat hoger in rang — waarom zou hij knielen voor een schepsel van stof? Yahuah verbande hem. Nu zoekt hij wraak door de mensen te verderven.'
            : 'Chapters 12-14 contain one of the most remarkable passages in all extra-canonical literature: Satan tells in his own words why he refused to bow to Aḏam. He was created first, he is higher in rank — why would he kneel before a creature of dust? Yahuah cast him out. Now he seeks revenge by corrupting mankind.'}
        </p>
        <VerseBlock verses={ch12} label={isNl ? '1 AḎAM EN ḤAWWAH 12 — SATAN SPREEKT' : '1 AḎAM AND ḤAWWAH 12 — SATAN SPEAKS'} href={`/${locale}/read/adam-hawwah-a/12`} locale={locale} tooltips={tooltips} />
        {ch13.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <VerseBlock verses={ch13} label={isNl ? '1 AḎAM EN ḤAWWAH 13' : '1 AḎAM AND ḤAWWAH 13'} href={`/${locale}/read/adam-hawwah-a/13`} locale={locale} tooltips={tooltips} />
          </div>
        )}
        {ch14.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <VerseBlock verses={ch14} label={isNl ? '1 AḎAM EN ḤAWWAH 14' : '1 AḎAM AND ḤAWWAH 14'} href={`/${locale}/read/adam-hawwah-a/14`} locale={locale} tooltips={tooltips} />
          </div>
        )}
      </section>

      {/* What makes it remarkable */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Wat deze boeken zo bijzonder maakt' : 'What makes these books remarkable'}
        </h2>
        {[
          isNl
            ? ['Satans verhaal van binnenuit', "We horen Satan niet als een verre vijand maar als een wezen dat zijn eigen motivatie uitlegt. Het maakt zijn verleiding van Ḥawwah begrijpelijk — hij deed hetzelfde wat hem overkwam: overtuigen dat je meer verdient dan je hebt."]
            : ['Satan\'s story from the inside', "We hear Satan not as a distant enemy but as a being explaining his own motivation. It makes his temptation of Ḥawwah understandable — he did to her what was done to him: convincing her she deserved more than she had."],
          isNl
            ? ['De pijn van Ḥawwah', 'Ḥawwah neemt de volledige schuld op zich. Haar woorden aan haar kinderen — "leid uzelf nooit in de fout zoals ik deed" — zijn hartverscheurend en eerlijk.']
            : ["Ḥawwah's grief", 'Ḥawwah takes full blame upon herself. Her words to her children — "never lead yourself into error as I did" — are heartbreaking and honest.'],
          isNl
            ? ['Bereshit uitgebreid, niet vervangen', 'Deze boeken spreken Bereshit niet tegen — ze vullen de stiltes in. Waarom had Qayin geen controle over zijn woede? Waarom zag zijn offer er anders uit? Dit boek geeft context.']
            : ['Bereshit expanded, not replaced', 'These books do not contradict Bereshit — they fill in the silences. Why did Qayin have no control over his anger? Why did his offering look different? This book provides context.'],
        ].map(([title, body], i) => (
          <div key={i} style={{ marginBottom: i < 2 ? '1rem' : 0, paddingBottom: i < 2 ? '1rem' : 0, borderBottom: i < 2 ? '1px solid var(--th-border)' : 'none' }}>
            <strong style={{ fontSize: '13px', color: 'var(--th-text)', display: 'block', marginBottom: '0.3rem' }}>{title}</strong>
            <p style={{ fontSize: '13px', color: 'var(--th-muted)', lineHeight: 1.7, margin: 0 }}>{body}</p>
          </div>
        ))}
      </section>

      {/* Manuscripts */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '1rem' }}>
          {isNl ? 'Waar zijn de manuscripten vandaag?' : 'Where are the manuscripts today?'}
        </h2>
        {manuscripts.map((m, i) => (
          <div key={i} style={{ marginBottom: i < manuscripts.length - 1 ? '1rem' : 0, paddingBottom: i < manuscripts.length - 1 ? '1rem' : 0, borderBottom: i < manuscripts.length - 1 ? '1px solid var(--th-border)' : 'none' }}>
            <strong style={{ fontSize: '13px', color: 'var(--th-text)', display: 'block', marginBottom: '0.25rem' }}>{m.name}</strong>
            <p style={{ fontSize: '13px', color: 'var(--th-muted)', lineHeight: 1.7, margin: 0 }}>{m.where}</p>
          </div>
        ))}
      </section>

      {/* Read links */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { href: `/${locale}/read/adam-hawwah-a/1`, label: isNl ? '1 Aḏam en Ḥawwah lezen →' : 'Read 1 Adam and Hawwah →' },
          { href: `/${locale}/read/adam-hawwah-b/1`, label: isNl ? '2 Aḏam en Ḥawwah lezen →' : 'Read 2 Adam and Hawwah →' },
          { href: `/${locale}/read/yobelim/3`, label: isNl ? 'Yobelim 3 lezen →' : 'Read Yubilees 3 →' },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{ fontSize: '13px', color: 'var(--th-accent)', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid var(--th-border)', borderRadius: '6px' }}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
