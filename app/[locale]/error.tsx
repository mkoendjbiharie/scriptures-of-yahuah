'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ maxWidth: '32rem', margin: '6rem auto', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📜</div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem' }}>
        Something went wrong
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        An unexpected error occurred. Please try again.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={reset}
          style={{ color: 'var(--th-gold)', fontSize: '14px', cursor: 'pointer', border: '1px solid var(--th-gold)', padding: '8px 20px', borderRadius: '8px', background: 'transparent' }}
        >
          Try again
        </button>
        <Link href="/" style={{ color: 'var(--th-muted)', fontSize: '14px', textDecoration: 'none', border: '1px solid var(--th-border)', padding: '8px 20px', borderRadius: '8px', display: 'inline-block' }}>
          Return home
        </Link>
      </div>
    </div>
  )
}
