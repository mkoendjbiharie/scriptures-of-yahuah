import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Book } from '@/types/scripture'
import { BOOK_META } from '@/lib/book-meta'
import { BOOK_META_NL } from '@/lib/book-meta-nl'
import { getBookNameNl } from '@/lib/book-names-nl'

async function getBooks(): Promise<Book[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data, error } = await supabase.from('books').select('*').order('order')
    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

type Props = {
  params: { locale: string }
}

export default async function BooksPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('read')
  const books = await getBooks()
  const oldTestament = books.filter((b) => b.testament === 'old')
  const newTestament = books.filter((b) => b.testament === 'new')
  const extraBooks   = books.filter((b) => b.testament === 'extra')
  const hasBooks = books.length > 0

  return (
    <div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.75rem' }}>
        {t('title')}
      </h1>

      {!hasBooks && (
        <div className="theme-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📜</p>
          <p style={{ color: 'var(--th-muted)', marginBottom: '0.5rem' }}>
            Unable to load the scriptures.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--th-muted)' }}>
            The database may be temporarily unavailable. Please refresh the page or try again shortly.
          </p>
        </div>
      )}

      {hasBooks && (
        <>
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', marginBottom: '1rem' }}>
              {t('old_covenant')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {oldTestament.map((book) => (
                <BookCard key={book.id} book={book} locale={locale} chaptersLabel={t('chapters', { count: book.chapter_count })} />
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', marginBottom: '1rem' }}>
              {t('new_covenant')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {newTestament.map((book) => (
                <BookCard key={book.id} book={book} locale={locale} chaptersLabel={t('chapters', { count: book.chapter_count })} />
              ))}
            </div>
          </section>

          {extraBooks.length > 0 && (
            <section style={{ marginTop: '2.5rem' }}>
              <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', marginBottom: '0.25rem' }}>
                {t('extra_books')}
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--th-muted)', marginBottom: '1rem' }}>
                {t('extra_books_note')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {extraBooks.map((book) => (
                  <BookCard key={book.id} book={book} locale={locale} chaptersLabel={t('chapters', { count: book.chapter_count })} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

function BookCard({ book, locale, chaptersLabel }: { book: Book; locale: string; chaptersLabel: string }) {
  const meta = BOOK_META[book.slug]
  const metaNl = BOOK_META_NL[book.slug]
  const localeName = locale === 'nl' ? getBookNameNl(book.slug, book.name_en) : book.name_en
  const meaning = locale === 'nl' ? (metaNl?.meaning ?? meta?.meaning) : meta?.meaning
  const summary = locale === 'nl' ? (metaNl?.summary ?? meta?.summary) : meta?.summary
  return (
    <Link
      href={`/${locale}/read/${book.slug}`}
      className="theme-card"
      style={{ display: 'block', padding: '1rem', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--th-gold)', marginBottom: '2px' }}>
        {book.name_original}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--th-muted)', marginBottom: '6px' }}>
        {localeName} &middot; {chaptersLabel}
      </div>
      {meaning && (
        <div style={{ fontSize: '12px', color: 'var(--th-accent)', fontStyle: 'italic', marginBottom: '6px' }}>
          {meaning}
        </div>
      )}
      {summary && (
        <p style={{ fontSize: '12px', color: 'var(--th-text)', lineHeight: 1.5, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {summary}
        </p>
      )}
    </Link>
  )
}
