import Link from 'next/link'

interface BackLinkProps {
  href: string
  label: string
}

/**
 * Pill-shaped back-navigation link with a visible border across all themes.
 * Usage: <BackLink href="/en/read" label="← Scriptures" />
 */
export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.3rem 0.85rem',
        borderRadius: '999px',
        border: '1px solid var(--th-border)',
        fontSize: '13px',
        color: 'var(--th-text)',
        textDecoration: 'none',
        background: 'transparent',
        marginBottom: '1rem',
      }}
    >
      {label}
    </Link>
  )
}
