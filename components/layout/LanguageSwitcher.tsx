'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/navigation'
import { locales, localeNames, type Locale } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value as Locale })
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      aria-label="Select language"
      style={{
        fontSize: '13px',
        border: '1px solid var(--th-accent)',
        borderRadius: '999px',
        padding: '4px 10px',
        background: 'transparent',
        color: 'var(--th-nav)',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
      }}
    >
      {locales.map((l) => (
        <option key={l} value={l} style={{ background: '#fff', color: '#000' }}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  )
}
