import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'

export default async function RuachPage() {
  const locale = await getLocale()
  const isNl = locale === 'nl'

  const sections = isNl ? [
    { heading: "Wat is de Ruaḥ ha'Qodesh?", body: "De Ruaḥ ha'Qodesh — de Afgezonderde Geest van Yahuah — is geen onpersoonlijke kracht, maar de levende aanwezigheid van Yahuah Zelf die in en door Zijn volk werkt. Het Hebreeuwse woord Ruaḥ (𐤓𐤅𐤇) betekent adem, wind of geest. Hij was aanwezig bij de schepping (Bereshit 1:2), sprak door de profeten, en werd uitgestort op Shavuot over de leerlingen van Yahusha." },
    { heading: 'Zijn werk in de Geschriften', body: "Door de hele Schrift zie je de Ruaḥ werken: Hij vervult ambachtslieden met wijsheid (Shemoth 31), rust rechters en koningen toe (Shofetim 6, Shemu'el 16), spreekt door de profeten (YeshaYahu 61), en herstelt droge beenderen tot leven (Yechezqel 37). Hij is nooit afwezig — overal waar Yahuah werkt, werkt Zijn Geest." },
    { heading: 'Uitgestort op Shavuot', body: "Op het feest van Shavuot, vijftig dagen na de opstanding van Yahusha, werd de Ruaḥ ha'Qodesh uitgestort over de verzamelde leerlingen in Yerushalayim. Er klonk een geluid als van een geweldige wind, en tongen als van vuur vestigden zich op ieder van hen. Dit was de vervulling van de belofte van Yahuah: 'Ik zal Mijn Geest uitgieten over al het vlees' (Yo'el 2:28)." },
    { heading: 'De Geest in jouw leven', body: "De belofte van de Ruaḥ ha'Qodesh is niet alleen voor de apostelen — Hij is voor iedereen die zich bekeert en de Naam van Yahusha aanroept (Ma'asei 2:38). De Ruaḥ leert ons de Torah van binnenuit kennen, zoals Yirmeyahu profeteerde: 'Ik zal Mijn Torah in hun binnenste leggen.'" },
  ] : [
    { heading: "What is the Ruaḥ ha'Qodesh?", body: "The Ruaḥ ha'Qodesh — the Set-Apart Spirit of Yahuah — is not an impersonal force, but the living presence of Yahuah Himself working in and through His people. The Hebrew word Ruaḥ (𐤓𐤅𐤇) means breath, wind, or spirit. He was present at creation (Bereshit 1:2), spoke through the prophets, and was poured out at Shavuot on the disciples of Yahusha." },
    { heading: 'His Work in Scripture', body: "Throughout the Scriptures the Ruaḥ works: He fills craftsmen with wisdom (Shemoth 31), equips judges and kings (Shofetim 6, Shemu'el 16), speaks through the prophets (YeshaYahu 61), and restores dry bones to life (Yechezqel 37). He is never absent — wherever Yahuah works, His Spirit works." },
    { heading: 'Poured Out at Shavuot', body: "At the feast of Shavuot, fifty days after the resurrection of Yahusha, the Ruaḥ ha'Qodesh was poured out on the assembled disciples in Yerushalayim. There came a sound like a mighty rushing wind, and tongues as of fire sat on each of them. This was the fulfilment of Yahuah's promise: 'I will pour out My Spirit on all flesh' (Yo'el 2:28)." },
    { heading: 'The Spirit in Your Life', body: "The promise of the Ruaḥ ha'Qodesh is not only for the apostles — it is for everyone who repents and calls upon the Name of Yahusha (Ma'asei 2:38). The Ruaḥ teaches us Torah from within, just as Yirmeyahu (Jeremiah) prophesied: 'I will put My Torah in their inward parts.'" },
  ]

  return (
    <div style={{ maxWidth: '42rem' }}>
      <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0 2rem' }}>
        {isNl ? "Ruaḥ ha'Qodesh" : "Ruaḥ ha'Qodesh"}
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
