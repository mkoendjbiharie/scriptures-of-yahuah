import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function TorahPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const books = isNl ? [
    { name: 'Bereshit',    en: 'Genesis',    paleo: '𐤁𐤓𐤀𐤔𐤉𐤕', meaning: '"In het begin"', summary: 'De schepping, de val, de vloed, de aartsvaders — van Adam tot Yosef in Mitsrayim.' },
    { name: 'Shemoth',     en: 'Exodus',     paleo: '𐤔𐤌𐤅𐤕',   meaning: '"Namen"',        summary: 'Yahuah bevrijdt Yisrael uit slavernij, openbaart Zijn Naam en geeft de Torah op Sinai.' },
    { name: 'Wayyiqra',    en: 'Leviticus',  paleo: '𐤅𐤉𐤒𐤓𐤀',  meaning: '"En Hij riep"',  summary: 'De wetten van heiligheid, de offers, de priesters en de heilige tijden.' },
    { name: 'Bemidbar',    en: 'Numbers',    paleo: '𐤁𐤌𐤃𐤁𐤓',  meaning: '"In de woestijn"', summary: 'Veertig jaar door de woestijn — geloof, opstand, en de getrouwheid van Yahuah.' },
    { name: 'Debarim',     en: 'Deuteronomy',paleo: '𐤃𐤁𐤓𐤉𐤌',  meaning: '"Woorden"',      summary: 'Mosheh spreekt zijn laatste woorden tot Yisrael voor het betreden van het land.' },
  ] : [
    { name: 'Bereshit',    en: 'Genesis',    paleo: '𐤁𐤓𐤀𐤔𐤉𐤕', meaning: '"In the beginning"', summary: 'Creation, the fall, the flood, the patriarchs — from Adam to Yosef in Mitsrayim.' },
    { name: 'Shemoth',     en: 'Exodus',     paleo: '𐤔𐤌𐤅𐤕',   meaning: '"Names"',            summary: 'Yahuah delivers Yisrael from slavery, reveals His Name, and gives the Torah at Sinai.' },
    { name: 'Wayyiqra',    en: 'Leviticus',  paleo: '𐤅𐤉𐤒𐤓𐤀',  meaning: '"And He called"',    summary: 'The laws of set-apartness, the offerings, the priests, and the appointed times.' },
    { name: 'Bemidbar',    en: 'Numbers',    paleo: '𐤁𐤌𐤃𐤁𐤓',  meaning: '"In the wilderness"', summary: 'Forty years through the wilderness — faith, rebellion, and the faithfulness of Yahuah.' },
    { name: 'Debarim',     en: 'Deuteronomy',paleo: '𐤃𐤁𐤓𐤉𐤌',  meaning: '"Words"',            summary: 'Mosheh delivers his final words to Yisrael before entering the land.' },
  ]

  const BOOK_SLUGS = ['bereshit','shemoth','wayyiqra','bemidbar','debarim']

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 0.5rem' }}>
        {isNl ? 'De Torah' : 'The Torah'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', marginBottom: '2rem' }}>
        {isNl
          ? 'De vijf boeken van Mosheh — het fundament van alle Geschriften en het hart van het verbond.'
          : 'The five books of Mosheh — the foundation of all Scripture and the heart of the covenant.'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {books.map((b, i) => (
          <Link key={i} href={`/${locale}/read/${BOOK_SLUGS[i]}`} className="theme-card" style={{ padding: '1.25rem', textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span className="paleo-hebrew" style={{ fontSize: '1.6rem', color: 'var(--th-gold)', minWidth: '48px', textAlign: 'center', lineHeight: 1.2 }}>{b.paleo}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--th-text)' }}>{b.name}</span>
                <span style={{ fontSize: '12px', color: 'var(--th-muted)' }}>{b.en} · {b.meaning}</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--th-text)', margin: 0 }}>{b.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="theme-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Begeleiders van de Torah' : 'Companions to the Torah'}
        </h2>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--th-text)', margin: '0 0 0.75rem' }}>
          {isNl
            ? 'Naast de vijf boeken van Mosheh zijn er teksten die de Torah-verhalen uitbreiden en verdiepen:'
            : 'Alongside the five books of Mosheh are texts that expand and deepen the Torah narratives:'}
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--th-gold)' }}>Yobelim (Jubilees)</strong>
            {isNl ? ' — Herschrijft Bereshit en Shemoth 1-12 in Jubeljaren, met aanvullende details over de aartsvaders, de engelen, en de heilige kalender.' : ' — Rewrites Bereshit and Shemoth 1-12 in Jubilee years, with additional details on the patriarchs, the angels, and the sacred calendar.'}
          </li>
          <li style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--th-gold)' }}>Yasher (Jasher)</strong>
            {isNl ? ' — Aangehaald in Yahushua 10:13 en 2 Shemuel 1:18. Geeft uitgebreide verhalen van Adam tot de verovering van Kena’an.' : " — Quoted in Yahushua 10:13 and 2 Shemuel 1:18. Provides extended narratives from Adam through the conquest of Kena’an."}
          </li>
          <li style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--th-gold)' }}>Ḥanok (Enoch)</strong>
            {isNl ? ' — Beschrijft de val van de wachters (Bereshit 6), de vloed, en Ḥanok’s hemelse visioenen. Aangehaald door Yahudah (Judas) 1:14.' : " — Describes the fall of the watchers (Bereshit 6), the flood, and Ḥanok’s heavenly visions. Quoted by Yahudah (Jude) 1:14."}
          </li>
        </ul>
      </section>
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '13px', color: 'var(--th-muted)' }}>
        {isNl ? 'Klik op een boek om te beginnen met lezen →' : 'Click any book to start reading →'}
      </p>
    </div>
  )
}
