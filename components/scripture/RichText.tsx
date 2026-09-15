/**
 * RichText — renders a string with interactive tooltip spans for:
 *   The divine Name (𐤉𐤄𐤅𐤄, HWHY, or hWhY PDF extraction artifacts),
 *   Yahusha (rendered from the {fWHY PDF extraction artifact), and Hebrew terms.
 *
 * The Halleluyah Scriptures PDF uses TWO different glyphs:
 *   𐤉𐤄𐤅𐤄  (real Paleo-Hebrew Unicode) = Yahuah, the Father
 *   {fWHY / [vWHY / [VWHY / {vWHY / [vHWY  (broken font extraction variants)
 *                                         = Yahusha, the Son (his name in a custom glyph)
 */
import React from 'react'
import { TOOLTIP_KEYS, getTooltips, LOCALE_STOPWORDS } from '@/lib/names/tooltips'
import { hebrewToPaleo } from '@/lib/names/paleo'

const escapedKeys = TOOLTIP_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
const PALEO = '\u{10909}\u{10904}\u{10905}\u{10904}'
// Wrap each key in Unicode word-boundary assertions so short keys like "nabi"
// don't accidentally match inside Dutch words like "nabij".
const keyBounded = escapedKeys.map(k => `(?<!\\p{L})${k}(?!\\p{L})`).join('|')
const NAME_PATTERN = new RegExp(`(${PALEO}|HWHY|hWhY|HWhY|\\{fWHY|\\{vWHY|\\[vWHY|\\[VWHY|\\[vHWY|${keyBounded})`, 'u')

/**
 * Secondary pattern: detect transliterated Hebrew/Aramaic words by their diacritical marks.
 * We use characters from Latin Extended Additional (U+1E00–U+1EFF) which covers ḥ, ḏ, ḵ, ḇ, ṭ, ṣ, ẓ, etc.
 * plus the breve vowels ĕ (U+0115), ĭ (U+012D), ŏ (U+014F) which are very rare in European text.
 * We deliberately exclude ā/ī/ū and š which occur in normal European languages.
 *
 * A "token" is any run of word characters + apostrophe that contains at least one such diacritic.
 */
const HEBREW_DIACRITIC_CLASS = 'Ḁ-ỿĔĕĬĭŎŏ'
const DIACRITIC_TOKEN_RE = new RegExp(
  `[\\w\\u00C0-ɏḀ-ỿ'\\u2019\\u02BC\\u02B9]*[${HEBREW_DIACRITIC_CLASS}][\\w\\u00C0-ɏḀ-ỿ'\\u2019\\u02BC\\u02B9]*`,
  'g'
)

const PALEO_STYLE: React.CSSProperties = {
  fontSize: '1.1em',
  color: 'var(--th-gold)',
  letterSpacing: '0.1em',
  display: 'inline-block',
  verticalAlign: 'middle',
  lineHeight: 1,
  cursor: 'help',
}

const YAHUSHA_STYLE: React.CSSProperties = {
  color: 'var(--th-gold)',
  fontWeight: 700,
  fontStyle: 'italic',
  cursor: 'help',
}

const TERM_STYLE: React.CSSProperties = {
  color: 'var(--th-accent)',
  fontWeight: 600,
  cursor: 'help',
  borderBottom: '1px dotted var(--th-accent)',
}

const UNKNOWN_STYLE: React.CSSProperties = {
  color: 'var(--th-accent)',
  cursor: 'help',
  borderBottom: '1px dotted color-mix(in srgb, var(--th-accent) 50%, transparent)',
  opacity: 0.85,
}

/**
 * Split a plain text string by diacritic-containing Hebrew/Aramaic name tokens
 * and wrap each match in a span with a generic tooltip.
 */
function splitByDiacritics(text: string, baseKey: string | number): React.ReactNode[] {
  const result: React.ReactNode[] = []
  let last = 0
  DIACRITIC_TOKEN_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = DIACRITIC_TOKEN_RE.exec(text)) !== null) {
    if (match.index > last) result.push(text.slice(last, match.index))
    result.push(
      <span
        key={`${baseKey}-d-${match.index}`}
        title="Transliterated Hebrew/Aramaic name — not yet in the glossary"
        style={UNKNOWN_STYLE}
      >
        {match[0]}
      </span>
    )
    last = match.index + match[0].length
  }
  if (last < text.length) result.push(text.slice(last))
  return result
}

export function renderWithTooltips(
  raw: string,
  tooltips: Record<string, string>,
  locale = 'en',
): React.ReactNode[] {
  const stopwords = LOCALE_STOPWORDS[locale] ?? new Set<string>()
  // text is pre-normalised by normalizeVerseText() at the data layer
  const parts = raw.split(NAME_PATTERN)
  const result: React.ReactNode[] = []

  parts.forEach((part, i) => {
    if (!part) return

    // Yahuah — the Father's Name in Paleo-Hebrew (𐤉𐤄𐤅𐤄) or HWHY variant
    if (part === PALEO || part === 'HWHY' || part === 'hWhY' || part === 'HWhY') {
      result.push(
        <span
          key={i}
          title={tooltips['HWHY'] ?? '\u{10909}\u{10904}\u{10905}\u{10904} Yahuah — "I AM that I AM" · The Self-Existing One'}
          className="paleo-hebrew"
          style={PALEO_STYLE}
        >
          {PALEO}
        </span>
      )
      return
    }

    // Yahusha — the Son's Name ({fWHY is a PDF font extraction artifact)
    if (part === '{fWHY' || part === '{vWHY' || part === '[vWHY' || part === '[VWHY' || part === '[vHWY') {
      result.push(
        <span
          key={i}
          title={'Yahusha — "Yahuah saves" · The Messiah, the Son who bears the Father’s Name'}
          style={YAHUSHA_STYLE}
        >
          Yahusha
        </span>
      )
      return
    }

    // Known tooltip entry — skip if this word is a locale stopword
    const tooltip = tooltips[part]
    if (tooltip && !stopwords.has(part.toLowerCase())) {
      result.push(
        <span key={i} title={tooltip} style={TERM_STYLE}>
          {part}
        </span>
      )
      return
    }

    // Plain text: convert Hebrew script chars to Paleo, then detect unknown diacritic names
    const converted = hebrewToPaleo(part)
    const subParts = splitByDiacritics(converted, i)
    result.push(...subParts)
  })

  return result.filter(Boolean) as React.ReactNode[]
}

type Tag = 'span' | 'p' | 'div' | 'blockquote' | 'li'

interface RichTextProps {
  text: string
  locale: string
  as?: Tag
  style?: React.CSSProperties
  className?: string
}

export default function RichText({
  text,
  locale,
  as: Tag = 'span',
  style,
  className,
}: RichTextProps) {
  const tooltips = getTooltips(locale)
  return (
    <Tag style={style} className={className}>
      {renderWithTooltips(text, tooltips, locale)}
    </Tag>
  )
}
