import Link from 'next/link'
import BackLink from '@/components/ui/BackLink'
import { getLocale } from 'next-intl/server'

export default async function AboutPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  return (
    <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
      <BackLink href={`/${locale}`} label={isNl ? '← Begin' : '← Home'} />

      {/* Title */}
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.75rem 0 0.25rem' }}>
        {isNl ? 'Over dit project' : 'About this project'}
      </h1>
      <p className="paleo-hebrew" style={{ fontSize: '1.5rem', color: 'var(--th-gold)', letterSpacing: '0.12em', marginBottom: '2rem' }}>
        𐤉𐤄𐤅𐤄
      </p>

      {/* Mission */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>📖</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Onze opdracht' : 'Our mission'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Dit is een plek voor iedereen — jong en oud, uit elke taal en natie — om het herstelde Woord van de Allerhoogste Yahuah te lezen en te begrijpen. Niet een vertaling gebouwd op tradities van mensen, maar de Geschriften met teruggebrachte namen, in de taal van het hart.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            This is a place for everyone — young and old, from every tongue and nation — to read and understand the restored Word of the Most High Yahuah. Not a translation built on the traditions of men, but Scripture with its names brought back, in the language of the heart.
          </p>
        )}
      </section>

      {/* Why restored names */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>✍️</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Waarom herstelde namen?' : 'Why restored names?'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Door eeuwen van vertaling en traditie werden de namen van de Schepper en Zijn Zoon vervangen door titels: "God", "Heer", "Jezus". Maar de Allerhoogste heeft een Naam — <strong style={{ color: 'var(--th-gold)' }}>Yahuah</strong> — en Zijn Zoon ook — <strong style={{ color: 'var(--th-gold)' }}>Yahusha</strong>, wat betekent "Yahuah redt". Wanneer wij die namen terugbrengen, opent de Schrift zich op een nieuwe manier: profetieën verbinden zich, patronen worden zichtbaar, en de eenheid van het Woord schittert.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Through centuries of translation and tradition, the names of the Creator and His Son were replaced with titles: "God", "Lord", "Jesus". But the Most High has a Name — <strong style={{ color: 'var(--th-gold)' }}>Yahuah</strong> — and so does His Son — <strong style={{ color: 'var(--th-gold)' }}>Yahusha</strong>, meaning "Yahuah saves". When we restore those names, Scripture opens up in a new way: prophecies connect, patterns become visible, and the unity of the Word shines.
          </p>
        )}
      </section>

      {/* For all ages */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>👨‍👩‍👧‍👦</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Voor alle leeftijden' : 'For all ages'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Of je nu acht bent of tachtig — of je de Geschriften al je hele leven leest of net begint — dit is jouw plek. De teksten zijn helder. De namen zijn uitgelegd. De Learn sectie legt de context uit achter de woorden. En alles is beschikbaar in meerdere talen, zodat niemand buitengesloten wordt.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Whether you are eight or eighty — whether you have read Scripture all your life or are just beginning — this is your place. The texts are clear. The names are explained. The Learn section gives the context behind the words. And everything is available in multiple languages so that no one is left out.
          </p>
        )}
      </section>

      {/* Readiness */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>✨</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Gereed voor de Mashiach' : 'Ready for the Mashiach'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Wij leven in een bijzondere tijd. De tekenen van de Geschriften ontvouwen zich. De terugkeer van Yahusha de Mashiach nadert. Zijn Woord zegt: "Mijn volk gaat te gronde bij gebrek aan kennis" (Hoshea 4:6). Dit project bestaat zodat dat niet langer het geval hoeft te zijn — zodat Zijn volk Zijn Naam kent, Zijn Woord begrijpt, en gereed staat.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            We live in a remarkable time. The signs of the Scriptures are unfolding. The return of Yahusha the Mashiach draws near. His Word says: "My people are destroyed for lack of knowledge" (Hoshea 4:6). This project exists so that need no longer be true — so that His people know His Name, understand His Word, and stand ready.
          </p>
        )}
      </section>

      {/* Spreading the word */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>🌐</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Het Woord verspreiden' : 'Spreading the Word'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Dit platform is gratis. Geen advertenties. Geen winst voor mensen. Wat hier gebouwd wordt, is gebouwd om te geven — aan families, gemeenschappen, kinderen die opgroeien met Zijn Naam op hun lippen. Als dit project ooit inkomsten genereert, gaat dat terug in het verspreiden van het Woord: meer talen, betere inhoud, meer bereik naar elke tong en natie.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            This platform is free. No ads. No profit for men. What is built here is built to give — to families, communities, children growing up with His Name on their lips. If this project ever generates revenue, it goes back into spreading the Word: more languages, better content, wider reach to every tongue and nation.
          </p>
        )}
      </section>

      {/* Work in progress */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '1.25rem', border: '1.5px dashed var(--th-gold)', background: 'var(--th-active-bg)' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>🚧</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Nog in opbouw' : 'Work in progress'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Dit platform is nog volop in ontwikkeling. Niet alle boeken zijn vertaald, sommige secties zijn nog onvolledig en er worden regelmatig verbeteringen doorgevoerd. Heb geduld met ons — en als je een fout ziet of iets mist, laat het ons weten. Elke bijdrage helpt het Woord verder te verspreiden.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            This platform is still actively being built. Not all books are translated yet, some sections are incomplete, and improvements are made regularly. Bear with us — and if you spot an error or something missing, let us know. Every contribution helps carry the Word further.
          </p>
        )}
      </section>

      {/* Get involved */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>🤝</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Help mee' : 'Get involved'}
        </h2>
        {isNl ? (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Spreek je een andere taal? Wil je helpen met vertalen, controleren of verbeteren? Dit project groeit door mensen die het Woord liefhebben. Als je wilt bijdragen — als vertaler, lezer of bemoediger — stuur ons een bericht. Samen bereiken we elke tong en natie.
          </p>
        ) : (
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: 0 }}>
            Do you speak another language? Would you like to help translate, review, or improve content? This project grows through people who love the Word. If you want to contribute — as a translator, reader, or encourager — send us a message. Together we reach every tongue and nation.
          </p>
        )}
      </section>

      {/* Contact */}
      <section className="theme-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1 }}>✉️</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1rem', marginTop: 0 }}>
          {isNl ? 'Contact' : 'Contact'}
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--th-text)', margin: '0 0 0.75rem' }}>
          {isNl ? 'Vragen, feedback of wil je meehelpen?' : 'Questions, feedback, or want to get involved?'}
        </p>
        <a href="mailto:yahuahscriptures@gmail.com"
          style={{ fontSize: '15px', color: 'var(--th-accent)', fontWeight: 600, textDecoration: 'none' }}>
          yahuahscriptures@gmail.com
        </a>
      </section>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '2rem' }}>
        <Link href={`/${locale}/read`} style={{ padding: '10px 24px', borderRadius: '999px', background: 'var(--th-accent)', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          {isNl ? 'Lees de Geschriften' : 'Read the Scriptures'}
        </Link>
        <Link href={`/${locale}/learn`} style={{ padding: '10px 24px', borderRadius: '999px', background: 'var(--th-card)', border: '1px solid var(--th-accent)', color: 'var(--th-accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          {isNl ? 'Begin met leren' : 'Start learning'}
        </Link>
      </div>
    </div>
  )
}
