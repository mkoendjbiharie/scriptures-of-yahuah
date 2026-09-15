import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl ? 'Hebreeuwse Namen' : 'Hebrew Names',
    description: isNl
      ? 'De betekenis en verhalen achter meer dan 400 Hebreeuwse namen uit de Geschriften.'
      : 'The meaning and stories behind 400+ Hebrew names from the Scriptures.',
  }
}

import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'
import { getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { hebrewToPaleo } from '@/lib/names/paleo'
import RichText from '@/components/scripture/RichText'

const CATEGORY_LABELS: Record<string, { en: string; nl: string }> = {
  divine:     { en: 'Divine',       nl: 'Goddelijk'    },
  angel:      { en: 'Angels',       nl: 'Engelen'      },
  patriarch:  { en: 'Patriarchs',   nl: 'Aartsvaders'  },
  matriarch:  { en: 'Matriarchs',   nl: 'Aartsmoeders' },
  judge:      { en: 'Judges',       nl: 'Richters'     },
  king:       { en: 'Kings',        nl: 'Koningen'     },
  queen:      { en: 'Queens',       nl: 'Koninginnen'  },
  prophet:    { en: 'Prophets',     nl: 'Profeten'     },
  prophetess: { en: 'Prophetesses', nl: 'Profetessen'  },
  priest:     { en: 'Priests',      nl: 'Priesters'    },
  apostle:    { en: 'Apostles',     nl: 'Apostelen'    },
  disciple:   { en: 'Disciples',    nl: 'Discipelen'   },
  deacon:     { en: 'Deacons',      nl: 'Diakenen'     },
  warrior:    { en: 'Warriors',     nl: 'Strijders'    },
  servant:    { en: 'Servants',     nl: 'Dienaren'     },
  other:      { en: 'Other',        nl: 'Overige'      },
}

const ANGEL_TYPE_LABELS: Record<string, { en: string; nl: string; color: string }> = {
  archangel:     { en: 'Archangel',      nl: 'Aartsengel',       color: '#b8860b' },
  watcher:       { en: 'Watcher',        nl: 'Wachter',          color: '#4a7c59' },
  fallen_watcher:{ en: 'Fallen Watcher', nl: 'Gevallen Wachter', color: '#8b4513' },
  fallen:        { en: 'Fallen',         nl: 'Gevallen',         color: '#8b0000' },
  cherub:        { en: 'Cherub',         nl: 'Cherub',           color: '#6a5acd' },
  seraph:        { en: 'Seraph',         nl: 'Seraf',            color: '#cc4400' },
  messenger:     { en: 'Messenger',      nl: 'Bode',             color: '#2e6b8a' },
  guardian:      { en: 'Guardian',       nl: 'Bewaker',          color: '#2e8a4a' },
  other:         { en: 'Angel',          nl: 'Engel',            color: '#555' },
}

const CATEGORY_DESCRIPTIONS: Record<string, { en: string; nl: string }> = {
  divine: {
    en: `The Most High Yahuah, Yahusha the Messiah, and the title Aluahim (Elohim) — the uncreated, self-existing Being from whom all life flows.`,
    nl: `De Allerhoogste Yahuah, Yahusha de Messias, en de titel Aluahim (Elohim) — het ongeschapen, uit Zichzelf bestaande Wezen van Wie al het leven voortkomt.`,
  },
  angel: {
    en: `Spiritual beings (malak = messenger) created to serve, worship and carry out the purposes of Yahuah. Includes archangels, Watchers, cherubim, seraphim, and fallen angels.`,
    nl: `Geestelijke wezens (malak = bode/gezant) geschapen om Yahuah te dienen, te aanbidden en Zijn doelen uit te voeren. Omvat aartsengelen, Wachters, cherubim, serafim en gevallen engelen.`,
  },
  patriarch: {
    en: `The founding fathers of the covenant faith — men through whom Yahuah's promises and bloodline were carried, from Aḏam through the twelve sons of Ya'aqoḇ and beyond.`,
    nl: `De grondleggers van het verbondsgeloof — mannen door wie de beloften en bloedlijn van Yahuah werden doorgegeven, van Aḏam tot de twaalf zonen van Ya'aqoḇ en verder.`,
  },
  matriarch: {
    en: `The covenant mothers — women through whose faith, courage and sacrifice the line of promise was preserved and the nation of Yisra'ĕl was born.`,
    nl: `De verbondsmoeders — vrouwen door wier geloof, moed en offer de lijn van de belofte bewaard bleef en het volk Yisra'ĕl werd geboren.`,
  },
  judge: {
    en: `Leaders raised up by Yahuah to deliver Yisra'ĕl from oppression during the period between Yahusha bin Nun and the first kings — a cycle of straying, suffering and restoration.`,
    nl: `Leiders door Yahuah opgewekt om Yisra'ĕl te bevrijden van onderdrukking in de tijd tussen Yahusha bin Nun en de eerste koningen — een cyclus van afdwaling, lijden en herstel.`,
  },
  king: {
    en: `Rulers anointed or appointed over Yisra'ĕl and Yahudah, as well as foreign kings who played a role in the unfolding of Yahuah's purposes among the nations.`,
    nl: `Heersers gezalfd of aangesteld over Yisra'ĕl en Yahudah, alsook buitenlandse koningen die een rol speelden in het ontplooien van Yahuah's doelen onder de volken.`,
  },
  queen: {
    en: `Women who ruled or held royal authority — including the Queen of Sheba, Atalyah of Yahudah, and Hadassah (Esther) who saved her people.`,
    nl: `Vrouwen die regeerden of koninklijk gezag droegen — waaronder de Koningin van Sheba, Atalyah van Yahudah, en Hadassah (Ester) die haar volk redde.`,
  },
  prophet: {
    en: `Men called and set apart by Yahuah to speak His words to kings and nations — often calling Yisra'ĕl back to Torah and announcing what was to come.`,
    nl: `Mannen door Yahuah geroepen en afgezonderd om Zijn woorden te spreken tot koningen en volken — dikwijls Yisra'ĕl terugriepend tot de Torah en aankondigend wat komen zou.`,
  },
  prophetess: {
    en: `Women through whom Yahuah spoke His word — Miryam, Deḇorah, Ḥuldah, Anna and others who carried the prophetic voice in their generation.`,
    nl: `Vrouwen door wie Yahuah Zijn woord sprak — Miryam, Deḇorah, Ḥuldah, Anna en anderen die de profetische stem droegen in hun generatie.`,
  },
  priest: {
    en: `Men set apart from the tribe of Lĕwi to minister before Yahuah, offer sacrifices, guard the Mishkan (Tabernacle) and later the Temple, and teach Torah to the people.`,
    nl: `Mannen afgezonderd uit de stam Lĕwi om voor Yahuah te dienen, offers te brengen, de Mishkan (Tabernakel) en later de Tempel te bewaken, en Torah te onderwijzen aan het volk.`,
  },
  apostle: {
    en: `The shlichim (sent ones) — those commissioned by Yahusha to carry the Besorah (Good News) to all nations, laying the foundation of the renewed covenant assembly.`,
    nl: `De shlichim (gezondenen) — zij die door Yahusha werden aangesteld om de Besorah (Goed Nieuws) te dragen naar alle volken, het fundament leggend van de vernieuwde verbondsgemeenschap.`,
  },
  disciple: {
    en: `Followers and learners who walked closely with Yahusha or the apostles — men and women who gave their lives to growing in and spreading the faith.`,
    nl: `Volgelingen en leerlingen die nauw optrokken met Yahusha of de apostelen — mannen en vrouwen die hun leven gaven aan het groeien in en verspreiden van het geloof.`,
  },
  deacon: {
    en: `Servants appointed to practical ministry in the early assembly — freeing the apostles for prayer and teaching by caring for the needs of the community.`,
    nl: `Dienaren aangesteld voor praktische bediening in de vroege gemeente — de apostelen vrijmakend voor gebed en onderwijs door te zorgen voor de noden van de gemeenschap.`,
  },
  warrior: {
    en: `Mighty men and women who fought Yahuah's battles — commanders, judges, champions and soldiers whose courage turned the tide for Yisra'ĕl.`,
    nl: `Machtige mannen en vrouwen die Yahuah's strijden streden — aanvoerders, richters, kampioenen en soldaten wier moed de strijd besliste voor Yisra'ĕl.`,
  },
  servant: {
    en: `Those who served faithfully in supporting roles — scribes, stewards, cupbearers, attendants — whose quiet loyalty shaped the unfolding of Yahuah's story.`,
    nl: `Zij die trouw dienden in ondersteunende rollen — schrijvers, rentmeesters, schenkers, bedienden — wier stille loyaliteit het verhaal van Yahuah vormde.`,
  },
  other: {
    en: `Named individuals who shaped events without fitting a single title — family members, foreign figures, adversaries and bystanders whose mention in Scripture carries meaning.`,
    nl: `Benoemde personen die gebeurtenissen vormden zonder in één titel te passen — familieleden, buitenlandse figuren, tegenstanders en omstanders wier vermelding in de Geschriften betekenis draagt.`,
  },
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

type SearchParams = { letter?: string; cat?: string; q?: string; page?: string }
type Props = { searchParams: Promise<SearchParams> }

const PER_PAGE = 60

export default async function NamesPage({ searchParams }: Props) {
  const locale = await getLocale() as 'en' | 'nl'
  const isNl = locale === 'nl'
  const { letter, cat, q, page: pageStr } = await searchParams
  const page = Math.max(1, parseInt(pageStr ?? '1'))
  const from = (page - 1) * PER_PAGE
  const to = from + PER_PAGE - 1

  const supabase = await createClient()

  let query = supabase
    .from('people')
    .select('slug,name_restored,name_hebrew,name_english,category,testament,first_mention,meaning_en,meaning_nl,origin_en,origin_nl,significance_en,significance_nl,age_at_death,birthplace,birthplace_slug,father,father_slug,mother,mother_slug,extra_info_en,extra_info_nl,angel_type', { count: 'exact' })
    .order('name_restored')
    .range(from, to)

  if (letter) query = query.ilike('name_restored', `${letter}%`)
  if (cat)    query = query.eq('category', cat)
  if (q)      query = (query as any).textSearch('search_vector', q)

  const { data: people, count } = await query
  const totalPages = Math.ceil((count ?? 0) / PER_PAGE)
  const hasData = (count ?? 0) > 0

  const buildUrl = (params: Partial<SearchParams>) => {
    const p = { letter, cat, q, page: '1', ...params }
    const qs = Object.entries(p).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&')
    return `/${locale}/learn/names${qs ? '?' + qs : ''}`
  }

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 500,
    textDecoration: 'none', display: 'inline-block', cursor: 'pointer',
    background: active ? 'var(--th-accent)' : 'var(--th-card)',
    color: active ? '#fff' : 'var(--th-muted)',
    border: `1px solid ${active ? 'var(--th-accent)' : 'var(--th-muted)'}`,
  })

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <BackButton href={`/${locale}/learn`} label={isNl ? 'Leren' : 'Learn'} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', margin: '0.5rem 0' }}>
          {isNl ? 'Hebreeuwse Namen' : 'Hebrew Names'}
        </h1>
        <p style={{ color: 'var(--th-muted)', fontSize: '13px' }}>
          {count ?? 0} {isNl ? 'personen' : 'people'}{(letter || cat || q) ? (isNl ? ' — gefilterd' : ' — filtered') : ''}
        </p>
      </div>

      {/* Search */}
      <form method="GET" style={{ marginBottom: '1rem' }}>
        {letter && <input type="hidden" name="letter" value={letter} />}
        {cat    && <input type="hidden" name="cat"    value={cat} />}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            name="q"
            defaultValue={q ?? ''}
            placeholder={isNl ? 'Zoek een naam...' : 'Search a name...'}
            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--th-border)', background: 'var(--th-card)', color: 'var(--th-text)', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--th-accent)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            {isNl ? 'Zoek' : 'Search'}
          </button>
          {(letter || cat || q) && (
            <Link href={`/${locale}/learn/names`} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--th-border)', color: 'var(--th-muted)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center' }}>
              ✕
            </Link>
          )}
        </div>
      </form>

      {/* Category pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
        <Link href={buildUrl({ cat: undefined, page: '1' })} style={pillStyle(!cat)}>
          {isNl ? 'Alle' : 'All'}
        </Link>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <Link key={key} href={buildUrl({ cat: key, page: '1' })} style={pillStyle(cat === key)}>
            {isNl ? label.nl : label.en}
          </Link>
        ))}
      </div>

      {/* Category description banner */}
      {cat && CATEGORY_DESCRIPTIONS[cat] && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--th-card)', borderLeft: '3px solid var(--th-accent)' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--th-muted)', lineHeight: 1.6 }}>
            {isNl ? CATEGORY_DESCRIPTIONS[cat].nl : CATEGORY_DESCRIPTIONS[cat].en}
          </p>
        </div>
      )}

      {/* A–Z index — horizontally scrollable on mobile */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any, marginBottom: '1.5rem', paddingBottom: '4px' }}>
        <div style={{ display: 'flex', gap: '4px', minWidth: 'max-content' }}>
          <Link href={buildUrl({ letter: undefined, page: '1' })} style={{ ...pillStyle(!letter), minWidth: '40px', textAlign: 'center' }}>
            {isNl ? 'Alle' : 'All'}
          </Link>
          {LETTERS.map(l => (
            <Link key={l} href={buildUrl({ letter: l, page: '1' })} style={{ ...pillStyle(letter === l), minWidth: '32px', textAlign: 'center', padding: '4px 6px' }}>
              {l}
            </Link>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {!hasData && (
        <div className="theme-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📜</p>
          <p style={{ color: 'var(--th-muted)', marginBottom: '1rem' }}>
            {isNl ? 'Namen nog niet gegenereerd.' : 'Names not yet generated.'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--th-muted)', fontFamily: 'monospace' }}>
            python scripts/generate_names.py
          </p>
        </div>
      )}

      {/* Names grid */}
      {hasData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {(people ?? []).map((person: any) => (
            <details key={person.slug} className="theme-card" style={{ padding: '0.875rem', cursor: 'pointer' }}>
              <summary style={{ listStyle: 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="paleo-hebrew" style={{ fontSize: '1.3rem', color: 'var(--th-gold)', letterSpacing: '0.08em', display: 'block' }}>
                      {hebrewToPaleo(person.name_hebrew)}
                    </span>
                    <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '0.95rem', color: 'var(--th-text)' }}>
                      {person.name_restored}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--th-muted)', marginLeft: '6px' }}>
                      {person.name_english}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '999px', background: 'var(--th-accent)', color: '#fff', opacity: 0.8, whiteSpace: 'nowrap' }}>
                      {isNl ? CATEGORY_LABELS[person.category]?.nl : CATEGORY_LABELS[person.category]?.en}
                    </span>
                    {person.angel_type && ANGEL_TYPE_LABELS[person.angel_type] && (
                      <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '999px', color: '#fff', opacity: 0.9, whiteSpace: 'nowrap', background: ANGEL_TYPE_LABELS[person.angel_type].color }}>
                        {isNl ? ANGEL_TYPE_LABELS[person.angel_type].nl : ANGEL_TYPE_LABELS[person.angel_type].en}
                      </span>
                    )}
                    <span style={{ color: 'var(--th-gold)', fontSize: '16px' }}>▾</span>
                  </div>
                </div>
                {person.meaning_en && (
                  <p style={{ fontSize: '12px', color: 'var(--th-accent)', fontStyle: 'italic', margin: '4px 0 0', lineHeight: 1.4 }}>
                    {hebrewToPaleo((isNl ? person.meaning_nl || person.meaning_en : person.meaning_en).replace(/^"([^"]+)".*$/, '"$1"'))}
                  </p>
                )}
              </summary>

              <div style={{ marginTop: '0.875rem', borderTop: '1px solid var(--th-border)', paddingTop: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                {/* Biographical quick-facts */}
                {(person.father || person.mother || person.birthplace || person.age_at_death) && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
                    {person.father && (
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)' }}>
                          {isNl ? 'Vader' : 'Father'}
                        </span>
                        {person.father_slug ? (
                          <Link href={`/${locale}/learn/names?q=${encodeURIComponent(person.father)}`} style={{ fontSize: '12px', color: 'var(--th-accent)', margin: '2px 0 0', display: 'block', textDecoration: 'none', fontWeight: 500 }}>
                            {person.father} ↗
                          </Link>
                        ) : (
                          <p style={{ fontSize: '12px', color: 'var(--th-text)', margin: '2px 0 0' }}>{person.father}</p>
                        )}
                      </div>
                    )}
                    {person.mother && (
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)' }}>
                          {isNl ? 'Moeder' : 'Mother'}
                        </span>
                        {person.mother_slug ? (
                          <Link href={`/${locale}/learn/names?q=${encodeURIComponent(person.mother)}`} style={{ fontSize: '12px', color: 'var(--th-accent)', margin: '2px 0 0', display: 'block', textDecoration: 'none', fontWeight: 500 }}>
                            {person.mother} ↗
                          </Link>
                        ) : (
                          <p style={{ fontSize: '12px', color: 'var(--th-text)', margin: '2px 0 0' }}>{person.mother}</p>
                        )}
                      </div>
                    )}
                    {person.birthplace && (
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)' }}>
                          {isNl ? 'Geboorteplaats' : 'Birthplace'}
                        </span>
                        {person.birthplace_slug ? (
                          <Link href={`/${locale}/learn/cities?q=${encodeURIComponent(person.birthplace)}`} style={{ fontSize: '12px', color: 'var(--th-accent)', margin: '2px 0 0', display: 'block', textDecoration: 'none', fontWeight: 500 }}>
                            {hebrewToPaleo(person.birthplace)} ↗
                          </Link>
                        ) : (
                          <p style={{ fontSize: '12px', color: 'var(--th-text)', margin: '2px 0 0' }}>{hebrewToPaleo(person.birthplace)}</p>
                        )}
                      </div>
                    )}
                    {person.age_at_death != null && person.age_at_death > 0 && (
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)' }}>
                          {isNl ? 'Leeftijd (†)' : 'Age at death'}
                        </span>
                        <p style={{ fontSize: '12px', color: 'var(--th-text)', margin: '2px 0 0' }}>
                          {person.age_at_death} {isNl ? 'jaar' : 'years'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {person.meaning_en && (
                  <div>
                    <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
                      {isNl ? 'Betekenis' : 'Meaning'}
                    </h3>
                    <RichText text={isNl ? person.meaning_nl || person.meaning_en : person.meaning_en} locale={locale} as="p" style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.6, margin: 0 }} />
                  </div>
                )}
                {person.origin_en && (
                  <div>
                    <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
                      {isNl ? 'Verhaal' : 'Story'}
                    </h3>
                    <RichText text={isNl ? person.origin_nl || person.origin_en : person.origin_en} locale={locale} as="p" style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.6, margin: 0 }} />
                  </div>
                )}
                {person.significance_en && (
                  <div>
                    <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
                      {isNl ? 'Belang' : 'Significance'}
                    </h3>
                    <RichText text={isNl ? person.significance_nl || person.significance_en : person.significance_en} locale={locale} as="p" style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.6, margin: 0 }} />
                  </div>
                )}
                {person.extra_info_en && (
                  <div>
                    <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
                      {isNl ? 'Extra' : 'Also known'}
                    </h3>
                    <RichText text={isNl ? person.extra_info_nl || person.extra_info_en : person.extra_info_en} locale={locale} as="p" style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.6, margin: 0 }} />
                  </div>
                )}
                {person.first_mention && (
                  <p style={{ fontSize: '11px', color: 'var(--th-muted)', borderTop: '1px solid var(--th-border)', paddingTop: '0.5rem', margin: 0 }}>
                    {isNl ? 'Eerste vermelding:' : 'First mention:'} {person.first_mention}
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          {page > 1 && (
            <Link href={buildUrl({ page: String(page - 1) })} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--th-border)', color: 'var(--th-text)', textDecoration: 'none', fontSize: '13px' }}>
              {isNl ? '← Vorige' : '← Prev'}
            </Link>
          )}
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const p = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i
            return (
              <Link key={p} href={buildUrl({ page: String(p) })} style={{ ...pillStyle(p === page), minWidth: '36px', textAlign: 'center' }}>
                {p}
              </Link>
            )
          })}
          {page < totalPages && (
            <Link href={buildUrl({ page: String(page + 1) })} style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--th-border)', color: 'var(--th-text)', textDecoration: 'none', fontSize: '13px' }}>
              {isNl ? 'Volgende →' : 'Next →'}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
