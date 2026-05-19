const PageSpinner = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 9999,
    background: '#fff',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 16,
  }}>
    <div style={{
      width: 52, height: 52,
      border: '4px solid #f0f0f0',
      borderTop: '4px solid #980a07',
      borderRadius: '50%',
      animation: 'pw-spin 0.7s linear infinite',
    }} />
    <style>{`@keyframes pw-spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default PageSpinner;
