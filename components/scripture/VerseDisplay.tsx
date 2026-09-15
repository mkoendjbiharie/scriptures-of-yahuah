import React from 'react'
import { getTooltips } from '@/lib/names/tooltips'
import { renderWithTooltips } from './RichText'

type Props = {
  verse: { id: number; verse_number: number; text: string }
  locale: string
}

export default function VerseDisplay({ verse, locale }: Props) {
  const tooltips = getTooltips(locale)
  const content = renderWithTooltips(verse.text, tooltips)

  if (verse.verse_number === 0) {
    return (
      <p style={{ fontStyle: 'italic', color: 'var(--th-muted)', fontSize: '13px', marginBottom: '0.5rem' }}>
        {content}
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <span
        style={{
          minWidth: '1.75rem',
          textAlign: 'right',
          fontWeight: 700,
          fontSize: '11px',
          color: 'var(--th-gold)',
          paddingTop: '3px',
          flexShrink: 0,
        }}
      >
        {verse.verse_number}
      </span>
      <p style={{ margin: 0, lineHeight: 1.7 }}>{content}</p>
    </div>
  )
}
