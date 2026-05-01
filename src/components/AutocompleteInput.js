import { useState, useRef, useEffect } from 'react';

export default function AutocompleteInput({ 
  label, 
  value, 
  onChange, 
  icon, 
  placeholder, 
  suggestions, 
  showGpsBtn, 
  onGpsClick,
  isGpsLoading,
  t
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Filter suggestions based on input
    if (value && showDropdown) {
      const match = suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setFiltered(match);
    } else {
      setFiltered(suggestions);
    }
  }, [value, suggestions, showDropdown]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setShowDropdown(false);
  };

  return (
    <div className="input-group" ref={wrapperRef} style={{ marginBottom: '1.5rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label className="input-label" style={{ marginBottom: 0 }}>{label}</label>
        {showGpsBtn && (
          <button 
            className="gps-btn" 
            onClick={(e) => { e.preventDefault(); onGpsClick(); }}
            disabled={isGpsLoading}
          >
            📍 {isGpsLoading ? '...' : t.useLocation}
          </button>
        )}
      </div>
      
      <div style={{ position: 'relative' }}>
        <span className="input-icon" style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--accent-cyan)' }}>
          {icon}
        </span>
        <input 
          className="input-field" 
          type="text" 
          placeholder={placeholder} 
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          style={{ 
            width: '100%', 
            background: 'var(--input-bg)', 
            border: '1px solid var(--input-border)', 
            borderRadius: '12px', 
            padding: '1.2rem 1.2rem 1.2rem 3rem', 
            color: 'var(--text-primary)', 
            fontSize: '1.1rem',
            outline: 'none'
          }}
        />
      </div>

      {showDropdown && filtered.length > 0 && (
        <ul className="dropdown-list">
          {filtered.map((item, i) => (
            <li 
              key={i} 
              className="dropdown-item" 
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
