export default function Home() {
  return (
    <main className="container">
      <h1 className="hero-title">Track Any Bus.</h1>
      <p className="hero-subtitle">Smart trip planning for Sri Lankan commuters</p>

      <div className="search-card">
        <div className="input-group">
          <label className="input-label">Leaving From</label>
          <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <input className="input-field" type="text" placeholder="e.g. Maharagama" />
        </div>
        
        <div className="swap-wrapper">
          <button className="swap-btn" aria-label="Swap locations">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 8 16 13"></polyline>
              <line x1="21" y1="8" x2="9" y2="8"></line>
              <polyline points="8 21 3 16 8 11"></polyline>
              <line x1="3" y1="16" x2="15" y2="16"></line>
            </svg>
          </button>
        </div>

        <div className="input-group" style={{ marginBottom: '1rem' }}>
          <label className="input-label">Going To</label>
          <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <input className="input-field" type="text" placeholder="e.g. Colombo Fort" />
        </div>

        <button className="btn-primary">Find Route</button>
      </div>

      <div className="popular-section">
        <h2 className="section-title">Popular Routes</h2>
        <div className="routes-grid">
          <div className="route-card">
            <span className="route-number">138</span>
            <span className="route-dest">Maharagama<br/>Pettah</span>
          </div>
          <div className="route-card">
            <span className="route-number">120</span>
            <span className="route-dest">Kesbewa<br/>Pettah</span>
          </div>
          <div className="route-card">
            <span className="route-number">17</span>
            <span className="route-dest">Panadura<br/>Kandy</span>
          </div>
          <div className="route-card">
            <span className="route-number">EX</span>
            <span className="route-dest">Highway<br/>Express</span>
          </div>
        </div>
      </div>
    </main>
  );
}
