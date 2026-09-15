import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeVerseText } from '@/lib/text-utils'
import RichText from '@/components/scripture/RichText'

type VerseRow = {
  verse_number: number
  text: string
  translation_text: string | null
}

// Hardcoded NL translations for commandment verses (not yet in DB)
const NL_OVERRIDES: Record<string, Record<number, string>> = {
  'shemoth-20': {
    2:  'Ik ben 𐤉𐤄𐤅𐤄 uw Elohim, die u uit het land Mitsrayim, uit het huis van slavernij geleid heeft.',
    3:  'U zult geen andere elohim voor Mijn aangezicht hebben.',
    4:  'U zult voor uzelf geen gesneden beeld maken, noch enige gelijkenis van wat boven in de hemelen is, of wat beneden op de aarde is, of wat in de wateren onder de aarde is.',
    5:  'U zult zich voor hen niet neerbuigen noch hen dienen. Want Ik, 𐤉𐤄𐤅𐤄 uw Elohim, ben een jaloers El, die de ongerechtigheid van de vaderen bezoek aan de kinderen, aan het derde en vierde geslacht van hen die Mij haten,',
    6:  'maar genade bewijs aan duizenden van hen die Mij liefhebben en Mijn geboden bewaren.',
    7:  'U zult de Naam van 𐤉𐤄𐤅𐤄 uw Elohim niet ijdel gebruiken, want 𐤉𐤄𐤅𐤄 zal niet ongestraft laten wie Zijn Naam ijdel gebruikt.',
    8:  'Gedenk de Shabbatdag, om die heilig te houden.',
    9:  'Zes dagen zult u arbeiden en al uw werk doen,',
    10: 'maar de zevende dag is de Shabbat van 𐤉𐤄𐤅𐤄 uw Elohim. Dan zult u geen enkel werk doen — u noch uw zoon, noch uw dochter, noch uw slaaf, noch uw slavin, noch uw vee, noch de vreemdeling die bij u woont.',
    11: 'Want in zes dagen heeft 𐤉𐤄𐤅𐤄 de hemelen en de aarde gemaakt, de zee en al wat daarin is, en Hij rustte op de zevende dag. Daarom zegende 𐤉𐤄𐤅𐤄 de Shabbatdag en heiligde hem.',
    12: 'Eer uw vader en uw moeder, opdat uw dagen verlengd worden op de aarde die 𐤉𐤄𐤅𐤄 uw Elohim u geeft.',
    13: 'U zult niet moorden.',
    14: 'U zult geen overspel plegen.',
    15: 'U zult niet stelen.',
    16: 'U zult geen valse getuigenis afleggen tegen uw naaste.',
    17: 'U zult niet begeren het huis van uw naaste; u zult niet begeren de vrouw van uw naaste, noch zijn slaaf, noch zijn slavin, noch zijn os, noch zijn ezel, noch iets dat van uw naaste is.',
  },
  'mattithyahu-5': {
    17: 'Denk niet dat Ik gekomen ben om de Torah of de Profeten af te schaffen. Ik ben niet gekomen om af te schaffen, maar om te vervullen.',
    18: 'Want voorwaar, Ik zeg u: totdat de hemel en de aarde voorbijgaan, zal niet één jota of één tittel van de Torah voorbijgaan, totdat alles is geschied.',
  },
  'yahuchanan-14': {
    15: 'Als u Mij liefhebt, bewaar dan Mijn geboden.',
  },
  'mattithyahu-22': {
    37: 'Yahusha zei tot hem: "U zult 𐤉𐤄𐤅𐤄 uw Elohim liefhebben met heel uw hart en met heel uw ziel en met heel uw verstand."',
    38: '"Dit is het eerste en grote gebod."',
    39: '"En het tweede is daaraan gelijk: U zult uw naaste liefhebben als uzelf."',
    40: '"Aan deze twee geboden hangt de gehele Torah en de Profeten."',
  },
}

