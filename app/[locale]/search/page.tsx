'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import type { SearchResult } from '@/types/scripture'

export default function SearchPage() {
  const t = useTranslations('search')
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    setError(null)
    setResults([])

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data, error: rpcError } = await supabase.rpc('search_scriptures', {
        query: query.trim(),
        locale,
        limit_count: 30,
      })
      if (rpcError) {
        setError(rpcError.message)
      } else {
        setResults((data as SearchResult[]) ?? [])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '40rem' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '1.5rem' }}>
        {t('title')}
      </h1>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          style={{
            flex: 1,
            borderRadius: '10px',
            border: '1px solid var(--th-border)',
            background: 'var(--th-card)',
            color: 'var(--th-text)',
            padding: '10px 16px',
            fontSize: '15px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            background: 'var(--th-accent)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          {loading ? t('loading') : t('button')}
        </button>
      </form>

      {error && (
        <div style={{ padding: '1rem', borderRadius: '8px', background: '#fee', border: '1px solid #fcc', marginBottom: '1rem', fontSize: '13px', color: '#900', fontFamily: 'monospace' }}>
          {error}
        </div>
      )}

      {results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {results.map((r) => (
            <li key={r.verse_id}>
              <Link
                href={`/${locale}/read/${r.book_slug}/${r.chapter_number}`}
                className="theme-card"
                style={{ display: 'block', padding: '1rem', textDecoration: 'none' }}
              >
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--th-gold)', marginBottom: '0.25rem' }}>
                  {r.book_name} {r.chapter_number}:{r.verse_number}
                </p>
                <p className="verse-text" style={{ margin: 0 }}>{r.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <p style={{ color: 'var(--th-muted)', textAlign: 'center', padding: '2rem 0' }}>
          {t('no_results')}
        </p>
      )}
    </div>
  )
}
