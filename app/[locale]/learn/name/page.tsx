import Link from 'next/link'
import BackLink from '@/components/ui/BackLink'
import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function NamePage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const content = {
    title:    isNl ? 'De Naam van Yahuah' : 'The Name of Yahuah',
    back:     isNl ? '← Leren' : '← Learn',
    sections: isNl ? [
      {
        heading: 'De Naam boven alle namen',
        body: `De Naam van de Allerhoogste — 𐤉𐤄𐤅𐤄 (Yahuah) — komt meer dan 6.800 keer voor in de Hebreeuwse Geschriften. Toch werd Hij door vertalers systematisch vervangen door titels als "HEERE", "GOD" of "de Heer". Dit is geen kleine omissie — de Naam van de Schepper werd bewust verborgen voor generaties van lezers.`,
      },
      {
        heading: 'Wat betekent Yahuah?',
        body: `De vier letters — 𐤉 (Yod), 𐤄 (He), 𐤅 (Waw), 𐤄 (He) — vormen samen de naam die in het Hebreeuws is afgeleid van het werkwoord "zijn" (hayah). De Naam betekent letterlijk: "Hij die is, was en zijn zal." Hij stelt Zichzelf voor als EHYEH ASHER EHYEH — "Ik Ben Die Ik Ben" (Shemoth/Exodus 3:14), en verklaart dan: "Dit is mijn Naam voor eeuwig."`,
      },
      {
        heading: 'Waarom werd de Naam verborgen?',
        body: `Joodse tradities die ontstonden na de Babylonische ballingschap ontmoedigden het uitspreken van de Naam, uit vrees voor heiligschennis. In plaats daarvan zeiden schriftgeleerden "Adonai" (Meester). Vertalers namen dit over en schreven het als "HEERE" of "LORD". Het resultaat: miljarden mensen die de Geschriften lazen, kenden de Naam van hun Schepper niet.`,
      },
      {
        heading: 'De Naam herstellen',
        body: `De Geschriften zeggen: "Mijn volk zal Mijn Naam kennen" (YeshaYahu 52:6). Deze website gebruikt de herstelde naam Yahuah doorheen alle teksten, zodat lezers de Schepper bij Zijn eigen Naam kunnen aanroepen — zoals de Geschriften dat bedoelen.`,
      },
      {
        heading: 'Hoe spreek je de Naam uit?',
        body: `Yahuah — Yah-HOO-ah. Het eerste deel "Yah" komt terug in namen als HalleluYah (Prijs Yah), EliYahu (Mijn Al is Yah) en YeshaYahu (Yahuah redt). De Naam is niet verboden of gevaarlijk — het is een eer om Hem bij Zijn Naam te kennen en te aanroepen.`,
      },
    ] : [
      {
        heading: 'The Name Above All Names',
        body: `The Name of the Most High — 𐤉𐤄𐤅𐤄 (Yahuah) — appears more than 6,800 times in the Hebrew Scriptures. Yet translators systematically replaced it with titles like "LORD", "GOD", or "the Lord". This is no small omission — the Creator's own Name was deliberately hidden from generations of readers.`,
      },
      {
        heading: 'What Does Yahuah Mean?',
        body: `The four letters — 𐤉 (Yod), 𐤄 (He), 𐤅 (Waw), 𐤄 (He) — form a Name derived from the Hebrew verb "to be" (hayah). It means literally: "He who is, was, and will be." He introduces Himself as EHYEH ASHER EHYEH — "I Am That I Am" (Shemoth/Exodus 3:14), and then declares: "This is My Name forever."`,
      },
      {
        heading: 'Why Was the Name Hidden?',
        body: `Jewish traditions that developed after the Babylonian exile discouraged speaking the Name aloud, fearing misuse. Scribes instead said "Adonai" (Master). Translators followed suit, rendering it as "LORD" in capital letters. The result: billions of Scripture readers through history never knew their Creator's actual Name.`,
      },
      {
        heading: 'Restoring the Name',
        body: `The Scriptures declare: "My people shall know My Name" (YeshaYahu 52:6). This website uses the restored Name Yahuah throughout all texts, so readers can call upon the Creator by His own Name — as the Scriptures intend.`,
      },
      {
        heading: 'How to Pronounce the Name',
        body: `Yahuah — Yah-HOO-ah. The first syllable "Yah" echoes through names like HalleluYah (Praise Yah), EliYahu (My El is Yah), and YeshaYahu (Yahuah saves). The Name is not forbidden or dangerous — it is an honour to know and call upon Him by His Name.`,
      },
    ],
  }

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={content.back} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 0.25rem' }}>
        {content.title}
      </h1>
      <p className="paleo-hebrew" style={{ fontSize: '2rem', color: 'var(--th-gold)', letterSpacing: '0.15em', marginBottom: '2rem' }}>𐤉𐤄𐤅𐤄</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {content.sections.map((s, i) => (
          <section key={i} className="theme-card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>{s.heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--th-text)', margin: 0 }}>{s.body}</p>
          </section>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--th-card)', border: '1px solid var(--th-border)', borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '0.75rem' }}>
          {isNl ? 'Ontdek Zijn Naam in de Geschriften' : 'Discover His Name in the Scriptures'}
        </p>
        <Link href={`/${locale}/read`} style={{ padding: '8px 20px', borderRadius: '999px', background: 'var(--th-accent)', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          {isNl ? 'Lees de Geschriften →' : 'Read the Scriptures →'}
        </Link>
      </div>
    </div>
  )
}
