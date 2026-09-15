import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl ? 'De Grote Verstrooiing' : 'The Great Dispersion',
    description: isNl
      ? 'Waar zijn de 12 stammen van Yisra'el vandaag? Profetische aanwijzingen, de Trans-Atlantische slavenhandel, Afrika, Azië en de Amerika's.'
      : "Where are the 12 tribes of Yisra'el today? Prophetic clues, the Trans-Atlantic slave trade, Africa, Asia and the Americas.",
  }
}

function VerseBlock({ reference, en, nl, isNl }: { reference: string; en: string; nl: string; isNl: boolean }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.18)', borderRadius: '8px', padding: '0.9rem 1.1rem',
      borderLeft: '3px solid var(--th-gold)', marginBottom: '0.75rem',
    }}>
      <div style={{ fontSize: '11px', color: 'var(--th-gold)', fontWeight: 700, marginBottom: '0.35rem', letterSpacing: '0.06em' }}>
        {reference}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.75, fontStyle: 'italic' }}>
        {isNl ? nl : en}
      </div>
    </div>
  )
}

function RegionCard({ icon, title_en, title_nl, isNl, children }: {
  icon: string; title_en: string; title_nl: string; isNl: boolean; children: React.ReactNode
}) {
  return (
    <div style={{
      background: 'var(--th-card)', borderRadius: '10px', padding: '1.25rem',
      marginBottom: '1.25rem', borderTop: '2px solid var(--th-accent)',
    }}>
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {icon} {isNl ? title_nl : title_en}
      </h3>
      {children}
    </div>
  )
}

function TribeRow({ tribes, claim, evidence_en, evidence_nl, strength, isNl }: {
  tribes: string; claim: string; evidence_en: string; evidence_nl: string;
  strength: 'strong' | 'moderate' | 'possible'; isNl: boolean
}) {
  const colors = { strong: '#4ade80', moderate: '#fbbf24', possible: '#94a3b8' }
  const labels = {
    strong: { en: 'Strong evidence', nl: 'Sterk bewijs' },
    moderate: { en: 'Moderate evidence', nl: 'Matig bewijs' },
    possible: { en: 'Possible', nl: 'Mogelijk' },
  }
  return (
    <div style={{ marginBottom: '0.9rem', paddingBottom: '0.9rem', borderBottom: '1px solid var(--th-border)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
        <span style={{ fontWeight: 700, color: 'var(--th-gold)', fontSize: '0.95rem', fontFamily: 'Georgia, serif' }}>
          {tribes}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--th-muted)', paddingTop: '2px' }}>— {claim}</span>
        <span style={{
          fontSize: '10px', fontWeight: 700, color: colors[strength],
          background: `${colors[strength]}1a`, borderRadius: '4px',
          padding: '1px 7px', flexShrink: 0, alignSelf: 'flex-start', marginTop: '2px',
        }}>
          {isNl ? labels[strength].nl : labels[strength].en}
        </span>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.65, opacity: 0.85 }}>
        {isNl ? evidence_nl : evidence_en}
      </div>
    </div>
  )
}

