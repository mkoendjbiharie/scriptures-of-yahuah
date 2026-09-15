import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl ? 'Volken der Aarde' : 'Nations of the Earth',
    description: isNl
      ? 'De 70 volken van Bereshit 10 teruggevoerd naar moderne naties — Josephus, Yobelim, Yashar.'
      : 'The 70 nations of Bereshit 10 traced to modern peoples — Josephus, Jubilees, Jashar.',
  }
}

type Conf = 'confirmed' | 'high' | 'good' | 'speculative'

const CONF: Record<Conf, { en: string; nl: string; color: string; bg: string }> = {
  confirmed:   { en: 'Confirmed',   nl: 'Bevestigd',   color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  high:        { en: 'High',        nl: 'Hoog',        color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  good:        { en: 'Good',        nl: 'Goed',        color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  speculative: { en: 'Speculative', nl: 'Speculatief', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
}

type N = {
  name: string
  ancient_en: string; ancient_nl: string
  modern_en: string;  modern_nl: string
  conf: Conf
  source: string
  note_en?: string; note_nl?: string
  sons?: N[]
}

// ── SONS OF YAPHETH ─────────────────────────────────────────
const YAPHETH: N[] = [
  {
    name: 'Gomer',
    ancient_en: 'Cimmerians / Galatians',
    ancient_nl: 'Cimmeriërs / Galaten',
    modern_en: 'Germanic, French and Celtic peoples',
    modern_nl: 'Germaanse, Franse en Keltische volken',
    conf: 'high',
    source: 'Josephus 1.6.1; Yobelim 9:7',
    sons: [
      {
        name: 'Ashkenaz',
        ancient_en: 'Scythians',
        ancient_nl: 'Scythen',
        modern_en: 'Germanic peoples — later Ashkenazi Jews named themselves after this as their word for Germany',
        modern_nl: 'Germaanse volken — later noemden Ashkenazische Joden zichzelf hiernaar als hun woord voor Duitsland',
        conf: 'high',
        source: 'Josephus 1.6.1',
      },
      {
        name: 'Riphath',
        ancient_en: 'Paphlagonians',
        ancient_nl: 'Paflagoniërs',
        modern_en: 'Northern coast of Turkey (ancient Paphlagonia)',
        modern_nl: 'Noordkust van Turkije (oud Paflagonia)',
        conf: 'high',
        source: 'Josephus 1.6.1',
      },
      {
        name: 'Togarmah',
        ancient_en: 'Phrygians / Armenians',
        ancient_nl: 'Frigiërs / Armeniërs',
        modern_en: 'Armenia and Turkey; Turkic peoples and Armenians both trace ancestry here',
        modern_nl: 'Armenië en Turkije; Turkse volken en Armeniërs leiden beiden hun afkomst van hem af',
        conf: 'high',
        source: 'Josephus 1.6.1; Yeḥezqel 38:6; Armenian tradition',
      },
    ],
  },
  {
    name: 'Magog',
    ancient_en: 'Scythians — steppe nomads north of the Black Sea',
    ancient_nl: 'Scythen — steppenomaden ten noorden van de Zwarte Zee',
    modern_en: 'Russia, Ukraine and the Central Asian steppes; Yeḥezqel 38–39 places Magog in the far north',
    modern_nl: 'Rusland, Oekraïne en de Centraal-Aziatische steppen; Yeḥezqel 38–39 plaatst Magog in het verre noorden',
    conf: 'high',
    source: 'Josephus 1.6.1; Yeḥezqel 38:2',
    note_en: 'Prophetically, Gog of Magog leads a great northern coalition against Yisra'el in the last days (Yeḥezqel 38–39). The Scythians who Josephus identifies were the dominant northern steppe people of his era.',
    note_nl: 'Profetisch gezien leidt Gog van Magog een grote noordelijke coalitie tegen Yisra'el in de laatste dagen (Yeḥezqel 38–39). De Scythen die Josephus identificeert, waren het dominante noordelijke steppenvolkvan zijn tijd.',
  },
  {
    name: 'Madai',
    ancient_en: 'Medes — founders of the Median Empire',
    ancient_nl: 'Meden — stichters van het Medisch Rijk',
    modern_en: 'Iran (the Medes merged with the Persians under Cyrus the Great)',
    modern_nl: 'Iran (de Meden smolten samen met de Perzen onder Cyrus de Grote)',
    conf: 'confirmed',
    source: 'Josephus 1.6.1; Dani'el 5:28; Ezra 6:2',
  },
  {
    name: 'Yavan (Javan)',
    ancient_en: 'Ionians / Greeks',
    ancient_nl: 'Joniërs / Grieken',
    modern_en: 'Greece — Hebrew still calls Greece "Yavan" to this day',
    modern_nl: 'Griekenland — Hebreeuws noemt Griekenland nog steeds "Yavan"',
    conf: 'confirmed',
    source: 'Josephus 1.6.1; Dani'el 8:21; linguistic',
    sons: [
      {
        name: 'Elishah',
        ancient_en: 'Aeolians (Greek Aeolia)',
        ancient_nl: 'Eoliërs (Grieks Eolië)',
        modern_en: 'Western coast of Turkey; possibly Sicily and southern Italy',
        modern_nl: 'Westkust van Turkije; mogelijk Sicilië en Zuid-Italië',
        conf: 'high',
        source: 'Josephus 1.6.1; Yeḥezqel 27:7',
      },
      {
        name: 'Tarshish',
        ancient_en: 'Tartessians — the far west of the known world',
        ancient_nl: 'Tartessiërs — het verre westen van de bekende wereld',
        modern_en: 'Spain (Tartessus in SW Iberia) or Sardinia — where Yonah fled from Yahuah',
        modern_nl: 'Spanje (Tartessus in ZW Iberisch Schiereiland) of Sardinië — waarheen Yonah vluchtte voor Yahuah',
        conf: 'good',
        source: 'Josephus 1.6.1; Yonah 1:3; Yesha'yahu 66:19',
      },
      {
        name: 'Kittim',
        ancient_en: 'Romans / Latins — originally Cyprus',
        ancient_nl: 'Romeinen / Latijnen — oorspronkelijk Cyprus',
        modern_en: 'Rome and the Roman Empire; Dead Sea Scrolls consistently call Rome "Kittim"',
        modern_nl: 'Rome en het Romeinse Rijk; Dode Zee-rollen noemen Rome consequent "Kittim"',
        conf: 'high',
        source: 'Josephus 1.6.1; DSS War Scroll 1QM; Dani'el 11:30',
      },
      {
        name: 'Dodanim / Rodanim',
        ancient_en: 'Rhodians',
        ancient_nl: 'Rhodiërs',
        modern_en: 'Rhodes, Greece (1 Dibre haYamim 1:7 reads Rodanim)',
        modern_nl: 'Rhodos, Griekenland (1 Dibre haYamim 1:7 leest Rodanim)',
        conf: 'good',
        source: 'LXX; 1 Dibre haYamim 1:7',
      },
    ],
  },
  {
    name: 'Tubal',
    ancient_en: 'Caucasian Iberians ("Thobelites")',
    ancient_nl: 'Kaukasische Iberiërs ("Thobeliten")',
    modern_en: 'Georgia (Caucasus); also possibly linked to Tobolsk, Russia',
    modern_nl: 'Georgië (Kaukasus); ook mogelijk verbonden met Tobolsk, Rusland',
    conf: 'high',
    source: 'Josephus 1.6.1; Yeḥezqel 38:2',
    note_en: 'Josephus: "Thobelites, who are now called Iberes" — Caucasian Iberia is the ancient name for modern Georgia, not Spain.',
    note_nl: 'Josephus: "Thobeliten, die nu Iberiërs worden genoemd" — Kaukasisch Iberië is de oude naam voor het huidige Georgië, niet Spanje.',
  },
  {
    name: 'Meshek',
    ancient_en: 'Cappadocians',
    ancient_nl: 'Kappadociërs',
    modern_en: 'Central Turkey (Cappadocia); some link the name to Muscovy / Moscow',
    modern_nl: 'Centraal Turkije (Kappadocië); sommigen verbinden de naam aan Moskovië / Moskou',
    conf: 'high',
    source: 'Josephus 1.6.1; Yeḥezqel 38:2',
  },
  {
    name: 'Tiras',
    ancient_en: 'Thracians',
    ancient_nl: 'Thraciërs',
    modern_en: 'Bulgaria and northern Greece (ancient Thrace)',
    modern_nl: 'Bulgarije en Noord-Griekenland (oud Thracië)',
    conf: 'high',
    source: 'Josephus 1.6.1',
  },
]

// ── SONS OF ḤAM ─────────────────────────────────────────────
const HAM: N[] = [
  {
    name: 'Cush',
    ancient_en: 'Kushites / Nubians',
    ancient_nl: 'Kushieten / Nubiërs',
    modern_en: 'Ethiopia, Sudan and East Africa broadly',
    modern_nl: 'Ethiopië, Soedan en Oost-Afrika in het algemeen',
    conf: 'confirmed',
    source: 'Josephus 1.6.2; Yesha'yahu 11:11; archaeology',
    sons: [
      {
        name: 'Nimrod',
        ancient_en: 'Founder of Babel, Erech (Uruk), Akkad and Nineveh',
        ancient_nl: 'Stichter van Babel, Erech (Uruk), Akkad en Nineveh',
        modern_en: 'Iraq — Babylon and Nineveh were both in modern Iraq; "a mighty hunter before Yahuah"',
        modern_nl: 'Irak — Babylon en Nineveh lagen beiden in het huidige Irak; "een geweldig jager voor Yahuah"',
        conf: 'confirmed',
        source: 'Bereshit 10:8–12; Yashar 7; Micha 5:6',
        note_en: 'Nimrod built the first post-flood empire and initiated the Tower of Babel. Yashar 7 records his wars in detail. His name has been associated with "Marad" (rebel) in Akkadian.',
        note_nl: 'Nimrod bouwde het eerste na-zondvloedse rijk en begon de Toren van Babel. Yashar 7 beschrijft zijn oorlogen in detail. Zijn naam is in het Akkadisch in verband gebracht met "marad" (rebel).',
      },
      {
        name: 'Seba',
        ancient_en: 'Sabeans of SW Arabia and NE Africa',
        ancient_nl: 'Sabeïers van ZW Arabië en NO-Afrika',
        modern_en: 'Southwest Arabia and the Horn of Africa',
        modern_nl: 'Zuidwest-Arabië en de Hoorn van Afrika',
        conf: 'high',
        source: 'Josephus 1.6.2; Yesha'yahu 43:3',
      },
    ],
  },
  {
    name: 'Mitsrayim',
    ancient_en: 'Egyptians',
    ancient_nl: 'Egyptenaren',
    modern_en: 'Egypt — Mitsrayim is still the Hebrew name for Egypt today',
    modern_nl: 'Egypte — Mitsrayim is nog steeds de Hebreeuwse naam voor Egypte',
    conf: 'confirmed',
    source: 'Josephus 1.6.2; linguistic; throughout Torah',
    sons: [
      {
        name: 'Lehabim',
        ancient_en: 'Libyans',
        ancient_nl: 'Libiërs',
        modern_en: 'Libya and North Africa',
        modern_nl: 'Libië en Noord-Afrika',
        conf: 'high',
        source: 'Josephus 1.6.2',
      },
      {
        name: 'Pathrusim',
        ancient_en: 'People of Pathros (Upper Egypt)',
        ancient_nl: 'Volk van Pathros (Opper-Egypte)',
        modern_en: 'Upper Egypt and northern Sudan — Pathros still appears in Yesha'yahu 11:11',
        modern_nl: 'Opper-Egypte en Noord-Soedan — Pathros verschijnt nog in Yesha'yahu 11:11',
        conf: 'confirmed',
        source: 'Yesha'yahu 11:11; Yeḥezqel 29:14; Yirmeyahu 44:1',
      },
      {
        name: 'Casluhim / Caphtorim',
        ancient_en: 'Cretans (Caphtor = Crete)',
        ancient_nl: 'Kretenzers (Caphtor = Kreta)',
        modern_en: 'Crete and the Aegean — "the Philistines came out of Caphtor" (Amos 9:7)',
        modern_nl: 'Kreta en de Egeïsche Zee — "de Filistijnen kwamen uit Caphtor" (Amos 9:7)',
        conf: 'high',
        source: 'Amos 9:7; Debarim 2:23; Josephus 1.6.2',
      },
    ],
  },
  {
    name: 'Phut / Put',
    ancient_en: 'Libyans and western Africans',
    ancient_nl: 'Libiërs en West-Afrikanen',
    modern_en: 'Libya; broadly the western coast of North Africa',
    modern_nl: 'Libië; in het algemeen de westkust van Noord-Afrika',
    conf: 'high',
    source: 'Josephus 1.6.2; Yeḥezqel 27:10; Nahum 3:9',
  },
  {
    name: 'Canaan',
    ancient_en: 'Canaanites — the pre-Israelite peoples of the Promised Land',
    ancient_nl: 'Kanaänieten — de voor-Israëlitische volken van het Beloofde Land',
    modern_en: 'The Levant coast — Lebanon, ancient Phoenicia; many subgroups listed below',
    modern_nl: 'De Levantijnse kust — Libanon, oud Fenicië; vele subgroepen hieronder',
    conf: 'confirmed',
    source: 'Josephus 1.6.2; Bereshit 9:25–27',
    sons: [
      {
        name: 'Sidon',
        ancient_en: 'Phoenicians of Sidon',
        ancient_nl: 'Feniciërs van Sidon',
        modern_en: 'Lebanon — Sidon (Saïda) still exists as a city today',
        modern_nl: 'Libanon — Sidon (Saïda) bestaat nog steeds als stad',
        conf: 'confirmed',
        source: 'Josephus 1.6.2; Mattithyahu 15:21; archaeology',
      },
      {
        name: 'Heth',
        ancient_en: 'Hittites — one of the ancient world's great empires',
        ancient_nl: 'Hethieten — een van de grote rijken van de oude wereld',
        modern_en: 'Turkey (Anatolia) — the Hittite Empire fully confirmed by the Boğazkale royal archives',
        modern_nl: 'Turkije (Anatolië) — het Hethitische Rijk volledig bevestigd door de koninklijke archieven van Boğazkale',
        conf: 'confirmed',
        source: 'Josephus 1.6.2; 2 Melakim 7:6; Hittite archaeology',
      },
      {
        name: 'Sinite',
        ancient_en: 'Siyannu — a coastal city of north Syria',
        ancient_nl: 'Siyannu — een kuststad van noord-Syrië',
        modern_en: 'Possibly N. Syria. A minority of scholars link "Sinim" (Yesha'yahu 49:12) to China — speculative',
        modern_nl: 'Mogelijk N. Syrië. Een minderheid van geleerden verbindt "Sinim" (Yesha'yahu 49:12) aan China — speculatief',
        conf: 'speculative',
        source: 'Bereshit 10:17; Yesha'yahu 49:12',
        note_en: '"Sinim" in Yesha'yahu 49:12 is listed as a distant gathering place alongside the north and west. Chinese name "Qin / Sin" was used for China in Persian and Hebrew sources. The link is proposed but unconfirmed.',
        note_nl: '"Sinim" in Yesha'yahu 49:12 staat als verre verzamelplaats naast het noorden en westen. De Chinese naam "Qin / Sin" werd voor China gebruikt in Perzische en Hebreeuwse bronnen. De verbinding is voorgesteld maar niet bevestigd.',
      },
      {
        name: 'Jebusite',
        ancient_en: 'Jebusites — pre-Israelite people of Jerusalem',
        ancient_nl: 'Jebusieten — voor-Israëlitische bevolking van Yerushalayim',
        modern_en: 'Jerusalem (Jebus was the Canaanite name; Dawid conquered it in 2 Shemu'el 5:6)',
        modern_nl: 'Yerushalayim (Jebus was de Kanaänietische naam; Dawid veroverde het in 2 Shemu'el 5:6)',
        conf: 'confirmed',
        source: 'Josephus 1.6.2; Yehoshua 15:63; archaeology',
      },
    ],
  },
]

