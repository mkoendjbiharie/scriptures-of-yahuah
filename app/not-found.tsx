import Link from 'next/link'

export default function NotFound() {
  return (
    <html>
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1408', fontFamily: 'Georgia, serif' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="paleo-hebrew" style={{ fontSize: '3rem', color: '#b8860b', letterSpacing: '0.15em', marginBottom: '1rem' }}>𐤉𐤄𐤅𐤄</div>
          <h1 style={{ color: '#b8860b', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Page not found</h1>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '1.5rem' }}>The scroll you are looking for does not exist.</p>
          <Link href="/" style={{ color: '#b8860b', fontSize: '14px', textDecoration: 'none', border: '1px solid #b8860b', padding: '8px 20px', borderRadius: '8px' }}>
            Return home →
          </Link>
        </div>
      </body>
    </html>
  )
}
