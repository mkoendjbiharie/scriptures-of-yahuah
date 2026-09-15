import Link from 'next/link'

type Props = {
  bookSlug: string
  chapterNum: number
  totalChapters: number
  locale: string
}

export default function ChapterNav({ bookSlug, chapterNum, totalChapters, locale }: Props) {
  const prev = chapterNum > 1 ? chapterNum - 1 : null
  const next = chapterNum < totalChapters ? chapterNum + 1 : null

  const btnStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '10px',
    border: '1px solid var(--th-border)',
    background: 'var(--th-card)',
    color: 'var(--th-text)',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid var(--th-border)' }}>
      {prev ? (
        <Link href={`/${locale}/read/${bookSlug}/${prev}`} style={btnStyle}>← {prev}</Link>
      ) : <div />}

      <Link href={`/${locale}/read/${bookSlug}`} style={{ fontSize: '13px', color: 'var(--th-gold)', textDecoration: 'none' }}>
        ☰ All chapters
      </Link>

      {next ? (
        <Link href={`/${locale}/read/${bookSlug}/${next}`} style={btnStyle}>{next} →</Link>
      ) : <div />}
    </div>
  )
}
