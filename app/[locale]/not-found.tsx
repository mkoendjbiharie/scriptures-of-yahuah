import Link from 'next/link'
import BackLink from '@/components/ui/BackLink'
import { getLocale } from 'next-intl/server'

export default async function NotFound() {
  const locale = await getLocale()
  const isNl = locale === 'nl'
  return (
    <div style={{ maxWidth: '32rem', margin: '6rem auto', textAlign: 'center', padding: '2rem' }}>
      <div className="paleo-hebrew" style={{ fontSize: '3rem', color: 'var(--th-gold)', letterSpacing: '0.15em', marginBottom: '1rem' }}>𐤉𐤄𐤅𐤄</div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--th-gold)', marginBottom: '0.5rem' }}>
        {isNl ? 'Pagina niet gevonden' : 'Page not found'}
      </h1>
      <p style={{ color: 'var(--th-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {isNl
          ? 'De pagina die u zoekt bestaat niet of is verplaatst.'
          : 'The page you are looking for does not exist or has been moved.'}
      </p>
      <BackLink href={`/${locale}`} label={isNl ? '← Terug naar huis' : '← Return home'} />
    </div>
  )
}
