/**
 * Hebrew name tooltips — shown on hover in verse text.
 * Keys are the exact strings as they appear in the Hallelujah Scriptures.
 * Value is the tooltip: pronunciation guide + meaning.
 */
export const NAME_TOOLTIPS: Record<string, string> = {
  // ── The Name ─────────────────────────────────────────────────────────────
  'HWHY':               '𐤉𐤄𐤅𐤄 Yahuah — "I AM that I AM" · The Self-Existing One',

  // ── The Messiah ──────────────────────────────────────────────────────────
  'Yahusha':            'Yahusha — "Yahuah is Salvation"',
  'Mashiach':           'Mashiach — "The Anointed One" (Messiah)',

  // ── The Spirit ───────────────────────────────────────────────────────────
  "Ruaḥ ha'Qodesh":    "Ruaḥ ha'Qodesh — The Set-Apart Spirit",
  'Ruach haQodesh':    'Ruach haQodesh — The Set-Apart Spirit',
  'Ruach':             'Ruach — Spirit / Breath / Wind',

  // ── Patriarchs ───────────────────────────────────────────────────────────
  'Aḏam':              'Aḏam — "Man; from the red earth" (Adam)',
  'Adam':              'Adam — "Man; from the red earth"',
  'Ḥawwah':           'Ḥawwah — "Life-giver; mother of all living" (Eve)',
  'Hawwah':           'Hawwah — "Life-giver; mother of all living" (Eve)',
  'Qayin':             'Qayin — "Acquired / Spear" (Cain)',
  'Heḇel':            'Heḇel — "Breath / Vanity" (Abel)',
  'Sheth':             'Sheth — "Appointed / Compensation" (Seth)',
  'Noaḥ':             'Noaḥ — "Rest / Comfort" (Noah)',
  'Noah':              'Noah — "Rest / Comfort"',
  'Shĕm':             'Shĕm — "Name / Renown" (Shem)',
  'Aḇraham':          'Aḇraham — "Father of many nations" (Abraham)',
  'Aḇram':            'Aḇram — "Exalted Father" (original name of Abraham)',
  'Sārai':            'Sārai — "My Princess" (original name of Sarah)',
  'Sārāh':            'Sārāh — "Princess; mother of nations" (Sarah)',
  'Yitsḥaq':          'Yitsḥaq — "He laughs" (Isaac)',
  "Ya'aqoḇ":         "Ya'aqoḇ — \"Supplanter; he who follows at the heel\" (Jacob)",
  "Yisra'ĕl":        "Yisra'ĕl — \"He who strives with Aluahim\" (Israel)",
  'Yisrael':          'Yisrael — "He who strives with Aluahim" (Israel)',
  'Yosĕph':          'Yosĕph — "He will add / Increase" (Joseph)',
  'Yoseph':          'Yoseph — "He will add / Increase" (Joseph)',
  'Binyamin':          'Binyamin — "Son of the right hand" (Benjamin)',
  'Reuḇĕn':          'Reuḇĕn — "See, a son!" (Reuben)',
  "Shim'on":         "Shim'on — \"He who hears\" (Simeon)",
  'Lĕwi':            'Lĕwi — "Attached / Joined" (Levi)',
  'Lewi':            'Lewi — "Attached / Joined" (Levi)',
  'Yehudah':          'Yehudah — "Praise to Yahuah" (Judah)',
  'Yahudah':          'Yahudah — "Praise to Yahuah" (Judah/Jude)',

  "Re'uḇĕn":         "Re'uḇĕn — \"See, a son!\" · firstborn of Ya'aqoḇ and Lĕ'ah (Reuben)",
  'Dan':              "Dan — \"Judge\" · fifth son of Ya'aqoḇ, born of Bilhah (Dan)",
  'Naphtali':         "Naphtali — \"My wrestling\" · sixth son of Ya'aqoḇ, born of Bilhah (Naphtali)",
  'Gad':              "Gad — \"Fortune / Troop\" · seventh son of Ya'aqoḇ, born of Zilpah (Gad)",
  "Ashĕr":            "Ashĕr — \"Happy / Blessed\" · eighth son of Ya'aqoḇ, born of Zilpah (Asher)",
  'Yissaskar':        "Yissaskar — \"Reward / Hired\" · ninth son of Ya'aqoḇ and Lĕ'ah (Issachar)",
  "Zeḇulun":          "Zeḇulun — \"Dwelling / Honour\" · tenth son of Ya'aqoḇ and Lĕ'ah (Zebulun)",
  "Lĕ'ah":           "Lĕ'ah — \"Weary\" · first wife of Ya'aqoḇ, mother of six sons and Diynah (Leah)",
  'Raḥel':            "Raḥel — \"Ewe\" · beloved wife of Ya'aqoḇ, mother of Yosĕph and Binyamin (Rachel)",
  'Bilhah':           "Bilhah — \"Carefree\" · handmaid of Raḥel, concubine of Ya'aqoḇ, mother of Dan and Naphtali",
  'Zilpah':           "Zilpah — \"Myrrh-dropper\" · handmaid of Lĕ'ah, concubine of Ya'aqoḇ, mother of Gad and Ashĕr",
  'Diynah':           "Diynah — \"Judged / Vindicated\" · only named daughter of Ya'aqoḇ (Dinah)",
  'Menashsheh':       "Menashsheh — \"Causing to forget\" · firstborn son of Yosĕph, adopted tribe of Yisra'ĕl (Manasseh)",
  'Ephrayim':         "Ephrayim — \"Doubly fruitful\" · second son of Yosĕph, became the greater tribe (Ephraim)",

  // ── Moses & Exodus era ───────────────────────────────────────────────────
  'Mosheh':            'Mosheh — "Drawn out of water" (Moses)',
  'Aharon':            'Aharon — "Exalted / Mountain of strength" (Aaron)',
  'Miryam':            'Miryam — "Bitterness / Beloved" (Miriam / Mary)',

  // ── Conquest & Judges ────────────────────────────────────────────────────
  'Yahusha bin Nun':   'Yahusha bin Nun — "Yahuah is Salvation, son of Nun" (Joshua)',

  // ── Kings ────────────────────────────────────────────────────────────────
  'Dawid':             'Dawid — "Beloved" (David)',
  'Shelomoh':          'Shelomoh — "Peaceful / His peace" (Solomon)',
  "Sha'ul":           "Sha'ul — \"Asked for; prayed for\" (Saul / Paul)",
  'Shaul':             'Shaul — "Asked for; prayed for" (Saul / Paul)',

  // ── Prophets ─────────────────────────────────────────────────────────────
  'EliYahu':           'EliYahu — "My Aluahim is Yahuah" (Elijah)',
  'Eliyahu':           'Eliyahu — "My Aluahim is Yahuah" (Elijah)',
  'Elisha':            'Elisha — "My Aluahim is Salvation" (Elisha)',
  'YeshaYahu':         'YeshaYahu — "Salvation of Yahuah" (Isaiah)',
  'YirmeYahu':         'YirmeYahu — "Yahuah will raise up" (Jeremiah)',
  'Yehezqel':          'Yehezqel — "Aluahim will strengthen" (Ezekiel)',
  'Daniyel':           'Daniyel — "Aluahim is my judge" (Daniel)',
  'Hoshea':            'Hoshea — "Salvation" (Hosea)',
  'Yona':              'Yona — "Dove" (Jonah)',
  'Mikah':             'Mikah — "Who is like Aluahim?" (Micah)',

  // ── New Covenant figures ─────────────────────────────────────────────────
  'Yahuchanan':        'Yahuchanan — "Yahuah is Gracious" (John)',
  'MattithYahu':       'MattithYahu — "Gift of Yahuah" (Matthew)',
  'Marqus':            'Marqus — "Of Mars / Defender" (Mark)',
  'Luqas':             'Luqas — "Light-giving" (Luke)',
  'Kepha':             'Kepha — "Rock / Stone" (Peter)',
  'Yaaqob':            'Yaaqob — "Supplanter" (James/Jacob)',
  'Titos':             'Titos — "Honoured" (Titus)',
  'Timotheus':         'Timotheus — "Honouring Aluahim" (Timothy)',

  // ── Divine titles ─────────────────────────────────────────────────────────
  'Aluahim':           'Aluahim — "Mighty Ones; the Most High" (Elohim/God)',
  'Elohim':            'Elohim — "Mighty Ones; the Most High"',
  'El Shaddai':        'El Shaddai — "Aluahim Almighty / of the mountains"',
  'El Elyon':          'El Elyon — "Most High Aluahim"',
  'Aḏonai':           'Aḏonai — "My Master / Lord"',

  // ── Places ────────────────────────────────────────────────────────────────
  'Yerushalayim':      'Yerushalayim — "City of Peace / Founded by peace" (Jerusalem)',
  'Mitsrayim':         'Mitsrayim — "Besieged fortress; the two straits" (Egypt)',
  "Kena'an":           "Kena'an — \"Lowland; merchant land\" (Canaan)",
  'Kenaan':            'Kenaan — "Lowland; merchant land" (Canaan)',
  'Tsiyon':            'Tsiyon — "Fortress / Parched place" (Zion)',
  'Yarden':            'Yarden — "Descender; flowing down" (Jordan)',
  'Galil':             'Galil — "Circle / District" (Galilee)',
  'Bĕyth Leḥem':     'Bĕyth Leḥem — "House of Bread" (Bethlehem)',
  'Natsareth':         'Natsareth — "Branch / Watchtower" (Nazareth)',
  'Yeriho':            'Yeriho — "City of the moon / Fragrant" (Jericho)',
  'Bĕyth El':         'Bĕyth El — "House of Aluahim" (Bethel)',
  'Hĕḇron':          'Hĕḇron — "Fellowship / Association" (Hebron)',
  'Sinai':             'Sinai — Mountain of the Covenant; where Torah was given',
  'Horeb':             'Horeb — "Desolation / Dryness" · another name for Sinai',


  // ── Angels & heavenly beings ──────────────────────────────────────────────
  "Miyka'el":         "Miyka'el — \"Who is like Aluahim?\" · the archangel who fights for Yisra'ĕl (Michael)",
  'Miykael':          "Miykael — \"Who is like Aluahim?\" · the archangel (Michael)",
  'Michael':          "Michael — \"Who is like Aluahim?\" · the archangel",
  "Gabri'el":         "Gabri'el — \"Mighty man of Aluahim\" · the messenger angel (Gabriel)",
  'Gabriel':          "Gabriel — \"Mighty man of Aluahim\" · the messenger angel",
  'Raphael':          "Raphael — \"Yahuah heals\" · the angel of healing; one of the seven before the throne",
  'Uriel':            "Uriel — \"Flame of Aluahim / Light of El\" · one of the four archangels in Ḥanok",
  "Aza'zel":          "Aza'zel — the fallen angel bound under a desert mountain; the scapegoat in the Torah was a picture of his guilt",
  'Semyaza':          'Semyaza — leader of the 200 Watchers who descended onto Mount Hermon (Ḥanok 6)',
  'Watchers':         'Watchers — the Irim: heavenly beings assigned to watch over the earth who left their proper domain (Ḥanok 1-16)',
  'Irim':             'Irim — "Watchers" · heavenly beings (Daniel/Daniyel 4:13,17; Ḥanok 1)',

  // ── Common Hebrew particles & words ───────────────────────────────────────
  'ben':              'ben — "son of" · Hebrew patronymic particle (e.g. Dawid ben Yishai = David son of Jesse)',
  'bin':              'bin — "son of" · Aramaic/Hebrew variant of ben (e.g. Yahusha bin Nun)',
  'bat':              'bat — "daughter of" · Hebrew matronymic particle',
  'ha':               'ha — "the" · Hebrew definite article prefix',
  'El':               'El — "Mighty One / God" · the basic Hebrew word for a mighty being; often part of names',
  'Ḥai':             'Ḥai — "Living" · as in El Ḥai (the Living Aluahim)',
  'hai':              'hai — "living" · as in El hai (living God)',

  // ── Pre-flood figures & terms ────────────────────────────────────────────
  'Ḥanok':           'Ḥanok — "Dedicated / Initiated" (Enoch) · the seventh from Aḏam who walked with Yahuah and was taken',
  'Hanok':           'Hanok — "Dedicated / Initiated" (Enoch)',
  'Yobelim':         'Yobelim — "Jubilees" · an extra-canonical book detailing creation, covenant and calendar from the heavenly tablets',
  'Yashar':          'Yashar — "The Upright / Jasher" · quoted in Yahusha 10:13 and 2 Shemuel 1:18',
  'Nephilim':        'Nephilim — "The Fallen Ones / Giants" · offspring of the Watchers and the daughters of men (Bereshit 6:4; Ḥanok 7)',
  'Rephaim':         "Rephaim — \"The Shades / Ancient Giants\" · departed spirits or giant clans in Kena'an",
  'Anakim':          "Anakim — \"Sons of Anak / the Long-necked\" · a giant people encountered by Yisra'ĕl in Kena'an",
  'Lamek':           'Lamek — "Powerful" · father of Noaḥ (Lamech)',

  // ── Soul, spirit & afterlife ───────────────────────────────────────────────
  "Nĕphĕsh":        "Nĕphĕsh — \"Soul / Living Being / Self\" · the breath-animated being; not an immortal soul separate from the body",
  'Nephesh':         'Nephesh — "Soul / Living Being" · the whole person as animated by the breath of Yahuah',
  'Sheol':           'Sheol — "The Grave / Realm of the Dead" · the place of the dead in Hebrew thought; translated as "hell" or "hades" in most Bibles',
  'sheol':           'sheol — "the grave / realm of the dead"',
  'Gehinnom':        'Gehinnom — "Valley of Hinnom" · a valley south of Yerushalayim where children were once sacrificed to Molek; became a symbol of judgement',

  // ── Body of Scripture references ─────────────────────────────────────────
  'Bereshit':        'Bereshit — "In the Beginning" (Genesis) · the first book of the Torah',
  'Shemoth':         'Shemoth — "Names" (Exodus) · the second book of the Torah',
  'Wayyiqra':        'Wayyiqra — "And He Called" (Leviticus) · the third book of the Torah',
  'Bemidbar':        'Bemidbar — "In the Wilderness" (Numbers) · the fourth book of the Torah',
  'Debarim':         'Debarim — "Words / Matters" (Deuteronomy) · the fifth book of the Torah',
  'Tehillim':        'Tehillim — "Praises / Psalms" (Psalms) · the great book of worship',
  'Mishle':          'Mishle — "Proverbs" (Proverbs) · wisdom sayings of Shelomoh and others',

  // ── Scripture divisions ───────────────────────────────────────────────────
  'Torah':             'Torah — "Instruction / Teaching" · The five books of Mosheh (Genesis–Deuteronomy)',
  'Nebiim':           'Nebiim — "Prophets" · The prophetic books of the Tanakh',
  'Ketuvim':          'Ketuvim — "Writings" · The wisdom and poetic books of the Tanakh',
  'Tanakh':           'Tanakh — The complete Hebrew Scriptures: Torah + Nebiim + Ketuvim',
  "B'rit Chadashah":  "B'rit Chadashah — \"New Covenant\" · The writings of the Apostles",
  'Besorah':          'Besorah — "Good News / Gospel"',

  // ── Worship & Temple ──────────────────────────────────────────────────────
  'Kohein':           'Kohein — "Priest" · one who ministers before Yahuah',
  'kohen':            'kohen — "priest" · one who ministers before Yahuah',
  'Kohenim':          'Kohenim — "Priests" (plural of Kohein)',
  'kohenim':          'kohenim — "priests" (plural of kohein)',
  'Kohen haGadol':    'Kohen haGadol — "The High Priest" · who entered the Most Set-Apart Place on Yom Kippur',
  'Mishkan':          'Mishkan — "Dwelling Place / Tabernacle" · the portable sanctuary in the wilderness',
  'Miqdash':          'Miqdash — "Set-Apart Place / Sanctuary / Temple"',
  'Qodesh':           'Qodesh — "Set-Apart / Holy"',
  'qodesh':           'qodesh — "set-apart / holy"',
  'Shofar':           "Shofar — \"Ram's horn trumpet\" · blown on Yom Teruah and other set-apart occasions",
  'shofar':           'shofar — "ram\'s horn trumpet"',
  'Menorah':          'Menorah — "Lampstand" · the seven-branched golden lampstand in the Mishkan',
  'Aron':             'Aron — "Ark" · the Ark of the Covenant containing the two tablets',

  // ── Sabbath & Calendar ────────────────────────────────────────────────────
  'Shabbat':          'Shabbat — "Rest / Cessation" · the seventh day of rest commanded by Yahuah (Shemoth 20:8)',
  'shabbat':          'shabbat — "rest / cessation" · the seventh day of rest',
  'Rosh Chodesh':     'Rosh Chodesh — "Head of the Month" · the new moon, beginning of each biblical month',
  'Moadim':           "Moadim — \"Appointed Times / Set-Apart Seasons\" · Yahuah's seven annual feasts (Wayyiqra 23)",
  'Moad':             'Moad — "Appointed Time" (singular of Moadim)',
  'Omer':             'Omer — a sheaf of grain · the 50-day count from Bikkorim to Shavuot',
  'Shemitah':         'Shemitah — "Release / Letting fall" · the seventh-year land rest and debt cancellation',
  'Yovel':            'Yovel — "Jubilee" · the 50th year of freedom and land restoration (Wayyiqra 25)',

  // ── The Feasts ────────────────────────────────────────────────────────────
  'Pesach':           'Pesach — "Passover" · memorial of the Exodus; fulfilled by Yahusha as the Lamb of Yahuah',
  'Matzot':           'Matzot — "Unleavened Bread" · the seven-day feast of removing leaven (sin) from life',
  'Bikkorim':         'Bikkorim — "Firstfruits" · waving the first barley sheaf; day Yahusha rose',
  'Shavuot':          'Shavuot — "Weeks / Pentecost" · 50 days after Bikkorim; Torah given at Sinai',
  'Yom Teruah':       'Yom Teruah — "Day of Trumpets / Shouting" · shofar blast opening the 7th month',
  'Yom Kippur':       'Yom Kippur — "Day of Atonement" · the most set-apart day; fasting and affliction of soul',
  'Sukkot':           'Sukkot — "Tabernacles / Booths" · seven days dwelling in temporary shelters',
  'Shemini Atseret':  'Shemini Atseret — "Eighth Day Assembly" · the solemn closing of Sukkot',

  // ── Concepts & Covenant ───────────────────────────────────────────────────
  'Brit':             'Brit — "Covenant / Binding agreement" · the solemn bond between Yahuah and His people',
  'brit':             'brit — "covenant / binding agreement"',
  'Chesed':           'Chesed — "Loving-commitment / Covenant loyalty / Mercy"',
  'chesed':           'chesed — "loving-commitment / mercy"',
  'Shamayim':         'Shamayim — "Heavens / The sky above" · the abode of Yahuah and His messengers',
  'shamayim':         'shamayim — "heavens / the sky above" · the abode of Yahuah and His messengers',
  'Baraḵ':            'Baraḵ — "Bless / Kneel before" · to speak well of; to invoke Yahuah\'s favour',
  'baraḵ':            'baraḵ — "bless / kneel before" · to speak well of; to invoke Yahuah\'s favour',
  'Shalom':           'Shalom — "Peace / Wholeness / Completeness" · much more than absence of war',
  'shalom':           'shalom — "peace / wholeness / completeness"',
  'Emet':             'Emet — "Truth / Faithfulness / Reliability"',
  'Tsedaqah':         'Tsedaqah — "Righteousness / Right-standing" · living in right relationship with Yahuah',
  'Teshuvah':         'Teshuvah — "Repentance / Turning back" · returning to Yahuah with the whole heart',
  'teshuvah':         'teshuvah — "repentance / turning back to Yahuah"',
  'Mikveh':           'Mikveh — "Gathering of waters / Immersion pool" · biblical immersion/baptism',
  'Nabi':             'Nabi — "Prophet" · one who speaks the words of Yahuah',
  'nabi':             'nabi — "prophet"',
  'Nĕḇiyim':        'Nĕḇiyim — "Prophets" (the prophetic books)',
  'Malak':            'Malak — "Messenger / Angel" · a sent one, human or heavenly',
  'malak':            'malak — "messenger / angel"',
  'Malakim':          'Malakim — "Messengers / Angels" (plural)',
}

