import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import Header from '@/components/layout/Header'
import RegisterSW from '@/components/layout/RegisterSW'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import './globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: { locale: Locale }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} data-theme="yashepheh">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c8a228" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Scriptures of Yahuah" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body style={{ minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <RegisterSW />
            <Header />
            <main style={{ maxWidth: '56rem', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