// ── SONS OF SHEM ─────────────────────────────────────────────
const SHEM: N[] = [
  {
    name: 'Elam',
    ancient_en: 'Elamites — great empire east of Babylon',
    ancient_nl: 'Elamieten — groot rijk ten oosten van Babylon',
    modern_en: 'SW Iran (Khuzestan province) — Elamite civilisation confirmed by extensive archaeology',
    modern_nl: 'ZW Iran (provincie Khuzestan) — Elamitische beschaving bevestigd door uitgebreide archeologie',
    conf: 'confirmed',
    source: 'Josephus 1.6.4; Dani'el 8:2; Elamite royal inscriptions',
  },
  {
    name: 'Asshur',
    ancient_en: 'Assyrians — the empire of Nineveh that exiled Northern Yisra'el',
    ancient_nl: 'Assyriërs — het rijk van Nineveh dat het Noordelijke Yisra'el in ballingschap voerde',
    modern_en: 'Northern Iraq and NE Syria — ethnic Assyrians survive today with their own language (Syriac)',
    modern_nl: 'Noord-Irak en NO-Syrië — etnische Assyriërs leven vandaag nog met hun eigen taal (Syrisch)',
    conf: 'confirmed',
    source: 'Josephus 1.6.4; 2 Melakim 17; Assyrian royal annals',
  },
  {
    name: 'Arpachshad',
    ancient_en: 'Chaldeans — founders of Babylon's last great dynasty',
    ancient_nl: 'Chaldeeërs — stichters van Babylons laatste grote dynastie',
    modern_en: 'Southern Iraq (Chaldea = the region of Ur and ancient Babylon)',
    modern_nl: 'Zuid-Irak (Chaldea = de regio van Ur en oud Babylon)',
    conf: 'high',
    source: 'Josephus 1.6.4; Bereshit 11:28 (Aḇraham from Ur of the Chaldeans)',
    sons: [
      {
        name: 'Eḇer (Eber)',
        ancient_en: 'The Hebrews — the name "Iḇri / Hebrew" derives from Eḇer',
        ancient_nl: 'De Hebreeën — de naam "Iḇri / Hebreeuws" stamt van Eḇer',
        modern_en: 'All the Hebrew / Israelite peoples — Aḇraham, Yitsḥaq, and Ya'aqoḇ were his descendants',
        modern_nl: 'Alle Hebreeuwse / Israëlitische volken — Aḇraham, Yitsḥaq en Ya'aqoḇ waren zijn nakomelingen',
        conf: 'confirmed',
        source: 'Bereshit 10:21,25; Josephus 1.6.4; linguistic',
        sons: [
          {
            name: 'Yoqtan (Joktan)',
            ancient_en: 'Arabian tribes — Yoqtan had 13 sons, all settling the Arabian Peninsula',
            ancient_nl: 'Arabische stammen — Yoqtan had 13 zonen, allen vestigden zich op het Arabische Schiereiland',
            modern_en: 'Yemen and the Arabian Peninsula broadly',
            modern_nl: 'Jemen en het Arabische Schiereiland in het algemeen',
            conf: 'high',
            source: 'Josephus 1.6.4; Bereshit 10:26–30',
            sons: [
              {
                name: 'Hazarmaveth',
                ancient_en: 'Hadramites',
                ancient_nl: 'Hadramieten',
                modern_en: 'Hadramawt, Yemen — the region still bears this exact name today',
                modern_nl: 'Hadramawt, Jemen — de regio draagt nog steeds precies dezelfde naam',
                conf: 'confirmed',
                source: 'Bereshit 10:26; linguistic (Ḥadhramaut = Hazarmaveth)',
              },
              {
                name: 'Sheḇa (Sheba)',
                ancient_en: 'Sabeans — the Queen of Sheḇa's kingdom',
                ancient_nl: 'Sabeïers — het koninkrijk van de Koningin van Sheḇa',
                modern_en: 'Yemen (ancient Saba / Marib kingdom); also linked to Ethiopia via Menelik tradition',
                modern_nl: 'Jemen (oud koninkrijk Saba / Marib); ook aan Ethiopië gekoppeld via Menelik-traditie',
                conf: 'high',
                source: '1 Melakim 10:1; Josephus 1.6.4; Sabean archaeology at Marib',
              },
              {
                name: 'Ophir',
                ancient_en: 'Unknown — source of Shelomoh's legendary gold',
                ancient_nl: 'Onbekend — bron van Shelomoh's legendarische goud',
                modern_en: 'Debated: India (Kerala coast), Oman, Zimbabwe or East Africa',
                modern_nl: 'Betwist: India (kust van Kerala), Oman, Zimbabwe of Oost-Afrika',
                conf: 'speculative',
                source: '1 Melakim 9:28; 2 Dibre haYamim 8:18',
                note_en: 'Shelomoh's fleet sailed from Etsyon-Geḇer (Red Sea) and took 3 years to return with gold, silver, ivory, apes and peacocks. The voyage time and cargo suggest India or East Africa as the most likely destinations.',
                note_nl: 'Shelomoh's vloot voer uit vanuit Etsyon-Geḇer (Rode Zee) en deed 3 jaar voor de terugkeer met goud, zilver, ivoor, apen en pauwen. De reistijd en de lading suggereren India of Oost-Afrika als meest waarschijnlijke bestemmingen.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Lud',
    ancient_en: 'Lydians — the fabulously wealthy kingdom of western Anatolia',
    ancient_nl: 'Lydiërs — het fabelachtig rijke koninkrijk van westelijk Anatolië',
    modern_en: 'Western Turkey (Lydia — kingdom of King Croesus, inventor of coinage)',
    modern_nl: 'West-Turkije (Lydië — koninkrijk van Koning Croesus, uitvinder van munten)',
    conf: 'high',
    source: 'Josephus 1.6.4; Yesha'yahu 66:19',
  },
  {
    name: 'Aram',
    ancient_en: 'Arameans — Aramaic became the lingua franca of the entire ancient Near East',
    ancient_nl: 'Arameeërs — Aramees werd de lingua franca van het gehele oude Nabije Oosten',
    modern_en: 'Syria — Hebrew still calls Syria "Aram"; Aramaic is still spoken in some Syrian villages',
    modern_nl: 'Syrië — Hebreeuws noemt Syrië nog steeds "Aram"; Aramees wordt nog gesproken in sommige Syrische dorpen',
    conf: 'confirmed',
    source: 'Josephus 1.6.4; linguistic; Bereshit 25:20; Debarim 26:5',
    sons: [
      {
        name: 'Uz',
        ancient_en: 'People of the land of Uz',
        ancient_nl: 'Volk van het land Uz',
        modern_en: 'NE Jordan / NW Arabia — the homeland of Iyoḇ (Job)',
        modern_nl: 'NO Jordanië / NW Arabië — het vaderland van Iyoḇ (Job)',
        conf: 'good',
        source: 'Iyoḇ 1:1; Lamentations/Eikhah 4:21',
      },
    ],
  },
]

function Badge({ conf, isNl }: { conf: Conf; isNl: boolean }) {
  const c = CONF[conf]
  return (
    <span style={{
      fontSize: '10px', fontWeight: 700, color: c.color,
      background: c.bg, borderRadius: '4px', padding: '1px 7px',
      letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {isNl ? c.nl : c.en}
    </span>
  )
}

function Entry({ n, isNl, depth = 0 }: { n: N; isNl: boolean; depth?: number }) {
  const indent = depth * 20
  return (
    <div style={{ marginLeft: indent, marginBottom: depth === 0 ? '1.25rem' : '0.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
        <span style={{
          fontWeight: 700, fontFamily: 'Georgia, serif',
          color: 'var(--th-gold)', fontSize: depth === 0 ? '1rem' : '0.9rem',
        }}>
          {n.name}
        </span>
        <Badge conf={n.conf} isNl={isNl} />
      </div>
      <div style={{ fontSize: '13px', color: 'var(--th-muted)', lineHeight: 1.5 }}>
        <span>{isNl ? n.ancient_nl : n.ancient_en}</span>
        <span style={{ color: 'var(--th-accent)', margin: '0 0.35rem' }}>→</span>
        <span style={{ color: 'var(--th-text)' }}>{isNl ? n.modern_nl : n.modern_en}</span>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--th-muted)', opacity: 0.65, marginTop: '0.1rem' }}>
        {n.source}
      </div>
      {(isNl ? n.note_nl : n.note_en) && (
        <div style={{
          fontSize: '12px', color: 'var(--th-text)', opacity: 0.8, fontStyle: 'italic',
          marginTop: '0.35rem', paddingLeft: '0.75rem',
          borderLeft: '2px solid var(--th-gold)',
        }}>
          {isNl ? n.note_nl : n.note_en}
        </div>
      )}
      {n.sons && n.sons.length > 0 && (
        <div style={{
          marginTop: '0.5rem', paddingLeft: '0.75rem',
          borderLeft: '1px solid var(--th-border)',
        }}>
          {n.sons.map((s) => (
            <Entry key={s.name} n={s} isNl={isNl} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default async function NationsPage() {
  const locale = await getLocale() as 'en' | 'nl'
  const isNl = locale === 'nl'

  const sectionStyle = (border: string) => ({
    background: 'var(--th-card)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    borderTop: `3px solid ${border}`,
  })

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <Link href={`/${locale}/learn`} style={{ fontSize: '12px', color: 'var(--th-accent)', textDecoration: 'none' }}>
          ← {isNl ? 'Terug naar Leren' : 'Back to Learn'}
        </Link>
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
        {isNl ? 'Volken der Aarde' : 'Nations of the Earth'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', marginBottom: '0.5rem' }}>
        {isNl
          ? 'Bereshit 10 · Josephus, Oudheden 1.6 · Yobelim 8–10 · Yashar 7'
          : 'Bereshit 10 · Josephus, Antiquities 1.6 · Jubilees 8–10 · Jashar 7'}
      </p>
      <p style={{ color: 'var(--th-text)', fontSize: '14px', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '680px' }}>
        {isNl
          ? 'Na de vloed verdeelde Yahuah de aarde onder de drie zonen van Noaḥ. Yobelim 10 vertelt dat de landen door loting werden verdeeld. Josephus (1e eeuw n.C.) identificeerde elk van de 70 volken in Bereshit 10 bij naam met de bekende naties van zijn tijd. Wat volgt is een zorgvuldige mapping van oude naam naar moderne natie, met voor elke identificatie een betrouwbaarheidsscore.'
          : 'After the flood Yahuah divided the earth among the three sons of Noaḥ. Jubilees 10 records the lands were assigned by lot. Josephus (1st century CE) identified each of the 70 nations in Bereshit 10 by name with the known peoples of his day. What follows is a careful mapping from ancient name to modern nation, with each identification rated for reliability.'}
      </p>

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
        marginBottom: '2rem', padding: '0.75rem 1rem',
        background: 'var(--th-card)', borderRadius: '8px',
        fontSize: '12px', color: 'var(--th-muted)',
      }}>
        <span style={{ fontWeight: 700, color: 'var(--th-gold)', marginRight: '0.25rem' }}>
          {isNl ? 'Betrouwbaarheid:' : 'Confidence:'}
        </span>
        {(['confirmed','high','good','speculative'] as Conf[]).map((k) => (
          <span key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{
              fontSize: '10px', fontWeight: 700, color: CONF[k].color,
              background: CONF[k].bg, borderRadius: '4px', padding: '1px 7px',
            }}>
              {isNl ? CONF[k].nl : CONF[k].en}
            </span>
          </span>
        ))}
      </div>

      {/* YAPHETH */}
      <div style={sectionStyle('#60a5fa')}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.25rem' }}>
          {isNl ? 'Zonen van Yapheth' : 'Sons of Yapheth'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '1.25rem' }}>
          {isNl
            ? 'Grondgebied: het noorden en westen — Europa, Rusland, Centraal-Azië · Yobelim 9:7–13'
            : 'Territory: the north and west — Europe, Russia, Central Asia · Jubilees 9:7–13'}
        </p>
        {YAPHETH.map((n) => <Entry key={n.name} n={n} isNl={isNl} />)}
      </div>

      {/* HAM */}
      <div style={sectionStyle('#f87171')}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: '#f87171', marginBottom: '0.25rem' }}>
          {isNl ? 'Zonen van Ḥam' : 'Sons of Ḥam'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '1.25rem' }}>
          {isNl
            ? 'Grondgebied: het zuiden — Afrika, het Midden-Oosten, de Levant · Yobelim 9:1–6'
            : 'Territory: the south — Africa, the Middle East, the Levant · Jubilees 9:1–6'}
        </p>
        {HAM.map((n) => <Entry key={n.name} n={n} isNl={isNl} />)}
      </div>

      {/* SHEM */}
      <div style={sectionStyle('var(--th-gold)')}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
          {isNl ? 'Zonen van Shem' : 'Sons of Shem'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)', marginBottom: '1.25rem' }}>
          {isNl
            ? 'Grondgebied: het midden — Midden-Oosten, Perzië, Arabië · Yobelim 8:12–21'
            : 'Territory: the middle — Middle East, Persia, Arabia · Jubilees 8:12–21'}
        </p>
        {SHEM.map((n) => <Entry key={n.name} n={n} isNl={isNl} />)}
      </div>

      {/* Footer note */}
      <div style={{
        padding: '1rem 1.25rem', background: 'var(--th-card)', borderRadius: '8px',
        fontSize: '12px', color: 'var(--th-muted)', lineHeight: 1.7,
        borderLeft: '3px solid var(--th-accent)',
      }}>
        <strong style={{ color: 'var(--th-accent)' }}>
          {isNl ? 'Opmerking over zekerheid' : 'A note on certainty'}
        </strong>
        <br />
        {isNl
          ? 'Veel van deze identificaties zijn goed gedocumenteerd door archeologie, linguïstiek en meerdere oude bronnen. Andere blijven geleerdenspeculatie. Yahuah kent de grenzen van alle volken (Handelingen/Maaseh 17:26) — deze mapping is ons beste begrip, geen definitieve bewering. Gebruik de bronnen zelf als referentie.'
          : 'Many of these identifications are well-documented by archaeology, linguistics and multiple ancient sources. Others remain scholarly speculation. Yahuah knows the boundaries of all peoples (Acts/Maaseh 17:26) — this mapping is our best understanding, not a definitive claim. Use the sources themselves as the reference.'}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href={`/${locale}/learn/dispersion`} style={{
          fontSize: '13px', color: 'var(--th-accent)', textDecoration: 'none',
          fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}>
          ⛵ {isNl ? 'De Grote Verstrooiing van Yisra'el →' : 'The Great Dispersion of Yisra'el →'}
        </Link>
        <Link href={`/${locale}/learn/two-houses`} style={{
          fontSize: '13px', color: 'var(--th-accent)', textDecoration: 'none',
          fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}>
          🏡 {isNl ? 'De Twee Huizen van Yisra'el →' : 'The Two Houses of Yisra'el →'}
        </Link>
      </div>
    </div>
  )
}
