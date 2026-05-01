"use client";
import { useState, useMemo } from 'react';
import { findRoute } from '../utils/routing';
import dynamic from 'next/dynamic';
import AutocompleteInput from '../components/AutocompleteInput';
import { getNearestStop } from '../utils/geolocation';
import { translations } from '../data/translations';
import { busRoutes } from '../data/network';

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <div style={{height: '400px', width: '100%', background: 'var(--glass-bg)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', border: '1px solid var(--glass-border)'}}>Loading Map...</div>
});

export default function Home() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [result, setResult] = useState(null);
  const [lang, setLang] = useState('en');
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const t = translations[lang];

  const uniqueStops = useMemo(() => {
    const allStops = busRoutes.flatMap(r => r.stops);
    return [...new Set(allStops)].sort();
  }, []);

  const handleSearch = () => {
    const res = findRoute(fromLocation, toLocation);
    setResult(res);
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleGpsClick = async () => {
    setIsGpsLoading(true);
    try {
      const nearest = await getNearestStop();
      setFromLocation(nearest.stopName);
    } catch (err) {
      alert("Could not detect location. Please ensure location services are enabled.");
    } finally {
      setIsGpsLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="header-top">
        <select 
          className="lang-toggle" 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="si">සිංහල</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>

      <h1 className="hero-title">{t.heroTitle}</h1>
      <p className="hero-subtitle">{t.heroSubtitle}</p>

      <div className="search-card">
        <AutocompleteInput 
          label={t.leavingFrom}
          value={fromLocation}
          onChange={setFromLocation}
          placeholder="e.g. Maharagama"
          suggestions={uniqueStops}
          showGpsBtn={true}
          onGpsClick={handleGpsClick}
          isGpsLoading={isGpsLoading}
          t={t}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          }
        />
        
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

        <AutocompleteInput 
          label={t.goingTo}
          value={toLocation}
          onChange={setToLocation}
          placeholder="e.g. Colombo Fort"
          suggestions={uniqueStops}
          t={t}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          }
        />

        <button className="btn-primary" onClick={handleSearch}>{t.findRoute}</button>

        {/* Results Section */}
        {result && (
          <div className="results-container">
            {result.error ? (
              <div className="error-msg">{result.error}</div>
            ) : (
              <div className="routes-list">
                <h3 className="section-title" style={{textAlign: 'left', marginBottom: '1rem'}}>{t.found} {result.routes.length} {t.routeOptions}</h3>
                
                <MapComponent result={result} />

                <div style={{marginTop: '2rem'}}>
                  {result.routes.map((route, index) => (
                    <div key={index} className="route-option-card" style={{marginBottom: '2rem', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)'}}>
                    <h4 style={{marginBottom: '1rem', color: 'var(--accent-cyan)', display: 'flex', justifyContent: 'space-between'}}>
                      <span>{t.option} {index + 1} {route.type === 'direct' ? `(${t.direct})` : `(${t.oneStop})`} - {route.totalTime} {t.mins}</span>
                      <span style={{color: '#2ed573'}}>{t.estFare}: {route.estFare || route.totalFare} {t.lkr}</span>
                    </h4>
                    
                    <div className="timeline">
                      {route.type === 'direct' ? (
                        <>
                          <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <div className="timeline-title">{t.boardAt} {route.startStop}</div>
                              <div className="timeline-desc" style={{marginBottom: '0.5rem'}}>
                                <span className="bus-badge">{route.routeId}</span> 
                                {t.towards} {route.routeName.split(' - ')[1] || route.endStop} ({route.estTime} {t.mins})
                              </div>
                              <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
                                🕒 {t.firstBus}: {route.firstBus} | {t.lastBus}: {route.lastBus}
                              </div>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot end"></div>
                            <div className="timeline-content" style={{ border: '1px solid #2ed573' }}>
                              <div className="timeline-title">{t.arriveAt} {route.endStop}</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                              <div className="timeline-title">{t.boardAt} {route.leg1.startStop}</div>
                              <div className="timeline-desc" style={{marginBottom: '0.5rem'}}>
                                <span className="bus-badge">{route.leg1.routeId}</span> 
                                {t.towards} {route.leg1.routeName.split(' - ')[1] || route.leg1.endStop} ({route.leg1.time} {t.mins})
                              </div>
                              <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
                                🕒 {t.firstBus}: {route.leg1.firstBus} | {t.lastBus}: {route.leg1.lastBus}
                              </div>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot transfer"></div>
                            <div className="timeline-content" style={{ borderColor: 'var(--accent-purple)' }}>
                              <div className="timeline-title">{t.transferAt} {route.transferStop}</div>
                              <div className="timeline-desc" style={{marginBottom: '0.5rem'}}>
                                <span className="bus-badge">{route.leg2.routeId}</span> 
                                {t.boardBusTowards} {route.leg2.routeName.split(' - ')[1] || route.leg2.endStop} ({route.leg2.time} {t.mins})
                              </div>
                              <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
                                🕒 {t.firstBus}: {route.leg2.firstBus} | {t.lastBus}: {route.leg2.lastBus}
                              </div>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot end"></div>
                            <div className="timeline-content" style={{ border: '1px solid #2ed573' }}>
                              <div className="timeline-title">{t.arriveAt} {route.leg2.endStop}</div>
                              <div className="timeline-desc">{t.totalEstTime}: {route.totalTime} {t.mins}</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!result && (
        <div className="popular-section">
          <h2 className="section-title">{t.tryExamples}</h2>
          <div className="routes-grid">
            <div className="route-card" onClick={() => { setFromLocation('Maharagama'); setToLocation('Pettah'); }}>
              <span className="route-number">{t.direct}</span>
              <span className="route-dest">Maharagama<br/>Pettah</span>
            </div>
            <div className="route-card" onClick={() => { setFromLocation('Maharagama'); setToLocation('Bambalapitiya'); }}>
              <span className="route-number">{t.oneStop}</span>
              <span className="route-dest">Maharagama<br/>Bambalapitiya</span>
            </div>
            <div className="route-card" onClick={() => { setFromLocation('Angulana'); setToLocation('Kirulapone'); }}>
              <span className="route-number">{t.oneStop}</span>
              <span className="route-dest">Angulana<br/>Kirulapone</span>
            </div>
            <div className="route-card" onClick={() => { setFromLocation('Panadura'); setToLocation('Pettah'); }}>
              <span className="route-number">{t.direct}</span>
              <span className="route-dest">Panadura<br/>Pettah</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
