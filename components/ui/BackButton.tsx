import Link from 'next/link'

interface BackButtonProps {
  href: string
  label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--th-accent)',
        textDecoration: 'none',
        padding: '5px 12px 5px 9px',
        borderRadius: '999px',
        border: '1px solid var(--th-border)',
        background: 'var(--th-card)',
        letterSpacing: '0.02em',
        transition: 'border-color 0.15s',
        marginBottom: '1.25rem',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: '14px', lineHeight: 1 }}>‹</span>
      {label}
    </Link>
  )
}
