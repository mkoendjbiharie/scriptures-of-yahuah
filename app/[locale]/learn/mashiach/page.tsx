import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function MashiachPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const sections = isNl ? [
    { heading: 'Wie is Yahusha?', body: 'Yahusha — wiens naam betekent "Yahuah redt" — is de beloofde Mashiach (Gezalfde) van de Hebreeuwse Geschriften. Hij is niet dezelfde als de "Jezus" die door veel kerken wordt gepredikt, want Zijn naam, Zijn identiteit als Hebreeuws sprekende Tora-leraar en Zijn trouw aan de geboden van Yahuah zijn altijd centraal geweest.' },
    { heading: 'Zijn naam hersteld', body: 'De naam "Jezus" is een latinisering van het Griekse Iesous, zelf een transliteratie van de Hebreeuwse naam Yahusha (of Yahushua). Zijn moeder sprak Hebreeuws — zij noemde Hem Yahusha. Die naam brengt de Naam van de Vader (Yahu-) direct in die van de Zoon: Yahuah is redding.' },
    { heading: 'Zijn leven en bediening', body: 'Yahusha werd geboren in Bethlehem van Yahudah, groeide op in Natsareth, en begon op zijn dertigste te prediken. Hij genas zieken, maakte ogen open en verkondigde het Koninkrijk van Yahuah — niet als een afschaffing van de Torah, maar als een vervulling ervan (MattithYahu 5:17). Zijn leerlingen kenden Hem als Rabbi, Profeet, en Mashiach.' },
    { heading: 'Zijn dood en opstanding', body: 'Op Pesach (Pascha) werd Yahusha overgeleverd, veroordeeld en gekruisigd. Op de derde dag stond Hij op uit de dood — precies zoals de Geschriften hadden voorzegd en precies op het moment van het feest van de Eerstelingen (Bikkorim). Zijn opstanding is het fundament van het geloof: als Hij opgestaan is, dan is de dood overwonnen.' },
    { heading: 'De Mensenzoon in Ḥanok', body: 'Eeuwen voor Yahusha sprak Ḥanok (Enoch) over een mysterieuze figuur: de "Mensenzoon" die op de troon van de heerlijkheid van Yahuah zou zitten en oordeel zou vellen over de koningen der aarde (Ḥanok 69:29). Dit boek was bekend bij Yahusha Zelf — die de titel "Mensenzoon" vaker gebruikte dan enige andere. Yahudah (Judas) 1:14 haalt Ḥanok 1:9 zelfs letterlijk aan als profetie van de wederkomst.' },
    { heading: "Zijn zalving als Mashiach", body: "Het woord 'Mashiach' betekent 'de Gezalfde'. Koningen en priesters werden gezalfd met olie als teken van hun roeping. Yahusha werd gezalfd door de Ruaḥ ha'Qodesh bij Zijn doop in de Yarden — de hemelen openden zich en een stem sprak: 'Dit is Mijn geliefde Zoon' (MattithYahu 3:17). Zo vervulde Hij het profetische patroon van priester én koning, zoals voorzegd in Tehillim 110:4 en Yeshayahu 61:1." },
    { heading: 'Zijn terugkeer', body: 'De Geschriften beloven dat Yahusha zal terugkeren — niet in verborgenheid, maar als Koning der koningen. Hij zal regeren vanuit Yerushalayim over het aardse Koninkrijk van Yahuah. Zijn terugkeer is de reden waarom dit werk dringend is: het volk van Yahuah moet gereed zijn, wetend Wie hij is en in welke tijd wij leven.' },
  ] : [
    { heading: 'Who is Yahusha?', body: 'Yahusha — whose name means "Yahuah saves" — is the promised Mashiach (Anointed One) of the Hebrew Scriptures. He is not the same as the "Jesus" preached by many churches, because His name, His identity as a Hebrew-speaking Torah teacher, and His faithfulness to the commandments of Yahuah have always been at the center.' },
    { heading: 'His Name Restored', body: "The name 'Jesus' is a Latinisation of the Greek Iesous, itself a transliteration of the Hebrew name Yahusha (or Yahushua). His mother spoke Hebrew — she called Him Yahusha. That name carries the Father's Name (Yahu-) directly into the Son's: Yahuah is salvation." },
    { heading: 'His Life and Ministry', body: 'Yahusha was born in Bethlehem of Yahudah, raised in Natsareth, and began preaching at age thirty. He healed the sick, opened blind eyes, and proclaimed the Kingdom of Yahuah — not as an abolishment of Torah, but as its fullness (MattithYahu 5:17). His disciples knew Him as Rabbi, Prophet, and Mashiach.' },
    { heading: 'His Death and Resurrection', body: 'At Pesach (Passover), Yahusha was betrayed, condemned, and executed. On the third day He rose from the dead — exactly as the Scriptures had foretold, and exactly at the time of the Feast of Firstfruits (Bikkorim). His resurrection is the foundation of faith: if He is risen, then death is conquered.' },
    { heading: "The Son of Man in Ḥanok (Enoch)", body: 'Centuries before Yahusha, Ḥanok (Enoch) spoke of a mysterious figure: the \u201cSon of Man\u201d who would sit on the throne of Yahuah\u2019s glory and execute judgment over the kings of the earth (Ḥanok 69:29). This book was known to Yahusha Himself \u2014 who used the title \u201cSon of Man\u201d more than any other. Yahudah (Jude) 1:14 quotes Ḥanok 1:9 directly as prophecy of the return.' },
    { heading: "His Anointing as Mashiach", body: "The word 'Mashiach' means 'the Anointed One'. Kings and priests were anointed with oil as a sign of their calling. Yahusha was anointed by the Ruaḥ ha'Qodesh at His immersion in the Yarden — the heavens opened and a voice spoke: 'This is My beloved Son' (MattithYahu 3:17). He thus fulfilled the prophetic pattern of priest and king together, as foretold in Tehillim 110:4 and Yeshayahu 61:1." },
    { heading: 'His Return', body: 'The Scriptures promise that Yahusha will return — not in secret, but as King of kings. He will reign from Yerushalayim over the earthly Kingdom of Yahuah. His return is the reason this work is urgent: the people of Yahuah must be ready, knowing Who He is and what time we live in.' },
  ]

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 2rem' }}>
        {isNl ? 'De Mashiach — Yahusha' : 'The Mashiach — Yahusha'}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map((s, i) => (
          <section key={i} className="theme-card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>{s.heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--th-text)', margin: 0 }}>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
