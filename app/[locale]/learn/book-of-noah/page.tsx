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
    title: isNl ? 'Het Boek van Noaḥ' : 'The Book of Noah',
    description: isNl
      ? 'De verloren geschriften van Noaḥ over geneeskrachtige kruiden — plus andere verloren boeken van de Geschriften.'
      : 'The lost writings of Noah on healing herbs — plus other lost books of Scripture.',
  }
}

type Verse = { verse_number: number; text: string }

// Module-level component — must be outside the async page function
function VerseBlock({
  verses,
  label,
  href,
  locale,
  tooltips,
  expectedStart = 1,
}: {
  verses: Verse[]
  label: string
  href?: string
  locale: string
  tooltips: Record<string, string>
  expectedStart?: number
}) {
  // Filter out verses with no text (missing translations)
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
        <p style={{ fontSize: '12px', color: 'var(--th-muted)', fontStyle: 'italic', marginBottom: '0.6rem', margin: '0 0 0.6rem' }}>
          {locale === 'nl'
            ? `[Vers${firstNum - expectedStart > 1 ? 'en' : ''} ${expectedStart}${firstNum - expectedStart > 1 ? '–' + (firstNum - 1) : ''} ontbreekt in de brondata van de Halleluyah Scriptures PDF]`
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
  const { data: book } = await supabase.from('books').select('id').eq('slug', 'yobelim').single()
  const { data: hanokBook } = await supabase.from('books').select('id').eq('slug', 'hanok').single()
  if (!book) return { jub10: [], hanok7: [], hanok8: [], hanok60: [], hanok106: [] }

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

  const [jub10ch, h7ch, h8ch, h60ch, h106ch] = await Promise.all([
    getChapter(book.id, 10),
    hanokBook ? getChapter(hanokBook.id, 7)   : null,
    hanokBook ? getChapter(hanokBook.id, 8)   : null,
    hanokBook ? getChapter(hanokBook.id, 60)  : null,
    hanokBook ? getChapter(hanokBook.id, 106) : null,
  ])

  const [jub10, hanok7, hanok8, hanok60, hanok106] = await Promise.all([
    jub10ch  ? fetchVv(jub10ch.id,  [1,2,3,4,5,6,7,8,9,10,11,12,13,14]) : [],
    h7ch     ? fetchVv(h7ch.id,     [1,2,3,4,5,6])   : [],
    h8ch     ? fetchVv(h8ch.id,     [1,2,3,4])        : [],
    h60ch    ? fetchVv(h60ch.id,    [1,2,3,4,5,6,7,8]): [],
    h106ch   ? fetchVv(h106ch.id,   [1,2,3,4,5,6,7,8,9,10]) : [],
  ])

  return { jub10, hanok7, hanok8, hanok60, hanok106 }
}

export default async function BookOfNoahPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'
  const tooltips = getTooltips(locale)
  const { jub10, hanok7, hanok8, hanok60, hanok106 } = await getVerses(locale)

  const fragments = isNl ? [
    {
      name: 'Yobelim (Jubilees) 10:1-14 — de kruiden-passage',
      where: "Ethiopische manuscripten (Ge'ez) en Dode Zee-rollen. Ethiopische manuscripten in de British Library (Londen), Bodleian Library (Oxford) en de Nationale Bibliotheek van Ethiopië. Dode Zee-fragmenten van Yobelim in het Israel Museum, Jeruzalem.",
      note: '✓ In deze app leesbaar',
      href: `/${locale}/read/yobelim/10`,
    },
    {
      name: '1 Ḥanok 60, 65-69, 106-107 — Noaḥ-hoofdstukken',
      where: "Alleen volledig bewaard in Ethiopisch (Ge'ez). Manuscripten in British Library, Bodleian Oxford, Bibliothèque nationale de France (Parijs) en Ethiopisch-orthodoxe kloosters bij het Tanameer en Lalibela.",
      note: '✓ In deze app leesbaar',
      href: `/${locale}/read/hanok/60`,
    },
    {
      name: 'Dode Zee-rol 1Q19 — zelfstandige Boek van Noaḥ-fragmenten',
      where: 'Gevonden in Grot 1 bij Qumran (1947). Kleine Aramese fragmenten geïdentificeerd als een zelfstandig Boek van Noaḥ. Bewaard in het Israel Museum te Jeruzalem (Heiligdom van het Boek).',
      note: 'Te fragmentarisch voor leesbare tekst',
      href: null,
    },
    {
      name: 'Genesis Apocryphon (1QapGen) — Aramese Noaḥ-vertelling',
      where: 'Ook Grot 1, Qumran. Uitgebreide Aramese hervertelling van Bereshit, inclusief de wonderbaarlijke geboorte van Noaḥ (zijn lichaam straalde licht uit — vergelijk Ḥanok 106). Israel Museum, Jeruzalem.',
      note: 'Gedeeltelijk ontcijferd',
      href: null,
    },
  ] : [
    {
      name: 'Yubilees (Jubilees) 10:1-14 — the herbs passage',
      where: "Ethiopic manuscripts (Ge'ez) and Dead Sea Scrolls. Ethiopic manuscripts at the British Library (London), Bodleian Library (Oxford), and the National Library of Ethiopia. Dead Sea fragments of Jubilees at the Israel Museum, Jerusalem.",
      note: '✓ Readable in this app',
      href: `/${locale}/read/yobelim/10`,
    },
    {
      name: '1 Ḥanok 60, 65-69, 106-107 — Noah chapters',
      where: "Survived complete only in Ethiopic (Ge'ez). Manuscripts at the British Library, Bodleian Oxford, Bibliothèque nationale de France (Paris), and Ethiopian Orthodox monasteries at Lake Tana and Lalibela.",
      note: '✓ Readable in this app',
      href: `/${locale}/read/hanok/60`,
    },
    {
      name: 'Dead Sea Scroll 1Q19 — standalone Book of Noah fragments',
      where: 'Found in Cave 1 at Qumran (1947). Small Aramaic fragments identified as a standalone Book of Noah — not embedded in Ḥanok or Jubilees. Israel Museum, Jerusalem (Shrine of the Book).',
      note: 'Too fragmentary for readable text',
      href: null,
    },
    {
      name: 'Genesis Apocryphon (1QapGen) — Aramaic Noah narrative',
      where: "Also Cave 1, Qumran. Extended Aramaic retelling of Bereshit including the miraculous birth of Noah (his body radiated light — compare Ḥanok 106). Israel Museum, Jerusalem.",
      note: 'Partially deciphered',
      href: null,
    },
  ]

  const lostBooks = isNl ? [
    { ref: 'Bemidbar 21:14',   name: 'Boek van de Oorlogen van Yahuah', status: '❌ Volledig verloren', desc: 'Rechtstreeks aangehaald: "Daarom wordt gezegd in het Boek van de Oorlogen van Yahuah: Waheb in Suphah…" — een poëtisch werk over de militaire overwinningen van Yisrael. Geen enkel fragment bewaard.' },
    { ref: 'Dibre A 29:29',    name: 'Boek van Shemuel de Ziener',      status: '❌ Volledig verloren', desc: 'Aangehaald als bron voor de geschiedenis van Dawid, samen met de boeken van Nathan en Gad. Drie profetische geschriften — alle drie verloren.' },
    { ref: 'Dibre A 29:29',    name: 'Boek van Nathan de Profeet',       status: '❌ Volledig verloren', desc: 'Nathan confronteerde Dawid na zijn zonde met Bathsheḇa (2 Shemuel 12). Zijn eigen geschriften zijn verloren, maar zijn woorden leven voort in de canonieke boeken.' },
    { ref: 'Dibre A 29:29',    name: 'Boek van Gad de Ziener',           status: '❌ Volledig verloren', desc: 'Gad vergezelde Dawid in zijn vlucht voor Shaul en bestrafte hem later voor de volkstelling. Zijn boek wordt aangehaald maar is niet bewaard.' },
    { ref: 'Dibre B 9:29',     name: 'Visioenen van Iddo de Ziener',     status: '❌ Volledig verloren', desc: "Iddo wordt driemaal aangehaald als geschiedschrijver voor Shlomoh, Reḥaḇ'am en Aḇiyam. Zijn visioenen en genealogieën zijn niet overgeleverd." },
    { ref: 'Dibre B 9:29',     name: 'Profetie van Achiyah de Shiloniet', status: '❌ Volledig verloren', desc: 'Achiyah kondigde de verdeling van het koninkrijk aan (1 Melakim 11:29-39). Zijn eigen profetisch boek is verloren.' },
    { ref: 'Dibre B 12:15',    name: 'Boek van Shemayah de Profeet',     status: '❌ Volledig verloren', desc: "Shemayah waarschuwde Reḥaḇ'am niet op te trekken tegen de tien stammen. Zijn eigen geschrift is verloren." },
    { ref: 'Qolasim 4:16',     name: 'Brief van Paulus aan de Laodiceërs', status: '⚠️ Mogelijk gedeeltelijk', desc: "Paulus beval de gemeenten zijn brief uit Laodicea te lezen. Die brief bestaat niet in de canon. Een middeleeuwse versie bestaat maar wordt door de meeste geleerden als vervalsing beschouwd." },
    { ref: 'Qorintiyim A 5:9', name: 'Eerdere brief van Paulus aan Qorint', status: '❌ Volledig verloren', desc: "Paulus schrijft 'ik heb u in de brief geschreven…' — een verwijzing naar een eerdere brief aan dezelfde gemeente. Wat wij '1 Korinthiërs' noemen was al zijn tweede brief aan hen." },
    { ref: 'Yahudah 9',        name: 'Hemelvaart van Mosheh',            status: '⚠️ Gedeeltelijk bewaard', desc: "Yahudah vers 9 citeert een twist waarbij aartsengel Mikha'el strijdt om het lichaam van Mosheh — uit de 'Hemelvaart van Mosheh'. Gedeeltelijk bewaard in een 6e-eeuws Latijns manuscript (Milaan). Begin en einde zijn verloren." },
  ] : [
    { ref: 'Bemidbar 21:14',   name: 'Book of the Wars of Yahuah',         status: '❌ Completely lost',      desc: 'Quoted directly: "Therefore it is said in the Book of the Wars of Yahuah: Waheb in Suphah…" — a poetic work about the military victories of Yisrael. Not a single fragment survives.' },
    { ref: 'Dibre A 29:29',    name: 'Book of Shemuel the Seer',            status: '❌ Completely lost',      desc: 'Cited as a source for the history of Dawid, alongside the books of Nathan and Gad. Three prophetic writings — all three lost.' },
    { ref: 'Dibre A 29:29',    name: 'Book of Nathan the Prophet',           status: '❌ Completely lost',      desc: 'Nathan confronted Dawid after his sin with Bathsheḇa (2 Shemuel 12). His own writings are lost but his words survive embedded in the canonical books.' },
    { ref: 'Dibre A 29:29',    name: 'Book of Gad the Seer',                 status: '❌ Completely lost',      desc: 'Gad accompanied Dawid during his flight from Shaul and later rebuked him for the census. His book is referenced but has not survived.' },
    { ref: 'Dibre B 9:29',     name: 'Visions of Iddo the Seer',             status: '❌ Completely lost',      desc: "Iddo is cited three times as a chronicler for Shlomoh, Reḥaḇ'am, and Aḇiyam. His visions and genealogies have not been passed down." },
    { ref: 'Dibre B 9:29',     name: 'Prophecy of Achiyah the Shilonite',    status: '❌ Completely lost',      desc: 'Achiyah announced the division of the kingdom (1 Melakim 11:29-39). His own prophetic book is lost.' },
    { ref: 'Dibre B 12:15',    name: 'Book of Shemayah the Prophet',         status: '❌ Completely lost',      desc: "Shemayah warned Reḥaḇ'am not to march against the ten tribes. His own writing is lost." },
    { ref: 'Qolasim 4:16',     name: 'Letter of Paulus to the Laodiceans',   status: '⚠️ Possibly partly',     desc: "Paulus instructed assemblies to exchange letters with Laodicea. That letter is not in the canon. A medieval version exists but is considered a forgery by most scholars." },
    { ref: 'Qorintiyim A 5:9', name: 'Earlier letter of Paulus to Qorint',   status: '❌ Completely lost',      desc: "Paulus writes 'I wrote to you in my letter…' — referring to an earlier letter to the same assembly. What we call '1 Corinthians' was already his second letter to them." },
    { ref: 'Yahudah 9',        name: 'Assumption of Moses',                   status: '⚠️ Partially preserved', desc: "Yahudah (Jude) verse 9 quotes a dispute where archangel Mika'el contends over the body of Mosheh — from the 'Assumption of Moses'. Partially preserved in a 6th-century Latin manuscript (Milan). Beginning and end are lost." },
  ]

  return (
    <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />

      <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '2rem' }}>🌿</span></div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0 0 0.4rem' }}>
        {isNl ? 'Het Boek van Noaḥ' : 'The Book of Noah'}
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
        {isNl
          ? 'Kruiden, genezing en het verloren erfgoed van Shem — plus andere verloren boeken van de Geschriften'
          : 'Herbs, healing, and the lost heritage of Shem — plus other lost books of Scripture'}
      </p>

      {/* What is it */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Wat is het Boek van Noaḥ?' : 'What is the Book of Noah?'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
          {isNl
            ? 'Een verloren geschrift aangehaald in 1 Ḥanok en Yobelim. Het bevatte visioenen, profetieën en kennis van geneeskrachtige kruiden die Noaḥ ontving van de engelen na de vloed — om zijn nageslacht te beschermen tegen de demonen (geesten van de gevallen Nephilim) die hen kwelden met ziekten.'
            : 'A lost writing cited in 1 Ḥanok and Yubilees. It contained visions, prophecies, and knowledge of healing herbs revealed to Noah by angels after the flood — to protect his descendants from demons (spirits of the fallen Nephilim) who afflicted them with sickness.'}
        </p>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: 0 }}>
          {isNl
            ? "Noaḥ gaf dit boek aan Shem — zijn verbondszoon, niet Yapheth de oudste naar geboorte. Shem was de drager van het verbond, de lijn die naar Aḇraham, Yitsḥaq, Ya'aqoḇ en uiteindelijk Yahusha zou leiden."
            : "Noah gave this book to Shem — his covenant son, not Yapheth the elder by birth. Shem carried the covenant line that led to Aḇraham, Yitsḥaq, Ya'aqoḇ, and ultimately Yahusha."}
        </p>
      </section>

      {/* Known fragments + locations */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '1rem' }}>
          {isNl ? 'Wat is er bewaard gebleven — en waar?' : 'What survives — and where is it today?'}
        </h2>
        {fragments.map((f, i) => (
          <div key={i} style={{ marginBottom: i < fragments.length - 1 ? '1.25rem' : 0, paddingBottom: i < fragments.length - 1 ? '1.25rem' : 0, borderBottom: i < fragments.length - 1 ? '1px solid var(--th-border)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <strong style={{ fontSize: '13px', color: 'var(--th-text)' }}>{f.name}</strong>
              {f.href
                ? <Link href={f.href} style={{ fontSize: '11px', color: 'var(--th-gold)', textDecoration: 'none', fontWeight: 700, flexShrink: 0 }}>{f.note}</Link>
                : <span style={{ fontSize: '11px', color: 'var(--th-muted)', flexShrink: 0 }}>{f.note}</span>
              }
            </div>
            <p style={{ fontSize: '13px', color: 'var(--th-muted)', lineHeight: 1.7, margin: 0 }}>{f.where}</p>
          </div>
        ))}
      </section>

      {/* Jubilees 10 */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <VerseBlock verses={jub10} label={isNl ? 'YOBELIM 10:1-14 — HET GEBED EN DE KRUIDEN' : 'YUBILEES 10:1-14 — THE PRAYER AND THE HERBS'} href={`/${locale}/read/yobelim/10`} locale={locale} tooltips={tooltips} />
      </section>

      {/* Watchers */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'De schaduwzijde: de Wachters en plantenkennis' : 'The shadow side: the Watchers and plant knowledge'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Ḥanok 7-8 onthult dat de gevallen Wachters vóór de vloed ook plantenkennis hadden onderwezen — maar voor toverij. Yahuah gaf via Noaḥ dezelfde soort kennis terug als tegengif: genezing in plaats van vloek.'
            : 'Ḥanok 7-8 reveals that the fallen Watchers had also taught plant knowledge before the flood — but for sorcery. Through Noah, Yahuah returned the same kind of knowledge as an antidote: healing instead of curse.'}
        </p>
        <VerseBlock verses={hanok7} label="ḤANOK 7" href={`/${locale}/read/hanok/7`} locale={locale} tooltips={tooltips} />
        {hanok8.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <VerseBlock verses={hanok8} label="ḤANOK 8" href={`/${locale}/read/hanok/8`} locale={locale} tooltips={tooltips} />
          </div>
        )}
      </section>

      {/* Hanok 106 + 60 */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Noaḥ-fragmenten in Ḥanok' : 'Noah fragments embedded in Ḥanok'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {isNl
            ? 'Hoofdstuk 106 beschrijft de wonderbaarlijke geboorte van Noaḥ — zijn lichaam straalde licht, zijn ogen als de zon. Zijn vader Lamek vroeg Ḥanok (zijn grootvader) of dit kind goddelijk was. Ḥanok antwoordde: Yahuah heeft hem uitgekozen om de aarde te bewaren.'
            : "Chapter 106 describes the miraculous birth of Noah — his body radiated light, his eyes like the sun. His father Lamek asked Ḥanok (his grandfather) whether this child was divine. Ḥanok replied: Yahuah has chosen him to preserve the earth."}
        </p>
        <VerseBlock verses={hanok106} label="ḤANOK 106:1-10 — DE GEBOORTE VAN NOAḤ" href={`/${locale}/read/hanok/106`} locale={locale} tooltips={tooltips} />
        {hanok60.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <VerseBlock verses={hanok60.slice(0, 5)} label="ḤANOK 60:1-5 — NOAḤ'S VISIOEN" href={`/${locale}/read/hanok/60`} locale={locale} tooltips={tooltips} />
          </div>
        )}
      </section>

      {/* Divider */}
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <div style={{ width: '4rem', height: '2px', background: 'var(--th-gold)', margin: '0 auto', opacity: 0.4, borderRadius: '1px' }} />
        <p style={{ fontSize: '11px', color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '1rem', fontWeight: 700 }}>
          {isNl ? 'Andere Verloren Boeken van de Geschriften' : 'Other Lost Books of Scripture'}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginTop: '0.5rem', maxWidth: '30rem', margin: '0.5rem auto 0' }}>
          {isNl
            ? 'De Geschriften verwijzen naar meer dan twintig boeken die niet bewaard zijn gebleven. Sommige worden rechtstreeks aangehaald.'
            : 'Scripture references more than twenty books that have not survived. Some are quoted directly.'}
        </p>
      </div>

      {/* Lost books */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {lostBooks.map((b, i) => (
          <section key={i} className="theme-card" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
              <strong style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', color: 'var(--th-gold)' }}>{b.name}</strong>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '10px', color: 'var(--th-muted)', background: 'var(--th-bg)', padding: '2px 6px', borderRadius: '4px' }}>{b.ref}</span>
                <span style={{ fontSize: '11px', color: 'var(--th-muted)' }}>{b.status}</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.75, margin: 0 }}>{b.desc}</p>
          </section>
        ))}
      </div>

      {/* Closing note */}
      <section className="theme-card" style={{ padding: '1.5rem', marginBottom: '2rem', borderLeft: '3px solid var(--th-gold)' }}>
        <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.85, margin: 0, fontStyle: 'italic' }}>
          {isNl
            ? 'Het feit dat deze boeken verloren zijn, is niet het einde van het verhaal. Wat Yahuah heeft laten bewaren is genoeg om te kennen, te wandelen en gereed te zijn. Maar het herinnert ons ook: de Geschriften die wij wél hebben zijn een wonder — bewaard door eeuwen van vervolging, verval en censuur.'
            : 'The fact that these books are lost is not the end of the story. What Yahuah has caused to be preserved is enough to know, to walk, and to be ready. But it also reminds us: the Scriptures we do have are a miracle — preserved through centuries of persecution, decay, and censorship.'}
        </p>
      </section>
    </div>
  )
}
