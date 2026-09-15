export type Book = {
  id: number
  slug: string          // e.g. "bereshit", "shemoth"
  name_en: string       // English name
  name_original: string // Hebrew/original name
  testament: 'old' | 'new' | 'extra'
  chapter_count: number
  order: number
}

export type Chapter = {
  id: number
  book_id: number
  number: number
}

export type Verse = {
  id: number
  chapter_id: number
  book_id: number
  verse_number: number
  text: string          // Text in the base language with names restored
}

export type Translation = {
  id: number
  verse_id: number
  locale: string        // e.g. "en", "nl", "es"
  text: string
}

export type SearchResult = {
  verse_id: number
  book_name: string
  book_slug: string
  chapter_number: number
  verse_number: number
  text: string
  rank: number
}
