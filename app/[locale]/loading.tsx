export default function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div
          className="paleo-hebrew"
          style={{
            fontSize: '2.5rem',
            color: 'var(--th-gold)',
            letterSpacing: '0.15em',
            animation: 'pulse 1.8s ease-in-out infinite',
            opacity: 0.7,
          }}
        >
          𐤉𐤄𐤅𐤄
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }`}</style>
      </div>
    </div>
  )
}
