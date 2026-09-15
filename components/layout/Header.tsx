'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { href: '/' as const,       label: t('home')   },
    { href: '/read' as const,   label: t('read')   },
    { href: '/search' as const, label: t('search') },
    { href: '/learn' as const,  label: t('learn')  },
    { href: '/about' as const,  label: t('about')  },
  ]

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header style={{ background: 'var(--th-header)', borderBottom: '1px solid var(--th-border)', position: 'sticky', top: 0, zIndex: 30, height: '60px' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', height: '60px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem' }}>

        {/* Logo — left */}
        <Link href="/" style={{ textDecoration: 'none', fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '18px', color: 'var(--th-logo)', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '10px', justifySelf: 'start' }}>
          <img src="/icon.svg" alt="" width={38} height={38} style={{ display: 'block', flexShrink: 0 }} />
          Scriptures of <span className="paleo-hebrew" style={{ fontSize: '22px', color: 'var(--th-gold)', letterSpacing: '0.1em' }}>𐤉𐤄𐤅𐤄</span>
        </Link>

        {/* Desktop nav — center */}
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: '15px',
                  textDecoration: 'none',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--th-accent)' : 'var(--th-nav)',
                  opacity: active ? 1 : 0.85,
                  textShadow: active ? '0 0 12px var(--th-accent)' : 'none',
                  borderBottom: active ? '2px solid var(--th-accent)' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.15s, text-shadow 0.15s',
                  whiteSpace: 'nowrap',
                }}
                className="nav-link"
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Controls — right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifySelf: 'end' }}>
          <div className="desktop-nav"><LanguageSwitcher /></div>
          <ThemeSwitcher />
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--th-nav)" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--th-nav)" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'var(--th-mobile-menu)', borderTop: '1px solid var(--th-border)', padding: '12px 1rem 16px' }}>
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 0',
                  fontSize: '16px',
                  textDecoration: 'none',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--th-accent)' : 'var(--th-nav)',
                  textShadow: active ? '0 0 10px var(--th-accent)' : 'none',
                  borderBottom: '1px solid var(--th-border)',
                }}
              >
                {l.label}
              </Link>
            )
          })}
          <div style={{ marginTop: '12px' }}><LanguageSwitcher /></div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        .nav-link:hover {
          color: var(--th-accent) !important;
          opacity: 1 !important;
        }
      `}</style>
    </header>
  )
}
