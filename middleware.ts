import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/lib/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // e.g. /en/read — default locale has no prefix
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
