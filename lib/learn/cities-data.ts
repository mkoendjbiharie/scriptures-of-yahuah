import type { LocaleText } from './names-data'

export interface CityEntry {
  slug: string
  restored: string        // Hebrew restored name
  hebrew: string          // Modern Hebrew script
  english: string         // Traditional English name
  type: 'city' | 'region' | 'mountain' | 'river' | 'country'
  firstMention: string
  location: LocaleText
  meaning: LocaleText
  origin: LocaleText
  significance: LocaleText
}

export const CITIES_DATA: CityEntry[] = [
  {
    slug: 'yerushalayim',
    restored: 'Yerushalayim',
    hebrew: '𐤉𐤓𐤅𐤔𐤋𐤉𐤌',
    english: 'Jerusalem',
    type: 'city',
    firstMention: 'Bereshit 14:18 (as Shalem)',
    location: {
      en: 'Hill country of Yahudah, roughly 750 metres above sea level, in the heart of the land of Yisra\'ĕl.',
      nl: 'Heuvelland van Yahudah, ongeveer 750 meter boven zeeniveau, in het hart van het land Yisra\'ĕl.',
    },
    meaning: {
      en: '"Founded in peace / City of peace / Teaching of peace" — From 𐤉𐤓𐤄 (yara, "to found, teach") + 𐤔𐤋𐤅𐤌 (shalom, "peace, wholeness, completeness"). The older form Shalem (𐤔𐤋𐤌) simply means "peace" or "complete".',
      nl: '"Gesticht in vrede / Stad van vrede / Onderwijzing van vrede" — Van 𐤉𐤓𐤄 (yara, "grondvesten, onderwijzen") + 𐤔𐤋𐤅𐤌 (shalom, "vrede, heelheid, volledigheid"). De oudere vorm Shalem (𐤔𐤋𐤌) betekent simpelweg "vrede" of "volledig".',
    },
    origin: {
      en: 'The city is first mentioned as "Shalem", where Melchitsedek — priest of El Elyon — brought out bread and wine to bless Aḇraham after his victory (Bereshit 14:18). Dawid later captured it from the Yebusites and made it his royal capital, renaming it the City of Dawid (Shemuel B 5:7). His son Shelomoh built the first great Temple there. The city was destroyed by Nebuchadnetssar of Babel in 586 BCE, rebuilt after the exile, and destroyed again by Rome in 70 CE.',
      nl: 'De stad wordt voor het eerst vermeld als "Shalem", waar Melchitsedek — priester van El Elyon — brood en wijn naar buiten bracht om Aḇraham te zegenen na zijn overwinning (Bereshit 14:18). Dawid veroverde het later van de Jebusieten en maakte het zijn koninklijke hoofdstad, het herdoopend tot de Stad van Dawid (Shemuel B 5:7). Zijn zoon Shelomoh bouwde daar de eerste grote Tempel. De stad werd vernietigd door Nebukadnetsar van Babel in 586 vGT, herbouwd na de ballingschap, en opnieuw verwoest door Rome in 70 GT.',
    },
    significance: {
      en: 'Yerushalayim is the most mentioned city in all of Scripture — appearing over 800 times. It is the city Yahuah chose to place His Name (Debarim 12:5), the city of the Great King (Tehillim 48:2), the city where Yahusha was crucified, buried, and rose again. Prophecy speaks of a New Yerushalayim descending from heaven as the eternal dwelling of Yahuah with His people (Hazon 21). The Psalms of Ascent (Tehillim 120–134) were sung by pilgrims travelling up to worship in the city.',
      nl: 'Yerushalayim is de meest vermelde stad in alle Schriften — meer dan 800 keer verschijnend. Het is de stad die Yahuah koos om Zijn Naam te plaatsen (Debarim 12:5), de stad van de Grote Koning (Tehillim 48:2), de stad waar Yahusha gekruisigd werd, begraven werd, en opstond. Profetie spreekt van een Nieuw Yerushalayim dat uit de hemel neerdaalt als de eeuwige woning van Yahuah bij Zijn volk (Hazon 21). De Psalmen van de Opgangen (Tehillim 120–134) werden gezongen door pelgrims die optrokken om te aanbidden in de stad.',
    },
  },
  {
    slug: 'beyth-lehem',
    restored: 'Bĕyth Leḥem',
    hebrew: '𐤁𐤉𐤕 𐤋𐤇𐤌',
    english: 'Bethlehem',
    type: 'city',
    firstMention: 'Bereshit 35:19',
    location: {
      en: 'About 10 kilometres south of Yerushalayim, in the highlands of Yahudah.',
      nl: 'Ongeveer 10 kilometer ten zuiden van Yerushalayim, in het hoogland van Yahudah.',
    },
    meaning: {
      en: '"House of Bread" or "House of Meat / Food" — From 𐤁𐤉𐤕 (beyt, "house") + 𐤋𐤇𐤌 (leḥem, "bread, food, grain"). The area was known for its fertile fields and abundant grain harvests.',
      nl: '"Huis van Brood" of "Huis van Vlees / Voedsel" — Van 𐤁𐤉𐤕 (beyt, "huis") + 𐤋𐤇𐤌 (leḥem, "brood, voedsel, graan"). Het gebied stond bekend om zijn vruchtbare velden en overvloedige graanoogsten.',
    },
    origin: {
      en: 'Bĕyth Leḥem first appears in Scripture as the place where Raḥel, beloved wife of Ya\'aqoḇ, died giving birth to Binyamin (Bereshit 35:19). It was the home of Naomi and the setting of the beautiful story of Ruth (Rut) and Boaz — a picture of redemption. Most significantly, it was the birthplace of Dawid the shepherd-king, and Micah prophesied 700 years in advance that from this small town the ruler of Yisra\'ĕl would come (Mikah 5:2). That prophecy was fulfilled when Yahusha was born there.',
      nl: 'Bĕyth Leḥem verschijnt voor het eerst in de Schriften als de plaats waar Raḥel, de geliefde vrouw van Ya\'aqoḇ, stierf tijdens de geboorte van Binyamin (Bereshit 35:19). Het was de thuisstad van Naomi en de setting van het mooie verhaal van Ruth (Rut) en Boaz — een beeld van verlossing. Het allerbelangrijkst was het de geboorteplaats van Dawid de herder-koning, en Mikah profeteerde 700 jaar van tevoren dat uit dit kleine stadje de heerser van Yisra\'ĕl zou komen (Mikah 5:2). Die profetie werd vervuld toen Yahusha daar werd geboren.',
    },
    significance: {
      en: 'The "House of Bread" is where the Bread of Life (Yahuchanan 6:35) was born. The same fields where Rut gleaned grain, where Dawid tended sheep, became the fields where angels announced the birth of the Messiah to shepherds. The city of David became the city of the Son of David. Yahuah\'s poetry in history is profound.',
      nl: 'Het "Huis van Brood" is waar het Brood des Levens (Yahuchanan 6:35) werd geboren. Dezelfde velden waar Rut graan naplukte, waar Dawid schapen hoedde, werden de velden waar engelen de geboorte van de Messias aan herders aankondigden. De stad van David werd de stad van de Zoon van David. Yahuahs poëzie in de geschiedenis is diepzinnig.',
    },
  },
  {
    slug: 'mitsrayim',
    restored: 'Mitsrayim',
    hebrew: '𐤌𐤑𐤓𐤉𐤌',
    english: 'Egypt',
    type: 'country',
    firstMention: 'Bereshit 10:6',
    location: {
      en: 'Northeastern Africa, centred along the Nile River. The land of Egypt in biblical times stretched from the Nile Delta in the north to the first cataract at Aswan in the south.',
      nl: 'Noordoostelijk Afrika, gecentreerd langs de Nijlrivier. Het land Egypte strekte zich in bijbelse tijden uit van de Nijldelta in het noorden tot de eerste stroomversnelling bij Aswan in het zuiden.',
    },
    meaning: {
      en: '"Besieged fortress / The two straits / Land of bondage" — The word is the dual form of 𐤌𐤑𐤅𐤓 (matsor, "siege, fortress, distress"). The dual form may refer to Upper and Lower Egypt. In Scripture, Mitsrayim becomes a symbol of bondage and slavery — a place Yahuah repeatedly commands His people not to return to.',
      nl: '"Belegerde vesting / De twee zeeëngten / Land van slavernij" — Het woord is de tweevoudsvorm van 𐤌𐤑𐤅𐤓 (matsor, "belegering, vesting, benauwenis"). De tweevoudsvorm verwijst mogelijk naar Boven- en Beneden-Egypte. In de Schriften wordt Mitsrayim een symbool van slavernij — een plek waarheen Yahuah Zijn volk herhaaldelijk beveelt niet terug te keren.',
    },
    origin: {
      en: 'Mitsrayim is named after a son of Ham, son of Noaḥ (Bereshit 10:6) — one of the seventy original nations. Yisra\'ĕl\'s history with Egypt is complex and prophetic. Aḇraham went there during famine (Bereshit 12), Yoseph was sold there and rose to be its second ruler, and the entire family of Ya\'aqoḇ settled there — eventually becoming 600,000 fighting men plus women and children, enslaved for 430 years until the Exodus under Mosheh.',
      nl: 'Mitsrayim is vernoemd naar een zoon van Cham, de zoon van Noaḥ (Bereshit 10:6) — een van de zeventig oorspronkelijke volken. De geschiedenis van Yisra\'ĕl met Egypte is complex en profetisch. Aḇraham ging er heen tijdens hongersnood (Bereshit 12), Yoseph werd er verkocht en steeg op tot de tweede heerser, en de hele familie van Ya\'aqoḇ vestigde zich er — uiteindelijk 600.000 strijdende mannen plus vrouwen en kinderen, 430 jaar lang tot slaaf gemaakt tot de Uittocht onder Mosheh.',
    },
    significance: {
      en: 'The Exodus from Mitsrayim is the defining event of the Old Covenant — the great act of deliverance that Yahuah refers to throughout the Scriptures as evidence of His power and faithfulness. The Passover (Pesaḥ) commemorates it. The ten plagues were judgements against Egypt\'s gods, proving Yahuah\'s supremacy. Mitsrayim also sheltered the infant Yahusha (MattithYahu 2:13-15), fulfilling the prophecy "Out of Mitsrayim I called My Son" (Hoshea 11:1).',
      nl: 'De Uittocht uit Mitsrayim is de bepalende gebeurtenis van het Oude Verbond — de grote daad van bevrijding waarnaar Yahuah door de Schriften heen verwijst als bewijs van Zijn kracht en trouw. Het Pascha (Pesaḥ) herdenkt het. De tien plagen waren oordelen over de goden van Egypte, die de suprematie van Yahuah bewezen. Mitsrayim gaf ook onderdak aan de kleine Yahusha (MattithYahu 2:13-15), waardoor de profetie werd vervuld "Uit Mitsrayim heb Ik Mijn Zoon geroepen" (Hoshea 11:1).',
    },
  },
  {
    slug: 'tsiyon',
    restored: 'Tsiyon',
    hebrew: '𐤑𐤉𐤅𐤍',
    english: 'Zion',
    type: 'city',
    firstMention: 'Shemuel B 5:7',
    location: {
      en: 'Originally the southeastern hill of Yerushalayim captured from the Yebusites. Later the name expanded to mean the entire city of Yerushalayim, the Temple Mount, and eventually the heavenly city of Yahuah.',
      nl: 'Oorspronkelijk de zuidoostelijke heuvel van Yerushalayim die veroverd werd van de Jebusieten. Later breidde de naam zich uit tot de gehele stad Yerushalayim, de Tempelberg, en uiteindelijk de hemelse stad van Yahuah.',
    },
    meaning: {
      en: '"Fortress / Parched / Monument / Signpost" — The root is uncertain. Possible connections to 𐤑𐤉𐤍 (tsin, "parched, dry") or to a root meaning "monument". In poetic use it became synonymous with the presence and dwelling of Yahuah.',
      nl: '"Vesting / Uitgedroogd / Monument / Wegwijzer" — De wortel is onzeker. Mogelijke verbindingen met 𐤑𐤉𐤍 (tsin, "droog, uitgedroogd") of met een wortel die "monument" betekent. In poëtisch gebruik werd het synoniem met de aanwezigheid en woning van Yahuah.',
    },
    origin: {
      en: 'Tsiyon first appears as "the stronghold of Tsiyon" — the Yebusite fortress that Dawid captured and made his capital (Shemuel B 5:7). After Dawid brought the Ark of the Covenant there and Shelomoh built the Temple, the name Tsiyon took on deep theological significance. The Psalms of Tsiyon (Tehillim 46, 48, 76, 84, 87, 122) celebrate it as the place where Yahuah chose to dwell. Over 150 times the Scriptures speak of Tsiyon.',
      nl: 'Tsiyon verschijnt voor het eerst als "de vesting van Tsiyon" — de Jebusitische burcht die Dawid veroverde en tot zijn hoofdstad maakte (Shemuel B 5:7). Nadat Dawid de Verbondsark erheen bracht en Shelomoh de Tempel bouwde, kreeg de naam Tsiyon diepe theologische betekenis. De Psalmen van Tsiyon (Tehillim 46, 48, 76, 84, 87, 122) vieren het als de plaats waar Yahuah ervoor koos te wonen. Meer dan 150 keer spreken de Schriften over Tsiyon.',
    },
    significance: {
      en: 'Tsiyon is the mountain of Yahuah (YeshaYahu 2:3), the joy of all the earth (Tehillim 48:2), and the place from which Torah will go forth in the age to come. The Renewed Covenant speaks of believers coming "to Mount Tsiyon — to the city of the living Aluahim, the heavenly Yerushalayim" (Ibrim 12:22). It is ultimately the eternal home of the redeemed.',
      nl: 'Tsiyon is de berg van Yahuah (YeshaYahu 2:3), de vreugde van de gehele aarde (Tehillim 48:2), en de plaats vanwaar Torah in het komende tijdperk zal uitgaan. Het Vernieuwde Verbond spreekt van gelovigen die komen "tot de berg Tsiyon — tot de stad van de levende Aluahim, het hemelse Yerushalayim" (Ibrim 12:22). Het is uiteindelijk het eeuwige thuis van de verlosten.',
    },
  },
  {
    slug: 'sinai',
    restored: 'Sinai',
    hebrew: '𐤎𐤉𐤍𐤉',
    english: 'Sinai / Horeb',
    type: 'mountain',
    firstMention: 'Shemoth 16:1',
    location: {
      en: 'A mountain in the Sinai Peninsula. The exact location is debated — traditional identification is Jebel Musa in the southern Sinai, though some scholars place it in northwest Arabia (modern Saudi Arabia).',
      nl: 'Een berg op het Sinaïschiereiland. De exacte locatie is omstreden — de traditionele identificatie is Jebel Musa in het zuiden van Sinaï, hoewel sommige geleerden het plaatsen in noordwest-Arabië (modern Saoedi-Arabië).',
    },
    meaning: {
      en: '"Jagged / Clayey / Of Sin (the moon god)" — Possibly from the Aramaic for "pointed" or related to the Babylonian moon deity Sin, whose worship was common in the region. The mountain is also called Horeb (𐤇𐤓𐤁, "desolation / dryness").',
      nl: '"Gekarteld / Kleiachtig / Van Sin (de maangod)" — Mogelijk van het Aramees voor "puntig" of gerelateerd aan de Babylonische maangod Sin, wiens verering in de regio gebruikelijk was. De berg wordt ook Horeb (𐤇𐤓𐤁, "woestenij / droogte") genoemd.',
    },
    origin: {
      en: 'Sinai is most famous as the mountain of the Covenant — where Yahuah descended in fire, thunder, and smoke to give the Torah to Yisra\'ĕl through Mosheh (Shemoth 19-20). Mosheh met Yahuah first at this mountain when He appeared in the burning bush (Shemoth 3). EliYahu the prophet also fled here in despair and met Yahuah in "the still small voice" (Melakim A 19). The Torah given at Sinai forms the foundation of the covenant relationship between Yahuah and His people.',
      nl: 'Sinai is het beroemdst als de berg van het Verbond — waar Yahuah neerdaalde in vuur, donder en rook om de Torah aan Yisra\'ĕl te geven door Mosheh (Shemoth 19-20). Mosheh ontmoette Yahuah eerst op deze berg toen Hij verscheen in de brandende braamstruik (Shemoth 3). EliYahu de profeet vluchtte ook hierheen in wanhoop en ontmoette Yahuah in "de stille, zachte stem" (Melakim A 19). De Torah gegeven op Sinai vormt de grondslag van de verbondsrelatie tussen Yahuah en Zijn volk.',
    },
    significance: {
      en: 'Shaul writes in Galatiyim 4:24-25 that "Sinai" represents the covenant of law, contrasted with the heavenly Yerushalayim. The giving of the Torah at Sinai is linked by timing to Shavuot (Pentecost) — 50 days after Pesaḥ — when the Ruach ha\'Qodesh was poured out on believers in Yerushalayim (Ma\'aseh 2). The law written on stone tablets at Sinai was fulfilled in the law written on hearts by the Ruach.',
      nl: 'Shaul schrijft in Galatiyim 4:24-25 dat "Sinai" het verbond van de wet vertegenwoordigt, in tegenstelling tot het hemelse Yerushalayim. Het geven van de Torah op Sinai is qua timing gekoppeld aan Shavuot (Pinksteren) — 50 dagen na Pesaḥ — toen de Ruach ha\'Qodesh werd uitgestort over gelovigen in Yerushalayim (Ma\'aseh 2). De wet geschreven op stenen tafelen op Sinai werd vervuld in de wet geschreven op harten door de Ruach.',
    },
  },
  {
    slug: 'yeriho',
    restored: 'Yeriho',
    hebrew: '𐤉𐤓𐤉𐤇𐤅',
    english: 'Jericho',
    type: 'city',
    firstMention: 'Bemidbar 22:1',
    location: {
      en: 'In the Jordan Valley, about 8 km north of the Dead Sea and 27 km northeast of Yerushalayim. At roughly 258 metres below sea level, it is the lowest city on earth.',
      nl: 'In de Jordaanvallei, ongeveer 8 km ten noorden van de Dode Zee en 27 km ten noordoosten van Yerushalayim. Op ongeveer 258 meter onder zeeniveau is het de laagste stad op aarde.',
    },
    meaning: {
      en: '"City of the Moon / Fragrant / Place of Fragrance" — Possibly from 𐤉𐤓𐤇 (yareach, "moon") — the city may have been a centre of moon worship. Alternatively from 𐤓𐤉𐤇 (reaḥ, "fragrance, aroma"), referring to its fertile, perfumed gardens.',
      nl: '"Stad van de Maan / Geurig / Plaats van Geur" — Mogelijk van 𐤉𐤓𐤇 (yareach, "maan") — de stad was mogelijk een centrum van maanverering. Alternatief van 𐤓𐤉𐤇 (reaḥ, "geur, aroma"), verwijzend naar zijn vruchtbare, geurende tuinen.',
    },
    origin: {
      en: 'Yeriho is one of the oldest continuously inhabited cities on earth — archaeological evidence suggests occupation going back over 10,000 years. In Scripture it is the first city Yisra\'ĕl encountered upon entering the Promised Land. Yahusha bin Nun sent two spies there, hidden by the innkeeper Raḥab, who hung a scarlet cord from her window (a picture of the blood of the covenant). After seven days of marching and seven blasts of the ram\'s horn on the seventh day, the walls collapsed (Yahusha 6).',
      nl: 'Yeriho is een van de oudste continu bewoonde steden op aarde — archeologisch bewijs suggereert bewoning die teruggaat meer dan 10.000 jaar. In de Schriften is het de eerste stad die Yisra\'ĕl tegenkwam bij het betreden van het Beloofde Land. Yahusha bin Nun stuurde er twee verspieders naartoe, verborgen door de herbergierster Raḥab, die een scharlakenrode koord uit haar raam hing (een beeld van het bloed van het verbond). Na zeven dagen marcheren en zeven klanken van de ramshoorn op de zevende dag, stortten de muren in (Yahusha 6).',
    },
    significance: {
      en: 'Yeriho\'s fall was entirely supernatural — no weapons, no siege engines, only obedience, faith, and the shofar. It models what all spiritual victory looks like: not by might nor by power, but by the Ruach of Yahuah (ZekarYah 4:6). In the Renewed Covenant, Yahusha passed through Yeriho, where He healed blind Bartimaeus and called the tax collector Zaccheus down from a tree.',
      nl: 'De val van Yeriho was geheel bovennatuurlijk — geen wapens, geen belegeringswerktuigen, alleen gehoorzaamheid, geloof en de sjofar. Het modelleert hoe alle geestelijke overwinning eruit ziet: niet door kracht noch door macht, maar door de Ruach van Yahuah (ZekarYah 4:6). In het Vernieuwde Verbond trok Yahusha door Yeriho, waar Hij de blinde Bartimaeus genas en de tollenaar Zacheus van een boom riep.',
    },
  },
  {
    slug: 'yarden',
    restored: 'Yarden',
    hebrew: '𐤉𐤓𐤃𐤍',
    english: 'Jordan (River)',
    type: 'river',
    firstMention: 'Bereshit 13:10',
    location: {
      en: 'The primary river of the land of Yisra\'ĕl, flowing from the slopes of Mount Hermon in the north southward through the Sea of Galil (Kinneret), through the Jordan Valley, and into the Salt Sea (Dead Sea) — a total length of about 360 km.',
      nl: 'De primaire rivier van het land Yisra\'ĕl, stromend van de hellingen van de berg Hermon in het noorden zuidwaarts door de Zee van Galil (Kinneret), door de Jordaanvallei, en in de Zoutzee (Dode Zee) — een totale lengte van ongeveer 360 km.',
    },
    meaning: {
      en: '"Descender / The one flowing down" — From 𐤉𐤓𐤃 (yarad, "to go down, descend"). The Jordan descends dramatically from Mount Hermon (over 2,800m above sea level) all the way to the Dead Sea (430m below sea level) — one of the greatest descents of any river on earth.',
      nl: '"Afdaler / Degene die neerstromt" — Van 𐤉𐤓𐤃 (yarad, "neergaan, afdalen"). De Jordaan daalt dramatisch af van de berg Hermon (meer dan 2.800m boven zeeniveau) helemaal tot aan de Dode Zee (430m onder zeeniveau) — een van de grootste dalingen van welke rivier dan ook op aarde.',
    },
    origin: {
      en: 'The Yarden formed the eastern border of the Promised Land. Yisra\'ĕl crossed it miraculously — the waters parted as the priests carrying the Ark of the Covenant stepped into it (Yahusha 3) — mirroring the crossing of the Yam Suph under Mosheh. The prophet Elisha healed Naaman the Syrian by having him dip seven times in the Yarden (Melakim B 5). Most significantly, Yahuchanan the Immerser baptised in the Yarden, and Yahusha was immersed there by him.',
      nl: 'De Yarden vormde de oostelijke grens van het Beloofde Land. Yisra\'ĕl stak het op wonderbaarlijke wijze over — de wateren scheidden zich toen de priesters die de Verbondsark droegen erin stapten (Yahusha 3) — spiegelend de oversteek van de Yam Suph onder Mosheh. De profeet Elisha genas Naaman de Syriër door hem zeven keer in de Yarden te laten onderdompelen (Melakim B 5). Het allerbelangrijkst, Yahuchanan de Onderdompelaar doopte in de Yarden, en Yahusha werd er door hem ondergedompeld.',
    },
    significance: {
      en: 'The Yarden is the river of transition — of crossing over from wilderness into promise. Immersion in water is connected to this imagery throughout Scripture, representing death to the old life and new life in Yahuah. When Yahusha rose from the Yarden after His immersion, the Ruach descended upon Him and the Father\'s voice spoke: "This is My beloved Son, in whom I am well pleased" (MattithYahu 3:17).',
      nl: 'De Yarden is de rivier van overgang — van het oversteken van woestijn naar belofte. Onderdompeling in water is door de Schriften heen verbonden aan deze beeldspraak, die de dood aan het oude leven en het nieuwe leven in Yahuah vertegenwoordigt. Toen Yahusha uit de Yarden opsteeg na Zijn onderdompeling, daalde de Ruach op Hem neer en sprak de stem van de Vader: "Dit is Mijn geliefde Zoon, in wie Ik welbehagen heb" (MattithYahu 3:17).',
    },
  },
  {
    slug: 'beyth-el',
    restored: "Bĕyth El",
    hebrew: '𐤁𐤉𐤕 𐤀𐤋',
    english: 'Bethel',
    type: 'city',
    firstMention: 'Bereshit 12:8',
    location: {
      en: 'About 17 km north of Yerushalayim in the hill country of Ephraim. One of the highest points in the central highlands of the land.',
      nl: 'Ongeveer 17 km ten noorden van Yerushalayim in het heuvelland van Efraïm. Een van de hoogste punten in het centrale hoogland van het land.',
    },
    meaning: {
      en: '"House of Aluahim" — From 𐤁𐤉𐤕 (beyt, "house") + 𐤀𐤋 (El, "Aluahim / the Mighty One"). Previously called Luz (𐤋𐤅𐤆, "almond tree"), its name was changed by Ya\'aqoḇ after his encounter with Yahuah there.',
      nl: '"Huis van Aluahim" — Van 𐤁𐤉𐤕 (beyt, "huis") + 𐤀𐤋 (El, "Aluahim / de Machtige"). Voorheen Luz (𐤋𐤅𐤆, "amandelboom") genaamd, werd de naam veranderd door Ya\'aqoḇ na zijn ontmoeting met Yahuah daar.',
    },
    origin: {
      en: 'Aḇraham first built an altar near Bĕyth El (Bereshit 12:8). But its defining moment came when Ya\'aqoḇ, fleeing from his brother, lay down to sleep with a stone for a pillow. He dreamed of a stairway (ladder) reaching to heaven with messengers ascending and descending, and Yahuah stood above it and reaffirmed the covenant. Ya\'aqoḇ woke and said: "Surely Yahuah is in this place and I did not know it... This is none other than the house of Aluahim, and this is the gate of heaven" (Bereshit 28:16-17). He set up the stone as a pillar and named the place Bĕyth El.',
      nl: 'Aḇraham bouwde voor het eerst een altaar nabij Bĕyth El (Bereshit 12:8). Maar het bepalende moment kwam toen Ya\'aqoḇ, vluchtend voor zijn broer, neerlag om te slapen met een steen als kussen. Hij droomde van een trap (ladder) die tot de hemel reikte met boodschappers die op- en neerstegen, en Yahuah stond daarboven en bevestigde het verbond opnieuw. Ya\'aqoḇ ontwaakte en zei: "Zeker is Yahuah op deze plaats en ik wist het niet... Dit is niets anders dan het huis van Aluahim, en dit is de poort van de hemel" (Bereshit 28:16-17). Hij richtte de steen op als een gedenkzuil en noemde de plaats Bĕyth El.',
    },
    significance: {
      en: 'Bĕyth El — the Gate of Heaven — is where earth and heaven touched in Ya\'aqoḇ\'s dream. Yahusha applies this imagery to Himself: "You will see heaven opened and the messengers of Aluahim ascending and descending on the Son of Adam" (Yahuchanan 1:51) — He is the true Bĕyth El, the meeting place between Yahuah and man.',
      nl: 'Bĕyth El — de Poort van de Hemel — is waar aarde en hemel elkaar raakten in Ya\'aqoḇs droom. Yahusha past deze beeldspraak op Zichzelf toe: "Je zult de hemel geopend zien en de boodschappers van Aluahim opklimmen en neerdalen op de Zoon van de Mens" (Yahuchanan 1:51) — Hij is het ware Bĕyth El, de ontmoetingsplaats tussen Yahuah en de mens.',
    },
  },
  {
    slug: 'babel',
    restored: 'Baḇel',
    hebrew: '𐤁𐤁𐤋',
    english: 'Babylon / Babel',
    type: 'city',
    firstMention: 'Bereshit 10:10',
    location: {
      en: 'Ancient Mesopotamia, on the Euphrates River — in what is today central Iraq, about 80 km south of Baghdad.',
      nl: 'Oud Mesopotamië, aan de Eufraat — in wat vandaag centraal Irak is, ongeveer 80 km ten zuiden van Bagdad.',
    },
    meaning: {
      en: '"Gate of God / Gate of the gods" — From the Akkadian Bāb-ilim ("Gate of God/gods"). But Yahuah gave it a different meaning: at Babel the languages were confused (𐤁𐤋𐤋, balal, "to mix, confuse, confound"), so it became "Confusion".',
      nl: '"Poort van God / Poort van de goden" — Van het Akkadische Bāb-ilim ("Poort van God/goden"). Maar Yahuah gaf het een andere betekenis: bij Babel werden de talen verward (𐤁𐤋𐤋, balal, "mengen, verwarren"), zodat het "Verwarring" werd.',
    },
    origin: {
      en: 'Babel first appears as part of the kingdom of Nimrod (Bereshit 10:10) — the first "mighty man" after the flood. The Tower of Babel (Bereshit 11) was humanity\'s united attempt to build a tower to the heavens and "make a name for themselves" — the first great act of collective pride against Yahuah. He confused their language, scattering them across the earth. Babel grew into the mighty empire of Babylon, which destroyed Yerushalayim in 586 BCE and carried Yisra\'ĕl into a 70-year exile as foretold by the prophets.',
      nl: 'Babel verschijnt voor het eerst als onderdeel van het koninkrijk van Nimrod (Bereshit 10:10) — de eerste "machtige man" na de vloed. De Toren van Babel (Bereshit 11) was de verenigde poging van de mensheid om een toren te bouwen tot de hemelen en "zichzelf een naam te maken" — de eerste grote daad van collectieve trots tegen Yahuah. Hij verwarde hun taal en verspreidde hen over de aarde. Babel groeide uit tot het machtige rijk van Babylon, dat Yerushalayim in 586 vGT verwoestte en Yisra\'ĕl meenam in een 70-jarige ballingschap zoals de profeten hadden voorzegd.',
    },
    significance: {
      en: 'Baḇel / Babylon is the great prophetic counterpart to Yerushalayim — the city of man versus the city of Yahuah, pride versus humility, confusion versus shalom. The book of Hazon (Revelation) uses "Babylon" as a symbol for the world system opposed to Yahuah, whose fall is celebrated by heaven (Hazon 18). At Shavuot (Acts 2) the curse of Babel was reversed — people from every language heard the good news in their own tongue.',
      nl: 'Baḇel / Babylon is het grote profetische tegendeel van Yerushalayim — de stad van de mens versus de stad van Yahuah, trots versus nederigheid, verwarring versus shalom. Het boek Hazon (Openbaring) gebruikt "Babylon" als symbool voor het wereldsysteem dat Yahuah weerstaat, waarvan de val door de hemel gevierd wordt (Hazon 18). Bij Shavuot (Handelingen 2) werd de vloek van Babel omgekeerd — mensen van elke taal hoorden het goede nieuws in hun eigen tong.',
    },
  },
]
