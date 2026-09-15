'use client'

import BackButton from '@/components/ui/BackButton'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import RichText from '@/components/scripture/RichText'

const DATES: Record<number, Record<string, string>> = {
  2025: {
    pesach:       'Apr 12-13',
    matzot:       'Apr 13-19',
    bikkorim:     'Apr 20',
    shavuot:      'Jun 1-2',
    yom_teruah:   'Sep 22-23',
    yom_kippur:   'Oct 1-2',
    sukkot:       'Oct 6-13',
    shemini:      'Oct 14',
  },
  2026: {
    pesach:       'Apr 1-2',
    matzot:       'Apr 2-8',
    bikkorim:     'Apr 5',
    shavuot:      'May 21-22',
    yom_teruah:   'Sep 11-12',
    yom_kippur:   'Sep 20-21',
    sukkot:       'Sep 25 - Oct 2',
    shemini:      'Oct 2-3',
  },
  2027: {
    pesach:       'Mar 21-22',
    matzot:       'Mar 22-28',
    bikkorim:     'Mar 28',
    shavuot:      'May 10-11',
    yom_teruah:   'Oct 1-2',
    yom_kippur:   'Oct 10-11',
    sukkot:       'Oct 15-22',
    shemini:      'Oct 22-23',
  },
}

function getDate(key: string): string {
  const year = new Date().getFullYear()
  return DATES[year]?.[key] ?? DATES[2026][key] ?? '-'
}

function DateBadge({ dateKey, hebrewDate }: { dateKey: string; hebrewDate: string }) {
  const [show, setShow] = useState(false)
  const gregorian = getDate(dateKey)
  const year = new Date().getFullYear()

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <span style={{
        fontSize: '11px',
        color: 'var(--th-gold)',
        fontWeight: 600,
        borderBottom: '1px dashed var(--th-gold)',
        cursor: 'help',
        letterSpacing: '0.04em',
      }}>
        {hebrewDate}
      </span>
      {show && (
        <span style={{
          position: 'absolute',
          bottom: '120%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--th-card)',
          border: '1px solid var(--th-gold)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          color: 'var(--th-text)',
          fontWeight: 600,
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}>
          {gregorian} {year}
          <span style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid var(--th-gold)',
          }} />
        </span>
      )}
    </span>
  )
}

type Feast = {
  key: string
  name: string
  icon: string
  hebrewDate: string
  duration: string
  scripture: string
  what: string
  how: string[]
  prophetic: string
}