export default async function DispersionPage() {
  const locale = await getLocale() as 'en' | 'nl'
  const isNl = locale === 'nl'

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <Link href={`/${locale}/learn`} style={{ fontSize: '12px', color: 'var(--th-accent)', textDecoration: 'none' }}>
          ← {isNl ? 'Terug naar Leren' : 'Back to Learn'}
        </Link>
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
        {isNl ? 'De Grote Verstrooiing' : 'The Great Dispersion'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', marginBottom: '0.5rem' }}>
        {isNl
          ? 'Debarim 28 · Yesha'yahu 11 · Amos 9 · 2 Esdras 13 · Yeḥezqel 37'
          : 'Deuteronomy 28 · Isaiah 11 · Amos 9 · 2 Esdras 13 · Ezekiel 37'}
      </p>
      <p style={{ color: 'var(--th-text)', fontSize: '14px', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '680px' }}>
        {isNl
          ? 'Yahuah beloofde Yisra'el te verstrooien over de gehele aarde als gevolg van ongehoorzaamheid — en beloofde hen ook te verzamelen uit de vier hoeken van de hemel. De Geschriften, de buitencanonieke boeken en de geschiedenis geven aanwijzingen over waar de stammen vandaag zijn. Dit is geen definitieve kaart — het is een studie van de aanwijzingen die Yahuah zelf achterliet.'
          : 'Yahuah promised to scatter Yisra'el across the whole earth for disobedience — and promised also to gather them from the four corners of heaven. Scripture, the extra-canonical books and history all leave clues about where the tribes are today. This is not a definitive map — it is a study of the trail Yahuah himself left.'}
      </p>

      {/* ── THE TWO EXILES ── */}
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {isNl ? '1. De Twee Ballingschappen' : '1. The Two Exiles'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--th-card)', borderRadius: '10px', padding: '1.1rem', borderTop: '2px solid #f87171' }}>
          <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 700, letterSpacing: '0.07em', marginBottom: '0.4rem' }}>
            {isNl ? '722 VGT · ASSYRISCHE BALLINGSCHAP' : '722 BCE · ASSYRIAN EXILE'}
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: 'var(--th-gold)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
            {isNl ? 'De 10 Noordelijke Stammen' : 'The 10 Northern Tribes'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.65 }}>
            {isNl
              ? 'Reuḇen, Shim'on, Dan, Naphtali, Gad, Asher, Yissaskar, Zeḇulun, Efrayim, Menashe — weggevoerd door Shalmaneser V en Sargon II naar Assyrië (2 Melakim 17). Sindsdien verdwenen uit de geschiedenis als herkenbaar volk.'
              : 'Reuḇen, Shim'on, Dan, Naphtali, Gad, Asher, Yissaskar, Zeḇulun, Ephrayim, Menashe — taken by Shalmaneser V and Sargon II into Assyria (2 Kings 17). Lost to history as an identifiable people thereafter.'}
          </div>
        </div>
        <div style={{ background: 'var(--th-card)', borderRadius: '10px', padding: '1.1rem', borderTop: '2px solid #60a5fa' }}>
          <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700, letterSpacing: '0.07em', marginBottom: '0.4rem' }}>
            {isNl ? '586 VGT · BABYLONISCHE BALLINGSCHAP' : '586 BCE · BABYLONIAN EXILE'}
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: 'var(--th-gold)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
            {isNl ? 'Yahudah, Binyamin & Levi' : 'Yahudah, Binyamin & Levi'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.65 }}>
            {isNl
              ? 'Weggevoerd door Neḇukadnetssar naar Babylon (2 Melakim 25). Keerden terug onder Ezra en Neḥemyah — maar werden later opnieuw verstrooid door Rome in 70 GT en 135 GT. Zijn vandaag herkenbaar als het Joodse volk.'
              : 'Taken by Neḇukadnetssar to Babylon (2 Kings 25). Returned under Ezra and Neḥemyah — but scattered again by Rome in 70 CE and 135 CE. Identifiable today as the Jewish people.'}
          </div>
        </div>
      </div>

      {/* ── PROPHETIC FINGERPRINTS ── */}
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {isNl ? '2. Profetische Vingerafdrukken' : '2. Prophetic Fingerprints'}
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '1rem' }}>
        {isNl
          ? 'De profeten beschreven de verstrooiing met zulke specifieke details dat ze als vingerafdrukken dienen bij het identificeren van volken. Dit zijn de sleutelpassages:'
          : 'The prophets described the scattering with enough specific detail that their words serve as fingerprints for identifying peoples. These are the key passages:'}
      </p>
      <VerseBlock
        reference='Debarim 28:64–68'
        isNl={isNl}
        en='"And Yahuah shall scatter you among all people, from the one end of the earth even unto the other... And among these nations you shall find no ease... And Yahuah shall bring you into Mitsrayim again with ships, by the way whereof I spake unto thee, you shall see it no more again: and there you shall be sold unto your enemies for bondmen and bondwomen, and no man shall buy you."'
        nl='"En Yahuah zal u verstrooien onder alle volken, van het ene einde der aarde tot het andere... En onder deze volken zult u geen rust vinden... En Yahuah zal u door schepen naar Mitsrayim terugbrengen, op de weg waarover Ik u gezegd heb: u zult die niet meer zien. En daar zult u aan uw vijanden als dienstknechten en dienstmaagden te koop worden aangeboden, en niemand zal u kopen."'
      />
      <p style={{ fontSize: '12px', color: 'var(--th-accent)', fontWeight: 600, marginBottom: '1rem', marginTop: '-0.25rem' }}>
        {isNl
          ? '↑ Dit vers beschrijft terugkeer naar slavernij per schip — een van de meest specifieke profetieën over de Trans-Atlantische slavenhandel.'
          : '↑ This verse describes return to slavery by ship — one of the most specific prophecies about the Trans-Atlantic slave trade.'}
      </p>
      <VerseBlock
        reference='Yesha'yahu 11:11–12'
        isNl={isNl}
        en='"And it shall come to pass in that day, that Yahuah shall set his hand again the second time to recover the remnant of his people, which shall be left, from Assyria, and from Mitsrayim, and from Pathros, and from Cush, and from Elam, and from Shinar, and from Hamath, and from the islands of the sea."'
        nl='"En het zal in die dag geschieden, dat Yahuah zijn hand ten tweede male uitsteken zal om het overblijfsel van zijn volk terug te winnen: uit Assyrië, uit Mitsrayim, uit Pathros, uit Cush, uit Elam, uit Shinar, uit Hamath, en uit de eilanden der zee."'
      />
      <p style={{ fontSize: '12px', color: 'var(--th-accent)', fontWeight: 600, marginBottom: '1rem', marginTop: '-0.25rem' }}>
        {isNl
          ? '↑ "Eilanden der zee" — de Caribische eilanden? De Amerika's? Yesha'yahu specificeert zeven vaste locaties plus een brede categorie eilanden.'
          : '↑ "Islands of the sea" — the Caribbean islands? The Americas? Isaiah names seven specific locations plus a broad category of islands.'}
      </p>
      <VerseBlock
        reference='Amos 9:9'
        isNl={isNl}
        en='"For, lo, I will command, and I will sift the house of Yisra'el among all nations, like as corn is sifted in a sieve, yet shall not the least grain fall upon the earth."'
        nl='"Want zie, Ik gebied, en Ik zal het huis van Yisra'el siften onder alle volken, zoals koren wordt gezift in een zeef, en geen korreltje zal op de aarde vallen."'
      />
      <VerseBlock
        reference='2 Esdras 13:40–45 (extra-canoniek)'
        isNl={isNl}
        en='"Those are the ten tribes which were carried away prisoners out of their own land in the time of Osea the king... But they took this counsel among themselves, that they would leave the multitude of the heathen, and go forth into a further country, where never mankind dwelt, that they might there keep their statutes... And they entered into Euphrates by the narrow passages of the river. For the most High then shewed signs for them... For through that country there was a great way to go, namely, of a year and a half: and the same region is called Arsareth."'
        nl='"Dit zijn de tien stammen die als gevangenen werden weggevoerd uit hun eigen land in de tijd van koning Hosea... Maar zij namen dit besluit onder elkaar, dat zij de menigte der heidenen zouden verlaten en optrekken naar een verder land, waar nooit mensen hadden gewoond, opdat zij daar hun inzettingen konden houden... En zij gingen door de Eufraat via de nauwe doorgangen van de rivier. Want de Allerhoogste deed toen tekenen voor hen... Want door dat land was een grote weg te gaan, namelijk van anderhalf jaar: en hetzelfde land wordt Arsareth genoemd."'
      />
      <p style={{ fontSize: '12px', color: 'var(--th-accent)', fontWeight: 600, marginBottom: '2rem', marginTop: '-0.25rem' }}>
        {isNl
          ? '↑ "Arsareth" — een jaar en een half reizen vanuit Assyrië naar het noorden/oosten. Sommige vroege kerkvaders en rabbijnen identificeerden dit met een verre onbewoonde regio — mogelijk de Amerika's via de landbrug.'
          : '↑ "Arsareth" — a year and a half's journey from Assyria going north/east. Some early church fathers and rabbis identified this with a far uninhabited region — possibly the Americas via the land bridge.'}
      </p>

      {/* ── WHERE YAHUDAH WENT ── */}
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {isNl ? '3. Waar Yahudah Terechtkwam' : '3. Where Yahudah Went'}
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '1rem' }}>
        {isNl
          ? 'Yahudah (+ Binyamin en Levi) bleven herkenbaar als het Joodse volk. Maar zelfs zij werden over de gehele aarde verstrooid.'
          : 'Yahudah (+ Binyamin and Levi) remained identifiable as the Jewish people. But even they were scattered across the whole earth.'}
      </p>
      <div style={{ background: 'var(--th-card)', borderRadius: '10px', padding: '1.25rem', marginBottom: '2rem' }}>
        {[
          {
            region_en: 'Middle East — Babylon, Persia, Yemen, North Africa',
            region_nl: 'Midden-Oosten — Babylon, Perzië, Jemen, Noord-Afrika',
            detail_en: 'Mizrahi Jews. The oldest continuous communities. Babylonian Jews produced the Talmud (200–500 CE). Yemenite Jews claim continuous presence since the time of Shelomoh. Moroccan, Iraqi, and Iranian Jews are among the most ancient communities on earth.',
            detail_nl: 'Mizrachische Joden. De oudste ononderbroken gemeenschappen. Babylonische Joden produceerden de Talmoed (200–500 GT). Jemenitische Joden claimen ononderbroken aanwezigheid sinds de tijd van Shelomoh. Marokkaanse, Iraakse en Iraanse Joden behoren tot de oudste gemeenschappen op aarde.',
          },
          {
            region_en: 'Europe — Germany, Poland, Russia (Ashkenazi)',
            region_nl: 'Europa — Duitsland, Polen, Rusland (Ashkenazisch)',
            detail_en: 'Ashkenazi Jews. DNA studies confirm Middle Eastern (Levantine) ancestry. Named after Ashkenaz (son of Gomer = Germany). Expelled from England (1290), France (1306), Spain (1492), and faced persecution across Europe, culminating in the Holocaust.',
            detail_nl: 'Ashkenazische Joden. DNA-studies bevestigen Midden-Oosterse (Levantijnse) afkomst. Genoemd naar Ashkenaz (zoon van Gomer = Duitsland). Verdreven uit Engeland (1290), Frankrijk (1306), Spanje (1492), en geconfronteerd met vervolgingen door heel Europa, culminerend in de Holocaust.',
          },
          {
            region_en: 'Spain, Portugal, North Africa, Turkey (Sephardic)',
            region_nl: 'Spanje, Portugal, Noord-Afrika, Turkije (Sefardisch)',
            detail_en: 'Sephardic Jews — expelled from Spain in 1492 by the Inquisition, the same year Columbus sailed. Settled in Ottoman Empire, Morocco, Amsterdam, and the Americas. "Sephardi" comes from the Hebrew name for Spain (Sepharad, Obadyah 1:20).',
            detail_nl: "Sefardische Joden — verdreven uit Spanje in 1492 door de Inquisitie, hetzelfde jaar dat Columbus voer. Vestigden zich in het Ottomaanse Rijk, Marokko, Amsterdam en de Amerika's. "Sefardisch" komt van de Hebreeuwse naam voor Spanje (Sepharad, Obadyah 1:20).",
          },
          {
            region_en: 'Ethiopia — Beta Israel (Falasha)',
            region_nl: 'Ethiopië — Beta Israel (Falasha)',
            detail_en: "Beta Israel kept Torah, sacrifices, circumcision and Shabbat with no knowledge of the Talmud — suggesting a very ancient pre-Rabbinic origin. They claim descent from the tribe of Dan through Menelik (son of Shelomoh and the Queen of Sheḇa, 1 Kings 10). Recognized as Jews by Israel's Chief Rabbinate in 1973; over 140,000 now live in Yisra'el.",
            detail_nl: "Beta Israel hielden Torah, offers, besnijdenis en Shabbat zonder kennis van de Talmoed — wat wijst op een zeer oud pre-rabbijns oorsprong. Zij claimen afstamming van de stam Dan via Menelik (zoon van Shelomoh en de Koningin van Sheḇa, 1 Koningen 10). Erkend als Joden door de Opperrabbinaat van Yisra'el in 1973; meer dan 140.000 wonen nu in Yisra'el.",
          },
          {
            region_en: 'India — Bene Israel, Cochin Jews, Bnei Menashe',
            region_nl: 'India — Bene Israel, Cochin Joden, Bnei Menashe',
            detail_en: "Multiple distinct Jewish communities in India with ancient roots. The Bnei Menashe of Mizoram and Manipur claim the tribe of Menashe — over 2,000 have been formally recognized and made aliyah to Yisra'el.",
            detail_nl: "Meerdere afzonderlijke Joodse gemeenschappen in India met oude wortels. De Bnei Menashe van Mizoram en Manipur claimen de stam Menashe — meer dan 2.000 zijn formeel erkend en hebben aliyah gemaakt naar Yisra'el.",
          },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: '0.85rem', paddingBottom: '0.85rem', borderBottom: i < 4 ? '1px solid var(--th-border)' : 'none' }}>
            <div style={{ fontWeight: 700, color: 'var(--th-accent)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
              {isNl ? r.region_nl : r.region_en}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.65 }}>
              {isNl ? r.detail_nl : r.detail_en}
            </div>
          </div>
        ))}
      </div>

      {/* ── THE 10 NORTHERN TRIBES ── */}
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {isNl ? '4. De 10 Noordelijke Stammen — Waar Zijn Ze?' : '4. The 10 Northern Tribes — Where Are They?'}
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
        {isNl
          ? 'De Assyrische ballingschap (722 VGT) verstrooide 10 stammen. De profeten zeggen dat Yahuah hen een tweede keer zal verzamelen — ze zijn er dus nog. Dit zijn de sterkste aanwijzingen voor waar ze vandaag zijn.'
          : 'The Assyrian exile (722 BCE) scattered 10 tribes. The prophets say Yahuah will gather them a second time — so they still exist. These are the strongest clues for where they are today.'}
      </p>

      {/* AFRICA */}
      <RegionCard icon='🌍' title_en='Africa' title_nl='Afrika' isNl={isNl}>
        <TribeRow
          tribes='Levi — Lemba people (Zimbabwe / South Africa)'
          claim={isNl ? 'DNA-bewijs voor Levitische priesterlijn' : 'DNA evidence for Levitical priestly line'}
          evidence_en='In 2000, geneticists discovered that the Lemba carry the Cohen Modal Haplotype on their Y-chromosome at rates matching the Jewish priestly class — the strongest DNA-confirmed Israelite connection outside Yisra'el. Their oral tradition says they came from "Sena" in the north, keep no pork, practise circumcision and observe sabbath-like rest. Josephus recorded Israelite communities moving south through Africa after the Assyrian exile.'
          evidence_nl='In 2000 ontdekten genetici dat de Lemba het Cohen Modal Haplototype op hun Y-chromosoom dragen in percentages die overeenkomen met de Joodse priesterklasse — de sterkste DNA-bevestigde Israëlitische verbinding buiten Yisra'el. Hun mondelinge overlevering zegt dat ze kwamen van "Sena" in het noorden, eten geen varkensvlees, besnijden en houden een sabbatachtige rust. Josephus vermeldde Israëlitische gemeenschappen die naar het zuiden trokken door Afrika na de Assyrische ballingschap.'
          strength='strong'
          isNl={isNl}
        />
        <TribeRow
          tribes='Gad — Igbo people (Nigeria)'
          claim={isNl ? 'Cultuurparallellen en mondelinge overleveringen' : 'Cultural parallels and oral traditions'}
          evidence_en='The Igbo of southeastern Nigeria show striking parallels: circumcision on the 8th day, a naming ceremony at 8 days, yam harvest festivals paralleling Sukkot, mourning practices, and dietary laws avoiding certain animals. The name "Eri" — son of Gad (Bereshit 46:16) — is also the name of a founding ancestor in Igbo oral tradition. Several rabbis and Igbo scholars have written seriously about this connection. Many Igbo have sought aliyah recognition.'
          evidence_nl='De Igbo van Zuidoost-Nigeria tonen opvallende parallellen: besnijdenis op de 8e dag, een naamgevingsceremonie op dag 8, yamsoogstfeesten die Sukkot weerspiegelen, rouwgebruiken en spijswetten die bepaalde dieren vermijden. De naam "Eri" — zoon van Gad (Bereshit 46:16) — is ook de naam van een stichtende voorvader in de mondelinge overlevering van de Igbo. Meerdere rabbijnen en Igbo-geleerden hebben serieus over deze verbinding geschreven. Veel Igbo hebben erkenning voor aliyah gevraagd.'
          strength='moderate'
          isNl={isNl}
        />
        <TribeRow
          tribes='Dan — Ashanti / Akan (Ghana) and possibly Ethiopia'
          claim={isNl ? 'Culturele praktijken, mondelinge traditie' : 'Cultural practices, oral tradition'}
          evidence_en='Akan people of Ghana practice circumcision, have naming ceremonies, observe dietary restrictions and a seventh-day rest concept. Some scholars link certain Akan clan names to Hebrew. Ethiopian tradition separately claims Dan through Menelik. The tribe of Dan was noted for seafaring and settlement in distant coastlands (Yeḥezqel 27:19, Shoftim 5:17).'
          evidence_nl='Akan-volken van Ghana besnijden, hebben naamgevingsceremonies, volgen spijsbeperkingen en een zevendagse rustconcept. Sommige geleerden verbinden bepaalde Akan-clannamen aan het Hebreeuws. Ethiopische traditie claimt Dan afzonderlijk via Menelik. De stam Dan stond bekend om zeevaart en vestiging in verre kuststeden (Yeḥezqel 27:19, Shoftim 5:17).'
          strength='possible'
          isNl={isNl}
        />
      </RegionCard>

      {/* AMERICAS */}
      <RegionCard icon='⛵' title_en='The Americas and the Caribbean' title_nl='De Amerika's en het Caribisch Gebied' isNl={isNl}>
        <div style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', borderLeft: '3px solid var(--th-gold)' }}>
          {isNl
            ? 'Debarim 28:68 is het kernvers: "Yahuah zal u door schepen naar Mitsrayim terugbrengen... en geen man zal u kopen." Dit beschrijft terugkeer naar slavernij via schepen — een directe parallel met de Trans-Atlantische slavenhandel (1500–1800 GT), waarbij miljoenen Afrikanen per schip naar de Amerika's en het Caribisch Gebied werden gebracht. De "adelaar" van Debarim 28:49 ("een volk van ver, zo snel als de adelaar vliegt") — de adelaar is het symbool van Rome en van Amerika (de Grote Zegel van de VS). De "eilanden der zee" van Yesha'yahu 11:12 zijn veelzeggend: Jamaïca, Haïti, Cuba, Trinidad — allemaal bestemmingen van de slavenhandel.'
            : 'Deuteronomy 28:68 is the key verse: "Yahuah shall bring you into Mitsrayim again with ships... and no man shall buy you." This describes return to slavery by ship — a direct parallel with the Trans-Atlantic slave trade (1500–1800 CE), which brought millions of Africans by ship to the Americas and Caribbean. The "eagle" of Debarim 28:49 ("a nation from far, swift as the eagle") — the eagle is the symbol of Rome and of America (the US Great Seal). The "islands of the sea" of Isaiah 11:12 are telling: Jamaica, Haiti, Cuba, Trinidad — all destinations of the slave trade.'}
        </div>
        <TribeRow
          tribes='Yahudah, Binyamin, Levi — descendants of enslaved West Africans'
          claim={isNl ? 'Debarim 28:68 — "met schepen naar Mitsrayim"' : 'Debarim 28:68 — "with ships into Mitsrayim"'}
          evidence_en='The strongest case is made from the text itself: Debarim 28 lists the exact conditions of Trans-Atlantic slavery with precision — sold by ships, made servants, byword among all nations, no one to redeem them, a fierce nation from the end of the earth carrying the eagle standard. The primary populations enslaved in the Trans-Atlantic trade came from West Africa — Yoruba, Igbo, Akan, Fon, Mandinka — peoples who already showed Israelite cultural parallels before enslavement. This is an active theological tradition held by millions worldwide, not a fringe position.'
          evidence_nl='Het sterkste argument wordt gemaakt vanuit de tekst zelf: Debarim 28 noemt de exacte omstandigheden van de Trans-Atlantische slavernij met precisie — per schip verkocht, tot dienstknechten gemaakt, spreekwoord onder alle volken, niemand die hen bevrijdt, een wreed volk van het einde der aarde met de adelaarstandaard. De primaire bevolkingsgroepen die tot slaaf werden gemaakt in de Trans-Atlantische handel kwamen uit West-Afrika — Yoruba, Igbo, Akan, Fon, Mandinka — volkeren die al Israëlitische culturele parallellen vertoonden vóór de slavernij. Dit is een actieve theologische traditie die door miljoenen wereldwijd wordt aangehangen, geen randpositie.'
          strength='strong'
          isNl={isNl}
        />
        <TribeRow
          tribes='Caribbean peoples — Jamaica, Haiti, Trinidad, Barbados'
          claim={isNl ? '"Eilanden der zee" van Yesha'yahu 11:12' : '"Islands of the sea" of Isaiah 11:12'}
          evidence_en='Yesha'yahu 11:12 lists specific regions from which Yisra'el will be regathered in the second time — ending with "the islands of the sea." The Caribbean islands are among the primary destinations of the Trans-Atlantic slave trade. The Rastafari movement in Jamaica independently arrived at Israelite identity (Zion, Babylon, the Return) through reading Scripture, long before the modern Hebrew Israelite movement existed.'
          evidence_nl='Yesha'yahu 11:12 noemt specifieke regio's van waaruit Yisra'el een tweede keer zal worden verzameld — eindigend met "de eilanden der zee." De Caribische eilanden zijn onder de primaire bestemmingen van de Trans-Atlantische slavenhandel. De Rastafari-beweging op Jamaica bereikte Israëlitische identiteit (Zion, Babylon, de Terugkeer) onafhankelijk via het lezen van de Geschriften, lang vóór de moderne Hebreeuwse Israëlitische beweging bestond.'
          strength='moderate'
          isNl={isNl}
        />
        <TribeRow
          tribes='Indigenous peoples of the Americas'
          claim={isNl ? '2 Esdras 13:40–45 — "Arsareth"' : '2 Esdras 13:40–45 — "Arsareth"'}
          evidence_en='2 Esdras 13 (accepted as canonical by the Ethiopian church and early church fathers) records that after the Assyrian exile, the 10 tribes refused to live among the nations and travelled "a year and a half" to reach an uninhabited land called Arsareth, where they could keep Yahuah's Torah. A year and a half's travel northeast from Assyria, crossing rivers "with signs shown to them," points to the land bridge crossing into the Americas. Some Native American tribes have oral histories and practices with striking parallels: the Cherokee "Great Spirit" creation narrative, circumcision practices among some groups, Sabbath-like rest days, and clan naming patterns.'
          evidence_nl='2 Esdras 13 (door de Ethiopische kerk en vroege kerkvaders als canoniek aanvaard) vertelt dat na de Assyrische ballingschap de 10 stammen weigerden onder de naties te leven en "anderhalf jaar" reisden om een onbewoond land genaamd Arsareth te bereiken, waar ze Yahuah's Torah konden houden. Een jaar en een half reizen naar het noordoosten vanuit Assyrië, rivieren overstekend "met aan hen getoonde tekenen," wijst naar de landbrug naar de Amerika's. Sommige inheemse Amerikaanse stammen hebben mondelinge geschiedenissen en praktijken met opvallende parallellen: de Cherokee "Grote Geest" scheppingsverhaal, besnijdenispraktijken bij sommige groepen, sabbatachtige rustdagen en clannaampatronen.'
          strength='possible'
          isNl={isNl}
        />
      </RegionCard>

      {/* MIDDLE EAST / CENTRAL ASIA */}
      <RegionCard icon='🏔️' title_en='Middle East and Central Asia' title_nl='Midden-Oosten en Centraal-Azië' isNl={isNl}>
        <TribeRow
          tribes='Reuḇen, Shim'on, Levi, Gad, Asher, Naphtali — Pashtun (Afghanistan / Pakistan)'
          claim={isNl ? 'Stamsnamen, mondelinge traditie, praktijken' : 'Tribal names, oral tradition, practices'}
          evidence_en='The Pashtun case is one of the strongest non-DNA identifications. Pashtun tribal names directly parallel Israelite tribal names: Rabbani (Reuben), Shinwari (Simeon), Lewani (Levi), Gad (Gad), Asher (Asher), Shimali (Shim'on), Daftani (Naphtali), Yusufzai / Yusufia (Joseph), Afridi (Ephraim). They practise circumcision, some communities observe Saturday as a day of rest, maintain concepts of ritual purity, and their oral tradition (Pashtunwali) traces back to "Bani Israel" (Children of Israel) through a figure named Qays Abdur Rashid, said to descend from King Sha'ul (Saul). The Assyrian deportation route passed directly through the territory they now occupy.'
          evidence_nl='De Pashtun-zaak is een van de sterkste niet-DNA-identificaties. Pashtunse stamsnamen lopen direct parallel met Israëlitische stamsnamen: Rabbani (Reuben), Shinwari (Simeon), Lewani (Levi), Gad (Gad), Asher (Asher), Shimali (Shim'on), Daftani (Naphtali), Yusufzai / Yusufia (Yoseph), Afridi (Efrayim). Ze besnijden, sommige gemeenschappen houden zaterdag als rustdag, handhaven begrippen van rituele reinheid, en hun mondelinge overlevering (Pashtunwali) gaat terug op "Bani Israel" (Kinderen van Israël) via een figuur genaamd Qays Abdur Rashid, die zou afstammen van Koning Sha'ul. De Assyrische deportatieroute liep direct door het gebied dat ze nu bewonen.'
          strength='strong'
          isNl={isNl}
        />
        <TribeRow
          tribes='Menashe — Bnei Menashe (Mizoram and Manipur, India)'
          claim={isNl ? 'Formeel erkend — aliyah naar Yisra'el' : 'Formally recognized — aliyah to Yisra'el'}
          evidence_en='The Bnei Menashe of northeastern India claim the tribe of Menashe. They kept practices resembling Torah observance in isolation for centuries. Over 2,000 have received formal recognition from Israel's Chief Rabbinate and have made aliyah. Their oral traditions include memory of crossing rivers on dry ground and being led by pillars of fire — paralleling the Exodus narrative.'
          evidence_nl='De Bnei Menashe van Noordoost-India claimen de stam Menashe. Ze handhaafden in isolatie eeuwenlang praktijken die lijken op Torah-naleving. Meer dan 2.000 hebben formele erkenning ontvangen van de Opperrabbinaat van Yisra'el en hebben aliyah gemaakt. Hun mondelinge tradities omvatten herinneringen aan het oversteken van rivieren op droge grond en geleid worden door vuurzuilen — parallellen met het Exodus-verhaal.'
          strength='strong'
          isNl={isNl}
        />
        <TribeRow
          tribes='Zeḇulun / Asher — Bene Israel (Maharashtra, India)'
          claim={isNl ? 'Oudste Joodse diaspora — mogelijk 2e eeuw VGT' : 'Oldest Jewish diaspora — possibly 2nd century BCE'}
          evidence_en='The Bene Israel of the Mumbai/Konkan coast claim descent from Israelites who arrived shipwrecked 2,000 years ago. They kept Shabbat, kashrut basics and circumcision but had no knowledge of later rabbinic writings. Recognized by Israel's Chief Rabbinate. Some claim Zebulon, the tribe associated with seafaring (Bereshit 49:13).'
          evidence_nl='De Bene Israel van de kust van Mumbai/Konkan claimen afstamming van Israëlieten die 2.000 jaar geleden schipbreukelingen aankwamen. Ze hielden Shabbat, basisbeginselen van kashrut en besnijdenis maar hadden geen kennis van latere rabbijnse geschriften. Erkend door de Opperrabbinaat van Yisra'el. Sommigen claimen Zeḇulun, de stam geassocieerd met zeevaart (Bereshit 49:13).'
          strength='moderate'
          isNl={isNl}
        />
      </RegionCard>

      {/* EAST ASIA */}
      <RegionCard icon='🌏' title_en='East Asia and the Far East' title_nl='Oost-Azië en het Verre Oosten' isNl={isNl}>
        <TribeRow
          tribes='Unknown tribe(s) — China (Kaifeng Jews)'
          claim={isNl ? 'Gedocumenteerde Joodse aanwezigheid — ~1000 GT' : 'Documented Jewish presence — ~1000 CE'}
          evidence_en='The Jewish community of Kaifeng, China arrived approximately 1,000 years ago along the Silk Road. They maintained Torah scrolls, Hebrew prayers and Jewish practices for nearly a millennium before largely assimilating. A small number have recently sought aliyah recognition. The reference to "Sinim" (Yesha'yahu 49:12) — from the same root as "China / Qin / Sin" — may point to this eastern direction as a gathering place.'
          evidence_nl='De Joodse gemeenschap van Kaifeng, China arriveerde ongeveer 1.000 jaar geleden langs de Zijderoute. Ze handhaafden Torah-rollen, Hebreeuwse gebeden en Joodse praktijken gedurende bijna een millennium voordat ze grotendeels assimileerden. Een klein aantal heeft recentelijk aliyah-erkenning gevraagd. De verwijzing naar "Sinim" (Yesha'yahu 49:12) — van dezelfde wortel als "China / Qin / Sin" — kan naar deze oostelijke richting wijzen als een verzamelplaats.'
          strength='moderate'
          isNl={isNl}
        />
        <TribeRow
          tribes='Unknown — Japan (proposed by some researchers)'
          claim={isNl ? 'Culturele parallellen — speculatief' : 'Cultural parallels — speculative'}
          evidence_en='Some researchers (notably Arimasa Kubo and Yair Davidy) have noted parallels between ancient Shinto practices and Israelite ones: the Mikoshi (portable shrine carried on poles) resembles the Ark of the Covenant; the Star of David appears in pre-modern Japanese family crests; certain divine names contain the syllable "Ya" (Yah). These parallels are intriguing but unconfirmed. Mainstream historians do not accept an Israelite origin for the Japanese people. File as "possible but unproven."'
          evidence_nl='Sommige onderzoekers (met name Arimasa Kubo en Yair Davidy) hebben parallellen opgemerkt tussen oude Shinto-praktijken en Israëlitische: de Mikoshi (draagbare schrijn gedragen op staken) lijkt op de Ark des Verbonds; de Davidster verschijnt in pre-moderne Japanse familiewapens; bepaalde goddelijke namen bevatten de lettergreep "Ya" (Yah). Deze parallellen zijn intrigerend maar onbevestigd. Categoriseer als "mogelijk maar onbewezen."'
          strength='possible'
          isNl={isNl}
        />
      </RegionCard>

      {/* RESTORATION */}
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {isNl ? '5. De Belofte van Hereniging' : '5. The Promise of Reunion'}
      </h2>
      <VerseBlock
        reference='Yeḥezqel 37:21–22'
        isNl={isNl}
        en='"Thus says Yahuah Elohim: Behold, I will take the children of Yisra'el from among the nations where they have gone, and will gather them on every side, and bring them into their own land. And I will make them one nation in the land, on the mountains of Yisra'el, and one king shall be king to them all; and they shall be no more two nations."'
        nl='"Zo zegt Yahuah Elohim: Zie, Ik neem de kinderen van Yisra'el van tussen de volken waar zij naartoe gegaan zijn, en Ik vergader hen van alle kanten, en breng hen naar hun eigen land. En Ik maak hen tot één volk in het land, op de bergen van Yisra'el, en één koning zal hen allen tot koning zijn; en zij zullen niet meer twee volken zijn."'
      />
      <VerseBlock
        reference='Hoshea 1:10–11'
        isNl={isNl}
        en='"Yet the number of the children of Yisra'el shall be as the sand of the sea, which cannot be measured or numbered. And it shall come to pass, that in the place where it was said unto them, You are not my people, there it shall be said unto them, You are the sons of the living El. Then shall the children of Yahudah and the children of Yisra'el be gathered together, and appoint themselves one head."'
        nl='"Maar het getal van de kinderen van Yisra'el zal zijn als het zand der zee, dat niet gemeten of geteld kan worden. En het zal geschieden dat op de plaats waar tot hen gezegd werd: Gij zijt mijn volk niet, tot hen gezegd zal worden: Gij zijt zonen van de levende El. Dan zullen de kinderen van Yahudah en de kinderen van Yisra'el tezamen vergaderd worden, en zij zullen zichzelf één hoofd aanstellen."'
      />
      <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.75, marginBottom: '2rem' }}>
        {isNl
          ? 'De profeten zijn eensgezind: de verstrooiing is niet het einde. Yahuah zal Zijn volk een tweede keer verzamelen — groter dan de eerste keer. De twee staven (Yahudah en Efrayim / Yoseph) worden één in Zijn hand (Yeḥezqel 37:19). Yahusha zei dat Hij gezonden was "voor de verloren schapen van het huis van Yisra'el" (Mattithyahu 15:24) — en zijn apostelen werden gezonden naar dezelfde schapen die verspreid waren over alle volken. De hereniging is profetisch zeker; alleen de timing ligt bij Yahuah.'
          : 'The prophets are unanimous: the scattering is not the end. Yahuah will gather His people a second time — greater than the first. The two sticks (Yahudah and Ephrayim / Yoseph) become one in His hand (Yeḥezqel 37:19). Yahusha said He was sent "for the lost sheep of the house of Yisra'el" (Mattithyahu 15:24) — and His apostles were sent to the same sheep scattered among all nations. The reunion is prophetically certain; the timing alone is with Yahuah.'}
      </p>

      {/* Footer note */}
      <div style={{
        padding: '1rem 1.25rem', background: 'var(--th-card)', borderRadius: '8px',
        fontSize: '12px', color: 'var(--th-muted)', lineHeight: 1.7,
        borderLeft: '3px solid var(--th-accent)',
      }}>
        <strong style={{ color: 'var(--th-accent)' }}>
          {isNl ? 'Opmerking' : 'A note'}
        </strong>
        <br />
        {isNl
          ? 'Deze pagina presenteert bewijs en bronnen — geen doctrine. Sommige identificaties zijn DNA-bevestigd; andere zijn cultureel, linguïstisch of theologisch. Identiteit voor Yahuah hangt niet af van genealogie alleen maar van verbond en gehoorzaamheid (Yirmeyahu 31:33). Alle volken die Yahuah zoeken worden door Hem gevonden.'
          : 'This page presents evidence and sources — not doctrine. Some identifications are DNA-confirmed; others are cultural, linguistic or theological. Identity before Yahuah does not depend on genealogy alone but on covenant and obedience (Jeremiah 31:33). All peoples who seek Yahuah are found by Him.'}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href={`/${locale}/learn/nations`} style={{
          fontSize: '13px', color: 'var(--th-accent)', textDecoration: 'none',
          fontWeight: 600,
        }}>
          🌍 {isNl ? 'Volken der Aarde →' : 'Nations of the Earth →'}
        </Link>
        <Link href={`/${locale}/learn/two-houses`} style={{
          fontSize: '13px', color: 'var(--th-accent)', textDecoration: 'none',
          fontWeight: 600,
        }}>
          🏡 {isNl ? 'De Twee Huizen van Yisra'el →' : 'The Two Houses of Yisra'el →'}
        </Link>
      </div>
    </div>
  )
}
