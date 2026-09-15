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
  'Shim\'on':        "Shim'on — \"He who hears\" (Simeon)",
  'Lĕwi':            'Lĕwi — "Attached / Joined" (Levi)',
  'Lewi':            'Lewi — "Attached / Joined" (Levi)',
  'Yehudah':          'Yehudah — "Praise to Yahuah" (Judah)',
  'Yahudah':          'Yahudah — "Praise to Yahuah" (Judah/Jude)',

  // ── Moses & Exodus era ───────────────────────────────────────────────────
  'Mosheh':            'Mosheh — "Drawn out of water" (Moses)',
  'Aharon':            'Aharon — "Exalted / Mountain of strength" (Aaron)',
  'Miryam':            'Miryam — "Bitterness / Beloved" (Miriam / Mary)',

  // ── Conquest & Judges ────────────────────────────────────────────────────
  'Yahusha bin Nun':   'Yahusha bin Nun — "Yahuah is Salvation, son of Nun" (Joshua)',

  // ── Kings ────────────────────────────────────────────────────────────────
  'Dawid':             'Dawid — "Beloved" (David)',
  'Shelomoh':          'Shelomoh — "Peaceful / His peace" (Solomon)',
  'Sha\'ul':          "Sha'ul — \"Asked for; prayed for\" (Saul / Paul)",
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
}

/** Sorted keys longest-first to avoid partial matches (e.g. "Ruaḥ ha'Qodesh" before "Ruach") */
export const TOOLTIP_KEYS = Object.keys(NAME_TOOLTIPS).sort((a, b) => b.length - a.length)

/**
 * Dutch translations of the name tooltips
 */
