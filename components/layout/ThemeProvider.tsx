'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ThemeId } from '@/lib/themes'
import { DEFAULT_THEME } from '@/lib/themes'

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'yashepheh',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('scripture-theme') as ThemeId | null
    if (saved) setTheme(saved)
  }, [])

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('scripture-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
