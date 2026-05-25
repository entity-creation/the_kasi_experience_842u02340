export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0F1A',
        color: '#F0F0F0',
        fontFamily: 'Georgia, serif',
        textAlign: 'center',
        padding: '2rem',
        gap: '1rem',
      }}
    >
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.5em', opacity: 0.3, textTransform: 'uppercase' }}>
        The Kasi Experience
      </p>
      <h1 style={{ fontSize: '4rem', fontWeight: 100, opacity: 0.6, letterSpacing: '-0.02em' }}>
        404
      </h1>
      <p style={{ fontSize: '1rem', opacity: 0.4, maxWidth: 360, lineHeight: 1.8 }}>
        This experience could not be found. Check that the URL and experience ID are correct.
      </p>
      <p style={{ fontSize: '0.75rem', opacity: 0.2, marginTop: '2rem', fontFamily: 'monospace' }}>
        /experience/[theme]/[tier]?id=[id]
      </p>
    </div>
  );
}
