import type { Metadata } from 'next'
import { createClient as createMetaClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; book: string; chapter: string }> }): Promise<Metadata> {
  const { locale, book: slug, chapter: chNum } = await params
  const supabase = await createMetaClient()
  const { data } = await supabase.from('books').select('name_original, name_en').eq('slug', slug).single()
  if (!data) return {}
  const name = data.name_original ?? data.name_en
  const title = `${name} ${chNum}`
  return {
    title,
    description: locale === 'nl'
      ? `Lees ${name} hoofdstuk ${chNum} in de Geschriften van Yahuah.`
      : `Read ${data.name_en} chapter ${chNum} in the Scriptures of Yahuah with restored Hebrew names.`,
  }
}

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { normalizeVerseText } from '@/lib/text-utils'
import VerseDisplay from '@/components/scripture/VerseDisplay'
import ChapterNav from '@/components/scripture/ChapterNav'
import { notFound } from 'next/navigation'
import { getBookNameNl } from '@/lib/book-names-nl'
import BackLink from '@/components/ui/BackLink'

type Props = {
  params: { book: string; chapter: string; locale: string }
}

export default async function ChapterPage({ params }: Props) {
  const { book: bookSlug, chapter, locale } = await params
  const chapterNum = parseInt(chapter)
  const supabase = await createClient()

  const { data: book } = await supabase
    .from('books')
    .select('*')
    .eq('slug', bookSlug)
    .single()

  if (!book) notFound()

  const { data: chapterRow } = await supabase
    .from('chapters')
    .select('id')
    .eq('book_id', book.id)
    .eq('number', chapterNum)
    .single()

  if (!chapterRow) notFound()

  const { data: verses } = await supabase
    .from('verses')
    .select('id, verse_number, text')
    .eq('chapter_id', chapterRow.id)
    .order('verse_number')

  const verseIds = (verses ?? []).map((v: any) => v.id)
  let translationMap = new Map<number, string>()
  if (locale !== 'en' && verseIds.length > 0) {
    const { data: tRows } = await supabase
      .from('translations')
      .select('verse_id, text')
      .eq('locale', locale)
      .in('verse_id', verseIds)
    ;(tRows ?? []).forEach((t: any) => translationMap.set(t.verse_id, t.text))
  }

  const resolvedVerses = (verses ?? []).map((v: any) => ({
    id: v.id,
    verse_number: v.verse_number,
    text: normalizeVerseText(translationMap.get(v.id) ?? v.text),
  }))

  return (
    <div style={{ maxWidth: '42rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <BackLink href={`/${locale}/read/${bookSlug}`} label={`← ${book.name_original}`} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: 700, color: 'var(--th-gold)' }}>
          {book.name_original} {chapterNum}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--th-muted)' }}>
          {locale === 'nl' ? getBookNameNl(bookSlug, book.name_en) : book.name_en} · {locale === 'nl' ? 'Hoofdstuk' : 'Chapter'} {chapterNum}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {resolvedVerses.length > 0 && resolvedVerses[0].verse_number > 1 && (
          <p style={{ fontSize: '12px', color: 'var(--th-muted)', fontStyle: 'italic', margin: '0 0 0.25rem' }}>
            {locale === 'nl'
              ? `[Vers${resolvedVerses[0].verse_number > 2 ? 'en 1–' + (resolvedVerses[0].verse_number - 1) : ' 1'} ontbreekt in de brondata van de Halleluyah Scriptures PDF]`
              : `[Verse${resolvedVerses[0].verse_number > 2 ? 's 1–' + (resolvedVerses[0].verse_number - 1) : ' 1'} missing from source data]`}
          </p>
        )}
        {resolvedVerses.map((verse: { id: number; verse_number: number; text: string }) => (
          <VerseDisplay key={verse.id} verse={verse} locale={locale} />
        ))}
      </div>

      <ChapterNav
        bookSlug={bookSlug}
        chapterNum={chapterNum}
        totalChapters={book.chapter_count}
        locale={locale}
      />
    </div>
  )
}