async function getVerses(
  bookSlug: string,
  chapterNumber: number,
  verseNumbers: number[],
  locale: string
): Promise<VerseRow[]> {
  const supabase = await createClient()

  const { data: book } = await supabase
    .from('books').select('id').eq('slug', bookSlug).single()
  if (!book) return []

  const { data: chapter } = await supabase
    .from('chapters').select('id')
    .eq('book_id', book.id).eq('number', chapterNumber).single()
  if (!chapter) return []

  const { data: verses } = await supabase
    .from('verses').select('id, verse_number, text')
    .eq('chapter_id', chapter.id).in('verse_number', verseNumbers)
    .order('verse_number')
  if (!verses) return []

  const overrideKey = `${bookSlug}-${chapterNumber}`
  const overrides = locale === 'nl' ? (NL_OVERRIDES[overrideKey] ?? {}) : {}

  if (locale === 'en') {
    return verses.map((v) => ({ verse_number: v.verse_number, text: normalizeVerseText(v.text), translation_text: null }))
  }

  const { data: translations } = await supabase
    .from('translations').select('verse_id, text')
    .in('verse_id', verses.map((v) => v.id)).eq('locale', locale)

  const trMap = new Map((translations ?? []).map((t) => [t.verse_id, t.text]))

  return verses.map((v) => ({
    verse_number: v.verse_number,
    text: normalizeVerseText(v.text),
    translation_text: overrides[v.verse_number] != null ? normalizeVerseText(overrides[v.verse_number]) : trMap.has(v.id) ? normalizeVerseText(trMap.get(v.id)!) : null,
  }))
}

function displayText(row: VerseRow) {
  return row.translation_text ?? row.text
}

