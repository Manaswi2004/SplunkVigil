import React, { useState } from 'react';
import './App.css';

function App() {
  const [log, setLog] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeLog = async () => {
    setError('');
    setResult('');
    if (!log.trim()) {
      setError('Please paste some log data.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log })
      });
      if (!response.ok) {
        throw new Error('Server error.');
      }
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError('Error contacting server. Is backend running?');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <header style={{ width: '100%', background: '#1e293b', color: '#fff', padding: '18px 0', boxShadow: '0 2px 12px rgba(30,41,59,0.08)', textAlign: 'center', letterSpacing: 1 }}>
        <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: 2 }}>🛡️ Insider Threat Detection</span>
      </header>
      {/* Main Card */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
        <div style={{ maxWidth: 600, width: '100%', background: 'rgba(255,255,255,0.98)', borderRadius: 24, boxShadow: '0 12px 48px rgba(60,60,120,0.15)', padding: 48, margin: 32, border: '1.5px solid #e0e7ff', display: 'flex', flexDirection: 'column', gap: 28 }}>
          <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: 0, fontWeight: 900, fontSize: 32, letterSpacing: 1 }}>Paste Log Data</h2>
          <textarea
            id="logInput"
            value={log}
            onChange={e => setLog(e.target.value)}
            placeholder="Paste logs here..."
            style={{ width: '100%', height: 220, padding: 28, fontSize: 24, borderRadius: 18, border: error ? '2.5px solid #ef4444' : '2.5px solid #cbd5e1', marginBottom: 36, resize: 'vertical', background: '#f1f5f9', transition: 'border 0.2s', fontFamily: 'monospace', color: '#222', boxSizing: 'border-box', boxShadow: '0 4px 16px rgba(60,60,120,0.06)' }}
            aria-label="Log input"
            disabled={loading}
          />
          <button
            onClick={analyzeLog}
            style={{ width: '100%', padding: '24px 0', background: loading ? 'linear-gradient(90deg,#64748b 0%,#94a3b8 100%)' : 'linear-gradient(90deg,#6366f1 0%,#0ea5e9 100%)', color: 'white', border: 'none', fontSize: 28, borderRadius: 18, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 900, margin: '0 auto 0 auto', boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.10)', letterSpacing: 1, transition: 'background 0.2s, box-shadow 0.2s', display: 'block' }}
            disabled={loading}
            aria-busy={loading}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg,#4f46e5 0%,#0ea5e9 100%)'}
            onMouseOut={e => e.currentTarget.style.background = loading ? 'linear-gradient(90deg,#64748b 0%,#94a3b8 100%)' : 'linear-gradient(90deg,#6366f1 0%,#0ea5e9 100%)'}
          >
            {loading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <span className="spinner" style={{ width: 28, height: 28, border: '4px solid #fff', borderTop: '4px solid #6366f1', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                <span style={{ fontSize: 24 }}>Analyzing...</span>
              </span>
            ) : <span style={{ fontSize: 28 }}>Analyze</span>}
          </button>
          {error && (
            <div style={{ color: '#d32f2f', background: '#fff0f0', padding: 12, borderRadius: 7, borderLeft: '5px solid #d32f2f', fontWeight: 500, fontSize: 15, boxShadow: '0 1px 4px rgba(239,68,68,0.04)' }}>
              {error}
            </div>
          )}
          {result && (
            <div style={{ marginTop: 0, padding: 20, fontWeight: 600, background: 'linear-gradient(90deg,#f0fdf4 0%,#f1f5f9 100%)', borderLeft: result.includes('HIGH') ? '5px solid #ef4444' : result.includes('MEDIUM') ? '5px solid #f59e42' : '5px solid #22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.07)', borderRadius: 8, color: result.includes('HIGH') ? '#b91c1c' : result.includes('MEDIUM') ? '#b45309' : '#14532d', fontSize: 16, transition: 'background 0.2s' }}>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Result:</span>
              <div style={{ marginTop: 8, fontSize: 16, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{result}</div>
            </div>
          )}
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            textarea:focus {
              outline: 2px solid #6366f1;
              border-color: #6366f1;
              background: #fff;
            }
            button:active {
              box-shadow: 0 1px 2px rgba(99,102,241,0.12);
            }
          `}</style>
        </div>
      </main>
      {/* Footer */}
      <footer style={{ width: '100%', textAlign: 'center', padding: '12px 0', color: '#64748b', fontSize: 15, background: 'transparent', letterSpacing: 0.5 }}>
        &copy; {new Date().getFullYear()} Insider Threat Detection System &mdash; Powered by AI
      </footer>
    </div>
  );
}

export default App;
