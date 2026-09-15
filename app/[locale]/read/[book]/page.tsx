import type { Metadata } from 'next'
import { createClient as createMetaClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; book: string }> }): Promise<Metadata> {
  const { locale, book: slug } = await params
  const supabase = await createMetaClient()
  const { data } = await supabase.from('books').select('name_original, name_en').eq('slug', slug).single()
  if (!data) return {}
  const name = data.name_original ?? data.name_en
  return {
    title: name,
    description: locale === 'nl'
      ? `Lees het boek ${name} in de Geschriften van Yahuah met herstelde namen.`
      : `Read the book of ${data.name_en} in the Scriptures of Yahuah with restored names.`,
  }
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { BOOK_META } from '@/lib/book-meta'
import { BOOK_META_NL } from '@/lib/book-meta-nl'
import { getBookNameNl } from '@/lib/book-names-nl'
import BackLink from '@/components/ui/BackLink'

type Props = {
  params: { book: string; locale: string }
}

export default async function BookPage({ params }: Props) {
  const { book: bookSlug, locale } = await params
  const t = await getTranslations('read')

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data: book } = await supabase
    .from('books')
    .select('*')
    .eq('slug', bookSlug)
    .single()

  if (!book) notFound()

  const { data: chapters } = await supabase
    .from('chapters')
    .select('id, number')
    .eq('book_id', book.id)
    .order('number')

  const meta = BOOK_META[bookSlug]
  const metaNl = BOOK_META_NL[bookSlug]
  const isNl = locale === 'nl'
  const chapterList = chapters ?? []

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <BackLink href={`/${locale}/read`} label={`← ${t('title')}`} />

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '4px' }}>
          {book.name_original}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--th-muted)', marginBottom: '1rem' }}>
          {isNl ? getBookNameNl(bookSlug, book.name_en) : book.name_en}
        </p>

        {meta && (
          <div className="theme-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--th-accent)', marginBottom: '6px' }}>
              {isNl ? (metaNl?.meaning ?? meta.meaning) : meta.meaning}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--th-text)', lineHeight: 1.6, marginBottom: '8px' }}>
              {isNl ? (metaNl?.summary ?? meta.summary) : meta.summary}
            </p>
            <div style={{ fontSize: '12px', color: 'var(--th-muted)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span>✍ {meta.author}</span>
              <span>🕰 {meta.period}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
              {(isNl ? (metaNl?.themes ?? meta.themes) : meta.themes).map((theme) => (
                <span
                  key={theme}
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'var(--th-accent)',
                    color: '#fff',
                    opacity: 0.85,
                  }}
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', marginBottom: '1rem' }}>
        {t('chapters', { count: chapterList.length })}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem' }}>
        {chapterList.map((ch: { id: number; number: number }) => (
          <Link
            key={ch.id}
            href={`/${locale}/read/${bookSlug}/${ch.number}`}
            className="theme-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--th-text)',
            }}
          >
            {ch.number}
          </Link>
        ))}
      </div>
    </div>
  )
}
