// Per-book metadata displayed on the Read page.
// Fields: meaning of Hebrew name, traditional author, timeframe, summary, themes.
export interface BookMeta {
  meaning: string        // meaning of the Hebrew name
  author: string
  period: string         // approx. time written / events covered
  summary: string        // 1–2 sentence description
  themes: string[]       // 3–5 key themes
}

export const BOOK_META: Record<string, BookMeta> = {
  bereshit: {
    meaning: '"In the beginning"',
    author: "Mosheh (Moses)",
    period: "Creation – c. 1800 BCE",
    summary:
      "The account of creation, the fall, the flood, and the covenant promises made to the patriarchs Abraham, Isaac, and Jacob.",
    themes: ["Creation", "Covenant", "Sin & redemption", "Family", "Sovereignty of Yahuah"],
  },
  shemoth: {
    meaning: '"Names"',
    author: "Mosheh (Moses)",
    period: "c. 1446 BCE",
    summary:
      "Yisra'ĕl's slavery in Mitsrayim (Egypt), the calling of Mosheh, the ten plagues, the Exodus, and the giving of the Torah at Mount Sinai.",
    themes: ["Deliverance", "The Name of Yahuah", "Torah", "Passover", "Covenant"],
  },
  wayyiqra: {
    meaning: '"And He called"',
    author: "Mosheh (Moses)",
    period: "c. 1446 BCE",
    summary:
      "Instructions for worship, sacrifices, the priesthood, feasts, and set-apart living for the nation of Yisra'ĕl.",
    themes: ["Set-apartness (Qodesh)", "Sacrifice", "Feasts of Yahuah", "Priesthood", "Atonement"],
  },
  bemidbar: {
    meaning: '"In the wilderness"',
    author: "Mosheh (Moses)",
    period: "c. 1446–1406 BCE",
    summary:
      "The forty years of wandering in the wilderness, including the census of Yisra'ĕl, rebellion, and Yahuah's faithfulness.",
    themes: ["Faith & rebellion", "Wilderness journey", "Covenant faithfulness", "Leadership", "Census"],
  },
  debarim: {
    meaning: '"Words"',
    author: "Mosheh (Moses)",
    period: "c. 1406 BCE",
    summary:
      "Mosheh's farewell speeches reviewing the Torah, covenant renewal, and preparation for entering the Promised Land.",
    themes: ["Obedience", "Love for Yahuah", "Covenant renewal", "Blessing & curse", "Memory"],
  },
  yahusha: {
    meaning: '"Yahuah saves"',
    author: "Yahusha (Joshua)",
    period: "c. 1406–1380 BCE",
    summary:
      "The conquest and division of the Promised Land under the leadership of Yahusha, successor to Mosheh.",
    themes: ["Faith & obedience", "Inheritance", "Yahuah's faithfulness", "Leadership", "Covenant"],
  },
  shophetim: {
    meaning: '"Judges"',
    author: "Shemuel (Samuel)",
    period: "c. 1380–1050 BCE",
    summary:
      "Cycles of apostasy, oppression, repentance, and deliverance through Yahuah-appointed judges in Yisra'ĕl.",
    themes: ["Apostasy & repentance", "Deliverance", "Idolatry", "Cycles of sin", "Yahuah's patience"],
  },
  ruth: {
    meaning: '"Friend / companion"',
    author: "Shemuel (Samuel)",
    period: "c. 1100 BCE (events)",
    summary:
      "A Moabite woman's loyalty to her mother-in-law Naomi and to the Elohim of Yisra'ĕl, resulting in redemption through kinsman-redeemer Boaz.",
    themes: ["Loyalty (Chesed)", "Redemption", "Providence", "Covenant inclusion", "Lineage of Dawid"],
  },
  "shemuel-a": {
    meaning: '"Name of El"',
    author: "Shemuel, Gad, Nathan",
    period: "c. 1100–1010 BCE",
    summary:
      "The life of the prophet Shemuel, Israel's transition to monarchy under Sha'ul, and the rise of young Dawid.",
    themes: ["Kingship", "Obedience", "Rejection of Yahuah", "Prophetic call", "Humility"],
  },
  "shemuel-b": {
    meaning: '"Name of El" (continued)',
    author: "Gad, Nathan",
    period: "c. 1010–970 BCE",
    summary:
      "The reign of King Dawid — his victories, his great sin, and the covenant promise of an eternal throne.",
    themes: ["Covenant with Dawid", "Repentance", "Consequences of sin", "Kingship", "Worship"],
  },
  "melakim-a": {
    meaning: '"Kings"',
    author: "Yirmeyahu (Jeremiah)",
    period: "c. 970–853 BCE",
    summary:
      "Shelomoh's reign, the building of the Temple, the kingdom's division, and the early prophets Eliyahu and Elisha.",
    themes: ["Wisdom", "Temple", "Division", "Idolatry", "Prophetic confrontation"],
  },
  "melakim-b": {
    meaning: '"Kings" (continued)',
    author: "Yirmeyahu (Jeremiah)",
    period: "c. 853–586 BCE",
    summary:
      "The fall of the northern kingdom to Assyria and the southern kingdom to Babel, fulfilling Yahuah's covenant warnings.",
    themes: ["Judgment", "Exile", "Covenant consequences", "Faithful remnant", "Reform"],
  },
  "dibre-a": {
    meaning: '"Words / events of the days"',
    author: "Ezra",
    period: "c. 1000–970 BCE (events)",
    summary:
      "Genealogies from Adam through the reign of Dawid, focusing on covenant lineage and the preparations for the Temple.",
    themes: ["Genealogy", "Covenant continuity", "Worship", "Temple preparation", "Dawid's legacy"],
  },
  "dibre-b": {
    meaning: '"Words / events of the days" (continued)',
    author: "Ezra",
    period: "c. 970–538 BCE (events)",
    summary:
      "Shelomoh's Temple, the southern kings, revival under righteous kings, and the Babylonian exile ending with Cyrus's decree.",
    themes: ["Temple worship", "Reform", "Covenant faithfulness", "Exile & return", "Prayer"],
  },
  ezra: {
    meaning: '"Help"',
    author: "Ezra",
    period: "c. 538–457 BCE",
    summary:
      "The return of exiles from Babel under Zerubbabel and later Ezra, the rebuilding of the Temple, and covenant renewal.",
    themes: ["Return from exile", "Rebuilding", "Torah renewal", "Separation from paganism", "Repentance"],
  },
  nehemyah: {
    meaning: '"Yahuah comforts"',
    author: "Nehemyah",
    period: "c. 445–432 BCE",
    summary:
      "Nehemyah's leadership in rebuilding Jerusalem's walls, restoring community life, and renewing the covenant.",
    themes: ["Leadership", "Prayer", "Rebuilding", "Community renewal", "Covenant fidelity"],
  },
  ester: {
    meaning: '"Hidden" (Persian: star) / Hadassah = "myrtle"',
    author: "Mordecai / unknown",
    period: "c. 480 BCE",
    summary:
      "Hadassah (Esther), a Jewish woman in Persia, risks her life to save her people from extermination, revealing Yahuah's hidden providence.",
    themes: ["Providence", "Courage", "Deliverance", "Identity", "Feast of Purim"],
  },
  iyob: {
    meaning: '"Persecuted / returning"',
    author: "Iyob / Mosheh (uncertain)",
    period: "Patriarchal era",
    summary:
      "A righteous man's devastating suffering and his wrestling with Yahuah, concluding with divine encounter and restoration.",
    themes: ["Suffering", "Sovereignty of Yahuah", "Righteousness", "Wisdom", "Restoration"],
  },
  tehillim: {
    meaning: '"Praises"',
    author: "Dawid, Asaph, Sons of Qorah, Mosheh, Shelomoh, others",
    period: "c. 1400–400 BCE",
    summary:
      "150 sacred poems and songs spanning the full range of human experience — praise, lament, thanksgiving, and prophecy.",
    themes: ["Worship", "Lament", "Trust in Yahuah", "Messianic prophecy", "Torah meditation"],
  },
  mishle: {
    meaning: '"Proverbs / comparisons"',
    author: "Shelomoh, Agur, Lemuel",
    period: "c. 970–700 BCE",
    summary:
      "Practical and moral wisdom for daily life, rooted in the fear of Yahuah as the foundation of all true knowledge.",
    themes: ["Wisdom", "Fear of Yahuah", "Righteousness", "Speech", "Character"],
  },
  qoheleth: {
    meaning: '"Preacher / assembler of wisdom"',
    author: "Shelomoh (traditionally)",
    period: "c. 935 BCE",
    summary:
      "A philosophical meditation on the vanity of life apart from Yahuah, concluding that fearing Elohim and keeping His commands is the whole duty of man.",
    themes: ["Vanity of life", "Fear of Yahuah", "Wisdom", "Mortality", "Enjoyment of life"],
  },
  shir: {
    meaning: '"Song of Songs"',
    author: "Shelomoh",
    period: "c. 965 BCE",
    summary:
      "A lyrical celebration of covenantal love between a bride and groom, widely understood as an allegory of Yahuah's love for Yisra'ĕl.",
    themes: ["Love", "Covenant relationship", "Beauty", "Longing", "Union"],
  },
  yeshayahu: {
    meaning: '"Yahuah saves"',
    author: "YeshaYahu (Isaiah)",
    period: "c. 740–700 BCE",
    summary:
      "Prophecies of judgment on Yisra'ĕl and the nations, and extraordinary visions of the Suffering Servant and the coming Kingdom of Yahuah.",
    themes: ["Judgment & salvation", "Suffering Servant", "Messiah", "New creation", "Set-apartness of Yahuah"],
  },
  yirmeyahu: {
    meaning: '"Yahuah raises up / appoints"',
    author: "YirmeYahu (Jeremiah)",
    period: "c. 627–586 BCE",
    summary:
      "Warnings of impending Babylonian exile and a promise of the New Covenant written on the heart, delivered by a weeping prophet.",
    themes: ["New Covenant", "Judgment", "Repentance", "Faithful prophet", "Hope"],
  },
  eikah: {
    meaning: '"How!" (lament cry)',
    author: "YirmeYahu (Jeremiah)",
    period: "c. 586 BCE",
    summary:
      "Five lament poems mourning the destruction of Jerusalem and the Temple, yet affirming Yahuah's mercies are new every morning.",
    themes: ["Lament", "Judgment", "Mercy of Yahuah", "Repentance", "Hope amid suffering"],
  },
  yehezqel: {
    meaning: '"El strengthens"',
    author: "Yehezqel (Ezekiel)",
    period: "c. 593–571 BCE",
    summary:
      "Vivid visions and prophetic dramas from the exile in Babel, culminating in the restoration of Yisra'ĕl and a glorious future Temple.",
    themes: ["Glory of Yahuah", "Exile & restoration", "Covenant faithfulness", "Dry bones", "New heart"],
  },
  daniyel: {
    meaning: '"El is my judge"',
    author: "Daniyel",
    period: "c. 605–536 BCE",
    summary:
      "Daniyel's faithfulness in Babylonian captivity and apocalyptic visions of world empires and the ultimate Kingdom of the Most High.",
    themes: ["Faithfulness under pressure", "Sovereignty of Yahuah", "Prophecy of nations", "Resurrection", "Kingdom of Yahuah"],
  },
  hoshua: {
    meaning: '"Salvation" (same root as Yahusha)',
    author: "Hoshua (Hosea)",
    period: "c. 755–715 BCE",
    summary:
      "Yahuah commands Hoshua to marry an unfaithful wife as a living parable of Yisra'ĕl's spiritual adultery and Yahuah's enduring love.",
    themes: ["Covenant love (Chesed)", "Spiritual adultery", "Repentance", "Restoration", "Marriage metaphor"],
  },
  yoel: {
    meaning: '"Yahuah is El"',
    author: "Yoel (Joel)",
    period: "c. 835 BCE (uncertain)",
    summary:
      "A locust plague becomes a call to national repentance, followed by a promise of the outpouring of the Ruaḥ ha'Qodesh on all flesh.",
    themes: ["Repentance", "Day of Yahuah", "Outpouring of the Ruaḥ", "Restoration", "Judgment"],
  },
  amos: {
    meaning: '"Burden-bearer"',
    author: "Amos",
    period: "c. 760–750 BCE",
    summary:
      "A shepherd-turned-prophet thunders against social injustice, religious hypocrisy, and the coming judgment of Yisra'ĕl.",
    themes: ["Justice", "Judgment on Yisra'ĕl", "Social righteousness", "False worship", "Remnant"],
  },
  obadyah: {
    meaning: '"Servant / worshipper of Yahuah"',
    author: "Obadyah",
    period: "c. 848 or 586 BCE",
    summary:
      "A brief but fierce oracle against Edom for its pride and betrayal of Yisra'ĕl, and a vision of Yahuah's future Kingdom.",
    themes: ["Judgment on Edom", "Pride", "Brotherhood", "Day of Yahuah", "Kingdom of Yahuah"],
  },
  yunah: {
    meaning: '"Dove"',
    author: "Yunah (Jonah)",
    period: "c. 793–753 BCE",
    summary:
      "A reluctant prophet's flight from Yahuah, three days in a great fish, and Nineveh's remarkable repentance — revealing Yahuah's mercy to all nations.",
    themes: ["Mercy to all nations", "Repentance", "Flight from Yahuah", "Compassion", "Obedience"],
  },
  mikah: {
    meaning: '"Who is like Yahuah?"',
    author: "Mikah (Micah)",
    period: "c. 735–700 BCE",
    summary:
      "Judgment on Shomeron and Yerushalayim balanced with breathtaking promises of restoration and the birth of the Ruler from Beyth Lehem.",
    themes: ["Justice", "Messianic prophecy", "Judgment & hope", "Covenant faithfulness", "Humility"],
  },
  nachum: {
    meaning: '"Comfort"',
    author: "Nachum (Nahum)",
    period: "c. 663–612 BCE",
    summary:
      "A vivid poem predicting the total destruction of Nineveh, Assyria's capital — comfort to Yisra'ĕl and a warning to all oppressors.",
    themes: ["Judgment on Nineveh", "Yahuah's vengeance", "Comfort for Yisra'ĕl", "Sovereignty", "Justice"],
  },
  habaqquq: {
    meaning: '"He who embraces / wrestler"',
    author: "Habaqquq (Habakkuk)",
    period: "c. 609–605 BCE",
    summary:
      "A dialogue between the prophet and Yahuah wrestling with why evil prospers, concluding with radical trust: 'the righteous lives by his faith.'",
    themes: ["Faith", "Theodicy (why does evil prosper?)", "Trust in Yahuah", "Prayer", "Judgment"],
  },
  tsephanyah: {
    meaning: '"Yahuah has hidden / treasured"',
    author: "Tsephanyah (Zephaniah)",
    period: "c. 640–609 BCE",
    summary:
      "A sweeping Day of Yahuah prophecy against Yehudah and the nations, followed by a joyful song of Yahuah rejoicing over His people.",
    themes: ["Day of Yahuah", "Judgment", "Remnant", "Restoration", "Joy"],
  },
  chaggai: {
    meaning: '"My feast / festive"',
    author: "Chaggai (Haggai)",
    period: "c. 520 BCE",
    summary:
      "Four short messages urging the returned exiles to rebuild the Temple, with the promise that Yahuah's glory will fill the latter house.",
    themes: ["Temple rebuilding", "Priority of Yahuah", "Covenant blessing", "Glory", "Encouragement"],
  },
  zekaryah: {
    meaning: '"Yahuah remembers"',
    author: "ZekarYah (Zechariah)",
    period: "c. 520–480 BCE",
    summary:
      "Eight night visions and messianic prophecies foretelling the coming King on a donkey, the pierced One, and the final Kingdom.",
    themes: ["Messianic prophecy", "Restoration", "Visions", "Coming King", "End times"],
  },
  malaki: {
    meaning: '"My messenger"',
    author: "Malaki (Malachi)",
    period: "c. 430 BCE",
    summary:
      "The last prophetic voice before four centuries of silence, calling Yisra'ĕl back to covenant faithfulness and announcing the coming of Eliyahu.",
    themes: ["Covenant faithfulness", "Tithing & worship", "Coming messenger", "Eliyahu's return", "Day of Yahuah"],
  },
  mattithyahu: {
    meaning: '"Gift of Yahuah"',
    author: "MattithYahu (Matthew)",
    period: "c. 50–70 CE",
    summary:
      "Written primarily to a Jewish audience, presenting Yahusha as the promised Messiah and King who fulfils the Torah and the Prophets.",
    themes: ["Kingdom of Heaven", "Torah fulfillment", "Messiah", "Discipleship", "Jewish roots"],
  },
  marqus: {
    meaning: '"Of Mars / defender" (Latin)',
    author: "Marqus (Mark), companion of Kepha",
    period: "c. 50–65 CE",
    summary:
      "The fastest-paced Gospel — emphasising Yahusha's actions as the suffering Servant, written for a Roman (Gentile) audience.",
    themes: ["Servant of Yahuah", "Miracles", "Suffering", "Authority", "Discipleship"],
  },
  luqas: {
    meaning: '"Light-giving" (Greek)',
    author: "Luqas (Luke), physician",
    period: "c. 60–62 CE",
    summary:
      "The most comprehensive Gospel account, emphasising Yahusha's compassion for the poor, women, and outcasts, and the work of the Ruaḥ ha'Qodesh.",
    themes: ["Compassion", "Salvation for all", "Prayer", "Ruaḥ ha'Qodesh", "Praise"],
  },
  yahuchanan: {
    meaning: '"Yahuah is gracious"',
    author: "Yahuchanan (John), son of Zebedee",
    period: "c. 85–95 CE",
    summary:
      "A deeply theological Gospel focusing on Yahusha as the eternal Word, the Light of the world, and the great I AM — written that we may believe.",
    themes: ["Eternal life", "Light vs. darkness", "Belief", "Love", "Ruaḥ ha'Qodesh (Helper)"],
  },
  acts: {
    meaning: '"Acts / deeds" (Greek Praxeis)',
    author: "Luqas (Luke)",
    period: "c. 62–70 CE",
    summary:
      "The history of the early assembly (ekklesia) from the outpouring of the Ruaḥ at Shavuot through Sha'ul's missionary journeys and imprisonment in Rome.",
    themes: ["Ruaḥ ha'Qodesh", "Mission to all nations", "Early assembly", "Persecution", "Witness"],
  },
  romans: {
    meaning: '"To the Romans"',
    author: "Sha'ul (Paul)",
    period: "c. 57 CE",
    summary:
      "The most systematic presentation of the Good News — righteousness by faith, freedom from sin, and the mystery of Yisra'ĕl's restoration.",
    themes: ["Righteousness by faith", "Sin & grace", "Torah", "Restoration of Yisra'ĕl", "Ruaḥ"],
  },
  "qorintiyim-a": {
    meaning: '"To the Corinthians"',
    author: "Sha'ul (Paul)",
    period: "c. 55 CE",
    summary:
      "Correcting divisions, immorality, and misuse of gifts in the assembly at Qorinth, with the great resurrection chapter and hymn to love.",
    themes: ["Unity", "Love", "Spiritual gifts", "Resurrection", "Set-apart living"],
  },
  "qorintiyim-b": {
    meaning: '"To the Corinthians" (second)',
    author: "Sha'ul (Paul)",
    period: "c. 56 CE",
    summary:
      "A deeply personal letter defending his apostleship, describing the glory of the New Covenant ministry, and the grace given through weakness.",
    themes: ["Weakness & strength", "New Covenant", "Suffering", "Giving", "Apostolic authority"],
  },
  galatiyim: {
    meaning: '"To the Galatians"',
    author: "Sha'ul (Paul)",
    period: "c. 49 or 55 CE",
    summary:
      "An urgent defence of the Good News of grace against those adding works of the law as the basis of justification.",
    themes: ["Freedom in Mashiaḥ", "Faith vs. works", "Torah & grace", "Fruit of the Ruaḥ", "New creation"],
  },
  ephesiyim: {
    meaning: '"To the Ephesians"',
    author: "Sha'ul (Paul)",
    period: "c. 62 CE",
    summary:
      "A majestic letter on the believer's identity and calling in Mashiaḥ, unity of Jew and Gentile in one body, and the full armour of Yahuah.",
    themes: ["Identity in Mashiaḥ", "Unity", "Grace", "Spiritual warfare", "Walk worthy"],
  },
  pilippiyim: {
    meaning: '"To the Philippians"',
    author: "Sha'ul (Paul)",
    period: "c. 62 CE",
    summary:
      "A joyful letter written from prison exhorting believers to rejoice, stand firm, and pursue the humility of Mashiaḥ.",
    themes: ["Joy", "Humility", "Contentment", "Partnership in the Good News", "Mind of Mashiaḥ"],
  },
  qolasim: {
    meaning: '"To the Colossians"',
    author: "Sha'ul (Paul)",
    period: "c. 62 CE",
    summary:
      "Affirming the supreme pre-eminence of Yahusha over all creation and warning against hollow philosophies that diminish Him.",
    themes: ["Supremacy of Yahusha", "False teaching", "New life in Mashiaḥ", "Worship", "Completeness in Him"],
  },
  "tess-a": {
    meaning: '"To the Thessalonians"',
    author: "Sha'ul (Paul)",
    period: "c. 51 CE",
    summary:
      "Encouragement to a young congregation under persecution, with instruction on set-apart living and the return of Yahusha.",
    themes: ["Return of Yahusha", "Encouragement", "Set-apart living", "Persecution", "Hope"],
  },
  "tess-b": {
    meaning: '"To the Thessalonians" (second)',
    author: "Sha'ul (Paul)",
    period: "c. 51 CE",
    summary:
      "Correcting confusion about the Day of Yahuah — clarifying signs that must precede it, and urging faithful work until that day.",
    themes: ["Day of Yahuah", "Lawlessness", "Patience", "Standing firm", "End times"],
  },
  "timothy-a": {
    meaning: '"Honouring Elohim" (Greek)',
    author: "Sha'ul (Paul)",
    period: "c. 63 CE",
    summary:
      "Practical instructions to the young leader Timothy on sound doctrine, community order, and fighting the good fight of faith.",
    themes: ["Sound doctrine", "Leadership", "Prayer", "Godliness", "False teaching"],
  },
  "timothy-b": {
    meaning: '"Honouring Elohim" (second)',
    author: "Sha'ul (Paul)",
    period: "c. 67 CE",
    summary:
      "Sha'ul's final letter before martyrdom, urging Timothy to guard the deposit of faith, endure hardship, and preach the Word.",
    themes: ["Endurance", "Scripture", "Last days", "Faithfulness", "Suffering for the Good News"],
  },
  titos: {
    meaning: '"Honoured" (Greek)',
    author: "Sha'ul (Paul)",
    period: "c. 63 CE",
    summary:
      "Instructions to Titos on appointing elders, silencing false teachers, and the grace of Yahuah that trains us to live uprightly.",
    themes: ["Church order", "Sound doctrine", "Grace", "Good works", "Godly character"],
  },
  philemon: {
    meaning: '"Affectionate" (Greek)',
    author: "Sha'ul (Paul)",
    period: "c. 62 CE",
    summary:
      "A personal plea to a believer to receive back his runaway slave Onesimus — now a brother in Mashiaḥ — demonstrating forgiveness and reconciliation.",
    themes: ["Forgiveness", "Brotherhood", "Reconciliation", "Grace", "New identity in Mashiaḥ"],
  },
  ibrim: {
    meaning: '"Hebrews / ones who cross over"',
    author: "Unknown (Sha'ul, Apollos, or Barnabas suggested)",
    period: "c. 60–70 CE",
    summary:
      "A masterful comparison showing Yahusha as superior to angels, Mosheh, the Levitical priesthood, and the old covenant — the ultimate High Priest and Mediator.",
    themes: ["Supremacy of Yahusha", "High priesthood", "Faith", "Endurance", "New Covenant"],
  },
  yaaqob: {
    meaning: '"He who supplants / follows at the heel" (Yaaqob / James)',
    author: "Yaaqob (James), brother of Yahusha",
    period: "c. 45–50 CE",
    summary:
      "A practical letter on lived faith — genuine belief produces good works, tames the tongue, cares for the poor, and endures trials.",
    themes: ["Faith & works", "Trials", "Wisdom", "Tongue", "Care for the poor"],
  },
  "kepha-a": {
    meaning: '"Rock" (Aramaic)',
    author: "Shim'on Kepha (Simon Peter)",
    period: "c. 62–65 CE",
    summary:
      "Encouragement to believers scattered by persecution to stand firm, live honourably, and find hope in Yahusha's resurrection.",
    themes: ["Suffering", "Hope", "Set-apart living", "Submission", "Living stone"],
  },
  "kepha-b": {
    meaning: '"Rock" (second letter)',
    author: "Shim'on Kepha (Simon Peter)",
    period: "c. 67–68 CE",
    summary:
      "A warning against false prophets and teachers, an exhortation to grow in knowledge of Yahusha, and assurance of His promised return.",
    themes: ["False teaching", "Knowledge of Yahusha", "Return of Yahusha", "Scripture", "Godliness"],
  },
  "yohanan-a": {
    meaning: '"Yahuah is gracious" (first letter)',
    author: "Yahuchanan (John)",
    period: "c. 90–95 CE",
    summary:
      "Assurance of eternal life and the test of true fellowship: walking in light, keeping His commands, and loving one another.",
    themes: ["Love", "Assurance", "Light vs. darkness", "Keeping commandments", "Abiding in Mashiaḥ"],
  },
  "yohanan-b": {
    meaning: '"Yahuah is gracious" (second letter)',
    author: "Yahuchanan (John)",
    period: "c. 90–95 CE",
    summary:
      "A brief letter to a chosen lady and her children, urging love, truth, and caution against welcoming false teachers.",
    themes: ["Truth & love", "Commandments", "Hospitality", "False teaching", "Walking in truth"],
  },
  "yohanan-c": {
    meaning: '"Yahuah is gracious" (third letter)',
    author: "Yahuchanan (John)",
    period: "c. 90–95 CE",
    summary:
      "Personal commendation of Gaios for his hospitality to travelling workers of the truth, contrasted with the divisive Diotrephes.",
    themes: ["Hospitality", "Truth", "Support for workers", "Leadership", "Walking in truth"],
  },
  yahudah: {
    meaning: '"Praised / Judah"',
    author: "Yahudah (Jude), brother of Yahusha",
    period: "c. 65–80 CE",
    summary:
      "A sharp warning against those who turn grace into license and deny Yahusha, with a call to contend earnestly for the faith.",
    themes: ["Contending for the faith", "False teachers", "Judgment", "Perseverance", "Doxology"],
  },
  hazon: {
    meaning: '"Vision / Revelation"',
    author: "Yahuchanan (John)",
    period: "c. 95 CE",
    summary:
      "Apocalyptic visions given to Yahuchanan on the island of Patmos — the glorified Mashiaḥ, letters to seven assemblies, cosmic judgment, and the New Yerushalayim.",
    themes: ["Return of Yahusha", "Judgment", "New creation", "Worship", "Victory of the Lamb"],
  },

  // ── Extra-canonical books ─────────────────────────────────────────────────
  "adam-hawwah-a": {
    meaning: '"Man / ground-tiller" (first book)',
    author: "Unknown; attributed tradition to Mosheh",
    period: "Events: Creation – early post-Fall; text: Second Temple period",
    summary:
      "The life of Aḏam and Ḥawwah after the expulsion from Eden — their repentance, struggles, visions of the heavenly realm, and the promises of future redemption through the Seed.",
    themes: ["Repentance", "Fall & redemption", "Angelic visits", "Death", "Hope of resurrection"],
  },
  "adam-hawwah-b": {
    meaning: '"Man / ground-tiller" (second book)',
    author: "Unknown; attributed tradition",
    period: "Events: post-Fall; text: Second Temple period",
    summary:
      "Continues the account of Aḏam and Ḥawwah, including the birth of Sheeth (Seth), the transmission of wisdom to future generations, and Aḏam's final testament before death.",
    themes: ["Lineage of Sheeth", "Wisdom transmission", "Death & mourning", "Angelic intercession", "Covenant promise"],
  },
  hanok: {
    meaning: '"Dedicated / initiated"',
    author: "Attributed to Ḥanoḵ (Enoch), antediluvian patriarch",
    period: "Events: pre-Flood; text compiled c. 300–100 BCE",
    summary:
      "Prophetic visions and heavenly journeys of Ḥanoḵ, revealing the fall of the Watchers, cosmic geography, astronomical laws, the coming Judgment, and the Righteous One who will rule over all.",
    themes: ["Fallen Watchers", "Cosmic order", "Judgment", "Son of Man", "Heavenly journeys"],
  },
  "writings-abraham": {
    meaning: '"Father of many nations"',
    author: "Attributed to Aḇraham; pseudepigraphical",
    period: "Events: patriarchal era; text: c. 100 BCE – 100 CE",
    summary:
      "Revelations given to Aḇraham — his rejection of idolatry, his heavenly ascent, visions of creation, the fall of humanity, and the covenant promises binding his descendants to Yahuah.",
    themes: ["Rejection of idols", "Heavenly ascent", "Covenant", "Election of Yisra'el", "Eschatology"],
  },
  "writings-eliyahu": {
    meaning: '"My Elohim is Yahuah"',
    author: "Attributed to Ĕliyahu (Elijah); pseudepigraphical",
    period: "Text: c. 1st–3rd century CE",
    summary:
      "Apocalyptic revelations attributed to the prophet Ĕliyahu, describing end-time events, the reign of the adversary, the suffering of the righteous, and the final deliverance of Yisra'el.",
    themes: ["End times", "Persecution of the righteous", "Deliverance", "Adversary", "Resurrection"],
  },
  "testament-reuben": {
    meaning: `"See, a son!" — firstborn of Ya'aqoḇ`,
    author: "Attributed to Re'uḇĕn; part of the Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE (with later revisions)",
    summary:
      "The deathbed testament of Re'uḇĕn, warning his sons against sexual immorality and pride — recounting his sin with Bilhah and urging his descendants to honour Lĕwi and Yahudah.",
    themes: ["Sexual purity", "Repentance", "Pride", "Honouring the priesthood", "Moral exhortation"],
  },
  "testament-simeon": {
    meaning: `"Heard" — second son of Ya'aqoḇ`,
    author: "Attributed to Shim'on; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Shim'on's dying words warn against envy — confessing his jealousy of Yosĕph — and call his sons to pursue simplicity of heart and unity, prophesying the coming of Lĕwi and Yahudah's deliverer.",
    themes: ["Envy", "Repentance", "Simplicity of heart", "Unity", "Messianic prophecy"],
  },
  "testament-levi": {
    meaning: '"Attached / joined" — priestly tribe',
    author: "Attributed to Lĕwi; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Lĕwi's testament recounts his heavenly visions, his appointment to the priesthood, and his charge to his sons to guard Torah purely — with warnings of priestly corruption and prophecy of a new priest.",
    themes: ["Priesthood", "Heavenly vision", "Torah purity", "Priestly corruption", "Messianic priest"],
  },
  "testament-judah": {
    meaning: '"Praised" — ancestor of the kings',
    author: "Attributed to Yahuḏah; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Yahuḏah's deathbed words recount his military exploits, his sins of greed and lust (including Tamar), and his exhortation to flee fornication and love of money — prophesying a ruler-priest from his lineage.",
    themes: ["Leadership", "Repentance", "Fornication & greed", "Royal lineage", "Messianic prophecy"],
  },
  "testament-dan": {
    meaning: '"Judge"',
    author: "Attributed to Dan; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Dan warns his sons against anger and lying — admitting his hatred toward Yosĕph — and urges them to hold to truth, prophesying that the Adversary will work through Dan's tribe but that Yahuah will ultimately save Yisra'ĕl.",
    themes: ["Anger", "Lying", "Repentance", "Adversarial deception", "Truth"],
  },
  "testament-naphtali": {
    meaning: '"My struggle / wrestling"',
    author: "Attributed to Naphtali; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Naphtali exhorts his children to order their lives in harmony with creation, sharing two prophetic visions about Yisra'ĕl's scattering and restoration, and urging purity, goodness, and unity with Lĕwi and Yahudah.",
    themes: ["Order of creation", "Purity", "Visions of dispersion", "Restoration", "Unity"],
  },
  "testament-gad": {
    meaning: '"Troop / good fortune"',
    author: "Attributed to Gaḏ; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Gaḏ confesses his hatred of Yosĕph and warns powerfully against hatred as a tool of the Adversary — urging love of brothers and repentance, promising that love covers all sin.",
    themes: ["Hatred", "Repentance", "Brotherly love", "Adversary", "Forgiveness"],
  },
  "testament-asher": {
    meaning: '"Happy / blessed"',
    author: "Attributed to Ashĕr; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Ashĕr teaches a doctrine of the two ways — good and evil — urging singleness of heart and warning against double-mindedness, with prophecy of Yisra'ĕl's exile and future restoration.",
    themes: ["Two ways (good vs. evil)", "Singleness of heart", "Double-mindedness", "Exile", "Restoration"],
  },
  "testament-issachar": {
    meaning: '"There is reward / hired man"',
    author: "Attributed to Yissaḵar; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Yissaḵar praises simplicity of life — farming, honest labour, and upright character — as the path of righteousness, urging his sons to love Yahuah and one another and to keep Torah faithfully.",
    themes: ["Simplicity", "Honest labour", "Love of Torah", "Brotherly love", "Righteousness"],
  },
  "testament-zebulun": {
    meaning: '"Dwelling / honour"',
    author: "Attributed to Zeḇulun; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Zeḇulun recounts his compassion for Yosĕph and exhorts his sons to show compassion and mercy to all people, prophesying the mercy of Yahuah toward Yisra'ĕl in the last days.",
    themes: ["Compassion", "Mercy", "Intercession", "Unity of brothers", "Eschatological restoration"],
  },
  "testament-joseph": {
    meaning: '"May He add"',
    author: "Attributed to Yosĕph; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Yosĕph narrates his trials at the hands of his brothers and Potiphar's wife as lessons in endurance, purity, and forgiveness — a model of patient suffering and trust in Yahuah's deliverance.",
    themes: ["Endurance under trial", "Sexual purity", "Forgiveness", "Trust in Yahuah", "Suffering & reward"],
  },
  "testament-benjamin": {
    meaning: '"Son of the right hand"',
    author: "Attributed to Binyamin; Testaments of the Twelve Patriarchs",
    period: "Text: c. 200–100 BCE",
    summary:
      "Binyamin's final charge urges his sons toward a good mind and pure heart, using Yosĕph as the supreme example of virtue, and prophesying the coming of the Lamb of Yahuah who will save all nations.",
    themes: ["Good mind", "Purity of heart", "Virtue of Yosĕph", "Messianic Lamb", "Salvation of nations"],
  },
  yobelim: {
    meaning: `"Jubilees / rams' horns"`,
    author: "Unknown; attributed to Mosheh via an angel of the Presence",
    period: "Events: Creation – Exodus; text: c. 160–150 BCE",
    summary:
      "A retelling of Bereshit and early Shemoth through the lens of a solar calendar, dividing history into forty-nine-year Jubilee cycles, emphasising covenant faithfulness, the Shabbat, and Yahuah's sovereign control over history.",
    themes: ["Calendar & Jubilees", "Covenant", "Shabbat holiness", "Angelic revelation", "Torah"],
  },
  yashar: {
    meaning: '"Upright"',
    author: "Unknown; ancient compilation",
    period: "Events: Creation – Conquest; text: medieval compilation of ancient sources",
    summary:
      "A narrative expansion of the Tanak from Adam to the conquest of Kena'an, filling in biographical and historical details not found in the canonical text — especially around the lives of the patriarchs and the Exodus.",
    themes: ["Patriarchal history", "Exodus", "Warfare & conquest", "Genealogies", "Narrative expansion"],
  },
  "tehillim-add": {
    meaning: '"Praises — Additions"',
    author: "Various; attributed to Dawid and others",
    period: "Second Temple period",
    summary:
      "Additional psalms of praise and prayer not included in the canonical 150 Tehillim — including Psalm 151 (Dawid's own words about his anointing) and others found in the Dead Sea Scrolls and Septuagint.",
    themes: ["Praise", "Anointing of Dawid", "Prayer", "Dead Sea Scrolls tradition", "Worship"],
  },
  hakmah: {
    meaning: '"Wisdom"',
    author: "Unknown; attributed to Shelomoh in tradition",
    period: "c. 100–50 BCE (composed in Alexandria)",
    summary:
      "A philosophical meditation on wisdom, righteousness, and immortality — arguing that the souls of the righteous are in Yahuah's hand, contrasting the fate of the wicked, and praising wisdom's role in Yisra'ĕl's history.",
    themes: ["Wisdom & righteousness", "Immortality of the soul", "Fate of the wicked", "Salvation history", "Creation"],
  },
  sira: {
    meaning: '"Thorn / Sira (family name)"',
    author: "Yĕhoshua ben Sira (Jesus Sirach)",
    period: "c. 180 BCE; Greek translation c. 132 BCE",
    summary:
      "An extensive collection of wisdom sayings on friendship, family, speech, humility, prayer, and the fear of Yahuah — one of the richest practical wisdom texts of the Second Temple era.",
    themes: ["Fear of Yahuah", "Practical wisdom", "Speech", "Friendship", "Prayer & praise"],
  },
  yahudith: {
    meaning: '"Jewish woman / praise"',
    author: "Unknown; written in Hebrew, preserved in Greek",
    period: "Events: Assyrian period; text: c. 150–100 BCE",
    summary:
      "A courageous widow named Yahuḏith outwits and beheads the Assyrian general Ḥolophernes, saving her city through faith, fasting, and bold action — a story of Yahuah delivering His people through the weak of the world.",
    themes: ["Deliverance", "Faith & courage", "Prayer & fasting", "Female heroism", "Victory over oppressors"],
  },
  tobiyah: {
    meaning: '"Yahuah is good"',
    author: "Unknown; composed in Aramaic or Hebrew",
    period: "Events: Assyrian exile; text: c. 225–175 BCE",
    summary:
      "The story of Toḇiyah and his father Toḇit — faithful Yisra'ĕlites in exile — guided by the angel Rapha'ĕl on a journey of healing, deliverance from a demon, and joyful restoration, showing Yahuah's care for the righteous.",
    themes: ["Providence", "Faithful exile", "Healing", "Angels", "Prayer & almsgiving"],
  },
  baruk: {
    meaning: '"Blessed"',
    author: "Attributed to Baruḵ son of Nĕriyah, scribe of Yirmeyahu",
    period: "c. 150–100 BCE",
    summary:
      "A letter of penitence, wisdom, and comfort addressed to the exiles in Babel — confessing Yisra'ĕl's sin, praising wisdom as Yahuah's gift, and promising that Yahuah will restore His scattered people.",
    themes: ["Exile & repentance", "Confession of sin", "Wisdom as Torah", "Comfort & restoration", "Return from exile"],
  },
  "letter-yirmeyahu": {
    meaning: '"Yahuah exalts" (letter of)',
    author: "Attributed to the prophet Yirmeyahu",
    period: "c. 300–100 BCE",
    summary:
      "A satirical letter to the Babylonian exiles mocking the folly of idol worship — urging the people of Yahuah not to fear or follow the lifeless gods of the nations but to remain faithful to the living Elohim.",
    themes: ["Idol worship", "Satire", "Faithfulness in exile", "Living Elohim vs. idols", "Exhortation"],
  },
  "prayer-menashsheh": {
    meaning: '"Causing to forget" (prayer of)',
    author: "Attributed to King Menashsheh of Yahudah",
    period: "Text: c. 200–100 BCE",
    summary:
      "A heartfelt prayer of repentance placed in the mouth of the most wicked king of Yahudah — a profound confession of sin, acknowledgement of Yahuah's mercy, and plea for forgiveness that stands as a model of true contrition.",
    themes: ["Repentance", "Mercy of Yahuah", "Confession", "Forgiveness", "Even the worst may return"],
  },
  "prayer-azaryah": {
    meaning: '"Yahuah has helped" (prayer of)',
    author: "Unknown; added to the book of Dani'ĕl in Greek tradition",
    period: "c. 200–100 BCE",
    summary:
      "The prayer of Azaryah (Abednego) from within the fiery furnace, confessing Yisra'ĕl's sin and praising Yahuah for His righteousness, followed by the Song of the Three Young Men glorifying all creation.",
    themes: ["Prayer in trial", "Confession", "Song of praise", "Fiery furnace", "Righteousness of Yahuah"],
  },
  "bel-dragon": {
    meaning: '"Bel (lord) and the Dragon"',
    author: "Unknown; Greek addition to Dani'ĕl",
    period: "c. 100 BCE",
    summary:
      "Two short stories in which Dani'ĕl exposes the fraud of Bel's priests and destroys the dragon-idol — demonstrating that the gods of Babel are lifeless and that only Yahuah is the living Elohim.",
    themes: ["Idolatry exposed", "Living Elohim", "Courage", "Prophetic witness", "Babylonian religion"],
  },
  shoshannah: {
    meaning: '"Lily / rose"',
    author: "Unknown; Greek addition to Dani'ĕl",
    period: "c. 100 BCE",
    summary:
      "The story of Shoshannah, a righteous woman falsely accused of adultery by corrupt elders — delivered by the young Dani'ĕl's inspired cross-examination, vindicating truth and condemning injustice.",
    themes: ["Justice", "False accusation", "Righteousness", "Wisdom of Dani'ĕl", "Deliverance"],
  },
  "hadassah-add": {
    meaning: '"Myrtle" — additions to Haḏassah (Esther)',
    author: "Unknown; Greek additions to the canonical Esther",
    period: "c. 100–50 BCE",
    summary:
      "Additions to the book of Haḏassah including Mordekhai's dream, the full text of royal decrees, extended prayers of Mordekhai and Haḏassah, and closing interpretations — filling out the religious dimension absent from the Hebrew version.",
    themes: ["Providence", "Prayer", "Courage of Haḏassah", "Divine sovereignty", "Jewish identity"],
  },
  "ezra-a": {
    meaning: '"Help" (1 Ezra / 1 Esdras)',
    author: "Unknown; largely parallel to canonical Ezra-Nehemyah and Diḇre haYamim",
    period: "Events: c. 538–444 BCE; text: c. 150 BCE",
    summary:
      "An alternative Greek version of the restoration from Babel, best known for the story of the three young guardsmen debating what is the strongest thing in the world — with truth declared the greatest of all.",
    themes: ["Restoration from exile", "Truth is greatest", "Temple rebuilding", "Priestly reform", "Decree of Koresh"],
  },
  "ezra-b": {
    meaning: '"Help" (2 Ezra / 2 Esdras / 4 Ezra)',
    author: "Unknown; Jewish core (4 Ezra) c. 100 CE, with later additions",
    period: "c. 70–120 CE",
    summary:
      "A profound apocalyptic work — Ezra wrestles with Yahuah over the suffering of Yisra'ĕl, receives seven visions including the Weeping Woman, the Eagle of Rome, and the Man from the Sea, and is commissioned to restore the sacred writings.",
    themes: ["Theodicy", "Apocalyptic visions", "Suffering of Yisra'ĕl", "End times", "Restoration of scripture"],
  },
  "maqqabim-a": {
    meaning: '"Hammer" (1 Maccabees)',
    author: "Unknown; composed in Hebrew, preserved in Greek",
    period: "Events: 175–134 BCE; text: c. 100 BCE",
    summary:
      "The history of the Maqqaḇim (Maccabee) family's revolt against the Seleucid king Antiochus IV Epiphanes — the desecration of the Temple, guerrilla warfare led by Yahudah Maqqaḇi, and the re-dedication celebrated as Ḥanukkah.",
    themes: ["Faithful resistance", "Temple desecration & rededication", "Ḥanukkah", "Martyrdom", "Covenant zeal"],
  },
  "maqqabim-b": {
    meaning: '"Hammer" (2 Maccabees)',
    author: "Unknown; an epitome of Yason of Cyrene's five-volume work",
    period: "Events: 180–161 BCE; text: c. 100 BCE",
    summary:
      "A theological retelling of the Maqqaḇim revolt emphasising the resurrection of the dead, the intercession of the righteous, and Yahuah's direct intervention — including the famous accounts of martyrdom under Antiochus.",
    themes: ["Resurrection of the dead", "Martyrdom", "Intercession", "Temple", "Yahuah's direct action"],
  },
}
