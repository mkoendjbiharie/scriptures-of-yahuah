import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl ? 'Leren' : 'Learn',
    description: isNl
      ? 'Ontdek de diepe waarheden van de Geschriften — Hebreeuwse namen, de Shabbat, feesten, de Mashiach en meer.'
      : 'Discover the deep truths of Scripture — Hebrew names, the Shabbat, feasts, the Mashiach, and more.',
  }
}

import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'

export default async function LearnPage() {
  const locale = await getLocale() as 'en' | 'nl'
  const isNl = locale === 'nl'

  const supabase = await createClient()
  const [{ count: nameCount }, { count: placeCount }] = await Promise.all([
    supabase.from('people').select('*', { count: 'exact', head: true }),
    supabase.from('places').select('*', { count: 'exact', head: true }),
  ])

  const sections = [
    {
      href: `/${locale}/learn/names`,
      icon: '𐤉𐤄𐤅𐤄',
      iconClass: 'paleo-hebrew',
      title: isNl ? 'Hebreeuwse Namen' : 'Hebrew Names',
      desc: isNl
        ? 'De betekenis, oorsprong en verhalen achter de namen van personen in de Geschriften — van Aḏam tot Yahuchanan.'
        : 'The meaning, origin, and stories behind the names of people in Scripture — from Aḏam to Yahuchanan.',
      count: nameCount ? `${nameCount} ${isNl ? 'personen' : 'people'}` : isNl ? 'Namen' : 'Names',
      ready: true,
    },
    {
      href: `/${locale}/learn/cities`,
      icon: '🏛️',
      iconClass: '',
      title: isNl ? 'Steden & Plaatsen' : 'Cities & Places',
      desc: isNl
        ? 'Yerushalayim, Mitsrayim, Sinai en meer — de Hebreeuwse verhalen achter de heilige plaatsen van de Geschriften.'
        : 'Yerushalayim, Mitsrayim, Sinai and more — the Hebrew stories behind the sacred places of Scripture.',
      count: placeCount ? `${placeCount} ${isNl ? 'plaatsen' : 'places'}` : isNl ? 'Plaatsen' : 'Places',
      ready: true,
    },
    {
      href: `/${locale}/learn/name`,
      icon: '🔥',
      iconClass: '',
      title: isNl ? 'De Naam van Yahuah' : 'The Name of Yahuah',
      desc: isNl
        ? 'Waarom Zijn Naam werd verborgen, wat het betekent, en waarom het er toe doet.'
        : 'Why His Name was hidden, what it means, and why it matters.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/torah`,
      icon: '📜',
      iconClass: '',
      title: isNl ? 'De Torah' : 'The Torah',
      desc: isNl
        ? 'De vijf boeken van Mosheh — de grondslag van alle Geschriften.'
        : 'The five books of Mosheh — the foundation of all Scripture.',
      count: isNl ? '5 boeken' : '5 books',
      ready: true,
    },
    {
      href: `/${locale}/learn/ruach`,
      icon: '🕊️',
      iconClass: '',
      title: isNl ? "Ruaḥ ha'Qodesh" : "Ruaḥ ha'Qodesh",
      desc: isNl
        ? 'De Afgezonderde Geest — wie Hij is, Zijn werk, en Zijn gaven.'
        : 'The Set-Apart Spirit — who He is, His work, and His gifts.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/feasts`,
      icon: '🌿',
      iconClass: '',
      title: isNl ? 'Heilige Tijden' : 'The Feasts',
      desc: isNl
        ? 'De zeven feesten van Yahuah — profetische rehearsals van de verlossingsgeschiedenis.'
        : 'The seven feasts of Yahuah — prophetic rehearsals of the redemption story.',
      count: isNl ? '7 feesten' : '7 feasts',
      ready: true,
    },
    {
      href: `/${locale}/learn/mashiach`,
      icon: '🔑',
      iconClass: '',
      title: isNl ? 'De Mashiach' : 'The Mashiach',
      desc: isNl
        ? 'Wie is Yahusha? Zijn leven, zijn dood, zijn opstanding, en zijn terugkeer.'
        : 'Who is Yahusha? His life, death, resurrection, and return.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/commandments`,
      icon: '📿',
      iconClass: '',
      title: isNl ? 'De Geboden' : 'The Commandments',
      desc: isNl
        ? 'De geboden van de Torah — voor kinderen en volwassenen uitgelegd.'
        : 'The commandments of the Torah — explained for children and adults.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/calendar`,
      icon: '🌙',
      iconClass: '',
      title: isNl ? 'De Hebreeuwse Kalender' : 'The Hebrew Calendar',
      desc: isNl
        ? "De lunisolare kalender van Yahuah — de maanden, nieuwe maan, Shemitah en het Jubeljaar."
        : "Yahuah's lunisolar calendar — the months, new moon, Shemitah and the Jubilee year.",
      count: isNl ? '12 maanden + cycli' : '12 months + cycles',
      ready: true,
    },
    {
      href: `/${locale}/learn/shabbat`,
      icon: '🕯️',
      iconClass: '',
      title: isNl ? 'De Shabbat' : 'The Shabbat',
      desc: isNl
        ? 'De zevende dag — heilig bij de schepping, het vierde gebod, een eeuwig teken tussen Yahuah en Zijn volk.'
        : 'The seventh day — set apart at creation, the fourth commandment, an eternal sign between Yahuah and His people.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/foods`,
      icon: '🌿',
      iconClass: '',
      title: isNl ? 'Reine & Onreine Spijzen' : 'Clean & Unclean Foods',
      desc: isNl
        ? 'Wayyiqra 11 en Debarim 14 — welke dieren Yahuah als rein bestempelde en waarom het vandaag nog steeds van belang is.'
        : 'Wayyiqra 11 and Debarim 14 — which animals Yahuah declared clean and why it still matters today.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/two-houses`,
      icon: '🏡',
      iconClass: '',
      title: isNl ? 'De Twee Huizen van Yisraʾeel' : 'The Two Houses of Yisraʾeel',
      desc: isNl
        ? 'Het verdeelde koninkrijk, de tien verloren stammen, en de profetie van hun hereniging in de Mashiach.'
        : 'The divided kingdom, the ten lost tribes, and the prophecy of their reunion in the Mashiach.',
      count: isNl ? 'Lees meer →' : 'Read more →',
      ready: true,
    },
    {
      href: `/${locale}/learn/extra-canonical`,
      icon: '📚',
      iconClass: '',
      title: isNl ? 'Buiten-canonieke Geschriften' : 'Extra-Canonical Writings',
      desc: isNl
        ? 'Ḥanok, Yobelim, Yasher, Maccabiyim, Tobit, Yahudith, Sirach — boeken aangehaald door de apostelen, bewaard door de vroege gemeenschap.'
        : 'Ḥanok, Yobelim, Yasher, Maccabiyim, Tobit, Yahudith, Sirach — books quoted by the apostles, preserved by the early assembly.',
      count: isNl ? '17 geschriften' : '17 writings',
      ready: true,
    },
    {
      href: `/${locale}/learn/book-of-noah`,
      icon: '🌿',
      iconClass: '',
      title: isNl ? 'Het Boek van Noaḥ' : 'The Book of Noah',
      desc: isNl
        ? 'De verloren geschriften van Noaḥ over geneeskrachtige kruiden — onderwezen door engelen na de vloed en overgeleverd aan Shem. Bewaard in Yobelim 10 en Ḥanok.'
        : 'The lost writings of Noah on healing herbs — taught by angels after the flood and passed to Shem. Preserved in Jubilees 10 and Ḥanok.',
      count: isNl ? 'Yobelim 10 · Ḥanok 7-8' : 'Jubilees 10 · Ḥanok 7-8',
      ready: true,
    },
    {
      href: `/${locale}/learn/book-of-adam`,
      icon: '🌱',
      iconClass: '',
      title: isNl ? 'De Boeken van Aḏam en Ḥawwah' : 'The Books of Adam and Hawwah',
      desc: isNl
        ? 'Wat er werkelijk gebeurde na Eden — Satan vertelt waarom hij weigerde te buigen voor Aḏam. Bewaard in Ethiopisch, Grieks en Latijn.'
        : 'What really happened after Eden — Satan tells why he refused to bow to Aḏam. Preserved in Ethiopic, Greek, and Latin.',
      count: isNl ? '1 & 2 Aḏam · 120+ hoofdstukken' : '1 & 2 Aḏam · 120+ chapters',
      ready: true,
    },
    {
      href: `/${locale}/learn/testaments`,
      icon: '🏺',
      iconClass: '',
      title: isNl ? 'Testamenten van de 12 Aartsvaders' : 'Testaments of the 12 Patriarchs',
      desc: isNl
        ? "De stervende woorden van elk van de zonen van Ya'aqob — bekentenissen, levenslessen en profetieën over de Mashiach die in Yahusha in vervulling gingen."
        : "The dying words of each son of Ya'aqob — confessions, life lessons, and prophecies about the Mashiach fulfilled in Yahusha.",
      count: isNl ? '12 testamenten · Dode Zee-rollen' : '12 testaments · Dead Sea Scrolls',
      ready: true,
    },
    {
      href: `/${locale}/learn/tobiyah`,
      icon: '🐟',
      iconClass: '',
      title: isNl ? 'Het Boek van Toḇiyah' : 'The Book of Tobiyah',
      desc: isNl
        ? 'De engel Raphael reist in vermomming met Toḇiyah — geneest blindheid met visgal, verdrijft een demon met visvuur. Trouw aan Yahuah in de Assyrische ballingschap.'
        : 'The angel Raphael travels in disguise with Toḇiyah — heals blindness with fish gall, drives away a demon with fish smoke. Faithfulness to Yahuah in Assyrian exile.',
      count: isNl ? 'Dode Zee-rollen · 4Q196-200' : 'Dead Sea Scrolls · 4Q196-200',
      ready: true,
    },
    {
      href: `/${locale}/learn/nations`,
      icon: '🌍',
      iconClass: '',
      title: isNl ? 'Volken der Aarde' : 'Nations of the Earth',
      desc: isNl
        ? 'De 70 volken van Bereshit 10 — van Magog tot Mitsrayim — teruggevoerd naar moderne naties via Josephus, Yobelim en Yashar.'
        : 'The 70 nations of Bereshit 10 — from Magog to Mitsrayim — traced to modern peoples via Josephus, Jubilees and Jashar.',
      count: isNl ? 'Bereshit 10 · Josephus 1.6' : 'Bereshit 10 · Josephus 1.6',
      ready: true,
    },
    {
      href: `/${locale}/learn/dispersion`,
      icon: '⛵',
      iconClass: '',
      title: isNl ? 'De Grote Verstrooiing' : 'The Great Dispersion',
      desc: isNl
        ? "Waar zijn de 12 stammen van Yisra'ĕl vandaag? Profetische aanwijzingen, de Trans-Atlantische slavenhandel, Debarim 28, Afrika, de Amerika's en Azië."
        : "Where are the 12 tribes of Yisra'ĕl today? Prophetic clues, the Trans-Atlantic slave trade, Debarim 28, Africa, the Americas and Asia.",
      count: isNl ? "Debarim 28 · Yesha'yahu 11 · 2 Esdras 13" : "Debarim 28 · Isaiah 11 · 2 Esdras 13",
      ready: true,
    },
    {
      href: `/${locale}/learn/prayers`,
      icon: '🙏',
      iconClass: '',
      title: isNl ? 'Gebeden in de Geschriften' : 'Prayers of Scripture',
      desc: isNl
        ? "Van Mosheh's voorbede tot Yahusha's hogepriesterlijk gebed — de grote gebeden die de Geschriften bewaard hebben."
        : "From Mosheh's intercession to Yahusha's high priestly prayer — the great prayers preserved in Scripture.",
      count: isNl ? '13 gebeden' : '13 prayers',
      ready: true,
    },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem' }}>
        {isNl ? 'Leren' : 'Learn'}
      </h1>
      <p style={{ color: 'var(--th-muted)', marginBottom: '2rem', fontSize: '14px' }}>
        {isNl
          ? 'Ontdek de diepe waarheden van de Geschriften — voor alle leeftijden, in eenvoudige taal.'
          : 'Discover the deep truths of Scripture — for all ages, in plain language.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {sections.map((s, i) => (
          <Link key={i} href={s.href} className="theme-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: '1.25rem', gap: '0.5rem' }}>
            <div style={{ fontSize: '1.75rem' }} className={s.iconClass}>{s.icon}</div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--th-gold)' }}>{s.title}</div>
            <p style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.55, margin: 0, flex: 1 }}>{s.desc}</p>
            <div style={{ fontSize: '11px', color: 'var(--th-accent)', fontWeight: 600 }}>{s.count}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
