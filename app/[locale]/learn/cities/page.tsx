import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import RichText from '@/components/scripture/RichText'
import Link from 'next/link'

const TYPE_LABELS: Record<string, { en: string; nl: string; icon: string }> = {
  city:     { en: 'Cities & Towns',  nl: 'Steden',           icon: '🏙️' },
  town:     { en: 'Cities & Towns',  nl: 'Steden',           icon: '🏙️' },
  village:  { en: 'Villages',        nl: 'Dorpen',           icon: '🏘️' },
  region:   { en: 'Regions',         nl: "Regio's",          icon: '🗺️' },
  country:  { en: 'Nations',         nl: 'Volken & Landen',  icon: '🌍' },
  mountain: { en: 'Mountains',       nl: 'Bergen',           icon: '⛰️' },
  valley:   { en: 'Valleys',         nl: 'Dalen',            icon: '🏞️' },
  river:    { en: 'Rivers',          nl: 'Rivieren',         icon: '🌊' },
  sea:      { en: 'Seas & Lakes',    nl: 'Zeeën & Meren',    icon: '🌊' },
  lake:     { en: 'Seas & Lakes',    nl: 'Zeeën & Meren',    icon: '🌊' },
  desert:   { en: 'Wilderness',      nl: 'Woestijn',         icon: '🏜️' },
  well:     { en: 'Wells & Springs', nl: 'Bronnen',          icon: '💧' },
  gate:     { en: 'Gates',           nl: 'Poorten',          icon: '🚪' },
  other:    { en: 'Other Places',    nl: 'Overige Plaatsen', icon: '✦' },
}

// Canonical filter keys → which DB types they cover
const FILTER_GROUPS: Record<string, { types: string[]; en: string; nl: string; icon: string }> = {
  cities:    { types: ['city','town'],    en: 'Cities',    nl: 'Steden',          icon: '🏙️' },
  nations:   { types: ['country'],        en: 'Nations',   nl: 'Volken',          icon: '🌍' },
  regions:   { types: ['region'],         en: 'Regions',   nl: "Regio's",         icon: '🗺️' },
  mountains: { types: ['mountain'],       en: 'Mountains', nl: 'Bergen',          icon: '⛰️' },
  rivers:    { types: ['river'],          en: 'Rivers',    nl: 'Rivieren',        icon: '🌊' },
  waters:    { types: ['sea','lake'],     en: 'Seas',      nl: 'Zeeën',           icon: '🌅' },
  valleys:   { types: ['valley'],         en: 'Valleys',   nl: 'Dalen',           icon: '🏞️' },
  wilderness:{ types: ['desert'],         en: 'Wilderness',nl: 'Woestijn',        icon: '🏜️' },
  villages:  { types: ['village'],        en: 'Villages',  nl: 'Dorpen',          icon: '🏘️' },
  wells:     { types: ['well'],           en: 'Wells',     nl: 'Bronnen',         icon: '💧' },
  gates:     { types: ['gate'],           en: 'Gates',     nl: 'Poorten',         icon: '🚪' },
  islands:   { types: ['island'],         en: 'Islands',   nl: 'Eilanden',        icon: '🏝️' },
  other:     { types: ['other'],          en: 'Other',     nl: 'Overige',         icon: '✦'  },
}

const TYPE_ORDER = ['city','town','village','region','country','mountain','valley','river','sea','lake','island','desert','well','gate','other']

function hebrewToPaleo(text: string): string {
  const map: Record<string, string> = {
    '\u05d0':'\u{10900}','\u05d1':'\u{10901}','\u05d2':'\u{10902}','\u05d3':'\u{10903}','\u05d4':'\u{10904}','\u05d5':'\u{10905}','\u05d6':'\u{10906}','\u05d7':'\u{10907}','\u05d8':'\u{10908}',
    '\u05d9':'\u{10909}','\u05db':'\u{1090a}','\u05da':'\u{1090a}','\u05dc':'\u{1090b}','\u05de':'\u{1090c}','\u05dd':'\u{1090c}','\u05e0':'\u{1090d}','\u05df':'\u{1090d}',
    '\u05e1':'\u{1090e}','\u05e2':'\u{1090f}','\u05e4':'\u{10910}','\u05e3':'\u{10910}','\u05e6':'\u{10911}','\u05e5':'\u{10911}','\u05e7':'\u{10912}','\u05e8':'\u{10913}','\u05e9':'\u{10914}','\u05ea':'\u{10915}',' ':' ',
  }
  return text
    .replace(/[\u0591-\u05c7]/g, '')
    .split('').map(c => map[c] ?? '').join('')
}

