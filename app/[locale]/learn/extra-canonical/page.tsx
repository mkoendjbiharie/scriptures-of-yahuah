import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function ExtraCanonicalPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const books = isNl ? [
    {
      emoji: '🌿',
      name: 'Adam en Hawwah (1 & 2)',
      subtitle: 'Life of Adam and Eve',
      summary: "De gebeurtenissen na de verdrijving uit de Hof van Eden. Aḏam en Hawwah belijden hun zonden, vasten en bidden. Shatan openbaart hoe hij Hawwah verleidde. Het eerste boek beschrijft de strijd en dood van Aḏam; het tweede zijn hemelse opname. Een uniek venster op de vroegste geschiedenis van de mensheid.",
      ref: 'Adam-Hawwah A 1–51; B 1–40',
      highlight: "Yahuah belooft Aḏam dat Hij hem na 5500 jaar zal opwekken — een profetie van de Mashiach (Adam-Hawwah A 42:2-3).",
    },
    {
      emoji: '📔',
      name: 'Ḥanok (Enoch)',
      subtitle: '1 Enoch',
      summary: 'De wachters die van de hemel kwamen, de visioenen van Ḥanok over het eindgericht, de Mensenzoon die regeert met Yahuah, en de aankondiging van de vloed. Aangehaald in Yahudah (Judas) 1:14 en bekend bij de vroegste gelovigen.',
      ref: '1 Ḥanok 1–108',
      highlight: 'De "Mensenzoon" die op de troon van heerlijkheid zit (Ḥanok 69:29) — een directe profetie van Yahusha.',
    },
    {
      emoji: '📆',
      name: 'Yobelim (Jubilees)',
      subtitle: 'Book of Jubilees',
      summary: 'Yahuah openbaart de volledige geschiedenis van de schepping tot Mosheh opnieuw, verdeeld in Jubeljaren. Bevestigt de eeuwigheid van de Shabbat, de kalender van 364 dagen, en de verhalen van de aartsvaders met extra details. Bewaard in Ethiopische en Dode Zee-teksten.',
      ref: 'Yobelim 1–50',
      highlight: 'De Shabbat werd ingesteld in de hemel voordat de aarde bestond (Yobelim 2:17-18).',
    },
    {
      emoji: '📜',
      name: 'Geschriften van Aḇraham',
      subtitle: 'Writings of Abraham',
      summary: "De eigen geschriften en visioenen van Aḇraham over de schepping, de sterren, en het verbond dat Yahuah met hem sloot. Omvat de Apocalyps van Aḇraham — zijn hemelse reis waarbij hij de troon van Yahuah aanschouwt en de toekomstige geschiedenis van Yisrael wordt onthuld.",
      ref: 'Writings-Abraham 1–32',
      highlight: "Aḇraham ziet in een visioen de offers, de ballingschap en de uiteindelijke verlossing van zijn nageslacht (hfst. 27-29).",
    },
    {
      emoji: '🔥',
      name: 'Geschriften van EliYahu',
      subtitle: 'Writings of Elijah',
      summary: "Profetische geschriften toegeschreven aan EliYahu (Elia). Bevat zijn preken over afvalligheid en terugkeer, profetieën over de eindtijd en het herstel van Yisrael. EliYahu is een van de twee getuigen in Hazon 11 — zijn geschriften werpen licht op zijn profetische rol.",
      ref: 'Writings-Eliyahu 1–15',
      highlight: "EliYahu waarschuwt dat degenen die de Naam van Yahuah verlaten voor de namen van afgoden, geen deel zullen hebben in het komende tijdperk.",
    },
    {
      emoji: '👨‍👩‍👧‍👦',
      name: 'Testamenten van de 12 Aartsvaders',
      subtitle: 'Testaments of the Twelve Patriarchs',
      summary: "De sterfbedgesprekken van de twaalf zonen van Ya'aqoḇ — Ruḇen, Shim'on, Levi, Yahudah, Dan, Naphtali, Gad, Asher, Yissaskar, Zeḇulun, Yoseph en Binyamin. Elk belijdt zijn zonden, waarschuwt zijn nakomelingen en profeteert over de komst van de Mashiach uit Levi en Yahudah.",
      ref: 'Testament van Ruḇen t/m Binyamin',
      highlight: "Levi en Yahudah profeteerden samen dat de Mashiach zou opstaan als Priester-Koning — een orde die Melkitsedek voorafschaduwde.",
    },
    {
      emoji: '🗡️',
      name: 'Yasher (Jasher)',
      subtitle: 'Book of Jasher',
      summary: "Aangehaald in Yahushua (Jozua) 10:13 en 2 Shemuel 1:18. Geeft uitgebreide verhalen van Adam tot de verovering van Kena'an — inclusief de opvoeding van Aḇraham, de levensduur van de aartsvaders en de oorlogen van de zonen van Ya'aqoḇ.",
      ref: 'Yasher 1–91',
      highlight: "Aḇraham vernietigde de afgoden van zijn vader Teraḥ al op jonge leeftijd (Yasher 12:1-39).",
    },
    {
      emoji: '💎',
      name: 'Wijsheid van Shlomoh (Hakmah)',
      subtitle: 'Wisdom of Solomon',
      summary: "Geschreven in de naam van Shlomoh, gericht aan de heersers van de aarde. Behandelt de onsterfelijkheid van de rechtvaardigen, de dwaasheid van afgoderij, en hoe Yahuah Yisrael door de geschiedenis heen leidde. Aangehaald door vroegchristelijke schrijvers en opgenomen in de Septuagint.",
      ref: 'Hakmah 1–19',
      highlight: '"De rechtvaardige leeft in eeuwigheid; zijn loon is bij Yahuah, en de Allerhoogste zorgt voor hem." (Hakmah 5:15)',
    },
    {
      emoji: '📜',
      name: 'Sirach (Ben Sira)',
      subtitle: 'Ecclesiasticus / Wisdom of Sirach',
      summary: "Yeshua Ben Sira (±180 v.C.) verzamelde wijsheid zoals Shlomoh. Zijn boek behandelt gebod voor gebod hoe een wijs leven eruit ziet — eerlijkheid, opvoeding, vriendschap, gebed, tempeldienst en ontzag voor Yahuah. 'Het begin van wijsheid is de Naam van Yahuah vrezen.'",
      ref: 'Sirach 1–51',
      highlight: "Lof van de beroemde vaderen — Ḥanok, Noaḥ, Aḇraham tot Shim'on de hogepriester (Sirach 44–50).",
    },
    {
      emoji: '⚔️',
      name: 'Maccabiyim (Maccabees)',
      subtitle: '1 & 2 Maccabees',
      summary: "De Maccabeese opstand (167–160 v.C.) tegen de Seleucidische overheersing van Antiochos IV Epiphanes, die de Tempel ontheiligde. Mattityahu en zijn zonen — Yahudah, Yonatan en Shim'on — leidden Yisrael in de herovering van de Tempel. Ḥanukka herdenkt dit wonder.",
      ref: 'Maqqabim A 1–16; Maqqabim B 1–15',
      highlight: "Yahudah de Maccaḇeeër reinigte de Tempel op 25 Kislev — het begin van Ḥanukka (1 Maqqabim 4:52-59).",
    },
    {
      emoji: '🌌',
      name: 'Tobit (Toḇiyah)',
      subtitle: 'Book of Tobit',
      summary: "Tobit, een vroom Israeliet in ballingschap in Nineve, wordt blind en stuurt zijn zoon Toḇiyah op reis. De engel Rafa'el (in vermomming) begeleidt hem, verdrijft de demon Asmodeus en geneest Tobit's blindheid. Een verhaal over getrouwheid, gebed en goddelijke voorzienigheid.",
      ref: 'Tobiyah 1–14',
      highlight: "Rafa'el openbaart zich als een van de zeven engelen die voor de troon van Yahuah staan (Tobiyah 12:15).",
    },
    {
      emoji: '🗡️',
      name: 'Yahudith (Judith)',
      subtitle: 'Book of Judith',
      summary: 'De weduwe Yahudith redt haar stad Bethulia door met moed het kamp van de Assyrische veldheer Holofernes binnen te gaan. Door list en vertrouwen op Yahuah onthoofdt zij hem en slaat Yisrael het vijandelijke leger op de vlucht. Een krachtig verhaal van geloof tegenover overmacht.',
      ref: 'Yahudith 1–16',
      highlight: '"Yahuah is mijn kracht en mijn bescherming, mijn schild en mijn redder." (Yahudith 13:11)',
    },
    {
      emoji: '✍️',
      name: 'Baruk (Baruch)',
      subtitle: 'Book of Baruch + Letter of Jeremiah',
      summary: "Geschreven namens Baruk, de secretaris van Yirmeyahu, tijdens de Babylonische ballingschap. Belijdt de zonden van Yisrael, roept op tot terugkeer naar de Torah, en spreekt profetische troost. Bevat ook de Brief van Yirmeyahu (hfst. 6) — een uitgebreide waarschuwing tegen afgoderij.",
      ref: 'Baruk 1–6; Brief van Yirmeyahu',
      highlight: '"Keert u tot Yahuah en verlaat de afgoden... want Hij die u in ballingschap leidde, zal u terugbrengen." (Baruk 4:28)',
    },
    {
      emoji: '🙏',
      name: 'Gebeden & Toevoegingen aan Daniël',
      subtitle: 'Prayer of Azariah · Susanna · Bel and the Dragon',
      summary: "Drie toevoegingen aan het boek Daniël: het Gebed van Azaryah in de vuuroven, het verhaal van Shoshannah (Susanna) die vals beschuldigd en door Daniël gered wordt, en Bel en de Draak — waarin Daniël de zinloosheid van afgoderij onthult. Bewaard in de Griekse Septuagint.",
      ref: 'Gebed van Azaryah; Shoshannah 1–64; Bel-Dragon 1–42',
      highlight: "Daniël weigert Bel (Baäl) te aanbidden en bewijst voor de koning dat het eten heimelijk door de priesters wordt gedaan — zij worden ter dood gebracht (Bel-Dragon 1-22).",
    },
    {
      emoji: '👑',
      name: 'Gebed van Menashsheh',
      subtitle: 'Prayer of Manasseh',
      summary: "Het berouwgebed van koning Menashsheh (Manasse) van Yahudah — de meest goddeloze koning, die toch in zijn diepste nood tot Yahuah riep en vergeven werd (zie 2 Dibre B 33:12-13). Dit korte gebed is een van de krachtigste uitdrukkingen van berouw en genade in de gehele Schrift.",
      ref: 'Gebed van Menashsheh 1:1-15',
      highlight: '"Ik heb gezondigd boven het getal der zanden der zee... maar Gij, Yahuah, zult mij verlossen in Uw grote barmhartigheid."',
    },
    {
      emoji: '📖',
      name: 'Toevoegingen aan Ester (Hadassah)',
      subtitle: 'Additions to Esther',
      summary: "De Griekse Septuagint-versie van het Ester-verhaal bevat zes extra passages die niet in de Hebreeuwse tekst staan: de dromen van Mordekhai, de volledige teksten van de koninklijke decreten, en de gebeden van zowel Mordekhai als Hadassah — waardoor de actieve rol van Yahuah duidelijker wordt.",
      ref: 'Hadassah-Add A–F',
      highlight: "Hadassah bidt: 'Yahuah, mijn Elohim... wees met mij in mijn eenzaamheid' — een gebed dat niet in het Hebreeuwse boek staat (Add. C:14).",
    },
    {
      emoji: '🎵',
      name: 'Toevoegingen aan de Psalmen',
      subtitle: 'Additions to Psalms',
      summary: "Psalmen die niet in de Masoretische 150 zijn opgenomen maar wel in de Septuagint, de Dode Zee-rollen en andere oude tradities. Inclusief Psalm 151 (de overwinning van Dawid op Golyath) en aanvullende lofzangen en gebeden uit de vroege Israelitische eredienst.",
      ref: 'Tehillim-Add 151–155',
      highlight: "Psalm 151 — aanwezig in de Dode Zee-rollen (11QPs) — vertelt hoe Dawid door Yahuah gekozen werd boven zijn broers.",
    },
    {
      emoji: '📚',
      name: 'Esdras (1 & 2)',
      subtitle: '1 Esdras · 2 Esdras / Apocalypse of Ezra',
      summary: "1 Esdras is een alternatieve versie van Ezra-Nehemia met extra materiaal, inclusief de beroemde 'Strijd der Lijfwachten' (hfst. 3-4). 2 Esdras (ook wel 4 Ezra) is een diepgaand apocalyptisch visioen van Ezra over de verwoesting van Yerushalayim en de eindtijdopenbaring — aangehaald door vroege kerk-vader Clemens.",
      ref: 'Ezra-A 1–9; Ezra-B 3–14',
      highlight: '"De wereld haast zich naar haar einde... maar het Koninkrijk dat Ik u beloof is groter dan al wat u heeft gezien." (2 Esdras 8:1)',
    },
  ] : [
    {
      emoji: '🌿',
      name: 'Adam and Hawwah (1 & 2)',
      subtitle: 'Life of Adam and Eve',
      summary: "Events after the expulsion from the Garden of Eden. Aḏam and Hawwah confess their sins, fast and pray. Satan reveals how he deceived Hawwah. The first book describes Aḏam's struggle and death; the second his heavenly assumption. A unique window into the earliest history of humanity.",
      ref: 'Adam-Hawwah A 1–51; B 1–40',
      highlight: "Yahuah promises Aḏam He will raise him after 5500 years — a prophecy of the Messiah (Adam-Hawwah A 42:2-3).",
    },
    {
      emoji: '📔',
      name: 'Ḥanok (Enoch)',
      subtitle: '1 Enoch',
      summary: "Ḥanok's visions of the watcher-angels who descended, the final judgment, the Son of Man who reigns with Yahuah, and the announcement of the flood. Quoted in Yahudah (Jude) 1:14 and known to the earliest believers.",
      ref: '1 Ḥanok 1–108',
      highlight: 'The "Son of Man" sitting on the throne of glory (Ḥanok 69:29) — a direct prophecy of Yahusha.',
    },
    {
      emoji: '📆',
      name: 'Yobelim (Jubilees)',
      subtitle: 'Book of Jubilees',
      summary: 'Yahuah re-reveals the full history of creation to Mosheh, divided into Jubilee years. Confirms the eternity of the Shabbat, the 364-day calendar, and the stories of the patriarchs with additional detail. Preserved in Ethiopic manuscripts and Dead Sea Scrolls.',
      ref: 'Yobelim 1–50',
      highlight: 'The Shabbat was established in heaven before the earth existed (Yobelim 2:17-18).',
    },
    {
      emoji: '📜',
      name: 'Writings of Aḇraham',
      subtitle: 'Writings of Abraham',
      summary: "Aḇraham's own writings and visions about creation, the stars, and the covenant Yahuah made with him. Includes the Apocalypse of Abraham — his heavenly journey where he beholds the throne of Yahuah and the future history of Yisrael is revealed.",
      ref: 'Writings-Abraham 1–32',
      highlight: "Aḇraham sees in a vision the sacrifices, the exile, and the final redemption of his descendants (chapters 27-29).",
    },
    {
      emoji: '🔥',
      name: 'Writings of EliYahu',
      subtitle: 'Writings of Elijah',
      summary: "Prophetic writings attributed to EliYahu (Elijah). Contains his sermons on apostasy and return, prophecies about the end times and the restoration of Yisrael. EliYahu is one of the two witnesses in Hazon 11 — his writings illuminate his prophetic role.",
      ref: 'Writings-Eliyahu 1–15',
      highlight: "EliYahu warns that those who forsake the Name of Yahuah for the names of idols will have no share in the age to come.",
    },
    {
      emoji: '👨‍👩‍👧‍👦',
      name: 'Testaments of the 12 Patriarchs',
      subtitle: 'Testaments of the Twelve Patriarchs',
      summary: "The deathbed speeches of the twelve sons of Ya'aqoḇ — Ruḇen, Shim'on, Levi, Yahudah, Dan, Naphtali, Gad, Asher, Yissaskar, Zeḇulun, Yoseph, and Binyamin. Each confesses his sins, warns his descendants, and prophesies about the coming of the Mashiach from Levi and Yahudah.",
      ref: 'Testament of Ruḇen through Binyamin',
      highlight: "Levi and Yahudah both prophesied that the Mashiach would arise as a Priest-King — the order foreshadowed by Melkitsedek.",
    },
    {
      emoji: '🗡️',
      name: 'Yasher (Jasher)',
      subtitle: 'Book of Jasher',
      summary: "Quoted in Yahushua (Joshua) 10:13 and 2 Shemuel 1:18. Extended narratives from Adam to the conquest of Kena'an — including the upbringing of Aḇraham, the lifespan of the patriarchs, and the wars of the sons of Ya'aqoḇ.",
      ref: 'Yasher 1–91',
      highlight: "Aḇraham destroyed the idols of his father Teraḥ already in his youth (Yasher 12:1-39).",
    },
    {
      emoji: '💎',
      name: 'Wisdom of Shlomoh (Hakmah)',
      subtitle: 'Wisdom of Solomon',
      summary: "Written in the name of Shlomoh, addressed to the rulers of the earth. Covers the immortality of the righteous, the folly of idolatry, and how Yahuah guided Yisrael through history. Quoted by early assembly writers and included in the Septuagint.",
      ref: 'Hakmah 1–19',
      highlight: '"The righteous live forever; their reward is with Yahuah, and the Most High takes care of them." (Hakmah 5:15)',
    },
    {
      emoji: '📜',
      name: 'Sirach (Ben Sira)',
      subtitle: 'Ecclesiasticus / Wisdom of Sirach',
      summary: 'Yeshua Ben Sira (c. 180 BC) gathered wisdom as Shlomoh did. His book addresses commandment by commandment what a wise life looks like — honesty, education, friendship, prayer, temple service, and reverence for Yahuah.',
      ref: 'Sirach 1–51',
      highlight: "The Praise of Famous Men — Ḥanok, Noaḥ, Aḇraham through Shim'on the high priest (Sirach 44–50).",
    },
    {
      emoji: '⚔️',
      name: 'Maccabiyim (Maccabees)',
      subtitle: '1 & 2 Maccabees',
      summary: "The Maccabean revolt (167–160 BC) against Seleucid ruler Antiochos IV Epiphanes, who defiled the Temple. Mattityahu and his sons — Yahudah, Yonatan, and Shim'on — led Yisrael in reclaiming the Temple. Ḥanukka commemorates this miracle.",
      ref: 'Maqqabim A 1–16; Maqqabim B 1–15',
      highlight: 'Yahudah the Maccabee cleansed the Temple on 25 Kislev — the origin of Ḥanukka (1 Maqqabim 4:52-59).',
    },
    {
      emoji: '🌌',
      name: 'Tobit (Toḇiyah)',
      subtitle: 'Book of Tobit',
      summary: "Tobit, a righteous Israelite in exile in Nineveh, goes blind and sends his son Toḇiyah on a journey. The angel Rafa'el guides him in disguise, drives out the demon Asmodeus, and heals Tobit's blindness. A story of faithfulness, prayer, and divine providence.",
      ref: 'Tobiyah 1–14',
      highlight: "Rafa'el reveals himself as one of the seven angels who stand before the throne of Yahuah (Tobiyah 12:15).",
    },
    {
      emoji: '🗡️',
      name: 'Yahudith (Judith)',
      subtitle: 'Book of Judith',
      summary: 'The widow Yahudith saves her city Bethulia by boldly entering the camp of Assyrian general Holofernes. Through cunning and trust in Yahuah she beheads him and routes the enemy army. A powerful story of faith against overwhelming odds.',
      ref: 'Yahudith 1–16',
      highlight: '"Yahuah is my strength and my protection, my shield and my deliverer." (Yahudith 13:11)',
    },
    {
      emoji: '✍️',
      name: 'Baruk (Baruch)',
      subtitle: 'Book of Baruch + Letter of Jeremiah',
      summary: "Written in the name of Baruk, secretary of Yirmeyahu, during the Babylonian exile. Confesses the sins of Yisrael, calls for return to Torah as the path of peace, and speaks prophetic comfort over the return to the land. Includes the Letter of Yirmeyahu (chapter 6) — an extended warning against idolatry.",
      ref: 'Baruk 1–6; Letter of Yirmeyahu',
      highlight: '"Return to Yahuah and forsake idols… for He who led you into exile will bring you back." (Baruk 4:28)',
    },
    {
      emoji: '🙏',
      name: 'Prayers & Additions to Daniyel',
      subtitle: 'Prayer of Azariah · Susanna · Bel and the Dragon',
      summary: "Three additions to the book of Daniyel: the Prayer of Azaryah in the fiery furnace, the story of Shoshannah (Susanna) falsely accused and rescued by Daniyel, and Bel and the Dragon — in which Daniyel exposes the emptiness of idolatry. Preserved in the Greek Septuagint.",
      ref: 'Prayer of Azaryah; Shoshannah 1–64; Bel-Dragon 1–42',
      highlight: "Daniyel refuses to worship Bel (Baal) and proves to the king that priests are secretly eating the food — they are put to death (Bel-Dragon 1-22).",
    },
    {
      emoji: '👑',
      name: 'Prayer of Menashsheh',
      subtitle: 'Prayer of Manasseh',
      summary: "The repentance prayer of King Menashsheh (Manasseh) of Yahudah — the most wicked king, who yet in his deepest need cried out to Yahuah and was forgiven (see 2 Dibre B 33:12-13). This short prayer is one of the most powerful expressions of repentance and grace in all of Scripture.",
      ref: 'Prayer of Menashsheh 1:1-15',
      highlight: '"I have sinned above the number of the sands of the sea... but You, Yahuah, will deliver me in Your great mercy."',
    },
    {
      emoji: '📖',
      name: 'Additions to Ester (Hadassah)',
      subtitle: 'Additions to Esther',
      summary: "The Greek Septuagint version of the Esther story includes six additional passages not in the Hebrew text: Mordekhai's dreams, the full texts of the royal decrees, and the prayers of both Mordekhai and Hadassah — making Yahuah's active role much more explicit.",
      ref: 'Hadassah-Add A–F',
      highlight: "Hadassah prays: 'Yahuah, my Elohim... be with me in my loneliness' — a prayer not found in the Hebrew book (Add. C:14).",
    },
    {
      emoji: '🎵',
      name: 'Additions to the Psalms',
      subtitle: 'Additions to Psalms',
      summary: "Psalms not included in the Masoretic 150 but found in the Septuagint, the Dead Sea Scrolls, and other ancient traditions. Includes Psalm 151 (Dawid's victory over Golyath) and additional hymns and prayers from early Israelite worship.",
      ref: 'Tehillim-Add 151–155',
      highlight: "Psalm 151 — present in the Dead Sea Scrolls (11QPs) — tells how Dawid was chosen by Yahuah above his brothers.",
    },
    {
      emoji: '📚',
      name: 'Esdras (1 & 2)',
      subtitle: '1 Esdras · 2 Esdras / Apocalypse of Ezra',
      summary: "1 Esdras is an alternative version of Ezra-Nehemiah with extra material, including the famous 'Contest of the Bodyguards' (chapters 3-4). 2 Esdras (also 4 Ezra) is a profound apocalyptic vision of Ezra about the destruction of Yerushalayim and end-time revelation — quoted by early assembly fathers.",
      ref: 'Ezra-A 1–9; Ezra-B 3–14',
      highlight: '"The world hastens to its end… but the Kingdom I promise you is greater than all you have seen." (2 Esdras 8:1)',
    },
  ]

  return (
    <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 0.5rem' }}>
        {isNl ? 'Buiten-canonieke Geschriften' : 'Extra-Canonical Writings'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', marginBottom: '0.5rem' }}>
        {isNl
          ? `${books.length} boeken aangehaald door de profeten, apostelen en de vroege gemeenschap — niet in alle Bijbels opgenomen, maar behorend tot het bredere erfgoed van Yisrael.`
          : `${books.length} books quoted by the prophets, apostles, and early assembly — not in every Bible, but part of the broader heritage of Yisrael.`}
      </p>
      <p style={{ color: 'var(--th-muted)', fontSize: '13px', marginBottom: '2rem' }}>
        {isNl ? 'Alle boeken zijn leesbaar via ' : 'All books are readable via '}
        <Link href={`/${locale}/read`} style={{ color: 'var(--th-gold)', textDecoration: 'none', fontWeight: 600 }}>
          {isNl ? 'Lezen →' : 'Read →'}
        </Link>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {books.map((b, i) => (
          <section key={i} className="theme-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{b.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--th-gold)' }}>{b.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--th-muted)', fontStyle: 'italic' }}>{b.subtitle}</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--th-text)', margin: '0 0 0.75rem' }}>{b.summary}</p>
                <div style={{ background: 'var(--th-bg)', borderLeft: '3px solid var(--th-gold)', padding: '0.5rem 0.75rem', borderRadius: '0 6px 6px 0' }}>
                  <p style={{ fontSize: '13px', color: 'var(--th-accent)', margin: 0, fontStyle: 'italic' }}>{b.highlight}</p>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--th-muted)', margin: '0.5rem 0 0', letterSpacing: '0.03em' }}>{b.ref}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="theme-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
          {isNl ? 'Waarom zijn deze boeken niet in elke Bijbel?' : 'Why are these books not in every Bible?'}
        </h2>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--th-text)', margin: 0 }}>
          {isNl
            ? 'Het protestantse kanon (1500s) sloot deze boeken uit op basis van de Joodse Masoretische canon van ±90 n.C. Maar de vroege gemeenschap gebruikte de Septuagint (LXX) — de Griekse vertaling die deze boeken wel bevatte. Paulus, Petrus, Yahudah (Judas) en zelfs Yahusha haalden er regelmatig uit aan. Ze zijn bewaard in de Ethiopische Bijbel (81 boeken), de rooms-katholieke Bijbel, en de oosters-orthodoxe traditie. Als de apostelen ze kenden, is het goed om ze ook te kennen.'
            : 'The Protestant canon (1500s) excluded these books based on the Jewish Masoretic canon of c. AD 90. But the early assembly used the Septuagint (LXX) — the Greek translation that included them. Paul, Peter, Yahudah (Jude), and even Yahusha regularly quoted from them. They are preserved in the Ethiopian Bible (81 books), the Catholic Bible, and Eastern Orthodox tradition. If the apostles knew them, it is worth knowing them too.'}
        </p>
      </section>
    </div>
  )
}
