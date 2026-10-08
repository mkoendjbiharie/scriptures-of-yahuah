'use client'
import React, { useState, useEffect, useRef } from 'react'

interface Props {
  text: string
  tooltip: string
  style?: React.CSSProperties
  className?: string
}

export default function NameTooltip({ text, tooltip, style, className }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // Close when tapping outside
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

  return (
    <span
      ref={ref}
      style={{ position: 'relative', display: 'inline', ...style }}
      className={className}
    >
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onTouchStart={(e) => { e.preventDefault(); setOpen((o) => !o) }}
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: 'help', userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {text}
      </span>
      {open && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--th-card, #1a1710)',
          color: 'var(--th-text, #e8d9a0)',
          border: '1px solid var(--th-border, #4a3f1a)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '13px',
          lineHeight: 1.5,
          minWidth: '180px',
          maxWidth: '260px',
          whiteSpace: 'normal',
          zIndex: 999,
          pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}>
          {tooltip}
          {/* caret */}
          <span style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid var(--th-border, #4a3f1a)',
          }} />
        </span>
      )}
    </span>
  )
}