export default function FeastsPage() {
  const locale = useLocale()
  const isNl = locale === 'nl'
  const [open, setOpen] = useState<number | null>(null)

  type FeastData = {
    key: string; name: string; icon: string; hebrewDate: string;
    duration: string; scripture: string; what: string; how: string[]; prophetic: string;
  }

  const feasts: FeastData[] = isNl ? [
    {
      key: 'pesach', name: 'Pesach', icon: '𐤐𐤎𐤇',
      hebrewDate: '14 Aviv', duration: '1 dag',
      scripture: 'Shemoth 12; Wayyiqra 23:5',
      what: "Pesach herdenkt de nacht waarop Yahuah Yisra'el verloste uit slavernij in Mitsrayim. Het bloed van het lam beschermde de eerstgeborenen.",
      how: ['Verwijder alle zuurdesem uit het huis voor de 14e', 'Slacht een lam bij de avondschemering op de 14e van Aviv', 'Bestrijk de deurposten met het bloed', 'Eet het lam geroosterd met bittere kruiden en ongezuurd brood', 'Eet staande, aangekleed, in haast', 'Verbrand wat overblijft', "Vertel uw kinderen wat Yahuah deed voor Yisra'el"],
      prophetic: 'Yahusha de Mashiach werd op de 14e Aviv gekruisigd als het ware Lam van Yahuah (Yahuchanan 1:29). Zijn bloed beschermt wie gelooft.',
    },
    {
      key: 'matzot', name: 'Chag HaMatzot', icon: '\U0001091c\U0001091d𐤅𐤄',
      hebrewDate: '15-21 Aviv', duration: '7 dagen',
      scripture: 'Shemoth 12:15-20; Wayyiqra 23:6-8',
      what: 'Het feest van de Ongezuurde Broden begint direct na Pesach. Zuurdesem is een beeld van de zonde - het wegdoen ervan is een oproep tot heiligheid.',
      how: ['Eet zeven dagen lang geen zuurdesem', 'Eet ongezuurd brood (matzah) de hele week', 'Dag 15 en dag 21 Aviv zijn heilige samenkomsten - geen gewone arbeid', 'Laat de week een tijd van zelfreflectie zijn'],
      prophetic: "Sha'ul schrijft: 'Veeg de oude zuurdesem weg... want ook ons Pesach, de Mashiach, is geslacht' (1 Qorintiyim 5:7). De zeven dagen staan voor een leven in reinheid na de verlossing.",
    },
    {
      key: 'bikkorim', name: 'Bikkorim', icon: '𐤂𐤐𐤅𐤓𐤉\U0001091c',
      hebrewDate: '16 Aviv (dag na Shabbat)', duration: '1 dag',
      scripture: 'Wayyiqra 23:9-14',
      what: 'Eerstelingen - de eerste schoof van de gerstoogst wordt geofferd aan Yahuah. Het is een erkenning dat alles van Yahuah komt.',
      how: ['Breng de eerste schoof van de gerstoogst naar de kohein', 'De kohein wuift de schoof voor het aangezicht van Yahuah', 'Voeg een broodsoffer, brandoffer en drankoffer toe', 'Begin de Omer te tellen - 50 dagen tot Shavuot'],
      prophetic: "Yahusha stond op uit de dood op Bikkorim. Sha'ul bevestigt: 'Yahusha is de eersteling van wie ontslapen zijn' (1 Qorintiyim 15:20).",
    },
    {
      key: 'shavuot', name: 'Shavuot', icon: '𐤘𐤂𐤅𐤒𐤄',
      hebrewDate: '50 dagen na Bikkorim', duration: '1 dag',
      scripture: 'Wayyiqra 23:15-22; Debarim 16:9-12',
      what: 'Het Wekenfeest valt 50 dagen na Bikkorim. Het herdenkt de gave van de Torah op de berg Sinai.',
      how: ['Tel zeven volledige weken na Bikkorim', 'Heilige samenkomst - geen gewone arbeid', 'Breng twee gezuurde broden als golfoffer', 'Laat de randen van uw veld staan voor de arme (Wayyiqra 23:22)', 'Lees het boek Ruth'],
      prophetic: "Op Shavuot werd de Ruach haQodesh uitgestort in Yerushalayim (Ma'asei 2). De Torah werd in harten van vlees geschreven - zoals Yirmeyahu 31:33 voorzei.",
    },
    {
      key: 'yom_teruah', name: 'Yom Teruah', icon: '𐤉𐤅\U0001091c',
      hebrewDate: '1 Ethanim', duration: '1 dag',
      scripture: 'Wayyiqra 23:23-25; Bemidbar 29:1-6',
      what: 'De Dag van het Bazuingeschal opent de zevende maand. Een koninklijke aankondiging, een oproep tot berouw.',
      how: ['Heilige samenkomst - geen gewone arbeid', 'Blaas de shofar 100 keer: Tekiah, Shevarim, Teruah', 'Begin tien dagen van diep berouw (de Yamim Noraim)', 'Denk na: ben ik opgeschreven in het Boek des Levens?'],
      prophetic: "Yom Teruah wijst op de opstanding en verzameling van de uitverkorenen. Het 'laatste bazuingeluid' van 1 Qorintiyim 15:52 vindt hier zijn aardse schaduw.",
    },
    {
      key: 'yom_kippur', name: 'Yom Kippur', icon: '𐤉𐤅\U0001091c',
      hebrewDate: '10 Ethanim', duration: '1 dag (vasten)',
      scripture: 'Wayyiqra 16; 23:26-32',
      what: 'De Dag der Verzoening is de heiligste dag van het jaar. De hogepriester betrad het Allerheiligste om verzoening te doen voor heel het volk.',
      how: ['Vast volledig van avond tot avond - geen eten, geen drinken (25 uur)', 'Onthoud u van baden, zalven, sandalen en echtelijke omgang', 'Strikt geen arbeid', 'Heilige samenkomst van avond tot avond', 'Belijdt zonden openlijk voor Yahuah', 'De twee geiten: een voor Yahuah, de ander (Azazel) de woestijn in'],
      prophetic: 'Yom Kippur is nog niet vervuld. Het wijst op de grote Dag des Oordeels bij de terugkeer van Yahusha.',
    },
    {
      key: 'sukkot', name: 'Sukkot', icon: '𐤘𐤐𐤅𐤄',
      hebrewDate: '15-21 Ethanim + Shemini Atseret (22)', duration: '7 + 1 dagen',
      scripture: 'Wayyiqra 23:33-44; Debarim 16:13-17',
      what: 'Het Loofhuttenfeest - zeven dagen in tijdelijke hutten ter herinnering aan de woestijntrek. Het meest vreugdevolle feest.',
      how: ['Bouw een sukkah met een dak van takken - u moet de sterren kunnen zien', 'Woon zeven dagen in de sukkah', 'Neem de vier soorten: etrog, lulav, mirte en wilg', 'Dag 15 en dag 22 (Shemini Atseret) zijn heilige samenkomsten', 'Grote vreugde - zing, dans, prijs Yahuah', 'Lees de Torah elk zevende jaar voor heel het volk (Debarim 31:10)'],
      prophetic: 'Sukkot wijst op het Millennium - de heerschappij van Yahusha wanneer Yahuah bij Zijn volk zal wonen (Yechezqel 37:27). Zacharyah 14: alle volkeren zullen dan Sukkot vieren in Yerushalayim.',
    },
  ] : [
    {
      key: 'pesach', name: 'Pesach', icon: '𐤐𐤎𐤇',
      hebrewDate: '14 Aviv', duration: '1 day',
      scripture: 'Shemoth 12; Wayyiqra 23:5',
      what: "Passover (Pesach) is the memorial of the night Yahuah delivered Yisra'el from slavery in Mitsrayim. The blood of the lamb on the doorposts protected the firstborn.",
      how: ['Remove all leaven (chametz) from your home before the 14th', 'Slaughter a lamb at twilight on the 14th of Aviv', 'Apply the blood to the doorposts and lintel', 'Eat the lamb roasted with bitter herbs and unleavened bread', 'Eat standing, dressed, with your staff in hand - in haste', 'Burn what remains before morning', "Tell your children what Yahuah did for Yisra'el"],
      prophetic: 'Yahusha the Mashiach was impaled on the 14th of Aviv as the true Lamb of Yahuah (Yahuchanan 1:29). His blood covers all who believe.',
    },
    {
      key: 'matzot', name: 'Chag HaMatzot', icon: '\U0001091c\U0001091d𐤅𐤄',
      hebrewDate: '15-21 Aviv', duration: '7 days',
      scripture: 'Shemoth 12:15-20; Wayyiqra 23:6-8',
      what: 'The Feast of Unleavened Bread begins immediately after Pesach. Leaven is a picture of sin - removing it is a call to holiness.',
      how: ['Eat no leaven (chametz) for seven days', 'Eat unleavened bread (matzah) throughout the entire week', 'The first day (15 Aviv) and seventh day (21 Aviv) are set-apart assemblies - no ordinary work', 'Let the week be a time of self-examination: what needs to be removed from your life?'],
      prophetic: "Sha'ul writes: 'Clean out the old leaven... for also our Pesach, the Mashiach, was slaughtered for us' (1 Qorintiyim 5:7). The seven days picture a life of purity after deliverance.",
    },
    {
      key: 'bikkorim', name: 'Bikkorim', icon: '𐤂𐤐𐤅𐤓𐤉\U0001091c',
      hebrewDate: '16 Aviv (day after Sabbath)', duration: '1 day',
      scripture: 'Wayyiqra 23:9-14',
      what: 'Firstfruits - the first sheaf of the barley harvest is waved before Yahuah. It is an acknowledgement that all comes from Yahuah.',
      how: ['Bring the very first sheaf of the barley harvest to the kohein', 'The kohein waves the sheaf before the face of Yahuah', 'Add a grain offering, a burnt offering, and a drink offering', 'Begin counting the Omer - 50 days leading to Shavuot'],
      prophetic: "Yahusha rose from the dead on Bikkorim - the Day of Firstfruits. Sha'ul confirms: 'Yahusha has been raised from the dead, the firstfruits of those who have fallen asleep' (1 Qorintiyim 15:20).",
    },
    {
      key: 'shavuot', name: 'Shavuot', icon: '𐤘𐤂𐤅𐤒𐤄',
      hebrewDate: '50 days after Bikkorim', duration: '1 day',
      scripture: 'Wayyiqra 23:15-22; Debarim 16:9-12',
      what: 'The Feast of Weeks (Pentecost) falls 50 days after Bikkorim. It commemorates the giving of the Torah at Mount Sinai.',
      how: ['Count seven complete weeks from Bikkorim - the 50th day is Shavuot', 'Set-apart assembly - no ordinary work', 'Bring two loaves of leavened bread as a wave offering', 'Leave the edges of your field for the poor and the stranger (Wayyiqra 23:22)', 'Read the book of Ruth - a story of faithfulness and covenant loyalty'],
      prophetic: "On Shavuot the Ruach haQodesh was poured out in Yerushalayim (Ma'asei 2). On the very day the Torah was once written in stone, it was now written on hearts of flesh - just as Yirmeyahu 31:33 foretold.",
    },
    {
      key: 'yom_teruah', name: 'Yom Teruah', icon: '𐤉𐤅\U0001091c',
      hebrewDate: '1 Ethanim', duration: '1 day',
      scripture: 'Wayyiqra 23:23-25; Bemidbar 29:1-6',
      what: 'The Day of Trumpets opens the seventh month. It is a royal announcement, a call to repentance, and the beginning of ten days of awe.',
      how: ['Set-apart assembly - no ordinary work', "Blow the shofar (ram's horn) - traditionally 100 blasts: Tekiah, Shevarim, Teruah", 'Begin ten days of deep repentance (the Yamim Noraim, Days of Awe)', 'Reflect: Am I written in the Book of Life?'],
      prophetic: "Yom Teruah points to the resurrection and the gathering of the elect. The 'last trumpet' of 1 Qorintiyim 15:52 and the shofar of MattithYahu 24:31 find their earthly shadow here.",
    },
    {
      key: 'yom_kippur', name: 'Yom Kippur', icon: '𐤉𐤅\U0001091c',
      hebrewDate: '10 Ethanim', duration: '1 day (fast)',
      scripture: 'Wayyiqra 16; 23:26-32',
      what: 'The Day of Atonement is the most set-apart day of the year. Once a year the high priest entered the Most Set-Apart Place to make atonement for all the people.',
      how: ['Fast completely from evening to evening - no food, no water (25 hours)', 'Afflict your soul - abstain from bathing, anointing, sandals, and marital relations', 'Absolutely no work', 'Set-apart assembly from evening to evening', 'Confess your sins openly before Yahuah', 'The two goats: one for Yahuah, the other (Azazel) carried sins into the wilderness'],
      prophetic: 'Yom Kippur is not yet fulfilled. It points to the great Day of Judgment and the final atonement at the return of Yahusha.',
    },
    {
      key: 'sukkot', name: 'Sukkot', icon: '𐤘𐤐𐤅𐤄',
      hebrewDate: '15-21 Ethanim + Shemini Atseret (22)', duration: '7 + 1 days',
      scripture: 'Wayyiqra 23:33-44; Debarim 16:13-17',
      what: 'The Feast of Tabernacles - seven days dwelling in temporary booths in remembrance of the wilderness journey. It is the most joyful feast.',
      how: ['Build a sukkah (booth) with a roof of branches - you must be able to see the stars through it', 'Dwell in the sukkah for seven days', 'Take the four species: etrog, lulav (palm branch), myrtle, and willow', 'First day (15) and eighth day (22, Shemini Atseret) are set-apart assemblies', 'Great rejoicing - sing, dance, and praise Yahuah', 'Read the Torah every seventh year during Sukkot before all the people (Debarim 31:10)'],
      prophetic: 'Sukkot points to the Millennium - the thousand-year reign of Yahusha on earth when Yahuah will dwell with His people (Yechezqel 37:27). Zacharyah 14 says all nations will come up to Yerushalayim to keep Sukkot.',
    },
  ]

  return (
    <div style={{ maxWidth: '44rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 0.4rem' }}>
        {isNl ? 'De Heilige Tijden van Yahuah' : 'The Appointed Times of Yahuah'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', marginBottom: '0.5rem' }}>
        {isNl
          ? "De zeven Moadim zijn niet de feestdagen van de wereld - het zijn de afspraken van Yahuah met Zijn volk (Wayyiqra 23:2)."
          : "The seven Moadim are not the world's holidays - they are Yahuah's appointments with His people, forever (Wayyiqra 23:2)."}
      </p>
      <p style={{ color: 'var(--th-muted)', fontSize: '12px', marginBottom: '2rem', fontStyle: 'italic' }}>
        {isNl ? 'Beweeg over de datum om de gregoriaanse datum te zien.' : 'Hover over the date to see the Gregorian equivalent.'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {feasts.map((f, i) => (
          <div key={i} className="theme-card" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.25rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span className="paleo-hebrew" style={{ fontSize: '1.5rem', color: 'var(--th-gold)', minWidth: '2.5rem', textAlign: 'center' }}>
                {f.icon}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--th-text)', display: 'block' }}>
                  {f.name}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--th-muted)' }}>
                  {f.duration} · <DateBadge dateKey={f.key} hebrewDate={f.hebrewDate} />
                </span>
              </span>
              <span style={{ color: 'var(--th-gold)', fontSize: '18px', lineHeight: 1 }}>
                {open === i ? '-' : '+'}
              </span>
            </button>

            {open === i && (
              <div style={{ padding: '0 1.25rem 1.5rem', borderTop: '1px solid var(--th-border)' }}>
                <p style={{ fontSize: '11px', color: 'var(--th-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '1rem 0 0.5rem' }}>
                  {f.scripture}
                </p>
                <RichText text={f.what} locale={locale} as="p" style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--th-text)', marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                  {isNl ? 'Hoe te vieren' : 'How to observe'}
                </h3>
                <ul style={{ paddingLeft: '1.25rem', margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {f.how.map((step, j) => (
                    <li key={j} style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--th-text)' }}>
                      <RichText text={step} locale={locale} />
                    </li>
                  ))}
                </ul>
                <div style={{ borderLeft: '3px solid var(--th-gold)', paddingLeft: '1rem', marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--th-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    {isNl ? 'Profetische betekenis' : 'Prophetic meaning'}
                  </p>
                  <RichText text={f.prophetic} locale={locale} as="p" style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--th-text)', margin: 0, fontStyle: 'italic' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p style={{ fontSize: '11px', color: 'var(--th-muted)', marginTop: '2rem', fontStyle: 'italic', textAlign: 'center' }}>
        {isNl ? "Exacte data afhankelijk van nieuwe-maanwaarneming en gerst in Yisra'el." : "Exact dates may vary depending on new moon sighting and barley in Yisra'el."}
      </p>
    </div>
  )
}
