"use client";
import { useState } from 'react';
import { findRoute } from '../utils/routing';

export default function Home() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const res = findRoute(fromLocation, toLocation);
    setResult(res);
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

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
          <input 
            className="input-field" 
            type="text" 
            placeholder="e.g. Maharagama" 
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />
        </div>
        
        <div className="swap-wrapper">
          <button className="swap-btn" onClick={swapLocations} aria-label="Swap locations">
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
          <input 
            className="input-field" 
            type="text" 
            placeholder="e.g. Colombo Fort" 
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={handleSearch}>Find Route</button>

        {/* Results Section */}
        {result && (
          <div className="results-container">
            {result.error ? (
              <div className="error-msg">{result.error}</div>
            ) : (
              <div className="timeline">
                {result.routes[0].type === 'direct' ? (
                  <>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">Board at {result.routes[0].startStop}</div>
                        <div className="timeline-desc">
                          <span className="bus-badge">{result.routes[0].routeId}</span> 
                          Towards {result.routes[0].routeName.split(' - ')[1]} ({result.routes[0].estTime} mins)
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot end"></div>
                      <div className="timeline-content" style={{ border: '1px solid #2ed573' }}>
                        <div className="timeline-title">Arrive at {result.routes[0].endStop}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">Board at {result.routes[0].leg1.startStop}</div>
                        <div className="timeline-desc">
                          <span className="bus-badge">{result.routes[0].leg1.routeId}</span> 
                          Towards {result.routes[0].leg1.routeName.split(' - ')[1]} ({result.routes[0].leg1.time} mins)
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot transfer"></div>
                      <div className="timeline-content" style={{ borderColor: 'var(--accent-purple)' }}>
                        <div className="timeline-title">Transfer at {result.routes[0].transferStop}</div>
                        <div className="timeline-desc">
                          <span className="bus-badge">{result.routes[0].leg2.routeId}</span> 
                          Board bus towards {result.routes[0].leg2.routeName.split(' - ')[1]} ({result.routes[0].leg2.time} mins)
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot end"></div>
                      <div className="timeline-content" style={{ border: '1px solid #2ed573' }}>
                        <div className="timeline-title">Arrive at {result.routes[0].leg2.endStop}</div>
                        <div className="timeline-desc">Total Estimated Time: {result.routes[0].totalTime} mins</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {!result && (
        <div className="popular-section">
          <h2 className="section-title">Try these examples</h2>
          <div className="routes-grid">
            <div className="route-card" onClick={() => { setFromLocation('Maharagama'); setToLocation('Pettah'); }}>
              <span className="route-number">Direct</span>
              <span className="route-dest">Maharagama<br/>Pettah</span>
            </div>
            <div className="route-card" onClick={() => { setFromLocation('Maharagama'); setToLocation('Bambalapitiya'); }}>
              <span className="route-number">1-Stop</span>
              <span className="route-dest">Maharagama<br/>Bambalapitiya</span>
            </div>
            <div className="route-card" onClick={() => { setFromLocation('Angulana'); setToLocation('Kirulapone'); }}>
              <span className="route-number">1-Stop</span>
              <span className="route-dest">Angulana<br/>Kirulapone</span>
            </div>
            <div className="route-card" onClick={() => { setFromLocation('Panadura'); setToLocation('Pettah'); }}>
              <span className="route-number">Direct</span>
              <span className="route-dest">Panadura<br/>Pettah</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
