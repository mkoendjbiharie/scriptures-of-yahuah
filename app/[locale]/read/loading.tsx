export default function Loading() {
  return (
    <div style={{ maxWidth: '42rem' }}>
      <div style={{ height: '1.5rem', width: '8rem', background: 'var(--th-card)', borderRadius: '6px', marginBottom: '1.5rem', opacity: 0.5 }} />
      <div style={{ height: '2.5rem', width: '60%', background: 'var(--th-card)', borderRadius: '6px', marginBottom: '0.5rem', opacity: 0.5 }} />
      <div style={{ height: '1rem', width: '40%', background: 'var(--th-card)', borderRadius: '6px', marginBottom: '2rem', opacity: 0.3 }} />
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
          <div style={{ width: '2rem', height: '1rem', background: 'var(--th-card)', borderRadius: '4px', opacity: 0.3, flexShrink: 0, marginTop: '3px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: '1rem', background: 'var(--th-card)', borderRadius: '4px', opacity: 0.4, marginBottom: '6px' }} />
            <div style={{ height: '1rem', width: '80%', background: 'var(--th-card)', borderRadius: '4px', opacity: 0.3 }} />
          </div>
        </div>
      ))}
    </div>
  )
}
