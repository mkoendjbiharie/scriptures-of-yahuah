/**
 * Text utilities — data-layer helpers for verse text coming from the database.
 *
 * Why this exists:
 *   The Halleluyah Scriptures PDF extractor emits characters in NFD
 *   (decomposed Unicode), e.g. b + combining macron below instead of the
 *   precomposed ḇ (U+1E07).  Tooltip keys and search terms are stored NFC.
 *   Without normalisation the regex never matches and every name gets the
 *   "not yet in glossary" fallback tooltip.
 *
 *   Additionally, the PDF extractor produces various typographic apostrophe
 *   variants (U+2019 \u2019, U+02BC \u02BC, etc.) while tooltip keys
 *   consistently use plain ASCII apostrophe (U+0027).
 *
 * Rule: call normalizeVerseText() at the data layer (server components that
 * read from Supabase), NEVER inside rendering components like RichText.
 */

/** Typographic apostrophe variants produced by PDF extraction */
const APOS_RE = /[‘’ʹʼʻʾʿ]/g

/**
 * Normalise a raw verse string fetched from the database.
 * - NFC: decomposed (NFD) characters become precomposed so they match keys.
 * - Apostrophe: all apostrophe-like glyphs become plain ASCII ' (U+0027).
 */
export function normalizeVerseText(text: string): string {
  if (!text) return text
  return text.normalize('NFC').replace(APOS_RE, "'")
}
