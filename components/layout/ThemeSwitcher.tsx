'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from './ThemeProvider'
import { themes, BREASTPLATE } from '@/lib/themes'
import type { ThemeId } from '@/lib/themes'
import { ThemeIcon } from '@/components/ui/ThemeIcons'

const GENERAL_IDS: ThemeId[] = ['parchment', 'gold', 'creation']

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const t = useTranslations('themes')

  const current = themes.find((x) => x.id === theme)

  function pick(id: ThemeId) { setTheme(id); setOpen(false) }

  return (
    <div style={{ position: 'relative' }}>
      {/* Trigger */}
      <button onClick={() => setOpen((o) => !o)} aria-label={t('button_label')}
        style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '4px 12px 4px 6px', borderRadius: '999px', border: '1px solid var(--th-accent)', background: 'transparent', color: 'var(--th-nav)', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
        <ThemeIcon themeId={theme} size={24} />
        <span style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {current ? t(current.id) : t('button_label')}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
          <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 50, background: 'var(--th-card)', border: '1px solid var(--th-border)', borderRadius: '14px', padding: '14px', width: '300px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>

            {/* General */}
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', margin: '0 0 8px 2px' }}>
              {t('group_general')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '14px' }}>
              {GENERAL_IDS.map((id) => <ThemeBtn key={id} id={id} active={theme === id} onPick={pick} t={t} />)}
            </div>

            <div style={{ height: '1px', background: 'var(--th-border)', marginBottom: '12px' }} />

            {/* Breastplate */}
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--th-muted)', margin: '0 0 6px 2px' }}>
              {t('group_breastplate')}
            </p>
            {[0, 1, 2, 3].map((row) => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '9px', color: 'var(--th-muted)', width: '14px', textAlign: 'right', flexShrink: 0 }}>{row + 1}</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', flex: 1 }}>
                  {BREASTPLATE.slice(row * 3, row * 3 + 3).map((id) => (
                    <ThemeBtn key={id} id={id} active={theme === id} onPick={pick} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ThemeBtn({ id, active, onPick, t }: { id: ThemeId; active: boolean; onPick: (id: ThemeId) => void; t: ReturnType<typeof useTranslations<'themes'>> }) {
  const stone = themes.find((x) => x.id === id)
  if (!stone) return null
  return (
    <button onClick={() => onPick(id)} title={`${stone.name}${stone.reference ? ' — ' + stone.reference : ''}`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 4px', borderRadius: '10px', border: active ? '1.5px solid var(--th-accent)' : '1.5px solid transparent', background: active ? 'var(--th-active-bg)' : 'transparent', cursor: 'pointer' }}>
      <ThemeIcon themeId={id} size={30} />
      <span style={{ fontSize: '10px', lineHeight: 1.2, textAlign: 'center', color: active ? 'var(--th-accent)' : 'var(--th-text)', fontWeight: active ? 600 : 400 }}>
        {stone.name}
      </span>
      <span style={{ fontSize: '9px', color: 'var(--th-muted)', lineHeight: 1, textAlign: 'center' }}>
        {t(id)}
      </span>
    </button>
  )
}
