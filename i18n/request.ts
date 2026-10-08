import { getRequestConfig } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'
import { locales, defaultLocale } from '@/lib/i18n'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !(locales as readonly string[]).includes(locale)) {
    locale = defaultLocale
  }
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
