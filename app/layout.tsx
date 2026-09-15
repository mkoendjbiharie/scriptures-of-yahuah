import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Scriptures of Yahuah',
    template: '%s | Scriptures of Yahuah',
  },
  description: 'Read, search, and understand the Scriptures with original restored names.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Scriptures',
  },
}

export const viewport: Viewport = {
  themeColor: '#b8860b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
