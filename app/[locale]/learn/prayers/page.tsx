import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import RichText from '@/components/scripture/RichText'

export async function generateMetadata() {
  return {
    title: 'Prayers of Scripture | Scriptures of Yahuah',
    description: "The great prayers recorded in Scripture — from Mosheh's intercession to Yahusha's high priestly prayer.",
  }
}

interface VerseRange { book: string; chapter: number; from: number; to: number }
interface Prayer {
  emoji: string
  name: string
  person: string
  occasion: string
  summary: string
  highlight: string
  ref: string
  category: string
  verseRange: VerseRange
}

async function fetchVerses(
  supabase: Awaited<ReturnType<typeof createClient>>,
  range: VerseRange,
  locale: string
): Promise<{ verse_number: number; text: string }[]> {
  const { data } = await supabase.rpc('get_verse_range', {
    book_slug:   range.book,
    chapter_num: range.chapter,
    verse_from:  range.from,
    verse_to:    range.to,
    locale,
  })
  return (data ?? []) as { verse_number: number; text: string }[]
}

export default async function PrayersPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'
  const supabase = await createClient()

  const CAT_PRAISE    = isNl ? 'Lofprijzing'         : 'Praise'
  const CAT_INTERCEDE = isNl ? 'Voorbede'            : 'Intercession'
  const CAT_REPENT    = isNl ? 'Berouw'              : 'Repentance'
  const CAT_LAMENT    = isNl ? 'Klaaggebeden'        : 'Lament'
  const CAT_YAHUSHA   = isNl ? 'Gebeden van Yahusha' : 'Prayers of Yahusha'
  const categories    = [CAT_PRAISE, CAT_INTERCEDE, CAT_REPENT, CAT_LAMENT, CAT_YAHUSHA]

  const prayers: Prayer[] = [
    {
      emoji: '🎵',
      name: isNl ? "Ḥanah's Gebed" : "Ḥanah's Prayer",
      person: 'Ḥanah',
      occasion: isNl ? "Na de geboorte van Shemu'el — dankbaarheid aan Yahuah die de onvruchtbare zegent" : "After the birth of Shemu'el — thanksgiving for Yahuah opening her womb",
      summary: isNl ? "Een profetisch lied dat vooruitloopt op de Magnificat van Miryam. Ḥanah looft Yahuah die de zwakken verheft en de machtigen vernedert — een van de vroegste uitdrukkingen van Yahuah's omgekeerde koninkrijk." : "A prophetic song that foreshadows Miryam's Magnificat. Ḥanah praises Yahuah who exalts the lowly and brings down the powerful — one of the earliest expressions of Yahuah's upside-down kingdom.",
      highlight: isNl ? '"Yahuah doodt en maakt levend; Hij brengt neer in het graf en brengt op." — 1 Shemu\'el 2:6' : '"Yahuah kills and makes alive; He brings down to the grave and brings up." — 1 Shemu\'el 2:6',
      ref: "1 Shemu'el 2:1-10",
      category: CAT_PRAISE,
      verseRange: { book: 'shemuel-a', chapter: 2, from: 1, to: 10 },
    },
    {
      emoji: '👑',
      name: isNl ? "Dawid's Dankgebed" : "Dawid's Thanksgiving",
      person: 'Dawid',
      occasion: isNl ? "Na de verbondsbevestiging — Yahuah's belofte dat zijn troon eeuwig zou zijn" : "After the covenant confirmation — Yahuah's promise that his throne would endure forever",
      summary: isNl ? "Dawid zit voor het aangezicht van Yahuah en spreekt een lang gebed van verwondering en dankbaarheid uit. Hij erkent zijn eigen onwaardigheid terwijl hij de grootheid van Yahuah's verbondsliefde viert." : "Dawid sits before Yahuah and pours out a prayer of wonder and gratitude, acknowledging his own unworthiness while celebrating the greatness of Yahuah's covenant love.",
      highlight: isNl ? '"Wie ben ik, Yahuah Elohim, en wat is mijn huis, dat U mij tot hiertoe gebracht hebt?" — 2 Shemu\'el 7:18' : '"Who am I, Yahuah Elohim, and what is my house, that You have brought me this far?" — 2 Shemu\'el 7:18',
      ref: "2 Shemu'el 7:18-29",
      category: CAT_PRAISE,
      verseRange: { book: 'shemuel-b', chapter: 7, from: 18, to: 29 },
    },
    {
      emoji: '🏛️',
      name: isNl ? "Shlomoh's Tempelgebed" : "Shlomoh's Temple Prayer",
      person: 'Shlomoh',
      occasion: isNl ? "Inwijding van de Tempel in Yerushalayim" : "Dedication of the Temple in Yerushalayim",
      summary: isNl ? "Het langste opgetekende gebed in de Geschriften. Shlomoh knielt en smeekt Yahuah om te horen telkens wanneer Zijn volk naar de Tempel bidt — voor droogte, vijanden, buitenlanders of ballingschap. Een gebed voor alle volkeren." : "The longest recorded prayer in Scripture. Shlomoh kneels and asks Yahuah to hear whenever His people pray toward the Temple — for drought, enemies, foreigners, or captivity. A prayer for all nations.",
      highlight: isNl ? '"Zal Elohim werkelijk op de aarde wonen? Zie, de hemel der hemelen kan U niet bevatten!" — 1 Melakim 8:27' : '"Will Elohim truly dwell on earth? Behold, the heaven of heavens cannot contain You!" — 1 Melakim 8:27',
      ref: '1 Melakim 8:22-53',
      category: CAT_PRAISE,
      verseRange: { book: 'melakim-a', chapter: 8, from: 22, to: 53 },
    },
    {
      emoji: '⚔️',
      name: isNl ? "Mosheh's Voorbede" : "Mosheh's Intercession",
      person: 'Mosheh',
      occasion: isNl ? "Na de zonde van het gouden kalf — Yisra'ĕl dreigde vernietigd te worden" : "After the sin of the golden calf — Yisra'ĕl faced destruction",
      summary: isNl ? "Mosheh plaatst zich tussen Yahuah's toorn en Yisra'ĕl. Hij weigert het aanbod om een groot volk van hemzelf te maken en pleit op basis van Yahuah's eer onder de volken. Een van de meest opmerkelijke momenten van voorbede in alle Geschriften." : "Mosheh places himself between Yahuah's wrath and Yisra'ĕl. He refuses the offer to make a great nation from himself and pleads on the basis of Yahuah's honour among the nations.",
      highlight: isNl ? '"Vergeef toch hun zonde — maar zo niet, wis mij dan uit Uw boek." — Shemoth 32:32' : '"Forgive their sin — but if not, blot me out of Your book." — Shemoth 32:32',
      ref: 'Shemoth 32:11-13',
      category: CAT_INTERCEDE,
      verseRange: { book: 'shemoth', chapter: 32, from: 11, to: 13 },
    },
    {
      emoji: '🙏',
      name: isNl ? "Dani'ĕl's Schuldgebed" : "Dani'ĕl's Confession",
      person: "Dani'ĕl",
      occasion: isNl ? "Bidt namens het hele volk voor hun zonden en ballingschap in Babel" : "Praying on behalf of the whole nation for their sins and exile in Babel",
      summary: isNl ? "Terwijl hij de profetie van Yirmeyahu bestudeert, belijdt Dani'ĕl de zonden van het volk en smeekt om herstel van Yerushalayim — en ontvangt direct daarna het visioen van de 70 jaarweken." : "While studying Yirmeyahu's prophecy, Dani'ĕl confesses the nation's sins and pleads for the restoration of Yerushalayim — and immediately receives the vision of the 70 weeks.",
      highlight: isNl ? '"Om Uw Naam, Yahuah — want Uw stad en Uw volk worden geroepen naar Uw Naam." — Dani\'ĕl 9:19' : '"For Your Name\'s sake, Yahuah — for Your city and Your people are called by Your Name." — Dani\'ĕl 9:19',
      ref: "Dani'ĕl 9:4-19",
      category: CAT_INTERCEDE,
      verseRange: { book: 'daniel', chapter: 9, from: 4, to: 19 },
    },
    {
      emoji: '🏙️',
      name: isNl ? "Neḥemyah's Gebed" : "Neḥemyah's Prayer",
      person: 'Neḥemyah',
      occasion: isNl ? "Na het horen dat de muren van Yerushalayim verwoest zijn" : "After hearing the walls of Yerushalayim lay in ruins",
      summary: isNl ? "Neḥemyah weent, vast en bidt dagen achtereen voordat hij de Perzische koning benadert. Hij belijdt de zonden van zijn vaderen en roept het verbond van Mosheh aan. Zijn gebed leidt direct tot de wederopbouw van Yerushalayim." : "Neḥemyah weeps, fasts, and prays for days before approaching the Persian king. He confesses the sins of his fathers and invokes the covenant of Mosheh. His prayer leads directly to the rebuilding of Yerushalayim.",
      highlight: isNl ? '"Laat Uw oor toch opmerkzaam zijn en Uw ogen open, om te horen naar het gebed van Uw dienaar." — Neḥemyah 1:6' : '"Let Your ear be attentive and Your eyes open, to hear the prayer of Your servant." — Neḥemyah 1:6',
      ref: 'Neḥemyah 1:4-11',
      category: CAT_INTERCEDE,
      verseRange: { book: 'nehemyah', chapter: 1, from: 4, to: 11 },
    },
    {
      emoji: '🔥',
      name: isNl ? "Hizqiyahu's Gebed" : "Hizqiyahu's Prayer",
      person: 'Hizqiyahu',
      occasion: isNl ? "Terwijl Assyria Yerushalayim bedreigt — de brief van Sanḥeriḇ eist overgave" : "While Assyria threatens Yerushalayim with Sanḥeriḇ's letter demanding surrender",
      summary: isNl ? "Hizqiyahu spreidt de vijandelijke brief uit voor het aangezicht van Yahuah in de Tempel en bidt om verlossing. Die nacht doodt de Boodschapper van Yahuah 185.000 Assyrische soldaten." : "Hizqiyahu spreads the enemy's letter before Yahuah in the Temple and prays for deliverance. That night the Messenger of Yahuah strikes 185,000 Assyrian soldiers.",
      highlight: isNl ? '"Red ons, zodat alle koninkrijken der aarde weten dat U alleen Yahuah bent." — 2 Melakim 19:19' : '"Save us, so that all kingdoms of the earth may know that You alone are Yahuah." — 2 Melakim 19:19',
      ref: '2 Melakim 19:14-19',
      category: CAT_INTERCEDE,
      verseRange: { book: 'melakim-b', chapter: 19, from: 14, to: 19 },
    },
    {
      emoji: '💔',
      name: isNl ? "Dawid's Berouwsgebed" : "Dawid's Repentance",
      person: 'Dawid',
      occasion: isNl ? "Na zijn zonden met Bathsheḇa en de dood van Uriyah" : "After his sins with Bathsheḇa and the death of Uriyah",
      summary: isNl ? "Tehillim 51 is het diepste berouwsgebed in de Geschriften. Dawid vraagt niet om verlossing van gevolgen maar om een rein hart. Hij erkent dat zijn zonde uiteindelijk alleen tegen Yahuah is, en smeekt om het behoud van de Ruaḥ ha'Qodesh." : "Tehillim 51 is the deepest prayer of repentance in Scripture. Dawid does not ask to escape consequences but pleads for a clean heart, acknowledging his sin is ultimately against Yahuah alone.",
      highlight: isNl ? '"Schep in mij een rein hart, o Elohim, en vernieuw een standvastige geest in mijn binnenste." — Tehillim 51:10' : '"Create in me a clean heart, O Elohim, and renew a steadfast spirit within me." — Tehillim 51:10',
      ref: 'Tehillim 51',
      category: CAT_REPENT,
      verseRange: { book: 'tehillim', chapter: 51, from: 1, to: 19 },
    },
    {
      emoji: '📜',
      name: isNl ? "Ezrah's Schuldgebed" : "Ezrah's Confession",
      person: 'Ezrah',
      occasion: isNl ? "Na de ontdekking dat Yisra'ĕl gemengde huwelijken had gesloten" : "After discovering Yisra'ĕl had taken foreign wives against the covenant",
      summary: isNl ? "Ezrah valt op zijn knieën, scheurt zijn kleding en belijdt met diepe schaamte de zonden van het volk. Zijn publieke gebed brengt het volk zo diep onder de indruk dat zij zelf besluiten hun zonden te herstellen." : "Ezrah falls on his knees, tears his garments, and confesses the nation's sins with deep shame. His public prayer so moves the people that they themselves decide to make it right.",
      highlight: isNl ? '"Mijn Elohim, ik ben te beschaamd om mijn gezicht naar U op te heffen." — Ezrah 9:6' : '"My Elohim, I am too ashamed and humiliated to lift my face to You." — Ezrah 9:6',
      ref: 'Ezrah 9:5-15',
      category: CAT_REPENT,
      verseRange: { book: 'ezra', chapter: 9, from: 5, to: 13 },
    },
    {
      emoji: '🐋',
      name: isNl ? "Yonah's Gebed" : "Yonah's Prayer",
      person: 'Yonah',
      occasion: isNl ? "Vanuit de buik van de grote vis, na drie dagen en nachten" : "From inside the great fish, after three days and nights",
      summary: isNl ? "Omgeven door water en zeewier, gezonken naar de bodem van de zee, roept Yonah vanuit de diepte tot Yahuah. Zijn gebed is geweven uit Tehillim-taal — een man die herinnert aan Yahuah's redding terwijl hij erin gevangen zit." : "Surrounded by water and seaweed, sunk to the floor of the sea, Yonah cries out from the deep. His prayer is woven from Tehillim language — a man recalling Yahuah's salvation while trapped inside it.",
      highlight: isNl ? '"Uit de schoot van het dodenrijk riep ik om hulp — U hoorde mijn stem." — Yonah 2:2' : '"Out of the belly of Sheol I cried — You heard my voice." — Yonah 2:2',
      ref: 'Yonah 2:1-10',
      category: CAT_LAMENT,
      verseRange: { book: 'yunah', chapter: 2, from: 1, to: 10 },
    },
    {
      emoji: '😭',
      name: isNl ? "Yirmeyahu's Klaaglied" : "Yirmeyahu's Lament",
      person: 'Yirmeyahu',
      occasion: isNl ? "Na de verwoesting van Yerushalayim door Babel" : "After the destruction of Yerushalayim by Babel",
      summary: isNl ? "Het boek Eikah is een reeks gebeden van rouw over de verwoesting van de Tempel en de ballingschap. Midden in het verdriet staat een ankerpunt: de goedertierenheden van Yahuah houden nooit op." : "The book of Eikah (Lamentations) is a series of prayers of grief over the Temple's destruction. In the midst of devastation stands an anchor: Yahuah's mercies never cease.",
      highlight: isNl ? '"De goedertierenheden van Yahuah houden niet op, want Zijn barmhartigheden zijn niet uitgeput. Zij zijn elke ochtend nieuw." — Eikah 3:22-23' : '"The steadfast love of Yahuah never ceases, His mercies never come to an end. They are new every morning." — Eikah 3:22-23',
      ref: 'Eikah 3:19-33',
      category: CAT_LAMENT,
      verseRange: { book: 'eikah', chapter: 3, from: 19, to: 33 },
    },
    {
      emoji: '✨',
      name: isNl ? "Yahusha's Hogepriesterlijk Gebed" : "Yahusha's High Priestly Prayer",
      person: 'Yahusha',
      occasion: isNl ? "De nacht voor zijn dood — bidt voor zijn leerlingen en alle toekomstige gelovigen" : "The night before his death — praying for his disciples and all future believers",
      summary: isNl ? "Het langste opgetekende gebed van Yahusha. Hij bidt voor bescherming van zijn leerlingen, voor eenheid onder alle gelovigen en dat zij de heerlijkheid mogen zien die Hij bij de Vader had voor de schepping van de wereld." : "The longest recorded prayer of Yahusha. He prays for protection of his disciples, for unity among all believers, and that they would see the glory He had with the Father before the world existed.",
      highlight: isNl ? '"Dit is het eeuwige leven: dat zij U kennen, de enige ware Elohim, en Yahusha Mashiaḥ die U gezonden hebt." — Yoḥanan 17:3' : '"This is eternal life: that they know You, the only true Elohim, and Yahusha the Messiah whom You sent." — Yoḥanan 17:3',
      ref: 'Yoḥanan 17:1-26',
      category: CAT_YAHUSHA,
      verseRange: { book: 'yahuchanan', chapter: 17, from: 1, to: 26 },
    },
    {
      emoji: '🌿',
      name: 'Gethsemane',
      person: 'Yahusha',
      occasion: isNl ? "De nacht van zijn arrestatie, terwijl zijn leerlingen sliepen" : "The night of his arrest, while his disciples slept",
      summary: isNl ? "Yahusha valt met zijn gezicht ter aarde en bidt driemaal. Hij vraagt of de beker kan voorbijgaan, maar onderwerpt zijn wil volledig aan de Vader. Luqas vermeldt dat een engel hem versterkte en dat zijn zweet als bloeddruppels was." : "Yahusha falls on his face and prays three times. He asks if the cup can pass, but fully submits his will to the Father. Luqas records that an angel strengthened him and his sweat fell like drops of blood.",
      highlight: isNl ? '"Toch niet Mijn wil, maar Uw wil geschiede." — Luqas 22:42' : '"Yet not My will, but Yours be done." — Luqas 22:42',
      ref: 'Mattithyahu 26:36-44',
      category: CAT_YAHUSHA,
      verseRange: { book: 'mattithyahu', chapter: 26, from: 36, to: 44 },
    },
    {
      emoji: '🕊️',
      name: isNl ? 'Ons Vader (Modelgebed)' : 'Our Father (Model Prayer)',
      person: 'Yahusha',
      occasion: isNl ? "Onderwijs aan zijn leerlingen over hoe te bidden" : "Teaching his disciples how to pray",
      summary: isNl ? "Yahusha geeft dit gebed als een model — niet om woordelijk te herhalen, maar als een structuur: lof, uitlijning met de wil van Yahuah, dagelijkse noden, vergeving en verlossing. Het opent met 'Onze Vader' — een revolutionaire aanduiding voor Yahuah." : "Yahusha gives this as a model — not to repeat word for word, but as a structure: praise, alignment with Yahuah's will, daily needs, forgiveness, and deliverance. Opening with 'Our Father' was a revolutionary address for Yahuah.",
      highlight: isNl ? '"Laat Uw Naam geheiligd worden. Laat Uw Koninkrijk komen. Laat Uw wil gedaan worden, op aarde zoals in de hemel." — Mattithyahu 6:9-10' : '"Let Your Name be set apart. Let Your Kingdom come. Let Your will be done on earth as in heaven." — Mattithyahu 6:9-10',
      ref: 'Mattithyahu 6:9-13',
      category: CAT_YAHUSHA,
      verseRange: { book: 'mattithyahu', chapter: 6, from: 9, to: 13 },
    },
  ]

  // Fetch all verse texts in parallel
  const verseTexts = await Promise.all(
    prayers.map(p => fetchVerses(supabase, p.verseRange, locale))
  )


  // ── Standalone warfare prayer (not from scripture, full text stored here) ──
  const CAT_WARFARE = isNl ? 'Geestelijke Strijd' : 'Spiritual Warfare'

  const warfarePrayer = {
    emoji: '⚔️',
    name: isNl ? 'Gebed Tegen Demonische Aanval' : 'Warfare Prayer Against Demonic Attack',
    occasion: isNl
      ? 'Een krachtig gebed om te bidden bij verhoogde geestelijke aanvallen, hekserij en demonische tegenstand'
      : 'A powerful prayer to pray during increased spiritual attacks, witchcraft and demonic opposition',
    paragraphs_en: [
      "In the name of Yahusha ha'Mashiaḥ, King of kings and Master of masters, we ask you to fill us to overflowing with your precious Ruaḥ ha'Qodesh, as we pray these words in your mighty and powerful name.",
      "Your Word teaches that we have the power and authority to tread on serpents, scorpions, and over all the power of the enemy, and nothing shall by any means hurt us (Luqas 10:19), and so Heavenly Father, we pray that all forms of evil in our lives, and that of our loved ones, be sent back NOW to your feet for judgment.",
      "You have already won the victory Yahusha, conquering evil, sin and death for all time, and we declare these truths in this realm this day. Father, we come to your courtroom, entering Your gates with thanksgiving and Your courts with praise, asking that our sins and transgressions be forgiven, as we forgive all those who have come against us in this lifetime. Please Father hear our prayers and petitions on behalf of ourselves, our loved ones, and all of your children.",
      "We ask you now Father to avenge us of the enemy of our souls. Greater is You, Father who is in us, than he, the adversary who is in the world. No weapon formed against us will prosper and every tongue that rises up against us, You have condemned. This is our heritage as sons and daughters of the Most High, and our righteousness is from You.",
      "All enemies of our soul, we send you to the court of Our Father, The Great I AM. We break you, all evil spirits and ask for the Ruaḥ ha'Qodesh to destroy you by fire and bring you to ashes. Every power declaring dominion over us, you are a LIAR! Break and be brought to ashes in Yahusha's mighty name. Serpent of death and every strong man, break and be brought to ashes in Yahusha ha'Mashiaḥ's mighty name.",
      "Every attempt at satanic or witchcraft programming of any kind, break and be brought to ashes by the Ruaḥ ha'Qodesh Fire. Every mouth that speaks any wickedness against us, break in Yahusha ha'Mashiaḥ's mighty name. Any power that is reporting us to satan or his demons, break and be destroyed in Yahusha's mighty name. May every stolen blessing come back to us in the name of Yahusha ha'Mashiaḥ.",
      "We bind, smash, and send back to You Yahusha for judgment, all demonic thrones, principalities and dominions, powers, minions, territorial and tribal spirits, and any and all demonic spirits who are attempting to infiltrate our lives in any way.",
      "We forbid any and all of satan's demons from exerting influence over any area of our lives — our workplace, our vehicle(s) and transportation, our dwelling place, our finances, our health, our children, our spouse, our relatives, our interactions with others, and the region where we live and work.",
      "Whatever it is, we forbid them from operating against us today and always in the mighty name of Yahusha ha'Mashiaḥ. We pray for Ruaḥ ha'Qodesh fire to bind, smash and send back to Yahusha for judgment all demonic altars throughout the world and in the heavenlies. We ask Yahusha to seal those portals now in Your mighty name, never again to be opened.",
      "We bind and smash witchcraft in any form. We bind and smash all witch and warlock covens, witchcraft control and activity — all chants, spells, curses, hexes, vexes, divination, white or black magic, incantations, incarnations of demonic entities, mediation, or any type of magic in any form, and we cancel all witchcraft assignments, especially those projected against us and our loved ones. Break and be destroyed now, being brought to ashes by the power of The Ruaḥ ha'Qodesh and in the mighty name of Yahusha ha'Mashiaḥ. Every witchcraft registry that includes our destinies or that of our loved ones, break and be destroyed now by the fire of The Ruaḥ ha'Qodesh.",
      "We bind, smash, and send to Yahusha anything, whatsoever, that is sent by the demonic, witches and warlocks from the astral world, cancelling all astral travel of every kind. We cancel NOW with the blood of Yahusha all witchcraft blood sacrifices done in mockery and rebellion of the only true blood sacrifice of Yahusha ha'Mashiaḥ. We render all blood sacrifices made by all witches and warlocks, and anyone caught up in the demonic in any realm of the earthly or spiritual worlds to be null and void and cancelled NOW by the blood of Yahusha.",
      "We declare that every evil pronouncement into the atmosphere that has been made against us and our loved ones be nullified and destroyed NOW by Ruaḥ ha'Qodesh Fire. We bind, smash, and send for judgment to Yahusha ha'Mashiaḥ all demonic kings, princes, and world rulers who are representatives of every demonic spirit ever known or unknown. Yahusha's power and authority strips each and every demonic spirit and its hierarchy of power, armor, and rank, and we pray Yahusha ha'Mashiaḥ that you would separate every demonic spirit from each other. Father speak confusion into the ranks of the enemy, and declare their assignments against us this moment are hereby rendered null and void in your mighty name. We ask you Yahusha to paralyze their tongues and curses, rituals and blood sacrifices. Cause confusion Father in their ranks and with their communications, and distort and sever all contact between every demonic being known or unknown.",
      "We declare that every demonic utterance be scattered and fragmented in Yahusha ha'Mashiaḥ's mighty name; and for every attempt a demonic spirit makes against us, we pray Father that you will send recompense seven times more powerful back against that spirit or spirits and destroy them completely. Father, You have declared that all demonic spirits are rendered powerless because of Your sacrifice, and we come into agreement with this truth, this moment and forever, in Your mighty and powerful name, Yahusha ha'Mashiaḥ.",
      "We bind, smash and send to Yahusha ha'Mashiaḥ all demonic spirits from the netherworld — spirits in between, around or near us, trapped and bound spirits, and all familiar spirits. We bind, smash and send back for judgment all demonic spirits inhabiting animals, strange and ungodly creatures, hybrids, mutations, giants, shape shifters, artificial intelligence, and the nephilim, or so called aliens. We declare that these spirits are forbidden to be activated from whatever source they come from, whether it be from witches or warlocks, demons or fallen angels, through chants, spells, curses, hexes, vexes, divination, white or black magic, incantations, incarnations of demonic entities, mediation or any type of magic in any form whatsoever.",
      "We bind, smash, and forbid any and all types of sorcery in our lives and all those who are the children of Yahuah in the mighty name of Yahusha. We bind, smash and break all evil affecting our senses of sight, smell, touch, taste, and hearing; all evil against our emotions; all evil against the seven points of the body used by witchcraft and new age practices known as the chakras — the base of the spine, spleen, navel, heart, throat, between the eyes, and on the top of the head.",
      "We bind, smash and break all evil sent to attack and harm our bodies, Yahusha's earthly Temples — the digestive, skeletal, muscular, reproductive, respiratory, circulatory, and nervous systems, including every other system and related part of the body — brain, organs, skin, tissues, cells, and especially our blood which carries our Father's precious and Holy DNA. All witchcraft sponsored infirmities focused on our bodies break and be brought to ashes now by Father's Ruaḥ ha'Qodesh Fire. We bind, smash, and send back to Yahusha ha'Mashiaḥ for judgment all attempts by demonic forces to corrupt our DNA by infiltration of any kind. We break and cancel any attempts to implant into our bodies anything that will change our DNA and cause corruption.",
      "We cover every source of nourishment that enters our bodies in the form of food or drink with your Holy and precious blood Yahusha ha'Mashiaḥ. We especially bind and smash all attempts by the enemy to infiltrate our DNA by causing the consumption of any form of tainted or corrupt substances which have been altered from their purest and original form, in any way. This includes all genetically modified substances, vaccines and substances that have been tainted with unholy blood coming from aborted fetuses, or ungodly practices strictly forbidden by Our Father.",
      "We bind, smash, and break with Yahusha's blood and His Ruaḥ ha'Qodesh Fire, any and all witchcraft, evil powers and demons giving assistance to, or pulling energy from our bodies, as they draw power from the planets, sun, moon, and stars, constellations, air, wind, fire, water, light, darkness, matter, the elements, or from lines, squares, circles, symbols, artifacts, or by any other means whereby spells, curses and potions are used against us. In the name of Yahusha ha'Mashiaḥ, we bind, smash and break any transference of demonic spirits sent by satan or his demons, witches or warlocks that would come against us. We take up the sword of the Spirit, The Holy Word of Yahuah, and we sever all evil soul ties between these evil spirits and our family, friends, and acquaintances. We pray that this prayer would be in effect by the blood of Yahusha for all those in our family line and all those we have ever met or have had contact with in this life.",
      "Yahusha ha'Mashiaḥ, in your mighty name, We cover all communications and equipment that we use daily with Your Holy and sanctified blood, and we declare that no demonic force or spirit of any kind is permitted to enter, travel through or control any device(s) that we use. This includes all media — phones, tablets, computers, internet, WiFi signals, electric or solar connections, generators, and all other devices used as a part of our daily life. We anoint and seal all entrance points with Your precious blood, covering them and preventing them from all infiltration attempts by demons of any kind.",
      "We refuse to accept the mark of the beast spiritually and physically. We command all demonic spirits coming from the evil eye, third eye, masonic eye, and the all seeing eye in the name of Yahusha to go to You immediately for judgment and be sent to the lake of fire.",
      "We cancel by the blood of Yahusha any and all satanic covenants, oaths, vows, pacts, permissions, petitions, entrances and agreements made by all our ancestors going back to Adam and Ḥawwah. Any curse whatsoever made by any agent of satan that has been placed on our bloodline from any generation is now declared null and void by Your mighty and precious blood Father.",
      "Yahusha, before we sleep tonight, we pray You would cover us, our loved ones, and all Your children with Your Holy and precious blood, surrounding us with your warrior angels and Your whirlwind of fire. We ask that you would place your blood on all entrance points to our dwelling places — gates, doors, windows, and entrance ways — preventing any attempt by the enemy or his minions to visit or enter and cause torment in any way. We declare that every spirit of the enemy attempting to manifest during the night that would disturb our sleep and trouble our minds, break and be destroyed and brought to ashes now by the Fire of The Ruaḥ ha'Qodesh. We declare that we will have peaceful dreams of the Kingdom this night, and we renounce all dreams of torment, death and sorrow in Your mighty and powerful name, Yahusha.",
      "Every night demon, especially lilu and lilith, and incubus and succubus spirits receive the arrow of destruction and sword of the Spirit. Break and be destroyed by His Ruaḥ ha'Qodesh Fire NOW in Yahusha ha'Mashiaḥ's mighty name.",
      "All dark angels who are watching us from demonic realms, break and be brought to ashes NOW by the fire of the Ruaḥ ha'Qodesh. Every satanic network that is operating against us, we send Ruaḥ ha'Qodesh Fire to destroy you. Father, deflect any arrows by day and terrors by night from locating us, and place us in Your supernatural wall of fire, insulating us from all attacks of the enemy.",
      "From the entrance to the exit of our dwelling places, up and down every stair or level, we position Your power and presence Yahusha to monitor and prevent any satanic invaders from coming against us while we sleep. We forbid the entrance of any type of demonic creature, hybrid, animal, or any other demonic being or minion from entering our dwelling places while we sleep. All demonic spirits attached to anyone or anything in the area of our dwelling places are hereby rendered ineffectual, harmless and broken and destroyed by the Ruaḥ ha'Qodesh Fire.",
      "Yahusha ha'Mashiaḥ, Father, we loose Your love, Your power and authority in this place, Your protection, Your strength, Your healing and wholeness, Your mercy and grace, Your blessings and favor, and all provisions needed to fulfill our purpose. We loose the restoration of all that the enemy has stolen from us, and we pray that more children of Yahuah may be saved by these prayers and obedience to You. We ask for twelve plus legions of angels to preside over our dwelling places in order to keep the enemy from attacking any of us.",
      "Father, Yahusha, our entire existence is consecrated to You, and we ask for Your mighty and powerful blood to always cover, course through and protect us from all forces of darkness, no matter what they may be. Thank you that we can speak these words of prayer from our heart with all confidence and assurance that You are faithful to Your Word, and that when we speak these words, they breathe life with every utterance. You have not given me the spirit of fear, but of power, love and a sound mind.",
      "We are at Your feet, at Your service, and we humbly pray that You would hear this prayer and answer us according your perfect will. We adore you! We praise you! We honor and glorify You! You are The Most High, The Messiah and Master of all creation, and our soon coming Bridegroom!! Thank you for hearing us and thank you for your love and faithfulness in answering our prayers. All praise, honor and glory to you Yahusha ha'Mashiaḥ! Amen!",
    ],
    paragraphs_nl: [
      "In de naam van Yahusha ha'Mashiaḥ, Koning der koningen en Meester der meesters, vragen wij U ons te vervullen tot overvloeiend toe met Uw dierbare Ruaḥ ha'Qodesh, terwijl wij deze woorden bidden in Uw machtige en krachtige naam.",
      "Uw Woord leert dat wij de macht en autoriteit hebben om op slangen, schorpioenen en over alle macht van de vijand te treden, en dat niets ons enige schade zal doen (Luqas 10:19), en zo, Hemelse Vader, bidden wij dat alle vormen van kwaad in ons leven en dat van onze geliefden, ONMIDDELLIJK worden teruggestuurd naar Uw voeten voor oordeel.",
      "Gij hebt de overwinning reeds behaald, Yahusha, het kwaad, de zonde en de dood voor altijd overwonnen, en wij verklaren deze waarheden op deze dag in dit rijk. Vader, wij komen tot Uw rechtszaal, Uw poorten binnentredend met dankzegging en Uw voorhoven met lof, vragend dat onze zonden en overtredingen worden vergeven, zoals wij allen vergeven die in dit leven tegen ons zijn opgekomen. Vader, hoor alstublieft onze gebeden en verzoeken namens onszelf, onze geliefden en al Uw kinderen.",
      "Wij vragen U nu, Vader, ons te wreken op de vijand van onze ziel. Groter is Gij, Vader die in ons is, dan hij, de tegenstander die in de wereld is. Geen wapen dat tegen ons gesmeed is zal gedijen, en elke tong die tegen ons opstaat, hebt Gij veroordeeld. Dit is ons erfdeel als zonen en dochters van de Allerhoogste, en onze gerechtigheid is van U.",
      "Alle vijanden van onze ziel, wij zenden u naar de rechtbank van Onze Vader, de Grote IK BEN. Wij breken u, alle boze geesten, en vragen de Ruaḥ ha'Qodesh u door vuur te vernietigen en tot as te brengen. Elke macht die heerschappij over ons verklaart, gij zijt een LEUGENAAR! Breek en word tot as gebracht in Yahusha's machtige naam. Slang des doods en elke sterke man, breek en word tot as gebracht in de machtige naam van Yahusha ha'Mashiaḥ.",
      "Elke poging tot satanische of heksenprogrammering van welke aard ook, breek en word tot as gebracht door het Ruaḥ ha'Qodesh Vuur. Elke mond die enige goddeloosheid tegen ons spreekt, breek in de machtige naam van Yahusha ha'Mashiaḥ. Elke macht die ons aanmeldt bij satan of zijn demonen, breek en word vernietigd in Yahusha's machtige naam. Moge elke gestolen zegen tot ons terugkeren in de naam van Yahusha ha'Mashiaḥ.",
      "Wij binden, verbrijzelen en zenden terug naar U, Yahusha, voor oordeel: alle demonische tronen, overheden en machten, heerschappijen, dienaren, territoriale en tribale geesten, en alle demonische geesten die op enige wijze ons leven trachten te infiltreren.",
      "Wij verbieden alle demonen van satan enige invloed uit te oefenen over enig gebied van ons leven — onze werkplek, ons vervoer, onze woning, onze financiën, onze gezondheid, onze kinderen, onze echtgenoot of echtgenote, onze verwanten, onze omgang met anderen en de streek waar wij leven en werken.",
      "Wat het ook zij, wij verbieden hen vandaag en altijd tegen ons te werken in de machtige naam van Yahusha ha'Mashiaḥ. Wij bidden dat het Ruaḥ ha'Qodesh vuur alle demonische altaren over de gehele wereld en in de hemelse gewesten bindt, verbrijzelt en terugstuurt naar Yahusha voor oordeel. Wij vragen Yahusha die poorten nu te verzegelen in Uw machtige naam, zodat zij nooit meer geopend worden.",
      "Wij binden en verbrijzelen hekserij in welke vorm dan ook. Wij binden en verbrijzelen alle heksen- en tovenaarscovens, hekserijcontrole en -activiteit — alle bezweringen, spreuken, vloeken, vervloekingen, waarzeggerij, witte of zwarte magie, bezweringsformules, incarnaties van demonische entiteiten, bemiddeling of enige vorm van magie, en wij annuleren alle hekserijopdrachten, vooral die welke tegen ons en onze geliefden zijn gericht. Breek en word nu vernietigd, tot as gebracht door de kracht van de Ruaḥ ha'Qodesh en in de machtige naam van Yahusha ha'Mashiaḥ. Elk hekserijregister dat onze bestemmingen of die van onze geliefden bevat, breek en word nu vernietigd door het vuur van de Ruaḥ ha'Qodesh.",
      "Wij binden, verbrijzelen en zenden naar Yahusha al hetgeen dat door het demonische, heksen en tovenaars vanuit de astrale wereld wordt gestuurd, en annuleren alle astraal reizen van welke aard ook. Wij annuleren NU door het bloed van Yahusha alle hekserij-bloedoffers gebracht in bespotting en opstand tegen het enige ware bloedoffer van Yahusha ha'Mashiaḥ. Wij verklaren alle bloedoffers gebracht door alle heksen en tovenaars nietig en van onwaarde, NU geannuleerd door het bloed van Yahusha.",
      "Wij verklaren dat elke boze uitspraak in de atmosfeer die tegen ons en onze geliefden is gedaan, NU vernietigd en tenietgedaan wordt door het Ruaḥ ha'Qodesh Vuur. Wij binden, verbrijzelen en zenden ter berechting naar Yahusha ha'Mashiaḥ alle demonische koningen, vorsten en wereldheersers. De macht en autoriteit van Yahusha ontdoet elke demonische geest en zijn hiërarchie van macht, wapenrusting en rang. Vader, spreek verwarring in de rijen van de vijand en verklaar dat hun opdrachten nietig zijn in Uw machtige naam. Wij vragen U, Yahusha, hun tongen en vloeken, rituelen en bloedoffers te verlammen. Zaai verwarring, Vader, in hun rijen en in hun communicatie, en verbreek en doorseveer alle contact tussen elk demonisch wezen, bekend of onbekend.",
      "Wij verklaren dat elke demonische uiting verstrooid en gefragmenteerd wordt in de machtige naam van Yahusha ha'Mashiaḥ; en voor elke poging die een demonische geest tegen ons onderneemt, bidden wij, Vader, dat Gij zevenmaal krachtiger vergelding terug zult sturen en hen volkomen zult vernietigen. Vader, Gij hebt verklaard dat alle demonische geesten krachteloos zijn gemaakt door Uw offer, en wij stemmen in met deze waarheid op dit moment en voor eeuwig, in Uw machtige naam, Yahusha ha'Mashiaḥ.",
      "Wij binden, verbrijzelen en zenden naar Yahusha ha'Mashiaḥ alle demonische geesten uit de onderwereld — geesten tussen, rondom of nabij ons, gevangen en gebonden geesten en alle vertrouwde geesten. Wij binden, verbrijzelen en zenden terug ter berechting alle demonische geesten die dieren, vreemde wezens, hybriden, mutaties, reuzen, gedaanteverwisselaars, kunstmatige intelligentie en de Nephilim of zogenaamde buitenaardse wezens bewonen. Wij verklaren dat deze geesten verboden is te worden geactiveerd van welke bron zij ook afkomstig zijn, door bezweringen, spreuken, vloeken, waarzeggerij, bemiddeling of enige vorm van magie op welke wijze ook.",
      "Wij binden, verbrijzelen en verbieden alle vormen van toverij in ons leven en dat van allen die kinderen van Yahuah zijn in de machtige naam van Yahusha. Wij binden, verbrijzelen en breken al het kwaad dat onze zintuigen van zien, ruiken, tasten, smaken en horen aantast; al het kwaad tegen onze emoties; al het kwaad tegen de zeven punten van het lichaam gebruikt door hekserij en new-agepraktijken — de basis van de wervelkolom, de milt, de navel, het hart, de keel, tussen de ogen en op de top van het hoofd.",
      "Wij binden, verbrijzelen en breken al het kwaad dat is gestuurd om onze lichamen aan te vallen — de aardse Tempels van Yahusha — de spijsverterings-, skelet-, spier-, voortplantings-, ademhalings-, bloedsomloop- en zenuwstelsels, inclusief elk ander stelsel en gerelateerd deel van het lichaam — hersenen, organen, huid, weefsels, cellen en in het bijzonder ons bloed dat het dierbare en heilige DNA van onze Vader draagt. Alle door hekserij veroorzaakte ziekten, breek en word nu tot as gebracht door het Ruaḥ ha'Qodesh Vuur. Wij binden, verbrijzelen en zenden terug naar Yahusha ha'Mashiaḥ voor oordeel alle pogingen van demonische krachten om ons DNA te corrumperen. Wij breken en annuleren alle pogingen om in onze lichamen iets te implanteren dat ons DNA zal veranderen.",
      "Wij bedekken elke voedingsbron die ons lichaam binnengaat met Uw heilige en dierbare bloed, Yahusha ha'Mashiaḥ. Wij binden en verbrijzelen in het bijzonder alle pogingen van de vijand om ons DNA te infiltreren door het gebruik van enige vorm van besmet of bedorven stoffen die van hun zuiverste en oorspronkelijke vorm zijn veranderd — inclusief alle genetisch gemodificeerde stoffen, vaccins besmet met onheilig bloed afkomstig van geaborteerde foetussen, of goddeloze praktijken die door Onze Vader ten strengste verboden zijn.",
      "Wij binden, verbrijzelen en breken door het bloed van Yahusha en Zijn Ruaḥ ha'Qodesh Vuur alle hekserij, boze machten en demonen die energie onttrekken aan onze lichamen, terwijl zij kracht putten uit de planeten, zon, maan en sterren, constellaties, lucht, wind, vuur, water, licht, duisternis, materie, de elementen of door enig ander middel. In de naam van Yahusha ha'Mashiaḥ nemen wij het zwaard van de Geest, het heilige Woord van Yahuah, en wij verbreken alle boze zielsverbindingen. Wij bidden dat dit gebed door het bloed van Yahusha van kracht zal zijn voor allen in onze familielijn en allen die wij ooit hebben ontmoet.",
      "Yahusha ha'Mashiaḥ, in Uw machtige naam, bedekken wij alle communicatiemiddelen en apparatuur die wij dagelijks gebruiken met Uw heilige en geheiligde bloed, en wij verklaren dat geen demonische kracht of geest is toegestaan enig apparaat te betreden of te besturen. Wij zalven en verzegelen alle toegangspunten met Uw dierbare bloed, en beletten alle infiltratiepogingen door demonen van welke aard ook.",
      "Wij weigeren het merkteken van het beest geestelijk en lichamelijk te aanvaarden. Wij gebieden alle demonische geesten van het boze oog, het derde oog, het vrijmetselaarsoog en het alziend oog in de naam van Yahusha onmiddellijk naar U te gaan voor oordeel en naar het meer van vuur te worden gezonden.",
      "Wij annuleren door het bloed van Yahusha alle satanische verbonden, eden, geloften, pakten, toestemmingen en overeenkomsten gesloten door al onze voorouders teruggaand tot Adam en Ḥawwah. Elke vloek van welke aard ook die op onze bloedlijn is geplaatst vanuit enige generatie, wordt nu door Uw machtige en dierbare bloed, Vader, nietig en van onwaarde verklaard.",
      "Yahusha, voordat wij vanavond slapen, bidden wij dat Gij ons, onze geliefden en al Uw kinderen zou bedekken met Uw heilige en dierbare bloed, ons omringend met Uw strijdersengelen en Uw wervelwind van vuur. Wij vragen Uw bloed op alle toegangspunten tot onze woningen — poorten, deuren, ramen en ingangen — waardoor elke poging van de vijand om torment te veroorzaken wordt verhinderd. Wij verklaren dat elke vijandige geest die probeert onze slaap te verstoren, nu gebroken en vernietigd wordt door het Vuur van de Ruaḥ ha'Qodesh. Wij verklaren dat wij vreedzame dromen van het Koninkrijk zullen hebben, en wij verloochenen alle dromen van kwelling, dood en verdriet in Uw machtige naam, Yahusha.",
      "Elke nachtdemon, in het bijzonder lilu en lilith, en incubus- en succubusgeesten, ontvangen de pijl van vernietiging en het zwaard van de Geest. Breek en word vernietigd door Zijn Ruaḥ ha'Qodesh Vuur NU in de machtige naam van Yahusha ha'Mashiaḥ.",
      "Alle donkere engelen die ons vanuit demonische rijken gadeslaan, breek en word NU tot as gebracht door het vuur van de Ruaḥ ha'Qodesh. Elk satanisch netwerk dat tegen ons operationeel is, wij zenden Ruaḥ ha'Qodesh Vuur om u te vernietigen. Vader, wend alle pijlen overdag en verschrikkingen 's nachts af en plaats ons in Uw bovennatuurlijke muur van vuur.",
      "Van de ingang tot de uitgang van onze woningen, boven en beneden elke trap of verdieping, stellen wij Uw macht en aanwezigheid, Yahusha, op om elke satanische indringer te verhinderen terwijl wij slapen. Wij verbieden de toegang van enig demonisch wezen, hybride, dier of dienaar tot onze woningen terwijl wij slapen. Alle demonische geesten in de omgeving van onze woningen worden hierbij krachteloos gemaakt, onschadelijk gemaakt en vernietigd door het Ruaḥ ha'Qodesh Vuur.",
      "Yahusha ha'Mashiaḥ, Vader, wij laten Uw liefde, Uw macht en autoriteit, Uw bescherming, Uw kracht, Uw genezing en heelheid, Uw barmhartigheid en genade, Uw zegeningen en gunst en alle voorzieningen vrij die nodig zijn om ons doel te vervullen. Wij bidden dat meer kinderen van Yahuah gered mogen worden door deze gebeden en gehoorzaamheid aan U. Wij vragen twaalf of meer legioenen engelen om onze woningen te bewaken.",
      "Vader, Yahusha, ons gehele bestaan is aan U geheiligd, en wij vragen dat Uw machtige bloed ons altijd bedekt en beschermt tegen alle krachten van de duisternis. Dank U dat wij deze woorden van ons hart kunnen uitspreken met alle vertrouwen dat Gij trouw zijt aan Uw Woord. Gij hebt mij niet de geest van vrees gegeven, maar van kracht, liefde en een gezond verstand.",
      "Wij zijn aan Uw voeten, in Uw dienst, en wij bidden ootmoedig dat Gij dit gebed zult horen en ons zult antwoorden naar Uw volmaakte wil. Wij aanbidden U! Wij loven U! Wij eren en verheerlijken U! Gij zijt de Allerhoogste, de Messias en Meester van de gehele schepping en onze spoedig komende Bruidegom!! Dank U voor Uw liefde en trouw. Alle lof, eer en glorie aan U, Yahusha ha'Mashiaḥ! Amen!",
    ],
  }

  return (
    <div style={{ maxWidth: '52rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0' }}>
        {isNl ? 'Gebeden in de Geschriften' : 'Prayers of Scripture'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', maxWidth: '42rem', marginBottom: '2rem' }}>
        {isNl
          ? "Van Mosheh's voorbede tot het hogepriesterlijk gebed van Yahusha — de Geschriften zijn gevuld met echte gebeden van mensen die Yahuah zochten."
          : "From Mosheh's intercession to Yahusha's high priestly prayer — Scripture is filled with real prayers of people who sought Yahuah."}
      </p>

      {categories.map(cat => {
        const catPrayers = prayers
          .map((p, i) => ({ prayer: p, verses: verseTexts[i] }))
          .filter(({ prayer }) => prayer.category === cat)
        if (!catPrayers.length) return null
        return (
          <section key={cat} style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--th-muted)', marginBottom: '1.25rem', borderBottom: '1px solid var(--th-border)', paddingBottom: '0.5rem' }}>
              {cat}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {catPrayers.map(({ prayer, verses }) => (
                <details key={prayer.ref} className="theme-card" style={{ padding: '1.25rem', cursor: 'pointer' }}>
                  <summary style={{ listStyle: 'none', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{prayer.emoji}</span>
                        <div>
                          <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--th-text)', marginBottom: '2px' }}>
                            {prayer.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--th-muted)' }}>{prayer.person} · {prayer.ref}</div>
                          <div style={{ fontSize: '13px', color: 'var(--th-accent)', fontStyle: 'italic', marginTop: '4px' }}>
                            {prayer.occasion}
                          </div>
                        </div>
                      </div>
                      <span style={{ color: 'var(--th-gold)', fontSize: '18px', flexShrink: 0, marginTop: '4px' }}>▾</span>
                    </div>
                  </summary>

                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--th-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <RichText text={prayer.summary} locale={locale} as="p" style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.7, margin: 0 }} />

                    {verses.length > 0 && (
                      <div style={{ background: 'var(--th-bg)', borderRadius: '10px', padding: '1rem 1.25rem', maxHeight: '22rem', overflowY: 'auto' }}>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-gold)', marginBottom: '0.75rem', fontWeight: 600 }}>
                          {prayer.ref}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {verses.map(v => (
                            <div key={v.verse_number} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                              <span style={{ fontSize: '10px', color: 'var(--th-gold)', fontWeight: 700, minWidth: '1.4rem', paddingTop: '3px', flexShrink: 0 }}>
                                {v.verse_number}
                              </span>
                              <RichText text={v.text} locale={locale} as="span" style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.7 }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <blockquote style={{ margin: 0, padding: '0.75rem 1rem', borderLeft: '3px solid var(--th-gold)', background: 'var(--th-bg)', borderRadius: '0 8px 8px 0' }}>
                      <RichText text={prayer.highlight} locale={locale} as="p" style={{ fontSize: '13px', color: 'var(--th-text)', fontStyle: 'italic', lineHeight: 1.65, margin: 0 }} />
                    </blockquote>
                    {prayer.ref === 'Mattithyahu 6:9-13' && (
                      <a
                        href={isNl ? '/prayers/our-father-nl.pdf' : '/prayers/our-father-en.pdf'}
                        download
                        style={{ display:'inline-flex',alignItems:'center',gap:'0.35rem',marginTop:'0.25rem',padding:'0.4rem 0.85rem',background:'var(--th-gold)',color:'#1a1a1a',borderRadius:'6px',fontSize:'12px',fontWeight:700,textDecoration:'none',flexShrink:0 }}
                      >
                        ⬇ {isNl ? 'Download als PDF' : 'Download as PDF'}
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )
      })}


      {/* ── Spiritual Warfare section ── */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--th-muted)', marginBottom: '1.25rem', borderBottom: '1px solid var(--th-border)', paddingBottom: '0.5rem' }}>
          {CAT_WARFARE}
        </h2>
        <details className="theme-card" style={{ padding: '1.25rem', cursor: 'pointer' }}>
          <summary style={{ listStyle: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{warfarePrayer.emoji}</span>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--th-text)', marginBottom: '2px' }}>
                    {warfarePrayer.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--th-accent)', fontStyle: 'italic', marginTop: '4px' }}>
                    {warfarePrayer.occasion}
                  </div>
                </div>
              </div>
              <span style={{ color: 'var(--th-gold)', fontSize: '18px', flexShrink: 0, marginTop: '4px' }}>▾</span>
            </div>
          </summary>
          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--th-border)', paddingTop: '1rem', maxHeight: '32rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(isNl ? warfarePrayer.paragraphs_nl : warfarePrayer.paragraphs_en).map((para, i) => (
              <RichText key={i} text={para} locale={locale} as="p" style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.8, margin: 0 }} />
            ))}
          </div>
          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--th-border)', paddingTop: '1rem' }}>
            <a
              href={isNl ? '/prayers/warfare-prayer-nl.pdf' : '/prayers/warfare-prayer-en.pdf'}
              download
              style={{ display:'inline-flex',alignItems:'center',gap:'0.35rem',marginTop:'0.25rem',padding:'0.4rem 0.85rem',background:'var(--th-gold)',color:'#1a1a1a',borderRadius:'6px',fontSize:'12px',fontWeight:700,textDecoration:'none',flexShrink:0 }}
            >
              ⬇ {isNl ? 'Download als PDF' : 'Download as PDF'}
            </a>
          </div>
        </details>
      </section>

      <div className="theme-card" style={{ padding: '1.5rem', marginTop: '1rem', borderLeft: '3px solid var(--th-gold)' }}>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)', margin: 0, lineHeight: 1.7 }}>
          {isNl
            ? '📖 Tehillim (Psalmen) is in zijn geheel een gebedenboek — 150 gebeden en liederen die alle menselijke ervaringen omvatten. Lees ze in de Leessectie.'
            : '📖 Tehillim (Psalms) is itself an entire book of prayer — 150 prayers and songs spanning every human experience. Read them in the Read section.'}
        </p>
      </div>
    </div>
  )
}