/** Sorted keys longest-first to avoid partial matches (e.g. "Ruaḥ ha'Qodesh" before "Ruach") */
export const TOOLTIP_KEYS = Object.keys(NAME_TOOLTIPS).sort((a, b) => b.length - a.length)

/**
 * Dutch translations of the name tooltips
 */
export const NAME_TOOLTIPS_NL: Record<string, string> = {
  'HWHY':               '𐤉𐤄𐤅𐤄 Yahuah — "IK BEN die IK BEN" · De Zelfbestaande',
  'Yahusha':            'Yahusha — "Yahuah is Redding"',
  'Mashiach':           'Mashiach — "De Gezalfde" (Messias)',
  "Ruaḥ ha'Qodesh":    "Ruaḥ ha'Qodesh — De Afgezonderde Geest",
  'Ruach haQodesh':    'Ruach haQodesh — De Afgezonderde Geest',
  'Ruach':             'Ruach — Geest / Adem / Wind',
  'Aḏam':              'Aḏam — "Mens; uit het rode aardstof" (Adam)',
  'Adam':              'Adam — "Mens; uit het rode aardstof"',
  'Ḥawwah':           'Ḥawwah — "Levensgeefster; moeder van alle levenden" (Eva)',
  'Hawwah':           'Hawwah — "Levensgeefster; moeder van alle levenden" (Eva)',
  'Noaḥ':             'Noaḥ — "Rust / Troost" (Noach)',
  'Noah':              'Noah — "Rust / Troost" (Noach)',
  'Aḇraham':          'Aḇraham — "Vader van vele volken" (Abraham)',
  'Sārāh':            'Sārāh — "Prinses; moeder van volkeren" (Sara)',
  'Yitsḥaq':          'Yitsḥaq — "Hij lacht" (Izak)',
  "Ya'aqoḇ":         "Ya'aqoḇ — \"Hielenlichter; die volgt op de hiel\" (Jakob)",
  "Yisra'ĕl":        "Yisra'ĕl — \"Die strijdt met Aluahim\" (Israël)",
  'Yosĕph':          'Yosĕph — "Hij zal toevoegen / Vermeerderen" (Jozef)',
  'Mosheh':            'Mosheh — "Uit het water getrokken" (Mozes)',
  'Aharon':            'Aharon — "Verheven / Bergsterkte" (Aäron)',
  'Dawid':             'Dawid — "Geliefde" (David)',
  'Shelomoh':          'Shelomoh — "Vredelievend / Zijn vrede" (Salomo)',
  'EliYahu':           'EliYahu — "Mijn Aluahim is Yahuah" (Elia)',
  'YeshaYahu':         'YeshaYahu — "Redding van Yahuah" (Jesaja)',
  'YirmeYahu':         'YirmeYahu — "Yahuah zal oprichten" (Jeremia)',
  'Yehezqel':          'Yehezqel — "Aluahim zal versterken" (Ezechiël)',
  'Daniyel':           'Daniyel — "Aluahim is mijn rechter" (Daniël)',
  'Hoshea':            'Hoshea — "Redding" (Hosea)',
  'Yahuchanan':        'Yahuchanan — "Yahuah is Genadig" (Johannes)',
  'Kepha':             'Kepha — "Rots / Steen" (Petrus)',
  'Aluahim':           'Aluahim — "Machtige Enen; de Allerhoogste" (Elohim/God)',
  'Yerushalayim':      'Yerushalayim — "Stad van Vrede" (Jeruzalem)',
  'Mitsrayim':         'Mitsrayim — "Belegerde vesting; de twee zeeëngten" (Egypte)',
  'Tsiyon':            'Tsiyon — "Vesting / Verdroogde plaats" (Sion)',
  'Torah':             'Torah — "Onderwijzing / Leer" · De vijf boeken van Mosheh',
  'Tanakh':           'Tanakh — De volledige Hebreeuwse Geschriften: Torah + Nebiim + Ketuvim',
  'Shabbat':          'Shabbat — "Rust / Ophouden" · de zevende dag van rust door Yahuah geboden (Shemoth 20:8)',
  'shabbat':          'shabbat — "rust / ophouden" · de zevende dag van rust',
  'Moadim':           'Moadim — "Aangestelde Tijden" · de zeven jaarlijkse feesten van Yahuah (Wayyiqra 23)',
  'Pesach':           'Pesach — "Pascha / Voorbijgaan" · gedachtenis van de Exodus; vervuld door Yahusha',
  'Shavuot':          'Shavuot — "Weken / Pinksteren" · 50 dagen na Bikkorim; Torah gegeven op Sinai',
  'Yom Kippur':       'Yom Kippur — "Dag van Verzoening" · de heiligste dag; vasten en verootmoediging',
  'Sukkot':           'Sukkot — "Loofhutten" · zeven dagen wonen in tijdelijke hutten',
  'Mishkan':          'Mishkan — "Woonplaats / Tabernakel" · het draagbare heiligdom in de woestijn',
  'Shamayim':         'Shamayim — "Hemelen / De hemel boven" · de woonplaats van Yahuah en Zijn boden',
  'shamayim':         'shamayim — "hemelen / de hemel boven" · de woonplaats van Yahuah en Zijn boden',
  'Baraḵ':            'Baraḵ — "Zegenen / Knielen voor" · het goede over iemand uitspreken; de gunst van Yahuah afroepen',
  'baraḵ':            'baraḵ — "zegenen / knielen voor" · het goede over iemand uitspreken; de gunst van Yahuah afroepen',
  'Shalom':           'Shalom — "Vrede / Heelheid / Volledigheid"',
  'Chesed':           'Chesed — "Liefdevolle trouw / Verbondsloyaliteit / Genade"',
  'Brit':             'Brit — "Verbond" · de plechtige band tussen Yahuah en Zijn volk',
  'Teshuvah':         'Teshuvah — "Bekering / Terugkeer" · terugkeren tot Yahuah met heel het hart',
  'Nephilim':        'Nephilim — "De Gevallenen / Reuzen" · nakomelingen van de Wachters en de dochters van de mensen (Bereshit 6:4)',
  'Watchers':         'Watchers — de Irim: hemelse wezens die hun bestemde plek verlieten en afdaalden naar de aarde (Ḥanok 6)',
  'ben':              'ben — "zoon van" · Hebreeuws patronymisch deeltje (bijv. Dawid ben Yishai = David, zoon van Isai)',
  'bat':              'bat — "dochter van" · Hebreeuws matronymisch deeltje',
  'bin':              'bin — "zoon van" · Aramese variant van ben (bijv. Yahusha bin Nun)',
  'El':               'El — "Machtige / God" · het basiswoord in het Hebreeuws voor een machtig wezen',
  'Ḥai':             'Ḥai — "Levend" · zoals in El Ḥai (de Levende Aluahim)',
  'Ḥanok':           'Ḥanok — "Gewijd / Ingewijd" (Henoch) · de zevende na Aḏam, die met Yahuah wandelde en werd weggenomen',
  'Raphael':          'Raphael — "Yahuah heelt" · de helende engel; een van de zeven voor de troon',
  "Miyka'el":        "Miyka'el — \"Wie is als Aluahim?\" · de aartsengel die strijdt voor Yisra'ĕl (Michaël)",
  "Gabri'el":        "Gabri'el — \"Machtige man van Aluahim\" · de boodschapper-engel (Gabriël)",
  'Sheol':           'Sheol — "Het Graf / Rijk van de Doden" · de verblijfplaats van de doden in het Hebreeuwse denken',
  "Nĕphĕsh":        "Nĕphĕsh — \"Ziel / Levend Wezen / Zelf\" · het door adem bezield wezen; niet een onsterfelijke ziel los van het lichaam",
  'Bereshit':        'Bereshit — "In den Beginne" (Genesis) · het eerste boek van de Torah',
  'Shemoth':         'Shemoth — "Namen" (Exodus) · het tweede boek van de Torah',
  'Wayyiqra':        'Wayyiqra — "En Hij Riep" (Leviticus) · het derde boek van de Torah',
  'Bemidbar':        'Bemidbar — "In de Woestijn" (Numeri) · het vierde boek van de Torah',
  'Debarim':         'Debarim — "Woorden" (Deuteronomium) · het vijfde boek van de Torah',
  'Tehillim':        'Tehillim — "Lofzangen / Psalmen" (Psalmen) · het grote boek van aanbidding',
  // ── Messias & Geest (aanvulling) ────────────────────────────────────────────
  'Eliyahu':           'Eliyahu — "Mijn Aluahim is Yahuah" (Elia)',
  'Elisha':            'Elisha — "Mijn Aluahim is Redding" (Elisa)',
  'Yona':              'Yona — "Duif" (Jona)',
  'Mikah':             'Mikah — "Wie is als Aluahim?" (Micha)',

  // ── Aartsvaders & gezinnen (aanvulling) ────────────────────────────────────
  'Aḇram':            'Aḇram — "Verheven Vader" · de oorspronkelijke naam van Aḇraham',
  'Sārai':            'Sārai — "Mijn Prinses" · de oorspronkelijke naam van Sārāh',
  'Heḇel':            'Heḇel — "Adem / IJdelheid" (Abel)',
  'Qayin':             'Qayin — "Verworven / Speer" (Kaïn)',
  'Sheth':             'Sheth — "Aangewezen / Vergoeding" (Set)',
  'Shĕm':             'Shĕm — "Naam / Roem" (Sem)',
  'Binyamin':          'Binyamin — "Zoon van de rechterhand" (Benjamin)',
  "Reuḇĕn":          'Reuḇĕn — "Zie, een zoon!" (Ruben)',
  "Shim'on":         "Shim'on — \"Hij die hoort\" (Simeon)",
  'Lĕwi':            'Lĕwi — "Aangehecht / Verbonden" (Levi)',
  'Lewi':            'Lewi — "Aangehecht / Verbonden" (Levi)',
  'Yehudah':          'Yehudah — "Lof aan Yahuah" (Juda)',
  'Yoseph':          'Yoseph — "Hij zal toevoegen / Vermeerderen" (Jozef)',
  'Yaaqob':            'Yaaqob — "Hielenlichter" (Jakobus/Jakob)',
  'Yahudah':          'Yahudah — "Lof aan Yahuah" (Juda/Judas)',
  'Lamek':             'Lamek — "Machtig" · vader van Noaḥ (Lamech)',
  'Sheth':             'Sheth — "Aangewezen / Vergoeding" (Set)',

  'Yosĕph':          'Yosĕph — "Hij zal toevoegen / Vermeerderen" (Jozef)',
  "Re'uḇĕn":         "Re'uḇĕn — \"Zie, een zoon!\" · eerstgeborene van Ya'aqoḇ en Lĕ'ah (Ruben)",
  'Dan':              'Dan — "Rechter" · vijfde zoon van Ya\'aqoḇ, geboren uit Bilhah (Dan)',
  'Naphtali':         "Naphtali — \"Mijn worsteling\" · zesde zoon van Ya'aqoḇ, geboren uit Bilhah (Naftali)",
  'Gad':              "Gad — \"Geluk / Troep\" · zevende zoon van Ya'aqoḇ, geboren uit Zilpah (Gad)",
  "Ashĕr":            "Ashĕr — \"Gelukkig / Gezegend\" · achtste zoon van Ya'aqoḇ, geboren uit Zilpah (Aser)",
  'Yissaskar':        "Yissaskar — \"Beloning / Huur\" · negende zoon van Ya'aqoḇ en Lĕ'ah (Issaskar)",
  "Zeḇulun":          "Zeḇulun — \"Woning / Eer\" · tiende zoon van Ya'aqoḇ en Lĕ'ah (Zebulon)",
  "Lĕ'ah":           "Lĕ'ah — \"Vermoeide\" · eerste vrouw van Ya'aqoḇ, moeder van zes zonen en Diynah (Lea)",
  'Raḥel':            "Raḥel — \"Ooi\" · geliefde vrouw van Ya'aqoḇ, moeder van Yosĕph en Binyamin (Rachel)",
  'Bilhah':           "Bilhah — \"Zorgeloos\" · dienstmaagd van Raḥel, bijvrouw van Ya'aqoḇ, moeder van Dan en Naphtali",
  'Zilpah':           "Zilpah — \"Myrredruppelaar\" · dienstmaagd van Lĕ'ah, bijvrouw van Ya'aqoḇ, moeder van Gad en Ashĕr",
  'Diynah':           "Diynah — \"Gericht / Gerechtvaardigd\" · enig genoemde dochter van Ya'aqoḇ (Dina)",
  'Menashsheh':       "Menashsheh — \"Doet vergeten\" · eerstgeborene van Yosĕph, aangenomen stam van Yisra'ĕl (Manasse)",
  'Ephrayim':         "Ephrayim — \"Dubbel vruchtbaar\" · tweede zoon van Yosĕph, werd de grotere stam (Efraïm)",

  // ── Exodus-figuren (aanvulling) ───────────────────────────────────────────
  'Miryam':            'Miryam — "Bitterheid / Geliefde" (Mirjam / Maria)',
  "Sha'ul":           "Sha'ul — \"Gevraagd om; voor gebeden\" (Saul / Paulus)",
  'Shaul':             'Shaul — "Gevraagd om; voor gebeden" (Saul / Paulus)',
  'Yisrael':          'Yisrael — "Die strijdt met Aluahim" (Israël)',

  // ── Apostelen (aanvulling) ────────────────────────────────────────────────
  'MattithYahu':       'MattithYahu — "Gave van Yahuah" (Mattheus)',
  'Marqus':            'Marqus — "Van Mars / Verdediger" (Marcus)',
  'Luqas':             'Luqas — "Lichtgevend" (Lucas)',
  'Titos':             'Titos — "Geëerd" (Titus)',
  'Timotheus':         'Timotheus — "Aluahim eerde" (Timotheus)',
  'Yahusha bin Nun':   'Yahusha bin Nun — "Yahuah is Redding, zoon van Nun" (Jozua)',

  // ── Engelen (aanvulling) ──────────────────────────────────────────────────
  'Miykael':          "Miykael — \"Wie is als Aluahim?\" · de aartsengel (Michaël)",
  'Michael':          "Michael — \"Wie is als Aluahim?\" · de aartsengel",
  'Gabriel':          "Gabriel — \"Machtige man van Aluahim\" · de boodschapper-engel",
  'Uriel':            "Uriel — \"Vlam van Aluahim / Licht van El\" · een van de vier aartsengelen in Ḥanok",
  "Aza'zel":          "Aza'zel — de gevallen engel gebonden onder een woestijnberg; de zondebok in de Torah was een beeld van zijn schuld",
  'Semyaza':          'Semyaza — aanvoerder van de 200 Wachters die neerdaalden op de berg Hermon (Ḥanok 6)',
  'Irim':             'Irim — "Wachters" · hemelse wezens (Daniyel 4:13,17; Ḥanok 1)',
  'Hanok':           'Hanok — "Gewijd / Ingewijd" (Henoch)',

  // ── Plaatsen (aanvulling) ─────────────────────────────────────────────────
  "Kena'an":          "Kena'an — \"Laagland; koopmanland\" (Kanaän)",
  'Kenaan':           'Kenaan — "Laagland; koopmanland" (Kanaän)',
  'Yarden':           'Yarden — "Nederdaler; naar beneden stromend" (Jordaan)',
  'Galil':            'Galil — "Kring / District" (Galilea)',
  'Bĕyth Leḥem':     'Bĕyth Leḥem — "Huis van Brood" (Bethlehem)',
  'Natsareth':        'Natsareth — "Spruit / Wachttoren" (Nazareth)',
  'Yeriho':           'Yeriho — "Maanstad / Welriekend" (Jericho)',
  'Bĕyth El':        'Bĕyth El — "Huis van Aluahim" (Betel)',
  'Hĕḇron':         'Hĕḇron — "Gemeenschap / Verbond" (Hebron)',
  'Horeb':            'Horeb — "Woestenij / Droogte" · een andere naam voor Sinai',
  'Sinai':            'Sinai — Berg van het Verbond; waar de Torah gegeven werd',
  'Gehinnom':         'Gehinnom — "Dal van Hinnom" · een dal ten zuiden van Yerushalayim; werd een beeld van het oordeel',

  // ── Goddelijke titels (aanvulling) ───────────────────────────────────────
  'Aḏonai':          'Aḏonai — "Mijn Meester / Heer"',
  'Elohim':           'Elohim — "Machtige Enen; de Allerhoogste"',
  'El Shaddai':       'El Shaddai — "Aluahim Almachtig / van de bergen"',
  'El Elyon':         'El Elyon — "Allerhoogste Aluahim"',

  // ── Tempel & eredienst (aanvulling) ──────────────────────────────────────
  'Kohein':           'Kohein — "Priester" · iemand die voor Yahuah dient',
  'kohen':            'kohen — "priester" · iemand die voor Yahuah dient',
  'Kohenim':          'Kohenim — "Priesters" (meervoud van Kohein)',
  'kohenim':          'kohenim — "priesters" (meervoud van kohen)',
  'Kohen haGadol':    'Kohen haGadol — "De Hogepriester" · die op Yom Kippur het Heilige der Heiligen binnenging',
  'Miqdash':          'Miqdash — "Afgezonderde Plaats / Heiligdom / Tempel"',
  'Qodesh':           'Qodesh — "Afgezonderd / Heilig"',
  'qodesh':           'qodesh — "afgezonderd / heilig"',
  'Aron':             'Aron — "Ark" · de Ark van het Verbond met de twee stenen tafelen',
  'Menorah':          'Menorah — "Lampstandaard" · de zevenarmige gouden kandelaar in het Mishkan',
  'Shofar':           "Shofar — \"Ramshoorn-trompet\" · geblazen op Yom Teruah en andere afgezonderde gelegenheden",
  'shofar':           'shofar — "ramshoorn-trompet"',
  'Mikveh':           'Mikveh — "Vergadering van wateren / Onderdompelingsbassin" · bijbelse onderdompeling/doop',

  // ── Kalender & feesten (aanvulling) ──────────────────────────────────────
  'Rosh Chodesh':     'Rosh Chodesh — "Hoofd van de Maand" · de nieuwe maan, begin van elke bijbelse maand',
  'Moad':             'Moad — "Aangestelde Tijd" (enkelvoud van Moadim)',
  'Omer':             'Omer — een schoof graan · de 50-daagse telling van Bikkorim tot Shavuot',
  'Bikkorim':         'Bikkorim — "Eerstelingen" · zwaaien van de eerste gersteschoof; de dag waarop Yahusha opstond',
  'Matzot':           'Matzot — "Ongezuurde Broden" · het zevendaagse feest van het verwijderen van zuurdesem (zonde) uit het leven',
  'Yom Teruah':       'Yom Teruah — "Dag van Trompetgeschal / Gejuich" · sjofarblazen opent de 7e maand',
  'Shemini Atseret':  'Shemini Atseret — "Achtste Dag Samenkomst" · plechtige afsluiting van Sukkot',
  'Shemitah':         'Shemitah — "Loslating / Laten vallen" · het zevenjarige landrust- en schuldenquittantiejaar',
  'Yovel':            'Yovel — "Jubeljaar" · het 50ste jaar van vrijheid en landteruggave (Wayyiqra 25)',

  // ── Geschriften-divisies (aanvulling) ─────────────────────────────────────
  'Nebiim':           'Nebiim — "Profeten" · de profetische boeken van de Tenach',
  'Nĕḇiyim':        'Nĕḇiyim — "Profeten" (de profetische boeken)',
  'Ketuvim':          'Ketuvim — "Geschriften" · de wijsheids- en poëzieboeken van de Tenach',
  "B'rit Chadashah":  "B'rit Chadashah — \"Nieuw Verbond\" · de geschriften van de Apostelen",
  'Besorah':          'Besorah — "Goed Nieuws / Evangelie"',
  'Mishle':           'Mishle — "Spreuken" (Spreuken) · wijsheidsspreuken van Shelomoh en anderen',

  // ── Concepten & verbond (aanvulling) ─────────────────────────────────────
  'Emet':             'Emet — "Waarheid / Trouwheid / Betrouwbaarheid"',
  'Tsedaqah':         'Tsedaqah — "Gerechtigheid / Rechtvaardigheid" · leven in rechte verhouding met Yahuah',
  'brit':             'brit — "verbond / bindende overeenkomst"',
  'chesed':           'chesed — "liefdevolle trouw / genade"',
  'malak':            'malak — "boodschapper / engel"',
  'Malak':            'Malak — "Boodschapper / Engel" · een gezondene, mens of hemels',
  'Malakim':          'Malakim — "Boodschappers / Engelen" (meervoud)',
  'nabi':             'nabi — "profeet"',
  'Nabi':             'Nabi — "Profeet" · iemand die de woorden van Yahuah spreekt',
  'shalom':           'shalom — "vrede / heelheid / volledigheid"',
  'sheol':            'sheol — "het graf / rijk van de doden"',
  'teshuvah':         'teshuvah — "bekering / terugkeer naar Yahuah"',
  'hai':              'hai — "levend" · zoals in El hai (levende God)',
  'ha':               'ha — "de" · Hebreeuws bepalend lidwoord (voorvoegsel)',

  // ── Voor-zondvloed & reuzen (aanvulling) ─────────────────────────────────
  'Yobelim':         'Yobelim — "Jubileeën" · een extra-canoniek boek met schepping, verbond en kalender van de hemelse tafelen',
  'Yashar':          'Yashar — "De Oprechte / Jasher" · aangehaald in Yahusha 10:13 en 2 Shemuel 1:18',
  'Rephaim':         "Rephaim — \"De Schimmen / Oude Reuzen\" · vertrokken geesten of reuzenstammen in Kena'an",
  'Anakim':          "Anakim — \"Zonen van Anak / Langnekken\" · een reuzenvolk dat Yisra'ĕl tegenkwam in Kena'an",

  // ── Boeken van de Torah (aanvulling) ────────────────────────────────────────
  'Bereshit':        'Bereshit — "In den Beginne" (Genesis) · het eerste boek van de Torah',
  'Shemoth':         'Shemoth — "Namen" (Exodus) · het tweede boek van de Torah',
  'Wayyiqra':        'Wayyiqra — "En Hij Riep" (Leviticus) · het derde boek van de Torah',
  'Bemidbar':        'Bemidbar — "In de Woestijn" (Numeri) · het vierde boek van de Torah',
  'Debarim':         'Debarim — "Woorden" (Deuteronomium) · het vijfde boek van de Torah',
  'Tehillim':        'Tehillim — "Lofzangen / Psalmen" (Psalmen) · het grote boek van aanbidding',

  // ── Ziel & leven na de dood (aanvulling) ─────────────────────────────────
  'Nephesh':         'Nephesh — "Ziel / Levend Wezen" · de hele persoon bezield door de adem van Yahuah',
}


/**
 * Per-locale words that happen to look like a Hebrew name but are common
 * words in that language.  These are excluded from tooltip matching so that
 * e.g. Dutch "Dan" (= "then") at the start of a sentence does not trigger
 * the tribe-of-Dan tooltip.
 *
 * Keep entries lowercase — comparison is done case-insensitively.
 */
export const LOCALE_STOPWORDS: Record<string, ReadonlySet<string>> = {
  nl: new Set([
    'dan',   // Dutch: "then / at that point"
    'gad',   // rare but "gad" is not a Dutch word; keep for safety
  ]),
  en: new Set([
    // "Gad" has no common English meaning; "Dan" is a name but also an
    // informal word ("old dan") — omit for now; add if false positives appear.
  ]),
  // Add more locales here as translations are added.
}

export function getTooltips(locale: string): Record<string, string> {
  if (locale === 'nl') {
    return { ...NAME_TOOLTIPS, ...NAME_TOOLTIPS_NL }
  }
  return NAME_TOOLTIPS
}
