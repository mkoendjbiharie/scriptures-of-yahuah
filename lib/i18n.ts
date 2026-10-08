// Locale constants — safe to import in middleware (Edge Runtime)
export const locales = ['en', 'nl'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
}
