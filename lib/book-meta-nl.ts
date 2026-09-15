// Dutch metadata for books — meaning, summary, themes.
// Used on Read pages when locale === "nl".

export interface BookMetaNl {
  meaning: string
  summary: string
  themes: string[]
}

export const BOOK_META_NL: Record<string, BookMetaNl> = {
  bereshit: {
    meaning: '"In het begin"',
    summary: "Het verslag van de schepping, de val, de vloed en de verbondsbeloften aan de aartsvaders Abraham, Yitschaq en Ya'aqob.",
    themes: ["Schepping", "Verbond", "Zonde & verlossing", "Familie", "Soevereiniteit van Yahuah"],
  },
  shemoth: {
    meaning: '"Namen"',
    summary: "De slavernij van Yisra'el in Mitsrayim, de roeping van Mosheh, de tien plagen, de uittocht en het geven van de Torah op de berg Sinai.",
    themes: ["Bevrijding", "De Naam van Yahuah", "Torah", "Pesach", "Verbond"],
  },
  wayyiqra: {
    meaning: '"En Hij riep"',
    summary: "Instructies voor aanbidding, offers, het priesterschap, feesten en heilig leven voor het volk Yisra'el.",
    themes: ["Afgezonderdheid (Qodesh)", "Offer", "Feesten van Yahuah", "Priesterschap", "Verzoening"],
  },
  bemidbar: {
    meaning: '"In de woestijn"',
    summary: "De veertig jaar van omzwerving in de woestijn, inclusief de volkstelling van Yisra'el, opstand en Yahuahs trouw.",
    themes: ["Geloof & opstand", "Woestijnreis", "Verbondstrouw", "Leiderschap", "Volkstelling"],
  },
  debarim: {
    meaning: '"Woorden"',
    summary: "Mosheh's afscheidstoespraken met een herhaling van de Torah, verbondsvernieuwing en voorbereiding op het Beloofde Land.",
    themes: ["Gehoorzaamheid", "Liefde voor Yahuah", "Verbondsvernieuwing", "Zegen & vloek", "Herinnering"],
  },
  yahusha: {
    meaning: '"Yahuah redt"',
    summary: "De verovering en verdeling van het Beloofde Land onder leiding van Yahusha, de opvolger van Mosheh.",
    themes: ["Geloof & gehoorzaamheid", "Erfenis", "Yahuahs trouw", "Leiderschap", "Verbond"],
  },
  shophetim: {
    meaning: '"Richters"',
    summary: "Cycli van afvalligheid, onderdrukking, berouw en bevrijding door door Yahuah aangestelde richters in Yisra'el.",
    themes: ["Afvalligheid & berouw", "Bevrijding", "Afgoderij", "Cycli van zonde", "Geduld van Yahuah"],
  },
  ruth: {
    meaning: '"Vriendin / gezellin"',
    summary: "De trouw van een Moabitische vrouw aan haar schoonmoeder Naomi en aan de Elohim van Yisra'el, resulterend in verlossing door losser Boaz.",
    themes: ["Trouw (Chesed)", "Verlossing", "Voorzienigheid", "Verbondsopname", "Geslachtslijn van Dawid"],
  },
  "shemuel-a": {
    meaning: '"Naam van El"',
    summary: "Het leven van de profeet Shemuel, de overgang naar de monarchie onder Sha'ul en de opkomst van de jonge Dawid.",
    themes: ["Koningschap", "Gehoorzaamheid", "Verwerping van Yahuah", "Profetische roeping", "Nederigheid"],
  },
  "shemuel-b": {
    meaning: '"Naam van El" (vervolg)',
    summary: "Het koningschap van Dawid — zijn overwinningen, zijn grote zonde en de verbondsbelofte van een eeuwige troon.",
    themes: ["Verbond met Dawid", "Berouw", "Gevolgen van zonde", "Koningschap", "Aanbidding"],
  },
  "melakim-a": {
    meaning: '"Koningen"',
    summary: "Het koningschap van Shelomoh, de bouw van de Tempel, de splitsing van het koninkrijk en de vroege profeten Eliyahu en Elisha.",
    themes: ["Wijsheid", "Tempel", "Splitsing", "Afgoderij", "Profetische confrontatie"],
  },
  "melakim-b": {
    meaning: '"Koningen" (vervolg)',
    summary: "De val van het noordelijke koninkrijk aan Assyrië en het zuidelijke koninkrijk aan Babel, als vervulling van Yahuahs verbondswaarschuwingen.",
    themes: ["Oordeel", "Ballingschap", "Verbondsgevolgen", "Getrouw overblijfsel", "Hervorming"],
  },
  "dibre-a": {
    meaning: '"Woorden / gebeurtenissen van de dagen"',
    summary: "Geslachtsregisters van Adam tot het koningschap van Dawid, gericht op de verbondslijn en de voorbereidingen voor de Tempel.",
    themes: ["Geslachtsregister", "Verbondscontinuïteit", "Aanbidding", "Tempelvoorbereiding", "Erfdeel van Dawid"],
  },
  "dibre-b": {
    meaning: '"Woorden / gebeurtenissen van de dagen" (vervolg)',
    summary: "De Tempel van Shelomoh, de koningen van het zuiden, herleving onder rechtvaardige koningen en de Babylonische ballingschap die eindigt met het decreet van Cyrus.",
    themes: ["Tempelaanbidding", "Hervorming", "Verbondstrouw", "Ballingschap & terugkeer", "Gebed"],
  },
  ezra: {
    meaning: '"Hulp"',
    summary: "De terugkeer van ballingen uit Babel onder Zerubbabel en later Ezra, de herbouw van de Tempel en verbondsvernieuwing.",
    themes: ["Terugkeer uit ballingschap", "Herbouw", "Torah-vernieuwing", "Scheiding van heidendom", "Berouw"],
  },
  nehemyah: {
    meaning: '"Yahuah troost"',
    summary: "Nehemyah's leiderschap bij de herbouw van de muren van Yerushalayim, het herstel van de gemeenschap en de verbondsvernieuwing.",
    themes: ["Leiderschap", "Gebed", "Herbouw", "Gemeenschapsvernieuwing", "Verbondstrouw"],
  },
  ester: {
    meaning: '"Verborgen" (Perzisch: ster) / Hadassah = "mirte"',
    summary: "Hadassah (Ester), een Joodse vrouw in Perzië, riskeert haar leven om haar volk te redden van uitroeiing, en openbaart Yahuahs verborgen voorzienigheid.",
    themes: ["Voorzienigheid", "Moed", "Bevrijding", "Identiteit", "Feest van Purim"],
  },
  iyob: {
    meaning: '"Vervolgd / terugkerend"',
    summary: "Het verwoestende lijden van een rechtvaardige man en zijn worsteling met Yahuah, uitlopend op een goddelijke ontmoeting en herstel.",
    themes: ["Lijden", "Soevereiniteit van Yahuah", "Rechtvaardigheid", "Wijsheid", "Herstel"],
  },
  tehillim: {
    meaning: '"Lofzangen"',
    summary: "150 heilige gedichten en liederen die het volledige spectrum van menselijke ervaring omvatten — lofprijzing, klacht, dankzegging en profetie.",
    themes: ["Aanbidding", "Klacht", "Vertrouwen in Yahuah", "Messiaanse profetie", "Torah-meditatie"],
  },
  mishle: {
    meaning: '"Spreuken / vergelijkingen"',
    summary: "Praktische en morele wijsheid voor het dagelijks leven, geworteld in de vreze van Yahuah als fundament van alle ware kennis.",
    themes: ["Wijsheid", "Vreze van Yahuah", "Rechtvaardigheid", "Spraak", "Karakter"],
  },
  qoheleth: {
    meaning: '"Prediker / vergaderaar van wijsheid"',
    summary: "Een filosofische meditatie over de ijdelheid van het leven buiten Yahuah, met de conclusie dat het vrezen van Elohim en het bewaren van Zijn geboden de gehele plicht van de mens is.",
    themes: ["IJdelheid van het leven", "Vreze van Yahuah", "Wijsheid", "Sterfelijkheid", "Genieten van het leven"],
  },
  shir: {
    meaning: '"Lied der liederen"',
    summary: "Een lyrische viering van verbondsliefde tussen een bruid en bruidegom, algemeen begrepen als een allegorie van Yahuahs liefde voor Yisra'el.",
    themes: ["Liefde", "Verbondsrelatie", "Schoonheid", "Verlangen", "Eenheid"],
  },
  yeshayahu: {
    meaning: '"Yahuah redt"',
    summary: "Profetieën van oordeel over Yisra'el en de volken, en buitengewone visioenen van de Lijdende Knecht en het komende Koninkrijk van Yahuah.",
    themes: ["Oordeel & verlossing", "Lijdende Knecht", "Messias", "Nieuwe schepping", "Afgezonderdheid van Yahuah"],
  },
  yirmeyahu: {
    meaning: '"Yahuah richt op / stelt aan"',
    summary: "Waarschuwingen van de naderende Babylonische ballingschap en een belofte van het Nieuwe Verbond geschreven op het hart, overgebracht door een wenende profeet.",
    themes: ["Nieuw Verbond", "Oordeel", "Berouw", "Trouwe profeet", "Hoop"],
  },
  eikah: {
    meaning: '"Hoe!" (klaaglied)',
    summary: "Vijf klaagliederen die de verwoesting van Yerushalayim en de Tempel betreuren, maar de barmhartigheden van Yahuah bevestigen die elke morgen nieuw zijn.",
    themes: ["Klacht", "Oordeel", "Barmhartigheid van Yahuah", "Berouw", "Hoop te midden van lijden"],
  },
  yehezqel: {
    meaning: '"El versterkt"',
    summary: "Levendige visioenen en profetische drama's vanuit de ballingschap in Babel, uitlopend op het herstel van Yisra'el en een glorieuze toekomstige Tempel.",
    themes: ["Heerlijkheid van Yahuah", "Ballingschap & herstel", "Verbondstrouw", "Droge beenderen", "Nieuw hart"],
  },
  daniyel: {
    meaning: '"El is mijn rechter"',
    summary: "De trouw van Daniyel in de Babylonische gevangenschap en apocalyptische visioenen van wereldrijken en het uiteindelijke Koninkrijk van de Allerhoogste.",
    themes: ["Trouw onder druk", "Soevereiniteit van Yahuah", "Profetie van volken", "Opstanding", "Koninkrijk van Yahuah"],
  },
  hoshua: {
    meaning: '"Redding" (dezelfde wortel als Yahusha)',
    summary: "Yahuah gebiedt Hoshua een ontrouwe vrouw te huwen als een levende gelijkenis van Yisra'els geestelijk overspel en Yahuahs blijvende liefde.",
    themes: ["Verbondsliefde (Chesed)", "Geestelijk overspel", "Berouw", "Herstel", "Huwelijksmetafoor"],
  },
  yoel: {
    meaning: '"Yahuah is El"',
    summary: "Een sprinkhanenplaag wordt een oproep tot nationale bekering, gevolgd door de belofte van de uitstorting van de Ruach ha'Qodesh over alle vlees.",
    themes: ["Bekering", "Dag van Yahuah", "Uitstorting van de Ruach", "Herstel", "Oordeel"],
  },
  amos: {
    meaning: '"Lastdrager"',
    summary: "Een tot profeet geworden herder dondert tegen sociale onrechtvaardigheid, religieuze hypocrisie en het naderende oordeel over Yisra'el.",
    themes: ["Rechtvaardigheid", "Oordeel over Yisra'el", "Sociale gerechtigheid", "Valse aanbidding", "Overblijfsel"],
  },
  obadyah: {
    meaning: '"Knecht / aanbidder van Yahuah"',
    summary: "Een korte maar krachtige uitspraak tegen Edom vanwege zijn trots en verraad van Yisra'el, en een visioen van Yahuahs toekomstig Koninkrijk.",
    themes: ["Oordeel over Edom", "Trots", "Broederschap", "Dag van Yahuah", "Koninkrijk van Yahuah"],
  },
  yunah: {
    meaning: '"Duif"',
    summary: "De vlucht van een tegenstribbelende profeet voor Yahuah, drie dagen in een grote vis, en de opmerkelijke bekering van Nineveh — die Yahuahs barmhartigheid voor alle volken onthult.",
    themes: ["Barmhartigheid voor alle volken", "Bekering", "Vlucht voor Yahuah", "Mededogen", "Gehoorzaamheid"],
  },
  mikah: {
    meaning: '"Wie is als Yahuah?"',
    summary: "Oordeel over Shomeron en Yerushalayim in evenwicht met adembenemende beloften van herstel en de geboorte van de Heerser uit Beyth Lehem.",
    themes: ["Rechtvaardigheid", "Messiaanse profetie", "Oordeel & hoop", "Verbondstrouw", "Nederigheid"],
  },
  nachum: {
    meaning: '"Troost"',
    summary: "Een levendig gedicht dat de totale verwoesting van Nineveh, de hoofdstad van Assyrië, voorspelt — troost voor Yisra'el en een waarschuwing voor alle onderdrukkers.",
    themes: ["Oordeel over Nineveh", "Wraak van Yahuah", "Troost voor Yisra'el", "Soevereiniteit", "Rechtvaardigheid"],
  },
  habaqquq: {
    meaning: '"Hij die omhelst / worstelaar"',
    summary: "Een dialoog tussen de profeet en Yahuah over waarom het kwaad gedijt, eindigend met radicaal vertrouwen: 'de rechtvaardige leeft door zijn geloof.'",
    themes: ["Geloof", "Theodicee (waarom gedijt het kwaad?)", "Vertrouwen in Yahuah", "Gebed", "Oordeel"],
  },
  tsephanyah: {
    meaning: '"Yahuah heeft verborgen / gekoesterd"',
    summary: "Een allesomvattende profetie van de Dag van Yahuah over Yehudah en de volken, gevolgd door een vreugdezang van Yahuah die over Zijn volk jubelt.",
    themes: ["Dag van Yahuah", "Oordeel", "Overblijfsel", "Herstel", "Vreugde"],
  },
  chaggai: {
    meaning: '"Mijn feest / feestelijk"',
    summary: "Vier korte boodschappen die de teruggekeerde ballingen aansporen de Tempel te herbouwen, met de belofte dat Yahuahs heerlijkheid het latere huis zal vullen.",
    themes: ["Tempelherbouw", "Prioriteit van Yahuah", "Verbondszegen", "Heerlijkheid", "Aanmoediging"],
  },
  zekaryah: {
    meaning: '"Yahuah gedenkt"',
    summary: "Acht nachtvisioenen en messiaanse profetieën die de komende Koning op een ezel, de Doorstoken en het uiteindelijke Koninkrijk aankondigen.",
    themes: ["Messiaanse profetie", "Herstel", "Visioenen", "Komende Koning", "Eindtijden"],
  },
  malaki: {
    meaning: '"Mijn bode"',
    summary: "De laatste profetische stem voor vier eeuwen van stilte, die Yisra'el oproept tot verbondstrouw en de komst van Eliyahu aankondigt.",
    themes: ["Verbondstrouw", "Tienden & aanbidding", "Komende bode", "Terugkeer van Eliyahu", "Dag van Yahuah"],
  },
  mattithyahu: {
    meaning: '"Gave van Yahuah"',
    summary: "Geschreven voor een Joods publiek, met Yahusha als de beloofde Messias en Koning die de Torah en de Profeten vervult.",
    themes: ["Koninkrijk der hemelen", "Vervulling van de Torah", "Messias", "Discipelschap", "Joodse wortels"],
  },
  marqus: {
    meaning: '"Van Mars / verdediger" (Latijn)',
    summary: "Het snelste Evangelie — met nadruk op Yahusha's daden als de lijdende Knecht, geschreven voor een Romeins (heidens) publiek.",
    themes: ["Knecht van Yahuah", "Wonderen", "Lijden", "Gezag", "Discipelschap"],
  },
  luqas: {
    meaning: '"Lichtgevend" (Grieks)',
    summary: "Het meest uitgebreide Evangelie, met nadruk op Yahusha's medeleven voor de armen, vrouwen en buitenstaanders, en het werk van de Ruach ha'Qodesh.",
    themes: ["Medeleven", "Redding voor allen", "Gebed", "Ruach ha'Qodesh", "Lofprijzing"],
  },
  yahuchanan: {
    meaning: '"Yahuah is genadig"',
    summary: "Een diepgaand theologisch Evangelie dat Yahusha presenteert als het eeuwige Woord, het Licht der wereld en de grote IK BEN — opgeschreven opdat wij geloven.",
    themes: ["Eeuwig leven", "Licht vs. duisternis", "Geloof", "Liefde", "Ruach ha'Qodesh (Helper)"],
  },
  acts: {
    meaning: '"Handelingen / daden" (Grieks Praxeis)',
    summary: "De geschiedenis van de vroege gemeente van de uitstorting van de Ruach op Shavuot tot de zendingsreizen van Sha'ul en zijn gevangenschap in Rome.",
    themes: ["Ruach ha'Qodesh", "Zending aan alle volken", "Vroege gemeente", "Vervolging", "Getuigenis"],
  },
  romans: {
    meaning: '"Aan de Romeinen"',
    summary: "De meest systematische presentatie van het Goede Nieuws — gerechtigheid door geloof, vrijheid van de zonde en het mysterie van Yisra'els herstel.",
    themes: ["Gerechtigheid door geloof", "Zonde & genade", "Torah", "Herstel van Yisra'el", "Ruach"],
  },
  "qorintiyim-a": {
    meaning: '"Aan de Korintiërs"',
    summary: "Correctie van verdeeldheid, onzedelijkheid en misbruik van gaven in de gemeente te Qorinth, met het grote opstandingshoofdstuk en de hymne aan de liefde.",
    themes: ["Eenheid", "Liefde", "Geestelijke gaven", "Opstanding", "Heilig leven"],
  },
  "qorintiyim-b": {
    meaning: '"Aan de Korintiërs" (tweede)',
    summary: "Een diepst persoonlijke brief ter verdediging van zijn apostelschap, met een beschrijving van de heerlijkheid van het Nieuwe Verbondsdienstwerk en de genade door zwakheid.",
    themes: ["Zwakheid & kracht", "Nieuw Verbond", "Lijden", "Geven", "Apostolisch gezag"],
  },
  galatiyim: {
    meaning: '"Aan de Galaten"',
    summary: "Een dringende verdediging van het Goede Nieuws van genade tegen degenen die werken van de wet toevoegen als basis van rechtvaardiging.",
    themes: ["Vrijheid in Mashiach", "Geloof vs. werken", "Torah & genade", "Vrucht van de Ruach", "Nieuwe schepping"],
  },
  ephesiyim: {
    meaning: '"Aan de Efeziërs"',
    summary: "Een majestueuze brief over de identiteit en roeping van de gelovige in Mashiach, eenheid van Jood en heiden in één lichaam en de gehele wapenrusting van Yahuah.",
    themes: ["Identiteit in Mashiach", "Eenheid", "Genade", "Geestelijke strijd", "Waardig wandelen"],
  },
  pilippiyim: {
    meaning: '"Aan de Filippenzen"',
    summary: "Een vreugdevolle brief geschreven vanuit de gevangenis, met de aansporing te verblijden, stand te houden en de nederigheid van Mashiach na te volgen.",
    themes: ["Vreugde", "Nederigheid", "Tevredenheid", "Partnerschap in het Goede Nieuws", "Gezindheid van Mashiach"],
  },
  qolasim: {
    meaning: '"Aan de Kolossenzen"',
    summary: "Bevestiging van de opperste voorrang van Yahusha over heel de schepping en waarschuwing tegen holle filosofieën die Hem verminderen.",
    themes: ["Voorrang van Yahusha", "Valse leer", "Nieuw leven in Mashiach", "Aanbidding", "Volledigheid in Hem"],
  },
  "tess-a": {
    meaning: '"Aan de Thessalonicenzen"',
    summary: "Bemoediging voor een jonge gemeente onder vervolging, met onderricht over heilig leven en de terugkomst van Yahusha.",
    themes: ["Terugkomst van Yahusha", "Bemoediging", "Heilig leven", "Vervolging", "Hoop"],
  },
  "tess-b": {
    meaning: '"Aan de Thessalonicenzen" (tweede)',
    summary: "Correctie van verwarring over de Dag van Yahuah — verduidelijking van tekenen die eraan vooraf moeten gaan, en aansporing tot trouwe arbeid tot die dag.",
    themes: ["Dag van Yahuah", "Wetteloosheid", "Geduld", "Standvastigheid", "Eindtijden"],
  },
  "timothy-a": {
    meaning: '"Eert Elohim" (Grieks)',
    summary: "Praktische instructies aan de jonge leider Timotheus over gezonde leer, gemeenteorde en het goede gevecht van het geloof.",
    themes: ["Gezonde leer", "Leiderschap", "Gebed", "Godsvrucht", "Valse leer"],
  },
  "timothy-b": {
    meaning: '"Eert Elohim" (tweede)',
    summary: "Sha'uls laatste brief voor zijn martelaarsdood, met de aansporing aan Timotheus om het pand van het geloof te bewaren, ontberingen te verdragen en het Woord te prediken.",
    themes: ["Volharding", "Schrift", "Laatste dagen", "Trouw", "Lijden voor het Goede Nieuws"],
  },
  titos: {
    meaning: '"Geëerd" (Grieks)',
    summary: "Instructies aan Titos over het aanstellen van oudsten, het tot zwijgen brengen van valse leraars en de genade van Yahuah die ons leert rechtvaardig te leven.",
    themes: ["Gemeenteorde", "Gezonde leer", "Genade", "Goede werken", "Godvruchtig karakter"],
  },
  philemon: {
    meaning: '"Vriendelijk" (Grieks)',
    summary: "Een persoonlijk verzoek aan een gelovige zijn weggelopen slaaf Onesimus — nu een broeder in Mashiach — terug te ontvangen, als bewijs van vergiffenis en verzoening.",
    themes: ["Vergiffenis", "Broederschap", "Verzoening", "Genade", "Nieuwe identiteit in Mashiach"],
  },
  ibrim: {
    meaning: '"Hebreeën / degenen die oversteken"',
    summary: "Een meesterlijk betoog dat Yahusha als superieur aan engelen, Mosheh, het Levitische priesterschap en het oude verbond aantoont — de uiteindelijke Hogepriester en Middelaar.",
    themes: ["Voorrang van Yahusha", "Hogepriesterschap", "Geloof", "Volharding", "Nieuw Verbond"],
  },
  yaaqob: {
    meaning: '"Hij die verdringt / op de hiel volgt" (Yaaqob)',
    summary: "Een praktische brief over geleefd geloof — oprecht geloof brengt goede werken voort, beteugelt de tong, zorgt voor de armen en verdraagt beproevingen.",
    themes: ["Geloof & werken", "Beproevingen", "Wijsheid", "Tong", "Zorg voor de armen"],
  },
  "kepha-a": {
    meaning: '"Rots" (Aramees)',
    summary: "Bemoediging voor gelovigen verstrooid door vervolging om standvastig te blijven, eerlijk te leven en hoop te vinden in Yahusha's opstanding.",
    themes: ["Lijden", "Hoop", "Heilig leven", "Onderwerping", "Levende steen"],
  },
  "kepha-b": {
    meaning: '"Rots" (tweede brief)',
    summary: "Een waarschuwing tegen valse profeten en leraars, een aansporing te groeien in kennis van Yahusha en zekerheid van Zijn beloofde terugkomst.",
    themes: ["Valse leer", "Kennis van Yahusha", "Terugkomst van Yahusha", "Schrift", "Godsvrucht"],
  },
  "yohanan-a": {
    meaning: '"Yahuah is genadig" (eerste brief)',
    summary: "Zekerheid van het eeuwig leven en de toets van ware gemeenschap: wandelen in het licht, Zijn geboden bewaren en elkaar liefhebben.",
    themes: ["Liefde", "Zekerheid", "Licht vs. duisternis", "Geboden bewaren", "Blijven in Mashiach"],
  },
  "yohanan-b": {
    meaning: '"Yahuah is genadig" (tweede brief)',
    summary: "Een korte brief aan een uitverkoren vrouw en haar kinderen, met de aansporing tot liefde, waarheid en voorzichtigheid tegenover valse leraars.",
    themes: ["Waarheid & liefde", "Geboden", "Gastvrijheid", "Valse leer", "Wandelen in de waarheid"],
  },
  "yohanan-c": {
    meaning: '"Yahuah is genadig" (derde brief)',
    summary: "Persoonlijke lof voor Gaios vanwege zijn gastvrijheid voor rondtrekkende werkers van de waarheid, in contrast met de twistzieke Diotrephes.",
    themes: ["Gastvrijheid", "Waarheid", "Ondersteuning van werkers", "Leiderschap", "Wandelen in de waarheid"],
  },
  yahudah: {
    meaning: '"Geprezen / Judah"',
    summary: "Een scherpe waarschuwing tegen degenen die genade omzetten in losbandigheid en Yahusha verloochenen, met een oproep ernstig te strijden voor het geloof.",
    themes: ["Strijden voor het geloof", "Valse leraars", "Oordeel", "Volharding", "Doxologie"],
  },
  hazon: {
    meaning: '"Visioen / Openbaring"',
    summary: "Apocalyptische visioenen gegeven aan Yahuchanan op het eiland Patmos — de verheerlijkte Mashiach, brieven aan zeven gemeenten, kosmisch oordeel en het Nieuwe Yerushalayim.",
    themes: ["Terugkomst van Yahusha", "Oordeel", "Nieuwe schepping", "Aanbidding", "Overwinning van het Lam"],
  },

  // ── Extra-canonieke boeken ────────────────────────────────────────────────
  "adam-hawwah-a": {
    meaning: '"Man / aardbewerker" (eerste boek)',
    summary:
      "Het leven van Aḏam en Ḥawwah na de verdrijving uit Eden — hun bekering, strijd, hemelse visioenen en de beloften van toekomstige verlossing door het Zaad.",
    themes: ["Bekering", "Val & verlossing", "Engelenbezoeken", "Dood", "Hoop op opstanding"],
  },
  "adam-hawwah-b": {
    meaning: '"Man / aardbewerker" (tweede boek)',
    summary:
      "Vervolg van Aḏam en Ḥawwah, inclusief de geboorte van Sheeth, de overdracht van wijsheid aan volgende generaties en Aḏams laatste woorden voor zijn dood.",
    themes: ["Lijn van Sheeth", "Wijsheidsoverdracht", "Dood & rouw", "Engelenvoorspraak", "Verbondsbelofte"],
  },
  hanok: {
    meaning: '"Ingewijd"',
    summary:
      "Profetische visioenen en hemelse reizen van Ḥanoḵ over de val van de Wachters, kosmische wetten, het komende Oordeel en de Rechtvaardige die over alles zal heersen.",
    themes: ["Gevallen Wachters", "Kosmische orde", "Oordeel", "Mensenzoon", "Hemelse reizen"],
  },
  "writings-abraham": {
    meaning: '"Vader van vele naties"',
    summary:
      "Openbaringen aan Aḇraham — zijn verwerping van afgoderij, zijn hemelvaart, visioenen van de schepping, de val van de mens en de verbondsbeloften aan zijn nakomelingen.",
    themes: ["Verwerping van afgoden", "Hemelvaart", "Verbond", "Verkiezing van Yisra'el", "Eschatologie"],
  },
  "writings-eliyahu": {
    meaning: '"Mijn Elohim is Yahuah"',
    summary:
      "Apocalyptische openbaringen toegeschreven aan de profeet Ĕliyahu, over eindtijdgebeurtenissen, het bewind van de tegenstander, het lijden van de rechtvaardigen en de uiteindelijke bevrijding van Yisra'el.",
    themes: ["Eindtijd", "Vervolging van de rechtvaardigen", "Bevrijding", "Tegenstander", "Opstanding"],
  },
  "testament-reuben": {
    meaning: `"Zie, een zoon!" — eerstgeborene van Ya'aqoḇ`,
    summary:
      "Het sterfbedtestament van Re'uḇĕn, zijn zonen waarschuwend tegen seksuele ontucht en trots — bekennend zijn zonde met Bilhah en hen aansporend Lĕwi en Yahudah te eren.",
    themes: ["Seksuele reinheid", "Bekering", "Trots", "Eer voor het priesterschap", "Morele vermaning"],
  },
  "testament-simeon": {
    meaning: `"Gehoord" — tweede zoon van Ya'aqoḇ`,
    summary:
      "Shim'ons sterfwoorden waarschuwen voor afgunst — zijn jaloezie op Yosĕph belijdend — en roepen zijn zonen op tot eenvoud van hart en eenheid, met een profetie over de komende Verlosser.",
    themes: ["Afgunst", "Bekering", "Eenvoud van hart", "Eenheid", "Messiaanse profetie"],
  },
  "testament-levi": {
    meaning: '"Verbonden / aangehecht" — priesterlijke stam',
    summary:
      "Lĕwi's testament beschrijft zijn hemelse visioenen, zijn aanstelling tot het priesterschap en zijn opdracht aan zijn zonen de Torah zuiver te bewaren — met waarschuwingen voor priesterlijke corruptie.",
    themes: ["Priesterschap", "Hemels visioen", "Torah-reinheid", "Priesterlijke corruptie", "Messiaanse priester"],
  },
  "testament-judah": {
    meaning: '"Geprezen" — voorvader van de koningen',
    summary:
      "Yahuḏah's sterfwoorden beschrijven zijn militaire heldendaden, zijn zonden van hebzucht en wellust (inclusief Tamar) en zijn aansporing losbandigheid en geldliefde te ontvluchten — met een profetie over een koning-priester.",
    themes: ["Leiderschap", "Bekering", "Ontucht & hebzucht", "Koninklijke lijn", "Messiaanse profetie"],
  },
  "testament-dan": {
    meaning: '"Rechter"',
    summary:
      "Dan waarschuwt zijn zonen voor woede en leugen — zijn haat jegens Yosĕph belovend — en spoort hen aan de waarheid vast te houden, met de profetie dat de Tegenstander door Dans stam zal werken.",
    themes: ["Woede", "Leugen", "Bekering", "Bedrieglijk van de Tegenstander", "Waarheid"],
  },
  "testament-naphtali": {
    meaning: '"Mijn strijd / worsteling"',
    summary:
      "Naphtali vermaant zijn kinderen hun leven in harmonie met de schepping te ordenen, deelt twee profetische visioenen over Yisra'els verstrooiing en herstel, en dringt aan op reinheid en eenheid.",
    themes: ["Orde van de schepping", "Reinheid", "Visioenen van verstrooiing", "Herstel", "Eenheid"],
  },
  "testament-gad": {
    meaning: '"Legerschare / geluk"',
    summary:
      "Gaḏ belijdt zijn haat jegens Yosĕph en waarschuwt krachtig tegen haat als werktuig van de Tegenstander — aansporend tot broederliefde en bekering, belovend dat liefde alle zonde bedekt.",
    themes: ["Haat", "Bekering", "Broederliefde", "Tegenstander", "Vergeving"],
  },
  "testament-asher": {
    meaning: '"Gelukkig / gezegend"',
    summary:
      "Ashĕr leert de leer van de twee wegen — goed en kwaad — en spoort aan tot eenheid van hart, terwijl hij waarschuwt voor dubbelhartigheid, met een profetie over Yisra'els ballingschap en toekomstig herstel.",
    themes: ["Twee wegen (goed vs. kwaad)", "Eenheid van hart", "Dubbelhartigheid", "Ballingschap", "Herstel"],
  },
  "testament-issachar": {
    meaning: '"Er is loon / gehuurde man"',
    summary:
      "Yissaḵar prijst eenvoud van leven — landbouw, eerlijk werk en oprecht karakter — als de weg der gerechtigheid, zijn zonen aansporend Yahuah en elkaar lief te hebben en de Torah trouw te bewaren.",
    themes: ["Eenvoud", "Eerlijk werk", "Liefde voor de Torah", "Broederliefde", "Gerechtigheid"],
  },
  "testament-zebulun": {
    meaning: '"Woning / eer"',
    summary:
      "Zeḇulun beschrijft zijn medeleven met Yosĕph en vermaant zijn zonen tot compassie en barmhartigheid voor alle mensen, met een profetie over de barmhartigheid van Yahuah jegens Yisra'el in de laatste dagen.",
    themes: ["Medeleven", "Barmhartigheid", "Voorbede", "Eenheid van broeders", "Eschatologisch herstel"],
  },
  "testament-joseph": {
    meaning: '"Moge Hij toevoegen"',
    summary:
      "Yosĕph vertelt over zijn beproevingen door zijn broers en de vrouw van Potiphar als lessen in volharding, reinheid en vergiffenis — een model van geduldig lijden en vertrouwen op Yahuahs verlossing.",
    themes: ["Volharding in beproeving", "Seksuele reinheid", "Vergiffenis", "Vertrouwen op Yahuah", "Lijden & beloning"],
  },
  "testament-benjamin": {
    meaning: '"Zoon van de rechterhand"',
    summary:
      "Binyamin's laatste opdracht roept zijn zonen op tot een goed gemoed en zuiver hart, met Yosĕph als hoogste voorbeeld van deugd, en profeteert de komst van het Lam van Yahuah dat alle volken zal redden.",
    themes: ["Goed gemoed", "Reinheid van hart", "Deugd van Yosĕph", "Messiaans Lam", "Redding van de volken"],
  },
  yobelim: {
    meaning: '"Jubeljaren / ramshoorns"',
    summary:
      "Een hervertelling van Bereshit en vroeg Shemoth vanuit het perspectief van een zonnekalender, de geschiedenis verdelend in negenenveertigjarige Jubileumcycli, met nadruk op verbondstrouw, de Shabbat en Yahuahs soevereine controle.",
    themes: ["Kalender & jubileeën", "Verbond", "Heiligheid van de Shabbat", "Engelenopenbaring", "Torah"],
  },
  yashar: {
    meaning: '"Oprecht"',
    summary:
      "Een narratieve uitbreiding van de Tanak van Adam tot de verovering van Kena'an, met biografische en historische details die niet in de canonieke tekst voorkomen — vooral over de levens van de aartsvaders en de Exodus.",
    themes: ["Patriarchale geschiedenis", "Exodus", "Oorlog & verovering", "Geslachtsregisters", "Narratieve uitbreiding"],
  },
  "tehillim-add": {
    meaning: '"Lofzangen — Toevoegingen"',
    summary:
      "Aanvullende psalmen van lof en gebed die niet zijn opgenomen in de canonieke 150 Tehillim — inclusief Psalm 151 (Dawids eigen woorden over zijn zalving) en anderen uit de Dode Zeerollen.",
    themes: ["Lofprijs", "Zalving van Dawid", "Gebed", "Dode Zeerollen-traditie", "Aanbidding"],
  },
  hakmah: {
    meaning: '"Wijsheid"',
    summary:
      "Een filosofische meditatie over wijsheid, gerechtigheid en onsterfelijkheid — beargumenterend dat de zielen van de rechtvaardigen in Yahuahs hand zijn, het lot van de goddelozen contrasterende en de rol van wijsheid in Yisra'els geschiedenis prijzende.",
    themes: ["Wijsheid & gerechtigheid", "Onsterfelijkheid van de ziel", "Lot van de goddelozen", "Heilsgeschiedenis", "Schepping"],
  },
  sira: {
    meaning: '"Doorn / Sira (familienaam)"',
    summary:
      "Een uitgebreide verzameling wijsheidsspreuken over vriendschap, gezin, spraak, ootmoed, gebed en de vreze van Yahuah — een van de rijkste praktische wijsheidsteksten uit de Tweede Tempeltijd.",
    themes: ["Vreze van Yahuah", "Praktische wijsheid", "Spraak", "Vriendschap", "Gebed & lofprijs"],
  },
  yahudith: {
    meaning: '"Joodse vrouw / lof"',
    summary:
      "Een moedige weduwe genaamd Yahuḏith verschalkt en onthoofdt de Assyrische veldheer Ḥolophernes, haar stad reddend door geloof, vasten en moedig handelen — een verhaal van Yahuah die Zijn volk bevrijdt door het zwakke der wereld.",
    themes: ["Bevrijding", "Geloof & moed", "Gebed & vasten", "Vrouwenheldenmoed", "Overwinning op onderdrukkers"],
  },
  tobiyah: {
    meaning: '"Yahuah is goed"',
    summary:
      "Het verhaal van Toḇiyah en zijn vader Toḇit — getrouwe Yisra'elieten in ballingschap — begeleid door de engel Rapha'ĕl op een reis van genezing, bevrijding van een demon en vreugdevol herstel.",
    themes: ["Voorzienigheid", "Getrouw in ballingschap", "Genezing", "Engelen", "Gebed & aalmoezen"],
  },
  baruk: {
    meaning: '"Gezegend"',
    summary:
      "Een brief van berouw, wijsheid en troost gericht aan de ballingen in Babel — de zonde van Yisra'el belijdend, wijsheid als Yahuahs gave prijzende en belovend dat Yahuah Zijn verstrooide volk zal herstellen.",
    themes: ["Ballingschap & bekering", "Belijdenis van zonde", "Wijsheid als Torah", "Troost & herstel", "Terugkeer uit ballingschap"],
  },
  "letter-yirmeyahu": {
    meaning: '"Yahuah verheft" (brief van)',
    summary:
      "Een satirische brief aan de Babylonische ballingen die de dwaasheid van afgodenverering bespot — de mensen van Yahuah aansporend de dode goden van de volken niet te vrezen of te volgen.",
    themes: ["Afgodenverering", "Satire", "Trouw in ballingschap", "Levende Elohim vs. afgoden", "Vermaning"],
  },
  "prayer-menashsheh": {
    meaning: '"Doen vergeten" (gebed van)',
    summary:
      "Een hartstochtelijk boetgebed toegeschreven aan de goddeloosste koning van Yahudah — een diepgaande belijdenis van zonde, erkenning van Yahuahs barmhartigheid en smeekbede om vergiffenis.",
    themes: ["Bekering", "Barmhartigheid van Yahuah", "Belijdenis", "Vergiffenis", "Zelfs de slechtste kan terugkeren"],
  },
  "prayer-azaryah": {
    meaning: '"Yahuah heeft geholpen" (gebed van)',
    summary:
      "Het gebed van Azaryah vanuit de brandende oven, Yisra'els zonde belijdend en Yahuah prijzend voor Zijn gerechtigheid, gevolgd door het Lied van de Drie Jongemannen dat heel de schepping verheerlijkt.",
    themes: ["Gebed in beproeving", "Belijdenis", "Lofzang", "Brandende oven", "Gerechtigheid van Yahuah"],
  },
  "bel-dragon": {
    meaning: '"Bel (heer) en de Draak"',
    summary:
      "Twee korte verhalen waarin Dani'ĕl het bedrog van Bels priesters ontmaskert en het draakidool vernietigt — aantonende dat de goden van Babel levenloos zijn en alleen Yahuah de levende Elohim is.",
    themes: ["Afgoderij ontmaskerd", "Levende Elohim", "Moed", "Profetisch getuigenis", "Babylonische religie"],
  },
  shoshannah: {
    meaning: '"Lelie / roos"',
    summary:
      "Het verhaal van Shoshannah, een rechtvaardige vrouw valselijk beschuldigd van overspel door corrupte oudsten — gered door de jonge Dani'ĕl's geïnspireerd kruisverhoor, de waarheid vindende en onrecht veroordelende.",
    themes: ["Rechtvaardigheid", "Valse beschuldiging", "Gerechtigheid", "Wijsheid van Dani'ĕl", "Bevrijding"],
  },
  "hadassah-add": {
    meaning: '"Mirte" — toevoegingen aan Haḏassah (Esther)',
    summary:
      "Toevoegingen aan het boek Haḏassah inclusief Mordekhai's droom, de volledige tekst van koninklijke edicten, uitgebreide gebeden van Mordekhai en Haḏassah, en slotinterpretaties — de religieuze dimensie uitbouwend.",
    themes: ["Voorzienigheid", "Gebed", "Moed van Haḏassah", "Goddelijke soevereiniteit", "Joodse identiteit"],
  },
  "ezra-a": {
    meaning: '"Hulp" (1 Ezra)',
    summary:
      "Een alternatieve Griekse versie van de terugkeer uit Babel, het meest bekend om het verhaal van de drie jonge lijfwachten die debatteren wat het sterkste in de wereld is — waarbij waarheid als het grootste wordt uitgeroepen.",
    themes: ["Herstel uit ballingschap", "Waarheid is het grootste", "Tempelherbouw", "Priesterlijke hervorming", "Besluit van Koresh"],
  },
  "ezra-b": {
    meaning: '"Hulp" (2 Ezra / 4 Ezra)',
    summary:
      "Een diepgaand apocalyptisch werk — Ezra worstelt met Yahuah over het lijden van Yisra'el, ontvangt zeven visioenen inclusief de Wenende Vrouw, de Adelaar van Rome en de Man uit de Zee, en krijgt de opdracht de heilige geschriften te herstellen.",
    themes: ["Theodicee", "Apocalyptische visioenen", "Lijden van Yisra'el", "Eindtijd", "Herstel van de Schrift"],
  },
  "maqqabim-a": {
    meaning: '"Hamer" (1 Maqqaḇim)',
    summary:
      "De geschiedenis van de opstand van de Maqqaḇim-familie tegen de Seleucidische koning Antiochus IV Epiphanes — de ontheiliging van de Tempel, de guerrillaoorlog geleid door Yahudah Maqqaḇi en de herwijding gevierd als Ḥanukkah.",
    themes: ["Getrouwe weerstand", "Tempelontheiliging & herwijding", "Ḥanukkah", "Martelaarschap", "Verbondszealotisme"],
  },
  "maqqabim-b": {
    meaning: '"Hamer" (2 Maqqaḇim)',
    summary:
      "Een theologische hervertelling van de Maqqaḇim-opstand met nadruk op de opstanding der doden, de voorspraak van de rechtvaardigen en Yahuahs directe ingrijpen — inclusief de beroemde martelaarsverslagen.",
    themes: ["Opstanding der doden", "Martelaarschap", "Voorspraak", "Tempel", "Directe handeling van Yahuah"],
  },
}