export default async function CommandmentsPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const [tenWords, torahVerse, fulfillVerse, loveYahuah] = await Promise.all([
    getVerses('shemoth', 20, [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], locale),
    getVerses('mattithyahu', 5, [17, 18], locale),
    getVerses('yahuchanan', 14, [15], locale),
    getVerses('mattithyahu', 22, [37, 38, 39, 40], locale),
  ])

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 2rem' }}>
        {isNl ? 'De Geboden van Yahuah' : 'The Commandments of Yahuah'}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        <section className="theme-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem' }}>
            {isNl ? 'De Tien Geboden (Aseret haDiberot)' : 'The Ten Commandments (Aseret haDiberot)'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--th-muted)', marginBottom: '1.25rem' }}>
            {isNl
              ? 'Gegeven op Sinai in vuur en donder — de samenvatting van de hele Torah (Shemoth 20):'
              : 'Given at Sinai in fire and thunder — the summary of the entire Torah (Shemoth 20):'}
          </p>

          {tenWords.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tenWords.map((v) => (
                <div key={v.verse_number} style={{ borderLeft: '3px solid var(--th-accent)', paddingLeft: '1rem' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Shemoth 20:{v.verse_number}
                  </p>
                  <RichText text={displayText(v)} locale={locale} as="p" className="verse-text" style={{ margin: 0, fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px' }} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '14px', color: 'var(--th-muted)', fontStyle: 'italic' }}>
              {isNl ? 'Verzen laden...' : 'Loading verses...'}
            </p>
          )}

          <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
            <Link href={`/${locale}/read/shemoth/20`} style={{ fontSize: '13px', color: 'var(--th-accent)', textDecoration: 'none', fontWeight: 600 }}>
              {isNl ? 'Lees Shemoth 20 →' : 'Read Shemoth 20 →'}
            </Link>
          </div>
        </section>

        <section className="theme-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem' }}>
            {isNl ? 'Zijn de geboden nog geldig?' : 'Are the Commandments Still Valid?'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            {isNl
              ? 'De Torah is niet afgeschaft — zij is ingeschreven in harten van vlees (Yirmeyahu 31:33). Yahusha bevestigde dit:'
              : 'The Torah is not abolished — it is written on hearts of flesh (Yirmeyahu 31:33). Yahusha confirmed this:'}
          </p>

          {torahVerse.map((v) => (
            <blockquote key={v.verse_number} style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', margin: '0 0 1rem' }}>
              <RichText text={displayText(v)} locale={locale} as="p" className="verse-text" style={{ fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px', margin: 0 }} />
              <cite style={{ fontSize: '12px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600, display: 'block', marginTop: '0.4rem' }}>
                — MattithYahu 5:{v.verse_number}
              </cite>
            </blockquote>
          ))}

          {fulfillVerse.map((v) => (
            <blockquote key={v.verse_number} style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', margin: '0 0 1rem' }}>
              <RichText text={displayText(v)} locale={locale} as="p" className="verse-text" style={{ fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px', margin: 0 }} />
              <cite style={{ fontSize: '12px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600, display: 'block', marginTop: '0.4rem' }}>
                — Yahuchanan 14:{v.verse_number}
              </cite>
            </blockquote>
          ))}
        </section>

        <section className="theme-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem' }}>
            {isNl ? 'De Twee Grootste Geboden' : 'The Two Greatest Commandments'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            {isNl
              ? 'Yahusha vatte alle geboden samen in twee:'
              : 'Yahusha summarised all commandments in two:'}
          </p>

          {loveYahuah.map((v) => (
            <blockquote key={v.verse_number} style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', margin: '0 0 1rem' }}>
              <RichText text={displayText(v)} locale={locale} as="p" className="verse-text" style={{ fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px', margin: 0 }} />
              <cite style={{ fontSize: '12px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600, display: 'block', marginTop: '0.4rem' }}>
                — MattithYahu 22:{v.verse_number}
              </cite>
            </blockquote>
          ))}

          <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
            <Link href={`/${locale}/read/mattithyahu/22`} style={{ fontSize: '13px', color: 'var(--th-accent)', textDecoration: 'none', fontWeight: 600 }}>
              {isNl ? 'Lees MattithYahu 22 →' : 'Read MattithYahu 22 →'}
            </Link>
          </div>
        </section>


        <section className="theme-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
            {isNl ? 'Wijsheid van Sirach over de geboden' : 'Wisdom of Sirach on the Commandments'}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--th-text)', margin: '0 0 1rem' }}>
            {isNl
              ? 'Yeshua Ben Sira (±180 v.C.) schreef een boek dat de Torah-geboden omzet in praktische wijsheid voor het dagelijkse leven. Enkele kernuitspraken:'
              : 'Yeshua Ben Sira (c. 180 BC) wrote a book that translates the Torah commandments into practical wisdom for daily life. A few key statements:'}
          </p>
          <blockquote style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', margin: '0 0 1rem' }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px', margin: 0, color: 'var(--th-text)' }}>
              {isNl
                ? '"Het begin van wijsheid is ontzag voor Yahuah; zij groeit met de gelovigen in de moederschoot."'
                : '"The beginning of wisdom is to fear Yahuah; she grows with the faithful in the womb."'}
            </p>
            <cite style={{ fontSize: '12px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600, display: 'block', marginTop: '0.4rem' }}>— Sirach 1:14</cite>
          </blockquote>
          <blockquote style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', margin: '0 0 1rem' }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px', margin: 0, color: 'var(--th-text)' }}>
              {isNl
                ? '"Als u wilt, kunt u de geboden onderhouden; trouw zijn is wat Hij van u verlangt."'
                : '"If you will, you can keep the commandments; faithfulness is what He desires of you."'}
            </p>
            <cite style={{ fontSize: '12px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600, display: 'block', marginTop: '0.4rem' }}>— Sirach 15:15</cite>
          </blockquote>
          <blockquote style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', margin: '0' }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.75, fontSize: '14px', margin: 0, color: 'var(--th-text)' }}>
              {isNl
                ? '"Heel de Geschriften zijn vol van wijsheid; maar de Torah is de kroon boven alles."'
                : '"All of Scripture is filled with wisdom; but the Torah is the crown above all."'}
            </p>
            <cite style={{ fontSize: '12px', color: 'var(--th-gold)', fontStyle: 'normal', fontWeight: 600, display: 'block', marginTop: '0.4rem' }}>— Sirach 24:23</cite>
          </blockquote>
        </section>

      </div>
    </div>
  )
}
