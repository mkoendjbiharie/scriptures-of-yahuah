/**
 * Convert modern Hebrew script → Paleo / Ancient Hebrew (Phoenician Unicode block)
 * Strips nikud (vowel points) and maps each consonant to its ancient form.
 *
 * Phoenician Unicode U+10900–U+1091F is visually identical to Paleo-Hebrew
 * and renders with Noto Sans Phoenician.
 */

const CONSONANT_MAP: Record<string, string> = {
  'א': '𐤀', // Aleph
  'ב': '𐤁', // Beth
  'ג': '𐤂', // Gimel
  'ד': '𐤃', // Daleth
  'ה': '𐤄', // He
  'ו': '𐤅', // Waw
  'ז': '𐤆', // Zayin
  'ח': '𐤇', // Heth
  'ט': '𐤈', // Teth
  'י': '𐤉', // Yod
  'כ': '𐤊', // Kaph
  'ך': '𐤊', // Final Kaph
  'ל': '𐤋', // Lamedh
  'מ': '𐤌', // Mem
  'ם': '𐤌', // Final Mem
  'נ': '𐤍', // Nun
  'ן': '𐤍', // Final Nun
  'ס': '𐤎', // Samek
  'ע': '𐤏', // Ayin
  'פ': '𐤐', // Pe
  'ף': '𐤐', // Final Pe
  'צ': '𐤑', // Tsade
  'ץ': '𐤑', // Final Tsade
  'ק': '𐤒', // Qoph
  'ר': '𐤓', // Resh
  'ש': '𐤔', // Shin / Sin
  'ת': '𐤕', // Taw
}

// Unicode ranges for Hebrew vowel points and cantillation marks to strip
const NIKUD_REGEX = /[֑-ׇ]/g

export function hebrewToPaleo(text: string): string {
  return text
    .replace(NIKUD_REGEX, '')      // strip vowel points
    .split('')
    .map(ch => {
      if (ch === ' ') return ' '
      return CONSONANT_MAP[ch] ?? ch  // map Hebrew consonant; pass non-Hebrew chars through unchanged
    })
    .join('')
}
