/**
 * Original Name Restoration
 *
 * Maps corrupted/translated names back to their Hebrew originals.
 * Applied when rendering scripture text in the UI.
 */

export const NAME_MAP: Record<string, string> = {
  // The Name of the Most High
  LORD:       'YAHUAH',
  'LORD God': 'YAHUAH Elohim',
  GOD:        'Elohim',
  God:        'Elohim',

  // The Messiah
  Jesus:      'Yahusha',
  JESUS:      'YAHUSHA',
  Christ:     'Mashiach',
  CHRIST:     'MASHIACH',

  // Spirit
  'Holy Spirit': 'Ruach HaQodesh',
  'Holy Ghost':  'Ruach HaQodesh',

  // Common titles and names
  Moses:    'Mosheh',
  Elijah:   'EliYahu',
  Isaiah:   'YeshaYahu',
  Jeremiah: 'YirmeYahu',
  Joshua:   'Yahusha',
  John:     'Yahuchanan',
  James:    'Yaaqob',
  Matthew:  'MattithYahu',
  Mark:     'Marqus',
  Luke:     'Luqas',
  Paul:     'Shaul',
  Peter:    'Kepha',
  David:    'Dawid',
  Solomon:  'Shelomoh',
  Israel:   'Yisrael',
  Jerusalem: 'Yerushalayim',
  Judah:    'Yahudah',
  Jacob:    'Yaaqob',
  Abraham:  'Abraham',
  Isaac:    'Yitschaq',
}

/**
 * Replaces known corrupted names in a verse string with originals.
 * Uses word-boundary matching to avoid partial replacements.
 */
export function restoreNames(text: string): string {
  let result = text
  for (const [modern, original] of Object.entries(NAME_MAP)) {
    // Escape special regex chars in the key
    const escaped = modern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(`\\b${escaped}\\b`, 'g'), original)
  }
  return result
}

/**
 * Returns the original name for a given modern name, if known.
 */
export function getOriginalName(modern: string): string | undefined {
  return NAME_MAP[modern]
}