export default async function CitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>
}) {
  const locale = await getLocale() as 'en' | 'nl'
  const isNl = locale === 'nl'
  const supabase = await createClient()
  const { type: activeFilter, q: searchQ } = await searchParams

  let placesQuery = supabase
    .from('places')
    .select('slug,name_restored,name_hebrew,name_english,type,first_mention,location_en,location_nl,meaning_en,meaning_nl,origin_en,origin_nl,significance_en,significance_nl,modern_name,modern_country,modern_location,modern_location_nl,location_certainty,archaeology,archaeology_nl')
    .order('name_english')
  if (searchQ) placesQuery = placesQuery.or(`name_restored.ilike.%${searchQ}%,name_english.ilike.%${searchQ}%`)
  const { data: places } = await placesQuery

  // Group by type
  const grouped: Record<string, typeof places> = {}
  for (const p of (places ?? [])) {
    if (!grouped[p.type]) grouped[p.type] = []
    grouped[p.type]!.push(p)
  }

  // Which DB types are active (based on filter)
  const activeTypes = activeFilter && FILTER_GROUPS[activeFilter]
    ? FILTER_GROUPS[activeFilter].types
    : null

  // Which filter keys actually have data
  const filtersWithData = Object.entries(FILTER_GROUPS).filter(([, g]) =>
    g.types.some(t => (grouped[t]?.length ?? 0) > 0)
  )

  const hasData = (places ?? []).length > 0

  const pillStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 600,
    border: active ? '1px solid var(--th-gold)' : '1px solid var(--th-muted)',
    background: active ? 'var(--th-gold)' : 'var(--th-card)',
    color: active ? '#000' : 'var(--th-text)',
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
          {isNl ? 'Steden & Plaatsen' : 'Cities & Places'}
        </h1>
        <p style={{ color: 'var(--th-muted)', fontSize: '14px', maxWidth: '42rem', marginBottom: '0.5rem' }}>
          {isNl
            ? 'De plaatsen in de Geschriften zijn niet slechts achtergrond — ze dragen betekenis, profetie en geschiedenis.'
            : 'The places in Scripture are not merely backdrop — they carry meaning, prophecy, and history.'}
        </p>
        {hasData && (
          <p style={{ fontSize: '12px', color: 'var(--th-accent)' }}>
            {(places ?? []).length} {isNl ? 'plaatsen' : 'places'}
          </p>
        )}
      </div>

      {hasData && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2rem' }}>
          <Link href={`/${locale}/learn/cities`} style={pillStyle(!activeFilter)}>
            {isNl ? 'Alle' : 'All'}
          </Link>
          {filtersWithData.map(([key, g]) => (
            <Link key={key} href={`/${locale}/learn/cities?type=${key}`} style={pillStyle(activeFilter === key)}>
              <span>{g.icon}</span>
              {isNl ? g.nl : g.en}
            </Link>
          ))}
        </div>
      )}

      {!hasData && (
        <div className="theme-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏛️</p>
          <p style={{ color: 'var(--th-muted)', marginBottom: '1rem' }}>
            {isNl ? 'Plaatsen nog niet gegenereerd.' : 'Places not yet generated.'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--th-muted)', fontFamily: 'monospace' }}>
            python scripts/generate_places.py
          </p>
        </div>
      )}

      {TYPE_ORDER.map(type => {
        const entries = grouped[type]
        if (!entries?.length) return null
        const label = TYPE_LABELS[type] ?? { en: type, nl: type, icon: '✦' }
        if ((type === 'lake') && grouped['sea']?.length) return null

        // Apply filter
        if (activeTypes && !activeTypes.includes(type)) return null

        const allEntries = type === 'sea'
          ? [...(grouped['sea'] ?? []), ...(grouped['lake'] ?? [])]
          : entries

        return (
          <section key={type} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{label.icon}</span>
              {isNl ? label.nl : label.en}
              <span style={{ opacity: 0.5 }}>({allEntries.length})</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {allEntries.sort((a: any, b: any) => a.name_english.localeCompare(b.name_english)).map((entry: any) => (
                <details key={entry.slug} className="theme-card" style={{ padding: '1rem', cursor: 'pointer' }}>
                  <summary style={{ listStyle: 'none', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                          <span className="paleo-hebrew" style={{ fontSize: '1.3rem', color: 'var(--th-gold)', fontWeight: 700, letterSpacing: '0.08em' }}>
                            {hebrewToPaleo(entry.name_hebrew)}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '0.95rem', color: 'var(--th-text)' }}>
                          {entry.name_restored}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--th-muted)' }}>{entry.name_english}</div>
                      </div>
                      <span style={{ color: 'var(--th-gold)', fontSize: '18px', flexShrink: 0, marginTop: '4px' }}>▾</span>
                    </div>
                    {entry.meaning_en && (
                      <p style={{ fontSize: '13px', color: 'var(--th-accent)', fontStyle: 'italic', marginTop: '0.5rem', marginBottom: 0 }}>
                        {hebrewToPaleo((isNl ? entry.meaning_nl || entry.meaning_en : entry.meaning_en).split(' — ')[0])}
                      </p>
                    )}
                  </summary>
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--th-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(entry.location_en) && (
                      <div>
                        <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.35rem' }}>
                          {isNl ? 'Ligging in de Oudheid' : 'Ancient Location'}
                        </h3>
                        <RichText text={isNl ? entry.location_nl || entry.location_en : entry.location_en} locale={locale} as="p" style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.65, margin: 0 }} />
                      </div>
                    )}

                    {entry.modern_location && (
                      <div style={{ background: 'var(--th-bg)', borderRadius: '8px', padding: '0.65rem 0.875rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', margin: 0 }}>
                            📍 {isNl ? 'Vandaag de dag' : 'Today'}
                          </h3>
                          {entry.modern_name && (
                            <span style={{ fontSize: '11px', color: 'var(--th-accent)', fontWeight: 600 }}>{entry.modern_name}{entry.modern_country ? `, ${entry.modern_country}` : ''}</span>
                          )}
                          {entry.location_certainty && (
                            <span style={{
                              fontSize: '10px', padding: '1px 6px', borderRadius: '10px', fontWeight: 600,
                              background: entry.location_certainty === 'confirmed' ? 'rgba(34,197,94,0.15)'
                                        : entry.location_certainty === 'likely'    ? 'rgba(234,179,8,0.15)'
                                        : entry.location_certainty === 'uncertain' ? 'rgba(249,115,22,0.15)'
                                        : 'rgba(139,92,246,0.15)',
                              color:      entry.location_certainty === 'confirmed' ? '#16a34a'
                                        : entry.location_certainty === 'likely'    ? '#ca8a04'
                                        : entry.location_certainty === 'uncertain' ? '#ea580c'
                                        : '#7c3aed',
                            }}>
                              {entry.location_certainty === 'confirmed' ? (isNl ? '✓ Bevestigd' : '✓ Confirmed')
                               : entry.location_certainty === 'likely'   ? (isNl ? '~ Waarschijnlijk' : '~ Likely')
                               : entry.location_certainty === 'uncertain'? (isNl ? '? Onzeker' : '? Uncertain')
                               : (isNl ? '✦ Symbolisch' : '✦ Symbolic')}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.65, margin: 0 }}>{isNl ? (entry.modern_location_nl || entry.modern_location) : entry.modern_location}</p>
                      </div>
                    )}

                    {entry.archaeology && (
                      <div>
                        <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.35rem' }}>
                          ⚒️ {isNl ? 'Archeologie' : 'Archaeology'}
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.65, margin: 0 }}>{isNl ? (entry.archaeology_nl || entry.archaeology) : entry.archaeology}</p>
                      </div>
                    )}

                    {entry.meaning_en && (
                      <div>
                        <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.35rem' }}>
                          {isNl ? 'Betekenis' : 'Meaning'}
                        </h3>
                        <RichText text={isNl ? entry.meaning_nl || entry.meaning_en : entry.meaning_en} locale={locale} as="p" style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.65, margin: 0 }} />
                      </div>
                    )}
                    {entry.origin_en && (
                      <div>
                        <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.35rem' }}>
                          {isNl ? 'Oorsprong & Geschiedenis' : 'Origin & History'}
                        </h3>
                        <RichText text={isNl ? entry.origin_nl || entry.origin_en : entry.origin_en} locale={locale} as="p" style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.65, margin: 0 }} />
                      </div>
                    )}
                    {entry.significance_en && (
                      <div>
                        <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.35rem' }}>
                          {isNl ? 'Betekenis in de Geschriften' : 'Significance in Scripture'}
                        </h3>
                        <RichText text={isNl ? entry.significance_nl || entry.significance_en : entry.significance_en} locale={locale} as="p" style={{ fontSize: '13px', color: 'var(--th-text)', lineHeight: 1.65, margin: 0 }} />
                      </div>
                    )}
                    {entry.first_mention && (
                      <div style={{ fontSize: '11px', color: 'var(--th-muted)', borderTop: '1px solid var(--th-border)', paddingTop: '0.5rem' }}>
                        {isNl ? 'Eerste vermelding:' : 'First mention:'} {entry.first_mention}
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
