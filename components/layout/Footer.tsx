import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer style={{ borderTop: '1px solid var(--th-border)', marginTop: '4rem', padding: '2rem 1rem', textAlign: 'center', fontSize: '14px', color: 'var(--th-muted)' }}>
      <p>{t('tagline')}</p>
      <p style={{ marginTop: '0.25rem', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
        {t('verse')}
      </p>
    </footer>
  )
}
