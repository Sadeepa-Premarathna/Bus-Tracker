export default function Home() {
  return (
    <main className="container">
      <h1 className="title">Sri Lanka Bus Tracker</h1>
      <p className="subtitle">Plan your journey across the island</p>

      <div className="card">
        <div className="input-group">
          <label>From</label>
          <input type="text" placeholder="e.g. Maharagama" />
        </div>
        
        <button className="swap-btn" aria-label="Swap locations">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 8 16 13"></polyline>
            <line x1="21" y1="8" x2="9" y2="8"></line>
            <polyline points="8 21 3 16 8 11"></polyline>
            <line x1="3" y1="16" x2="15" y2="16"></line>
          </svg>
        </button>

        <div className="input-group" style={{ marginBottom: '2rem' }}>
          <label>To</label>
          <input type="text" placeholder="e.g. Colombo Fort" />
        </div>

        <button className="btn-primary">Find Route</button>
      </div>
    </main>
  );
}