export const NAME_TOOLTIPS_NL: Record<string, string> = {
  'HWHY':               '𐤉𐤄𐤅𐤄 Yahuah — "IK BEN DIE IK BEN" · De Zelfbestaande',

  'Yahusha':            'Yahusha — "Yahuah is Redding"',
  'Mashiach':           'Mashiach — "De Gezalfde" (Messias)',

  "Ruaḥ ha'Qodesh":    "Ruaḥ ha'Qodesh — De Afgesonderde Geest",
  'Ruach haQodesh':    'Ruach haQodesh — De Afgesonderde Geest',
  'Ruach':             'Ruach — Geest / Adem / Wind',

  'Aḏam':              'Aḏam — "Mens; uit de rode aarde" (Adam)',
  'Adam':              'Adam — "Mens; uit de rode aarde"',
  'Ḥawwah':           'Ḥawwah — "Moeder van alle levenden" (Eva)',
  'Hawwah':           'Hawwah — "Moeder van alle levenden" (Eva)',
  'Qayin':             'Qayin — "Verkregen / Speer" (Kaïn)',
  'Heḇel':            'Heḇel — "Adem / IJdelheid" (Abel)',
  'Sheth':             'Sheth — "Aangesteld / Vergoeding" (Seth)',
  'Noaḥ':             'Noaḥ — "Rust / Troost" (Noach)',
  'Noah':              'Noah — "Rust / Troost" (Noach)',
  'Shĕm':             'Shĕm — "Naam / Roem" (Sem)',
  'Aḇraham':          'Aḇraham — "Vader van vele volken" (Abraham)',
  'Aḇram':            'Aḇram — "Verheven Vader" (oorspronkelijke naam van Abraham)',
  'Sārai':            'Sārai — "Mijn Prinses" (oorspronkelijke naam van Sara)',
  'Sārāh':            'Sārāh — "Prinses; moeder van volken" (Sara)',
  'Yitsḥaq':          'Yitsḥaq — "Hij lacht" (Izak)',
  "Ya'aqoḇ":         "Ya'aqoḇ — \"Verdringer; hij die op de hiel volgt\" (Jakob)",
  "Yisra'ĕl":        "Yisra'ĕl — \"Hij die met Aluahim strijdt\" (Israël)",
  'Yisrael':          'Yisrael — "Hij die met Aluahim strijdt" (Israël)',
  'Yosĕph':          'Yosĕph — "Hij zal toevoegen / Vermeerdering" (Jozef)',
  'Yoseph':          'Yoseph — "Hij zal toevoegen / Vermeerdering" (Jozef)',
  'Binyamin':          'Binyamin — "Zoon van de rechterhand" (Benjamin)',
  "Reuḇĕn":          'Reuḇĕn — "Zie, een zoon!" (Ruben)',
  "Shim'on":          "Shim'on — \"Hij die hoort\" (Simeon)",
  'Lĕwi':            'Lĕwi — "Verbonden / Gehecht" (Levi)',
  'Lewi':            'Lewi — "Verbonden / Gehecht" (Levi)',
  'Yehudah':          'Yehudah — "Lofprijzing aan Yahuah" (Juda)',
  'Yahudah':          'Yahudah — "Lofprijzing aan Yahuah" (Juda)',

  'Mosheh':            'Mosheh — "Uit het water getrokken" (Mozes)',
  'Aharon':            'Aharon — "Verheven / Berg van kracht" (Aäron)',
  'Miryam':            'Miryam — "Bitterheid / Geliefde" (Mirjam / Maria)',

  'Yahusha bin Nun':   'Yahusha bin Nun — "Yahuah is Redding, zoon van Nun" (Jozua)',

  'Dawid':             'Dawid — "Geliefde" (David)',
  'Shelomoh':          'Shelomoh — "Vredevol / Zijn vrede" (Salomo)',
  "Sha'ul":           "Sha'ul — \"Voor gebeden; afgesmeekt\" (Saul / Paulus)",
  'Shaul':             'Shaul — "Voor gebeden; afgesmeekt" (Saul / Paulus)',

  'EliYahu':           'EliYahu — "Mijn Aluahim is Yahuah" (Elia)',
  'Eliyahu':           'Eliyahu — "Mijn Aluahim is Yahuah" (Elia)',
  'Elisha':            'Elisha — "Mijn Aluahim is Redding" (Elisa)',
  'YeshaYahu':         'YeshaYahu — "Redding van Yahuah" (Jesaja)',
  'YirmeYahu':         'YirmeYahu — "Yahuah zal oprichten" (Jeremia)',
  'Yehezqel':          'Yehezqel — "Aluahim zal versterken" (Ezechiël)',
  'Daniyel':           'Daniyel — "Aluahim is mijn rechter" (Daniël)',
  'Hoshea':            'Hoshea — "Redding" (Hosea)',
  'Yona':              'Yona — "Duif" (Jona)',
  'Mikah':             'Mikah — "Wie is als Aluahim?" (Micha)',

  'Yahuchanan':        'Yahuchanan — "Yahuah is Genadig" (Johannes)',
  'MattithYahu':       'MattithYahu — "Gave van Yahuah" (Mattheüs)',
  'Marqus':            'Marqus — "Verdediger" (Marcus)',
  'Luqas':             'Luqas — "Lichtgevend" (Lucas)',
  'Kepha':             'Kepha — "Rots / Steen" (Petrus)',
  'Yaaqob':            'Yaaqob — "Verdringer" (Jakobus / Jakob)',
  'Titos':             'Titos — "Geëerd" (Titus)',
  'Timotheus':         'Timotheus — "Aluahim eren" (Timotheüs)',

  'Aluahim':           'Aluahim — "Machtige Wezens; de Allerhoogste" (Elohim / God)',
  'Elohim':            'Elohim — "Machtige Wezens; de Allerhoogste"',
  'El Shaddai':        'El Shaddai — "Aluahim de Almachtige / van de bergen"',
  'El Elyon':          'El Elyon — "Allerhoogste Aluahim"',
  'Aḏonai':           'Aḏonai — "Mijn Meester / Heer"',

  'Yerushalayim':      'Yerushalayim — "Stad van Vrede / Gegrondvest in vrede" (Jeruzalem)',
  'Mitsrayim':         'Mitsrayim — "Belegerde vesting; de twee zeeëngten" (Egypte)',
  "Kena'an":           "Kena'an — \"Laagland; handelsland\" (Kanaän)",
  'Kenaan':            'Kenaan — "Laagland; handelsland" (Kanaän)',
  'Tsiyon':            'Tsiyon — "Vesting / Droge plaats" (Sion)',
  'Yarden':            'Yarden — "Afdaler; neerstromend" (Jordaan)',
  'Galil':             'Galil — "Kring / District" (Galilea)',
  'Bĕyth Leḥem':     'Bĕyth Leḥem — "Huis van Brood" (Bethlehem)',
  'Natsareth':         'Natsareth — "Spruit / Wachttoren" (Nazareth)',
  'Yeriho':            'Yeriho — "Stad van de maan / Geurig" (Jericho)',
  'Bĕyth El':         'Bĕyth El — "Huis van Aluahim" (Betel)',
  'Hĕḇron':          'Hĕḇron — "Gemeenschap / Verbond" (Hebron)',
  'Sinai':             'Sinai — Berg van het Verbond; waar de Torah gegeven werd',
  'Horeb':             'Horeb — "Woestenij / Droogte" · andere naam voor Sinai',
}

export const TOOLTIPS_BY_LOCALE: Record<string, Record<string, string>> = {
  en: NAME_TOOLTIPS,
  nl: NAME_TOOLTIPS_NL,
}

export function getTooltips(locale: string): Record<string, string> {
  return TOOLTIPS_BY_LOCALE[locale] ?? NAME_TOOLTIPS
}
