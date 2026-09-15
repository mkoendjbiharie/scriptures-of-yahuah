import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function ShabbatPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const sections = isNl ? [
    {
      heading: 'Wat is de Shabbat?',
      body: 'De Shabbat is de zevende dag van de week — van zonsondergang op vrijdag tot zonsondergang op zaterdag. Yahuah heiligde deze dag bij de schepping (Bereshit 2:2-3) en beval Zijn volk haar te gedenken als het vierde gebod (Shemoth 20:8-11). De Shabbat is geen joodse uitvinding, maar een eeuwig teken tussen Yahuah en Zijn volk.'
    },
    {
      heading: 'Ingesteld bij de schepping',
      body: "In Bereshit 2 rustte Yahuah op de zevende dag, zegende haar en heiligde haar. Dit is vóór de Sinai, vóór Yisraʼel, vóór de Torah werd gegeven op stenen tafelen. De Shabbat is ingebakken in de structuur van de schepping zelf — een wekelijks ritme dat Yahuah voor de hele mensheid bestemde."
    },
    {
      heading: 'Het vierde gebod',
      body: '“Gedenk de Shabbatdag om hem te heiligen. Zes dagen zult u arbeiden en al uw werk doen, maar de zevende dag is de Shabbat van 𐤉𐤄𐤅𐤄 uw Elohim.” (Shemoth 20:8–10). Dit is geen advies maar een gebod — gelijkwaardig aan “gij zult niet stelen” of “gij zult niet doden”. Yahusha hield de Shabbat. De apostelen hielden de Shabbat. De hervorming naar de zondag is een latere menselijke instelling.'
    },
    {
      heading: 'Wat betekent rusten?',
      body: 'Op de Shabbat leggen we ons dagelijks werk neer: geen handel, geen bouw, geen reguliere arbeid. Maar het is geen dag van leegte — het is een dag van samenkomen, leren, bidden, zingen, eten en genieten van de aanwezigheid van Yahuah en Zijn mensen. In de Tenach verzamelt het volk zich op de Shabbat om de Torah te horen (Wayyiqra 23:3).'
    },
    {
      heading: 'Een eeuwig teken',
      body: 'Shemoth 31:13 noemt de Shabbat een “teken voor altoos” tussen Yahuah en Zijn volk, “zodat jullie weten dat Ik Yahuah ben die jullie heiligt.” Yechezqel 20 berispt Yisraʼel meerdere keren juist omdat zij de Shabbat verontreinigden. De Shabbat bewaren is geen last, maar een voorrecht — een wekelijkse ontmoeting met de Schepper van hemel en aarde.'
    },
    {
      heading: 'Yahusha en de Shabbat',
      body: 'Yahusha hield de Shabbat en leerde erin de synagoge. Hij botste niet met de Shabbat zelf, maar met de door mensen toegevoegde regels eromheen. “De Shabbat is gemaakt voor de mens,” zei Hij, “niet de mens voor de Shabbat” (Markus 2:27). Als Meester van de Shabbat toonde Hij de ware bedoeling: herstel, genezing, en vreugde in Yahuah.'
    },
    {
      heading: 'De Shabbat in Yobelim',
      body: 'Het boek Yobelim (bewaard in de Dode Zee-rollen) bevestigt dat de Shabbat werd ingesteld in de hemel zelf — nog voor de schepping van de aarde. "Op de zevende dag van de eerste week rustte Yahuah... en deze dag heiligde Hij voor altoos als een dag van heiligheid en zegen." (Yobelim 2:17). Yobelim verbiedt alle handel, reizen en arbeid op de Shabbat en noemt het overtreden ervan een ernstige zonde. Dit sluit nauw aan bij Shemoth 31:14: "Wie haar ontheiligt, zal voorzeker gedood worden."'
    }
  ] : [
    {
      heading: 'What is the Shabbat?',
      body: 'The Shabbat is the seventh day of the week — from sunset on Friday to sunset on Saturday. Yahuah set this day apart at creation (Bereshit 2:2-3) and commanded His people to remember it as the fourth commandment (Shemoth 20:8-11). The Shabbat is not a Jewish invention but an eternal sign between Yahuah and His people.'
    },
    {
      heading: 'Established at Creation',
      body: 'In Bereshit 2, Yahuah rested on the seventh day, blessed it, and set it apart. This is before Sinai, before Yisraʼel, before the Torah was given on stone tablets. The Shabbat is woven into the structure of creation itself — a weekly rhythm Yahuah appointed for all mankind.'
    },
    {
      heading: 'The Fourth Commandment',
      body: '“Remember the Shabbat day, to keep it set-apart. Six days you shall labour and do all your work, but the seventh day is the Shabbat of 𐤉𐤄𐤅𐤄 your Elohim.” (Shemoth 20:8–10). This is not advice but a command — equal to “you shall not steal” or “you shall not murder.” Yahusha kept the Shabbat. The apostles kept the Shabbat. The shift to Sunday is a later human institution.'
    },
    {
      heading: 'What does resting mean?',
      body: 'On the Shabbat we lay down our daily work: no commerce, no building, no regular labour. But it is not a day of emptiness — it is a day of gathering, learning, praying, singing, eating, and enjoying the presence of Yahuah and His people. In the Tenach the assembly gathers on the Shabbat to hear the Torah (Wayyiqra 23:3).'
    },
    {
      heading: 'An Eternal Sign',
      body: 'Shemoth 31:13 calls the Shabbat an “eternal sign” between Yahuah and His people, “so that you know that I am Yahuah who sets you apart.” Yechezqel 20 rebukes Yisraʼel repeatedly for profaning the Shabbat. Keeping the Shabbat is not a burden but a privilege — a weekly appointment with the Creator of heaven and earth.'
    },
    {
      heading: 'Yahusha and the Shabbat',
      body: 'Yahusha kept the Shabbat and taught in the synagogue on it. He did not conflict with the Shabbat itself, but with man-made additions to it. “The Shabbat was made for man,” He said, “not man for the Shabbat” (Mark 2:27). As Master of the Shabbat He showed its true purpose: restoration, healing, and joy in Yahuah.'
    },
    {
      heading: 'The Shabbat in Yobelim (Jubilees)',
      body: 'The book of Yobelim (preserved in the Dead Sea Scrolls) confirms that the Shabbat was established in heaven itself — before the creation of the earth. "On the seventh day of the first week Yahuah rested... and He sanctified it for ever as a day of holiness and blessing." (Yobelim 2:17). Yobelim forbids all commerce, travel, and labour on the Shabbat, and counts violating it as a grave sin. This aligns closely with Shemoth 31:14: "Whoever profanes it shall surely be put to death."'
    }
  ]

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 2rem' }}>
        {isNl ? 'De Shabbat' : 'The Shabbat'}
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
