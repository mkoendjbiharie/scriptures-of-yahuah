export type LocaleText = { en: string; nl: string }

export interface NameEntry {
  slug: string
  restored: string        // Form used in Hallelujah Scriptures
  hebrew: string          // Modern Hebrew script
  paleo?: string          // Paleo/ancient Hebrew (Unicode Phoenician)
  english: string         // Traditional English name
  category: 'divine' | 'patriarch' | 'matriarch' | 'prophet' | 'king' | 'apostle' | 'other'
  testament: 'old' | 'new' | 'both'
  firstMention: string
  meaning: LocaleText
  origin: LocaleText
  significance: LocaleText
}

export const NAMES_DATA: NameEntry[] = [
  // ── DIVINE ────────────────────────────────────────────────────────────────
  {
    slug: 'yahuah',
    restored: 'HWHY',
    hebrew: '𐤉𐤄𐤅𐤄',
    paleo: '𐤉𐤄𐤅𐤄',
    english: 'The LORD / YHWH',
    category: 'divine',
    testament: 'both',
    firstMention: 'Bereshit 2:4',
    meaning: {
      en: '"I AM that I AM" — The Self-Existing, Eternal One. The name comes from the Hebrew root 𐤄𐤉𐤄 (hayah), meaning "to be" or "to exist". It expresses absolute, self-sustained existence.',
      nl: '"IK BEN DIE IK BEN" — De Zelfbestaande, Eeuwige. De naam komt van de Hebreeuwse wortel 𐤄𐤉𐤄 (hayah), wat betekent "zijn" of "bestaan". Het drukt absoluut, zelfstandig bestaan uit.',
    },
    origin: {
      en: 'The sacred Name was revealed to Mosheh at the burning bush (Shemoth 3:14). The four letters — Yod (𐤉), He (𐤄), Waw (𐤅), He (𐤄) — form the Tetragrammaton (meaning "four letters"). Ancient scribes later replaced it with "Adonai" (My Master) out of reverence, and translators further obscured it with "LORD" or "GOD". The Hallelujah Scriptures and many restored-name editions return this Name to every verse where it appears — over 6,800 times in the ancient text.',
      nl: 'De heilige Naam werd aan Mosheh geopenbaard bij de brandende braamstruik (Shemoth 3:14). De vier letters — Yod (𐤉), He (𐤄), Waw (𐤅), He (𐤄) — vormen het Tetragrammaton (betekent "vier letters"). Oude schriftgeleerden vervingen het later door "Adonai" (Mijn Meester) uit eerbied, en vertalers verduisterden het verder met "HEERE" of "GOD". De Hallelujah Scriptures brengen deze Naam terug in elk vers waar hij verschijnt — meer dan 6.800 keer in de oude tekst.',
    },
    significance: {
      en: 'This is the personal, covenant Name of the Most High. It distinguishes Him from all other elohim and is the foundation of all other Hebrew names — many of which contain "Yahu" or "Yah" as a prefix or suffix, pointing back to Him.',
      nl: 'Dit is de persoonlijke, verbondsnaam van de Allerhoogste. Het onderscheidt Hem van alle andere elohim en is de basis van alle andere Hebreeuwse namen — veel waarvan "Yahu" of "Yah" bevatten als voor- of achtervoegsel, die terugwijzen naar Hem.',
    },
  },
  {
    slug: 'yahusha',
    restored: 'Yahusha',
    hebrew: '𐤉𐤄𐤅𐤔𐤏',
    english: 'Jesus / Joshua',
    category: 'divine',
    testament: 'both',
    firstMention: 'Shemoth 17:9 (as Joshua) / MattithYahu 1:1 (as Messiah)',
    meaning: {
      en: '"Yahuah is Salvation" — The name is a direct combination of 𐤉𐤄𐤅𐤄 (Yahuah) + 𐤉𐤔𐤏 (yasha, "to save, deliver"). Every time His name is spoken, it proclaims the saving power of the Father.',
      nl: '"Yahuah is Redding" — De naam is een directe combinatie van 𐤉𐤄𐤅𐤄 (Yahuah) + 𐤉𐤔𐤏 (yasha, "redden, bevrijden"). Elke keer dat Zijn naam wordt uitgesproken, verkondigt het de reddende kracht van de Vader.',
    },
    origin: {
      en: 'The name Yahusha was first borne by Yahusha bin Nun — the successor of Mosheh who led Israel into the Promised Land. The Messenger of Yahuah instructed Yoseph to name the Messiah "Yahusha", for "He shall save His people from their sins" (MattithYahu 1:21). The Greek rendering "Iēsous" and later Latin "Iesus" (becoming "Jesus") obscured the Hebraic roots and the embedded Name of the Father.',
      nl: 'De naam Yahusha werd eerst gedragen door Yahusha bin Nun — de opvolger van Mosheh die Israël het Beloofde Land in leidde. De Boodschapper van Yahuah droeg Yoseph op de Messias "Yahusha" te noemen, want "Hij zal Zijn volk redden van hun zonden" (MattithYahu 1:21). De Griekse weergave "Iēsous" en later het Latijnse "Iesus" (dat "Jezus" werd) verduisterde de Hebreeuwse wortels en de ingebedde Naam van de Vader.',
    },
    significance: {
      en: 'The name Yahusha appears over 200 times in the Renewed Covenant. It is the name above every name (Pilippiyim 2:9-11), the only name given among men by which we must be saved (Ma\'aseh 4:12). He is the living Word — the full expression of the Father\'s character.',
      nl: 'De naam Yahusha verschijnt meer dan 200 keer in het Vernieuwde Verbond. Het is de naam boven elke naam (Pilippiyim 2:9-11), de enige naam gegeven onder mensen waardoor wij gered moeten worden (Ma\'aseh 4:12). Hij is het levende Woord — de volledige uitdrukking van het karakter van de Vader.',
    },
  },
  {
    slug: 'aluahim',
    restored: 'Aluahim',
    hebrew: '𐤀𐤋𐤄𐤉𐤌',
    english: 'God / Elohim',
    category: 'divine',
    testament: 'both',
    firstMention: 'Bereshit 1:1',
    meaning: {
      en: '"Mighty Ones" — A plural noun from the root 𐤀𐤋 (El, "mighty, strong, powerful"). The plural form is used even when referring to the one Most High, suggesting fullness of power, majesty, and — for those who believe — a hint of the plural nature within the unity of Yahuah.',
      nl: '"Machtige Wezens" — Een meervoudig zelfstandig naamwoord van de wortel 𐤀𐤋 (El, "machtig, sterk, krachtig"). De meervoudsvorm wordt ook gebruikt wanneer verwezen wordt naar de ene Allerhoogste, wat volheid van kracht, majesteit suggereert — en voor gelovigen een hint van de meervoudige natuur binnen de eenheid van Yahuah.',
    },
    origin: {
      en: 'The very first word used to describe the Creator in the Scriptures is Aluahim (Bereshit 1:1). It opens with the declaration: "In the beginning Aluahim created the heavens and the earth." The singular verb "created" (bara) used with this plural noun shows unity within plurality. This title is also used for false mighty ones, angels, and human judges in certain contexts.',
      nl: 'Het allereerste woord dat gebruikt wordt om de Schepper te beschrijven in de Schriften is Aluahim (Bereshit 1:1). Het opent met de verklaring: "In het begin schiep Aluahim de hemelen en de aarde." Het enkelvoudige werkwoord "schiep" (bara) dat met dit meervoudige zelfstandig naamwoord wordt gebruikt, toont eenheid in meervoudigheid. Deze titel wordt ook gebruikt voor valse machtige wezens, engelen en menselijke rechters in bepaalde contexten.',
    },
    significance: {
      en: 'Aluahim appears over 2,600 times in the Scriptures. Often paired with the personal Name — "Yahuah Aluahim" — combining His eternal identity with His role as the Mighty Creator and Covenant-Keeper.',
      nl: 'Aluahim verschijnt meer dan 2.600 keer in de Schriften. Vaak gekoppeld aan de persoonlijke Naam — "Yahuah Aluahim" — de combinatie van Zijn eeuwige identiteit met Zijn rol als de Machtige Schepper en Verbondshouder.',
    },
  },

  // ── PATRIARCHS ─────────────────────────────────────────────────────────────
  {
    slug: 'adam',
    restored: 'Aḏam',
    hebrew: '𐤀𐤃𐤌',
    english: 'Adam',
    category: 'patriarch',
    testament: 'old',
    firstMention: 'Bereshit 1:26',
    meaning: {
      en: '"Man / From the red earth" — From the Hebrew 𐤀𐤃𐤌𐤄 (adamah, "ground, earth, soil") and related to 𐤀𐤃𐤌 (adom, "red"). His very name connects him to his origin: formed from the dust of the ground by the hands of Yahuah.',
      nl: '"Mens / Uit de rode aarde" — Van het Hebreeuws 𐤀𐤃𐤌𐤄 (adamah, "grond, aarde") en gerelateerd aan 𐤀𐤃𐤌 (adom, "rood"). Zijn naam zelf verbindt hem aan zijn oorsprong: gevormd uit het stof van de aarde door de handen van Yahuah.',
    },
    origin: {
      en: 'Aḏam was the first man, formed by Yahuah Aluahim from the dust of the ground (Bereshit 2:7). The breath of life was breathed directly into his nostrils — he alone of all creation received life this way. He was placed in the Garden of Eden to tend and guard it. His fall through disobedience brought sin and death into the world, making the promise of a Redeemer (Bereshit 3:15) — the seed of the woman — the central thread of all Scripture.',
      nl: 'Aḏam was de eerste mens, gevormd door Yahuah Aluahim uit het stof van de aarde (Bereshit 2:7). De levensadem werd direct in zijn neusgaten geblazen — hij alleen van alle schepping ontving het leven op deze manier. Hij werd in de Tuin van Eden geplaatst om die te bewerken en te bewaken. Zijn val door ongehoorzaamheid bracht zonde en dood in de wereld, waardoor de belofte van een Verlosser (Bereshit 3:15) — het zaad van de vrouw — de centrale draad van alle Schrift werd.',
    },
    significance: {
      en: 'The Renewed Covenant calls Yahusha "the last Adam" (1 Qorintiyim 15:45) — where the first Adam brought death through disobedience, the last Adam brings life through perfect obedience. Aḏam\'s story is humanity\'s story.',
      nl: 'Het Vernieuwde Verbond noemt Yahusha "de laatste Adam" (1 Qorintiyim 15:45) — waar de eerste Adam de dood bracht door ongehoorzaamheid, brengt de laatste Adam leven door volmaakte gehoorzaamheid. Het verhaal van Aḏam is het verhaal van de mensheid.',
    },
  },
  {
    slug: 'hawwah',
    restored: 'Ḥawwah',
    hebrew: '𐤇𐤅𐤄',
    english: 'Eve',
    category: 'matriarch',
    testament: 'old',
    firstMention: 'Bereshit 3:20',
    meaning: {
      en: '"Life-giver / Mother of all living" — From the root 𐤇𐤉𐤄 (hayah, "to live"). Aḏam named her this because she was to become the mother of all the living (Bereshit 3:20).',
      nl: '"Levensgever / Moeder van alle levenden" — Van de wortel 𐤇𐤉𐤄 (hayah, "leven"). Aḏam noemde haar zo omdat zij de moeder van alle levenden zou worden (Bereshit 3:20).',
    },
    origin: {
      en: 'Ḥawwah was formed from the rib (or side) of Aḏam while he slept — the only human being ever created from another human being. She is the crown of creation, the helper perfectly suited for Aḏam. Her encounter with the serpent in the garden, her taking of the fruit, and Aḏam\'s following her led to the Fall — yet Yahuah\'s first promise of redemption was spoken directly in her presence (Bereshit 3:15).',
      nl: 'Ḥawwah werd gevormd uit de rib (of zijde) van Aḏam terwijl hij sliep — het enige menselijke wezen ooit gecreëerd uit een ander menselijk wezen. Zij is de kroon van de schepping, de helper die perfect geschikt is voor Aḏam. Haar ontmoeting met de slang in de tuin, haar nemen van de vrucht, en Aḏams het haar volgen leidde tot de Val — maar Yahuahs eerste belofte van verlossing werd direct in haar aanwezigheid gesproken (Bereshit 3:15).',
    },
    significance: {
      en: 'Ḥawwah is the mother of all humanity. Her name carries within it the Hebrew word for "life" — a profound irony and grace, since her act brought death, yet through her seed came the Author of life. The promised "seed of the woman" (Bereshit 3:15) points forward to Yahusha, born of a woman.',
      nl: 'Ḥawwah is de moeder van de gehele mensheid. Haar naam draagt het Hebreeuwse woord voor "leven" in zich — een diepe ironie en genade, want haar daad bracht de dood, maar door haar zaad kwam de Auteur van het leven. Het beloofde "zaad van de vrouw" (Bereshit 3:15) wijst vooruit naar Yahusha, geboren uit een vrouw.',
    },
  },
  {
    slug: 'noah',
    restored: 'Noaḥ',
    hebrew: '𐤍𐤇',
    english: 'Noah',
    category: 'patriarch',
    testament: 'old',
    firstMention: 'Bereshit 5:29',
    meaning: {
      en: '"Rest / Comfort" — From the root 𐤍𐤅𐤇 (nuach, "to rest, settle, be still"). His father Lemek gave him this name saying: "This one shall comfort us concerning our work and the toil of our hands, from the ground which Yahuah has cursed" (Bereshit 5:29).',
      nl: '"Rust / Troost" — Van de wortel 𐤍𐤅𐤇 (nuach, "rusten, neerleggen, stil zijn"). Zijn vader Lemek gaf hem deze naam en zei: "Deze zal ons troosten over ons werk en de moeite van onze handen, van de grond die Yahuah heeft vervloekt" (Bereshit 5:29).',
    },
    origin: {
      en: 'Noaḥ lived in a generation so corrupt that Yahuah grieved that He had made man. Yet Noaḥ "found favour in the eyes of Yahuah" — he was a righteous man, perfect in his generations, who walked with Aluahim (Bereshit 6:8-9). He built the ark as instructed, preserved his household of eight, and through him all life on earth was preserved. After the flood, Yahuah established the first formal covenant with him, sealed with a rainbow.',
      nl: 'Noaḥ leefde in een generatie zo corrupt dat Yahuah berouw had dat Hij de mens had gemaakt. Maar Noaḥ "vond genade in de ogen van Yahuah" — hij was een rechtvaardige man, volmaakt in zijn generaties, die met Aluahim wandelde (Bereshit 6:8-9). Hij bouwde de ark zoals opgedragen, bewaarde zijn huishouden van acht, en door hem werd al het leven op aarde bewaard. Na de vloed vestigde Yahuah het eerste formele verbond met hem, bezegeld met een regenboog.',
    },
    significance: {
      en: 'Noaḥ is a type (foreshadowing) of Yahusha — through him came the saving of humanity through water and wood (the ark). Kepha connects the flood to immersion in the Renewed Covenant (1 Kepha 3:20-21). His name "Rest" echoes forward to the Shabbat — the weekly rest Yahuah built into creation.',
      nl: 'Noaḥ is een type (voorafschaduwing) van Yahusha — door hem kwam de redding van de mensheid door water en hout (de ark). Kepha verbindt de vloed met de onderdompeling in het Vernieuwde Verbond (1 Kepha 3:20-21). Zijn naam "Rust" klinkt vooruit naar de Shabbat — de wekelijkse rust die Yahuah in de schepping heeft ingebouwd.',
    },
  },
  {
    slug: 'abraham',
    restored: 'Aḇraham',
    hebrew: '𐤀𐤁𐤓𐤄𐤌',
    english: 'Abraham',
    category: 'patriarch',
    testament: 'both',
    firstMention: 'Bereshit 11:26 (as Aḇram)',
    meaning: {
      en: '"Father of many nations" — His original name was Aḇram (𐤀𐤁𐤓𐤌), meaning "Exalted Father". Yahuah changed it to Aḇraham, adding the letter He (𐤄) — the same letter found twice in the Name 𐤉𐤄𐤅𐤄 — signifying the covenant blessing that would flow through him.',
      nl: '"Vader van vele volken" — Zijn oorspronkelijke naam was Aḇram (𐤀𐤁𐤓𐤌), wat "Verheven Vader" betekent. Yahuah veranderde het in Aḇraham, waarbij de letter He (𐤄) werd toegevoegd — dezelfde letter die twee keer voorkomt in de Naam 𐤉𐤄𐤅𐤄 — wat de verbondszegen vertegenwoordigt die door hem zou vloeien.',
    },
    origin: {
      en: 'Born in Ur of the Chaldees, Aḇraham was called by Yahuah to leave his country, his family, and his father\'s house to go to a land he had not yet seen (Bereshit 12:1). He obeyed by faith — not knowing where he was going. Yahuah made an everlasting covenant with him: his seed would be as the stars of heaven and the sand of the sea. The greatest test came when he was asked to offer his only promised son, Yitsḥaq — a foreshadowing of what the Father Himself would do on the same mountain (Moriyah) thousands of years later.',
      nl: 'Geboren in Ur van de Chaldeeën, werd Aḇraham door Yahuah geroepen om zijn land, zijn familie en zijn vaderlijk huis te verlaten om naar een land te gaan dat hij nog niet had gezien (Bereshit 12:1). Hij gehoorzaamde door geloof — zonder te weten waar hij heen ging. Yahuah sloot een eeuwig verbond met hem: zijn zaad zou zijn als de sterren van de hemel en het zand van de zee. De grootste beproeving kwam toen hem gevraagd werd zijn enige beloofde zoon, Yitsḥaq, te offeren — een voorafschaduwing van wat de Vader Zelf op dezelfde berg (Moriyah) duizenden jaren later zou doen.',
    },
    significance: {
      en: 'Aḇraham is called "the friend of Yahuah" (YeshaYahu 41:8) and the father of the faithful. All who trust in Yahuah through Yahusha are said to be children of Aḇraham (Galatiyim 3:7). His faith was credited to him as righteousness (Bereshit 15:6) — the same basis of salvation for all people in all ages.',
      nl: 'Aḇraham wordt "de vriend van Yahuah" genoemd (YeshaYahu 41:8) en de vader van de gelovigen. Allen die in Yahuah vertrouwen door Yahusha worden kinderen van Aḇraham genoemd (Galatiyim 3:7). Zijn geloof werd hem als gerechtigheid toegerekend (Bereshit 15:6) — dezelfde grondslag van redding voor alle mensen in alle tijden.',
    },
  },
  {
    slug: 'yitshaq',
    restored: 'Yitsḥaq',
    hebrew: '𐤉𐤑𐤇𐤒',
    english: 'Isaac',
    category: 'patriarch',
    testament: 'old',
    firstMention: 'Bereshit 17:19',
    meaning: {
      en: '"He laughs" — From 𐤑𐤇𐤒 (tsachaq, "to laugh"). Both Aḇraham (Bereshit 17:17) and Sārāh (Bereshit 18:12) laughed when told they would have a son in their old age — Sārāh out of disbelief, and Aḇraham out of wonder. Yahuah instructed that the boy be named for this laughter.',
      nl: '"Hij lacht" — Van 𐤑𐤇𐤒 (tsachaq, "lachen"). Zowel Aḇraham (Bereshit 17:17) als Sārāh (Bereshit 18:12) lachten toen hen verteld werd dat ze op hun oude dag een zoon zouden krijgen — Sārāh uit ongeloof, en Aḇraham uit verwondering. Yahuah droeg op de jongen naar dit lachen te noemen.',
    },
    origin: {
      en: 'Yitsḥaq was the miracle child of Aḇraham and Sārāh, born when Aḇraham was 100 years old and Sārāh was 90. His birth was entirely supernatural — humanly impossible. He is the child of promise through whom the covenant line would continue. His near-sacrifice on Mount Moriyah (Bereshit 22) is one of the most profound foreshadowings of the sacrifice of Yahusha — the beloved son, the wood laid on his back, the three-day journey, and the ram provided in his place.',
      nl: 'Yitsḥaq was het wonderkind van Aḇraham en Sārāh, geboren toen Aḇraham 100 jaar oud was en Sārāh 90. Zijn geboorte was geheel bovennatuurlijk — menselijkerwijs onmogelijk. Hij is het kind van de belofte door wie de verbondslijn zou worden voortgezet. Zijn bijna-offer op de berg Moriyah (Bereshit 22) is een van de meest diepzinnige voorafschaduwingen van het offer van Yahusha — de geliefde zoon, het hout op zijn rug gelegd, de driedaagse reis, en de ram die in zijn plaats werd voorzien.',
    },
    significance: {
      en: 'Yitsḥaq represents the "child of promise" — the miraculous gift that comes not through human effort but through Yahuah\'s faithfulness. He lived the longest of the patriarchs (180 years) and passed the covenant blessing to his son Ya\'aqoḇ.',
      nl: 'Yitsḥaq vertegenwoordigt het "kind van de belofte" — het wonderlijke geschenk dat niet door menselijke inspanning komt maar door Yahuahs trouw. Hij leefde het langst van de aartsvaders (180 jaar) en gaf de verbondszegen door aan zijn zoon Ya\'aqoḇ.',
    },
  },
  {
    slug: 'yaaqob',
    restored: "Ya'aqoḇ",
    hebrew: '𐤉𐤏𐤒𐤁',
    english: 'Jacob / Israel',
    category: 'patriarch',
    testament: 'both',
    firstMention: 'Bereshit 25:26',
    meaning: {
      en: '"Supplanter / He who follows at the heel" — From 𐤏𐤒𐤁 (aqev, "heel"). He was born grasping his twin brother Esau\'s heel. His name was later changed to Yisra\'ĕl — "He who strives with Aluahim" — after wrestling with the Messenger of Yahuah through the night.',
      nl: '"Verdringer / Hij die op de hiel volgt" — Van 𐤏𐤒𐤁 (aqev, "hiel"). Hij werd geboren terwijl hij de hiel van zijn tweelingbroer Esau vasthield. Zijn naam werd later veranderd in Yisra\'ĕl — "Hij die met Aluahim strijdt" — nadat hij de nacht door had gevochten met de Boodschapper van Yahuah.',
    },
    origin: {
      en: 'Ya\'aqoḇ was born as the second of twins to Yitsḥaq and Riḇqah. He purchased his brother\'s birthright for bread and lentil stew, then received the covenant blessing through his mother\'s deception. He fled to his uncle Laban, worked 14 years for his two wives — Leah and Rachel — and fathered the twelve sons who became the twelve tribes of Yisra\'ĕl. His life-changing wrestling match at the ford of Yabboq resulted in a dislocated hip and a new name: Yisra\'ĕl.',
      nl: 'Ya\'aqoḇ werd geboren als de tweede van een tweeling bij Yitsḥaq en Riḇqah. Hij kocht het eerstgeboorterecht van zijn broer voor brood en linzensoep, en ontving daarna de verbondszegen door het bedrog van zijn moeder. Hij vluchtte naar zijn oom Laban, werkte 14 jaar voor zijn twee vrouwen — Leah en Rachel — en verwekte de twaalf zonen die de twaalf stammen van Yisra\'ĕl werden. Zijn levensveranderende worsteling bij de doorwaadbare plaats van Yabboq resulteerde in een ontwrichte heup en een nieuwe naam: Yisra\'ĕl.',
    },
    significance: {
      en: 'Ya\'aqoḇ / Yisra\'ĕl is the father of the twelve tribes — the physical and spiritual foundation of the people of Yahuah. His name change from "Supplanter" to "He who strives with Aluahim" represents the transformation that comes from a genuine encounter with Yahuah. All twelve of his sons became tribal heads, and his name "Israel" became the collective name for the covenant people.',
      nl: 'Ya\'aqoḇ / Yisra\'ĕl is de vader van de twaalf stammen — de fysieke en geestelijke grondslag van het volk van Yahuah. Zijn naamsverandering van "Verdringer" naar "Hij die met Aluahim strijdt" vertegenwoordigt de transformatie die komt uit een echte ontmoeting met Yahuah. Alle twaalf van zijn zonen werden stamhoofden, en zijn naam "Israël" werd de collectieve naam voor het verbondsvolk.',
    },
  },
  {
    slug: 'mosheh',
    restored: 'Mosheh',
    hebrew: '𐤌𐤔𐤄',
    english: 'Moses',
    category: 'prophet',
    testament: 'both',
    firstMention: 'Shemoth 2:10',
    meaning: {
      en: '"Drawn out of water" — The daughter of Pharaoh named him this because "I drew him out of the water" (Shemoth 2:10). In Hebrew the name is from 𐤌𐤔𐤄 (mashah, "to draw out"). Fittingly, he would later draw an entire nation out of the waters of the Yam Suph (Sea of Reeds).',
      nl: '"Uit het water getrokken" — De dochter van Farao noemde hem zo omdat "ik hem uit het water getrokken heb" (Shemoth 2:10). In het Hebreeuws is de naam van 𐤌𐤔𐤄 (mashah, "eruit trekken"). Toepasselijk genoeg zou hij later een heel volk uit de wateren van de Yam Suph (Rietzee) trekken.',
    },
    origin: {
      en: 'Born a Hebrew slave in Mitsrayim during a time when Pharaoh ordered all male Hebrew infants to be drowned, Mosheh was placed in a basket of reeds by his mother and set adrift on the Nile. He was found and adopted by Pharaoh\'s own daughter. He grew up in the royal palace but later fled to Midian after killing an Egyptian taskmaster. At age 80, Yahuah appeared to him in the burning bush and commissioned him to confront Pharaoh and lead Yisra\'ĕl out of slavery. He received the Torah on Mount Sinai and led the people for 40 years in the wilderness.',
      nl: 'Geboren als een Hebreeuwse slaaf in Mitsrayim tijdens een tijd dat Farao opdracht gaf alle mannelijke Hebreeuwse zuigelingen te verdrinken, werd Mosheh door zijn moeder in een mand van riet gelegd en op de Nijl te water gelaten. Hij werd gevonden en geadopteerd door Farao\'s eigen dochter. Hij groeide op in het koninklijk paleis maar vluchtte later naar Midian nadat hij een Egyptische opziener had gedood. Op de leeftijd van 80 jaar verscheen Yahuah aan hem in de brandende braamstruik en stuurde hem op om Farao te confronteren en Yisra\'ĕl uit de slavernij te leiden. Hij ontving de Torah op de berg Sinai en leidde het volk 40 jaar in de woestijn.',
    },
    significance: {
      en: 'Mosheh is considered the greatest prophet of the old covenant — with whom Yahuah spoke "face to face, as a man speaks with his friend" (Shemoth 33:11). He is the mediator of the first covenant, as Yahusha is the mediator of the renewed covenant. He wrote the first five books of Scripture (the Torah). The Renewed Covenant declares that Yahusha is the Prophet like Mosheh foretold in Debarim 18:15.',
      nl: 'Mosheh wordt beschouwd als de grootste profeet van het oude verbond — met wie Yahuah "van aangezicht tot aangezicht sprak, zoals een man met zijn vriend spreekt" (Shemoth 33:11). Hij is de middelaar van het eerste verbond, zoals Yahusha de middelaar is van het vernieuwde verbond. Hij schreef de eerste vijf boeken van de Schriften (de Torah). Het Vernieuwde Verbond verklaart dat Yahusha de Profeet is zoals Mosheh voorzegd in Debarim 18:15.',
    },
  },
  {
    slug: 'dawid',
    restored: 'Dawid',
    hebrew: '𐤃𐤅𐤃',
    english: 'David',
    category: 'king',
    testament: 'both',
    firstMention: 'Shemuel A 16:13',
    meaning: {
      en: '"Beloved / Dear one" — From the Hebrew root 𐤃𐤅𐤃 (dud, "beloved, uncle"). The name suggests one who is deeply loved and cherished. Yahuah declared him "a man after My own heart" (Ma\'aseh 13:22).',
      nl: '"Geliefde / Dierbare" — Van de Hebreeuwse wortel 𐤃𐤅𐤃 (dud, "geliefde, oom"). De naam suggereert iemand die diep geliefd en gekoesterd is. Yahuah verklaarde hem "een man naar Mijn eigen hart" (Ma\'aseh 13:22).',
    },
    origin: {
      en: 'The youngest of eight sons of Yishai of Bĕyth Leḥem, Dawid was a shepherd boy overlooked even by his own father when the prophet Shemuel came to anoint the next king. Yahuah chose what man would not — the youngest, the least impressive outwardly. Dawid killed the giant Goliath with a sling and stone, served Shaul faithfully despite Shaul\'s murderous jealousy, and eventually became the greatest king of Yisra\'ĕl. He established Yerushalayim as the city of Yahuah and desired to build the Temple. Despite grievous sins of adultery and murder, he repented deeply — his prayer of repentance is Tehillim 51.',
      nl: 'De jongste van acht zonen van Yishai uit Bĕyth Leḥem, was Dawid een herdersjongen die zelfs door zijn eigen vader over het hoofd gezien werd toen de profeet Shemuel kwam om de volgende koning te zalven. Yahuah koos wat de mens niet zou kiezen — de jongste, de minst indrukwekkende van buiten. Dawid doodde de reus Goliath met een slinger en steen, diende Shaul trouw ondanks Shauls moorddadige jaloezie, en werd uiteindelijk de grootste koning van Yisra\'ĕl. Hij vestigde Yerushalayim als de stad van Yahuah en verlangde ernaar de Tempel te bouwen. Ondanks ernstige zonden van overspel en moord, berouwde hij diep — zijn gebed van berouw is Tehillim 51.',
    },
    significance: {
      en: 'Yahuah made an everlasting covenant with Dawid — that one from his line would sit on his throne forever (Shemuel B 7:12-16). Yahusha the Messiah is the ultimate fulfillment of this promise, the Son of Dawid who reigns forever. Dawid wrote much of the book of Tehillim (Psalms), the Scripture\'s great book of worship and prayer.',
      nl: 'Yahuah sloot een eeuwig verbond met Dawid — dat iemand uit zijn lijn voor eeuwig op zijn troon zou zitten (Shemuel B 7:12-16). Yahusha de Messias is de uiteindelijke vervulling van deze belofte, de Zoon van Dawid die voor eeuwig regeert. Dawid schreef veel van het boek Tehillim (Psalmen), het grote boek van aanbidding en gebed van de Schriften.',
    },
  },
  {
    slug: 'eliyahu',
    restored: 'EliYahu',
    hebrew: '𐤀𐤋𐤉𐤄𐤅',
    english: 'Elijah',
    category: 'prophet',
    testament: 'both',
    firstMention: 'Melakim A 17:1',
    meaning: {
      en: '"My Aluahim is Yahuah" — A powerful name-statement: 𐤀𐤋𐤉 (Eli, "my Aluahim") + 𐤉𐤄𐤅 (Yahu, short form of Yahuah). His very name was his message and his testimony.',
      nl: '"Mijn Aluahim is Yahuah" — Een krachtige naamsverklaring: 𐤀𐤋𐤉 (Eli, "mijn Aluahim") + 𐤉𐤄𐤅 (Yahu, korte vorm van Yahuah). Zijn naam zelf was zijn boodschap en zijn getuigenis.',
    },
    origin: {
      en: 'EliYahu the Tishbite appeared suddenly on the scene during the dark reign of Ahab and Jezebel, when Baal worship had swept through Yisra\'ĕl. He declared a drought that lasted three and a half years, was supernaturally fed by ravens, raised a widow\'s son from the dead, and then called down fire from heaven on Mount Karmel in the famous contest against the 450 prophets of Baal. In his lowest moment, despairing under a juniper tree, Yahuah met him gently with food and water. He did not die — he was taken up to heaven in a whirlwind of fire (Melakim B 2:11).',
      nl: 'EliYahu de Tishbiet verscheen plotseling op het toneel tijdens de duistere regering van Achab en Izebel, toen de Baalverering door Yisra\'ĕl had gevaagd. Hij kondigde een droogte aan die drie en een half jaar duurde, werd op bovennatuurlijke wijze gevoed door raven, wekte de zoon van een weduwe op uit de dood, en riep daarna vuur van de hemel op de berg Karmel in de beroemde strijd tegen de 450 profeten van Baal. In zijn diepste moment, wanhopig onder een jeneverbes, ontmoette Yahuah hem zachtjes met voedsel en water. Hij stierf niet — hij werd in een stormwind van vuur opgenomen naar de hemel (Melakim B 2:11).',
    },
    significance: {
      en: 'Malaki prophesied that EliYahu would return before "the great and awesome day of Yahuah" (Malaki 4:5). Yahusha identified Yahuchanan the Immerser as the EliYahu who was to come (MattithYahu 11:14). EliYahu appeared alongside Mosheh at the Transfiguration of Yahusha — representing the Prophets and the Torah standing in witness of the Messiah.',
      nl: 'Malaki profeteerde dat EliYahu zou terugkeren vóór "de grote en geduchte dag van Yahuah" (Malaki 4:5). Yahusha identificeerde Yahuchanan de Onderdompelaar als de EliYahu die zou komen (MattithYahu 11:14). EliYahu verscheen samen met Mosheh bij de Gedaanteverandering van Yahusha — de Profeten en de Torah vertegenwoordigend die getuigenis geven van de Messias.',
    },
  },
  {
    slug: 'miryam',
    restored: 'Miryam',
    hebrew: '𐤌𐤓𐤉𐤌',
    english: 'Miriam / Mary',
    category: 'other',
    testament: 'both',
    firstMention: 'Shemoth 15:20 (as Mosheh\'s sister) / MattithYahu 1:16 (as mother of Yahusha)',
    meaning: {
      en: '"Bitterness / Beloved / Wished-for child" — The name\'s exact meaning is debated. Possible roots include 𐤌𐤓𐤓 (marar, "to be bitter") or 𐤌𐤓𐤉 (meri, "rebellion"). Some scholars connect it to the Egyptian "beloved" or "love". Both women named Miryam carried their names through bitter and glorious seasons.',
      nl: '"Bitterheid / Geliefde / Gewenst kind" — De exacte betekenis van de naam is omstreden. Mogelijke wortels zijn 𐤌𐤓𐤓 (marar, "bitter zijn") of 𐤌𐤓𐤉 (meri, "opstand"). Sommige geleerden verbinden het aan het Egyptische "geliefde" of "liefde". Beide vrouwen genaamd Miryam droegen hun namen door bittere en glorieuze seizoenen.',
    },
    origin: {
      en: 'The first Miryam was the sister of Mosheh and Aharon — a prophetess who led the women of Yisra\'ĕl in song and dance after the crossing of the Yam Suph (Shemoth 15:20-21). The second and most famous Miryam was the mother of Yahusha — a young woman from Natsareth, of the tribe of Yahudah, betrothed to Yoseph. She received the most extraordinary calling in human history: to carry the Son of the Most High in her womb. Her response: "Let it be to me according to your word" (Luqas 1:38).',
      nl: 'De eerste Miryam was de zuster van Mosheh en Aharon — een profetes die de vrouwen van Yisra\'ĕl leidde in lied en dans na het oversteken van de Yam Suph (Shemoth 15:20-21). De tweede en meest beroemde Miryam was de moeder van Yahusha — een jonge vrouw uit Natsareth, van de stam Yahudah, verloofd met Yoseph. Zij ontving de meest buitengewone roeping in de menselijke geschiedenis: de Zoon van de Allerhoogste in haar schoot dragen. Haar antwoord: "Laat het mij geschieden naar uw woord" (Luqas 1:38).',
    },
    significance: {
      en: 'Miryam the mother of Yahusha is honoured above all women in Scripture for her faith, obedience, and the unique role she played in the plan of redemption. She was present at His birth, His first miracle (Yahuchanan 2), the foot of the stake, and in the upper room at Shavuot (Acts 1). She is a model of humble, trusting obedience to Yahuah.',
      nl: 'Miryam de moeder van Yahusha wordt boven alle vrouwen in de Schriften geëerd voor haar geloof, gehoorzaamheid, en de unieke rol die zij speelde in het plan van verlossing. Ze was aanwezig bij Zijn geboorte, Zijn eerste wonder (Yahuchanan 2), aan de voet van de paal, en in de bovenzaal bij Shavuot (Handelingen 1). Zij is een voorbeeld van nederige, vertrouwende gehoorzaamheid aan Yahuah.',
    },
  },
  {
    slug: 'kepha',
    restored: 'Kepha',
    hebrew: '𐤊𐤉𐤐𐤀',
    english: 'Peter',
    category: 'apostle',
    testament: 'new',
    firstMention: 'Yahuchanan 1:42',
    meaning: {
      en: '"Rock / Stone" — Yahusha gave Shim\'on bar Yonah the name Kepha (Aramaic for "rock"), rendered in Greek as Petros (from petra, "rock"). The name itself was prophetic — declaring what this impulsive fisherman would become.',
      nl: '"Rots / Steen" — Yahusha gaf Shim\'on bar Yonah de naam Kepha (Aramees voor "rots"), weergegeven in het Grieks als Petros (van petra, "rots"). De naam zelf was profetisch — verklarend wat deze impulsieve visser zou worden.',
    },
    origin: {
      en: 'A fisherman from Bĕyth Tsaida, Shim\'on was brought to Yahusha by his brother Andreas. At their very first meeting, Yahusha looked at him and said: "You are Shim\'on the son of Yonah. You shall be called Kepha" (Yahuchanan 1:42). He became one of the inner three disciples — with Yaaqob and Yahuchanan. He walked on water, declared Yahusha to be the Messiah, denied Him three times, was restored, and became the lead voice on Shavuot when 3,000 souls were immersed.',
      nl: 'Een visser uit Bĕyth Tsaida, werd Shim\'on door zijn broer Andreas naar Yahusha gebracht. Bij hun allereerste ontmoeting keek Yahusha hem aan en zei: "Jij bent Shim\'on, de zoon van Yonah. Jij zult Kepha worden genoemd" (Yahuchanan 1:42). Hij werd een van de drie binnenste leerlingen — samen met Yaaqob en Yahuchanan. Hij liep op het water, verklaarde Yahusha de Messias te zijn, verloochende Hem driemaal, werd hersteld, en werd de leidende stem op Shavuot toen 3.000 zielen werden ondergedompeld.',
    },
    significance: {
      en: 'Kepha\'s two letters in Scripture are profound — filled with encouragement for believers facing suffering, warnings against false teachers, and the beautiful promise that Yahuah is "not slow concerning His promise, but patient toward us, not wishing that any should perish but that all should come to repentance" (2 Kepha 3:9).',
      nl: 'De twee brieven van Kepha in de Schriften zijn diepzinnig — gevuld met aanmoediging voor gelovigen die lijden onder vervolging, waarschuwingen tegen valse leraars, en de mooie belofte dat Yahuah "niet traag is betreffende Zijn belofte, maar geduldig naar ons is, niet willende dat iemand verloren gaat maar dat allen tot berouw komen" (2 Kepha 3:9).',
    },
  },
]
