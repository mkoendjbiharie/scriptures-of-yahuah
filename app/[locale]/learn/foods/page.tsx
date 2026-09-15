import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function FoodsPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const sections = isNl ? [
    {
      heading: 'De bron: Wayyiqra 11 en Debarim 14',
      body: 'De wetten over reine en onreine dieren staan in Wayyiqra (Leviticus) 11 en Debarim (Deuteronomium) 14. Ze worden vaak gezien als "ceremonieel" en afgeschaft, maar Yahuah geeft er een eenvoudige reden voor: "Want Ik ben 𐤉𐤄𐤅𐤄 uw Elohim, heiligt u daarom, want Ik ben heilig." Het gaat om heiligheid, niet slechts om gezondheid of cultuur.'
    },
    {
      heading: 'Zijn ze al afgeschaft?',
      body: 'Sommigen verwijzen naar Handelingen 10 (het visioen van Kefa met het laken vol dieren) of 1 Timoteüus 4:4 ("alles wat Elohim geschapen heeft is goed"). Maar in Handelingen 10 legt Kefa zelf uit dat het visioen gáát over mensen, niet over voedsel. En Yeshayahu 66:17 profeteert dat mensen die varken en muizen eten op de Dag van Yahuah gestraft zullen worden — de onderscheiding geldt dus nog steeds tot aan het einde.'
    },
    {
      heading: 'Landdieren: gespleten hoeven ÉN herkauwers',
      body: 'Rein: rund, schaap, geit, hert, ree, bizon. Onrein: varken (gespleten hoeven maar herkauwt niet), haas (herkauwt maar geen gespleten hoeven), kameel. Het principe is simpel: beide kenmerken samen zijn vereist. Het varken is het bekendste voorbeeld van een dier dat slechts aan één criterium voldoet.'
    },
    {
      heading: 'Waterdieren: vinnen en schubben',
      body: 'Rein: zalm, forel, kabeljauw, makreel, haring. Onrein: kreeft, garnaal, inktvis, oester, aal, haai (geen echte schubben). Schaaldieren zijn de "vuilniswagens van de zee" — ontworpen om de bodem schoon te houden, niet om gegeten te worden.'
    },
    {
      heading: 'Vogels en insecten',
      body: 'Wayyiqra 11 noemt verboden vogels bij naam: arend, gier, valk, uil, raaf, pelikaan, ooievaar. Tamme pluimvee zoals kip, eend en kalkoen zijn algemeen aanvaard als rein. Van insecten zijn alleen sprinkhanen, krekels en soortgelijke met vier springpoten rein (Wayyiqra 11:22). Yochanan de Immerser at sprinkhanen in de woestijn.'
    },
    {
      heading: 'Praktische toepassing vandaag',
      body: 'Het naleven van deze wetten is een uiting van toewijding aan Yahuah, net als de Shabbat. Het begint met bewustzijn: lees ingrediënten, vermijd varkensvlees, schaaldieren en onreine vogels. Velen beginnen met de duidelijkste verboden en bouwen van daaruit. Het gaat niet om perfectie, maar om de gezindheid van het hart voor Yahuah.'
    },
  ] : [
    {
      heading: 'The Source: Wayyiqra 11 and Debarim 14',
      body: 'The laws about clean and unclean animals are found in Wayyiqra (Leviticus) 11 and Debarim (Deuteronomy) 14. Often dismissed as "ceremonial" and abolished, Yahuah gives a clear reason: "For I am 𐤉𐤄𐤅𐤄 your Elohim: you shall therefore sanctify yourselves, for I am set-apart." This is about holiness, not merely health or culture.'
    },
    {
      heading: 'Have they been abolished?',
      body: "Some point to Acts 10 (Kepha's vision of the sheet full of animals) or 1 Timothy 4:4 ('everything created by Elohim is good'). But in Acts 10, Kepha himself explains that the vision is about people, not food. And YeshaYahu 66:17 prophesies that people eating pigs and mice will face judgment on the Day of Yahuah — so the distinction stands all the way to the end."
    },
    {
      heading: 'Land animals: split hooves AND cud-chewing',
      body: 'Clean: cattle, sheep, goat, deer, gazelle, bison. Unclean: pig (split hooves but does not chew cud), hare (chews cud but no split hooves), camel. Both signs must be present together. The pig is the most well-known example of an animal that meets only one criterion.'
    },
    {
      heading: 'Water creatures: fins and scales',
      body: 'Clean: salmon, trout, cod, mackerel, herring. Unclean: lobster, shrimp, squid, oyster, eel, shark (no true scales). Shellfish are the "garbage collectors of the sea" — designed to filter the bottom, not to be eaten.'
    },
    {
      heading: 'Birds and insects',
      body: 'Wayyiqra 11 names forbidden birds: eagle, vulture, falcon, owl, raven, pelican, stork. Domesticated poultry like chicken, duck, and turkey are broadly accepted as clean. Of insects, only locusts, crickets, and similar with four jumping legs are clean (Wayyiqra 11:22). Yochanan the Immerser ate locusts in the wilderness.'
    },
    {
      heading: 'Practical application today',
      body: 'Observing these laws is an expression of dedication to Yahuah, just like the Shabbat. Start with awareness: read ingredients, avoid pork, shellfish, and unclean birds. Many begin with the most obvious prohibitions and build from there. It is not about perfectionism but about the orientation of the heart toward Yahuah.'
    },
  ]

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 2rem' }}>
        {isNl ? 'Reine en Onreine Spijzen' : 'Clean & Unclean Foods'}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map((s, i) => (
          <section key={i} className="theme-card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>{s.heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--th-text)', margin: 0 }}>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
