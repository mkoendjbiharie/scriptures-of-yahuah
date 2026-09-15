import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function TwoHousesPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const sections = isNl ? [
    {
      heading: "De twee huizen: Yisraʾeel en Yahudah",
      body: "Na de dood van Shlomo (Salomo) spleet het koninkrijk van Yisraʾeel in tweeën (1 Melakim 12). De noordelijke tien stammen werden bekend als het Huis van Yisraʾeel (ook Efrayim of Shomron genoemd), terwijl de twee zuidelijke stammen het Huis van Yahudah vormden. Dit is niet slechts oude geschiedenis — de Geschriften spreken uitvoerig over de hereniging van beide huizen aan het einde der tijden."
    },
    {
      heading: "De verdwijning van de tien stammen",
      body: "In 722 v.Chr. veroverde Assurië het noordelijke koninkrijk en voerde de tien stammen weg in ballingschap. Ze keerden nooit collectief terug. Yahuah verklaarde hen als Lo-Ammi (niet Mijn volk) — maar profeteerde ook een dag van herstel. De vraag 'waar zijn de tien stammen?' is een van de grote vragen van de Geschriften."
    },
    {
      heading: "De profetie van Yechezqel 37",
      body: "In Yechezqel 37 neemt de profeet twee staven en schrijft op de ene 'voor Yahudah' en op de andere 'voor Efrayim/Yisraʾeel'. Yahuah zegt: 'Zie, Ik neem de staf van Efrayim ... en Ik leg ze samen met de staf van Yahudah, en Ik maak er één staf van.' Dit is een concrete profetie over de hereniging van de twee huizen onder één Koning."
    },
    {
      heading: "Hoshea en de verloren schapen",
      body: "Hoshea profeteert rechtstreeks over het Huis van Yisraʾeel: zij zullen 'talrijk zijn als het zand van de zee' (Hoshea 1:10) en verspreid worden onder de volkeren. Yahusha zei: 'Ik ben alleen gezonden tot de verloren schapen van het huis van Yisraʾeel' (MattithYahu 15:24). Velen zien in de volkeren die tot het geloof komen een vervulling van de terugkeer van Efrayim."
    },
    {
      heading: "Wat betekent dit voor ons vandaag?",
      body: "Velen die opgegroeid zijn in de christelijke tradities voelen een diepe trek naar de Torah, de Hebreeuwse namen en de feesten van Yahuah. De leer van de twee huizen suggereert dat dit geen toeval is, maar dat zij kinderen van Yisraʾeel zijn die teruggeroepen worden. Of dit letterlijk of figuurlijk is, laat elke lezer voor zichzelf bepalen. De boodschap is helder: Yahuah vergeet Zijn volk niet."
    },
    {
      heading: "De hereniging in de Mashiach",
      body: "De uiteindelijke vervulling van de profetieën over de twee huizen is de Mashiach Yahusha. Door Hem worden zowel Yahudah als Efrayim — en alle volkeren die zich aanluiten — herenigd tot één volk onder één herder (Yechezqel 37:24-28). De muren van vijandschap worden afgebroken en Yahuah wordt de Elohim van Zijn herenigde volk voor altijd."
    },
  ] : [
    {
      heading: "The Two Houses: Yisraʾeel and Yahudah",
      body: "After the death of Shlomo (Solomon), the kingdom of Yisraʾeel split in two (1 Melakim 12). The northern ten tribes became known as the House of Yisraʾeel (also called Ephrayim or Shomron), while the two southern tribes formed the House of Yahudah. This is not merely ancient history — the Scriptures speak extensively about the reunion of both houses at the end of days."
    },
    {
      heading: "The Disappearance of the Ten Tribes",
      body: "In 722 BCE, Ashshur conquered the northern kingdom and carried the ten tribes away into exile. They never collectively returned. Yahuah declared them Lo-Ammi (not My people) — but also prophesied a day of restoration. The question 'where are the ten tribes?' is one of the great questions of Scripture."
    },
    {
      heading: "The Prophecy of Yechezqel 37",
      body: "In Yechezqel 37, the prophet takes two sticks and writes on one 'for Yahudah' and on the other 'for Ephrayim/Yisraʾeel.' Yahuah says: 'Behold, I will take the stick of Ephrayim ... and I will join them with the stick of Yahudah, and make them one stick.' This is a concrete prophecy about the reunion of the two houses under one King."
    },
    {
      heading: "Hoshea and the Lost Sheep",
      body: "Hoshea prophesies directly about the House of Yisraʾeel: they will be 'as the sand of the sea' in number (Hoshea 1:10) and scattered among the nations. Yahusha said: 'I was sent only to the lost sheep of the house of Yisraʾeel' (MattithYahu 15:24). Many see in the peoples coming to faith a fulfilment of Ephrayim's return."
    },
    {
      heading: "What does this mean for us today?",
      body: "Many who grew up in Christian traditions feel a deep pull toward the Torah, the Hebrew names, and the feasts of Yahuah. The teaching of the two houses suggests this is no coincidence — that they are children of Yisraʾeel being called back. Whether this is literal or figurative, each reader may determine for themselves. The message is clear: Yahuah does not forget His people."
    },
    {
      heading: "Reunion in the Mashiach",
      body: "The ultimate fulfilment of the two-houses prophecies is the Mashiach Yahusha. Through Him, both Yahudah and Ephrayim — and all peoples who join — are reunited as one people under one Shepherd (Yechezqel 37:24-28). The walls of hostility are torn down, and Yahuah becomes the Elohim of His reunited people forever."
    },
  ]

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 2rem' }}>
        {isNl ? "De Twee Huizen van Yisraʾeel" : "The Two Houses of Yisraʾeel"}
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
