import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { TULUSIRI } from '../data/tulusiriEngine';

export default function TulusiriSection({ onToast }) {
  const [kannadaText, setKannadaText] = useState('ನಮಸ್ಕಾರ');
  const [tuluScript, setTuluScript] = useState('');
  const [romanPronunciation, setRomanPronunciation] = useState('');
  const [enableSpecial, setEnableSpecial] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!kannadaText.trim()) {
      setTuluScript('');
      setRomanPronunciation('');
      return;
    }
    const tulu = TULUSIRI.transliterate(kannadaText, enableSpecial);
    const roman = TULUSIRI.toRoman(kannadaText, enableSpecial);
    setTuluScript(tulu);
    setRomanPronunciation(roman);
  }, [kannadaText, enableSpecial]);

  const handleCopy = () => {
    if (!tuluScript) return;
    navigator.clipboard.writeText(tuluScript).then(() => {
      setCopied(true);
      if (onToast) onToast('Copied Tulu script to clipboard! 📋');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const samplePills = [
    'ನಮಸ್ಕಾರ', 'ತುಳುನಾಡ್*', 'ಬಲೆ ತುಳು ಕಲ್ಪುಗ', 'ಸೊಲ್ಮೆಲು', 'ಎನ್ನ ಪುದರ್'
  ];

  return (
    <section id="tulusiriSection" className="section">
      <div className="section-header">
        <span className="section-badge">🔤 Tulu Language &amp; Script Converter</span>
        <h2 className="section-title">Tulusiri – <span className="accent-text">Tulu Transliterator</span></h2>
        <p className="section-desc">
          Convert standard Kannada text into authentic ancient Tulu-Tigalari script in real-time. 
          Preserving the classical literary heritage of Tulunadu.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', backdropFilter: 'blur(14px)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
        {/* Sample Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap', paddingBottom: 14, borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Try Samples:</span>
          {samplePills.map((sample) => (
            <button
              key={sample}
              onClick={() => setKannadaText(sample)}
              style={{
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.76rem',
                fontWeight: 700,
                background: 'var(--foam)',
                color: 'var(--primary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer'
              }}
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={enableSpecial}
              onChange={(e) => setEnableSpecial(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <span>Enable special characters (Tulu phonetic marks with <code>*</code>)</span>
          </label>

          <button
            onClick={() => setKannadaText('')}
            style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--coral)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <RefreshCw size={13} />
            <span>Clear Text</span>
          </button>
        </div>

        {/* Input & Output Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Input Box */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(0,119,182,0.05)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700 }}>
              <span>ಕನ್ನಡ ಪಠ್ಯ (Kannada Text Input)</span>
              <span style={{ color: 'var(--text-muted)' }}>{kannadaText.length} chars</span>
            </div>
            <textarea
              rows={6}
              value={kannadaText}
              onChange={(e) => setKannadaText(e.target.value)}
              placeholder="ಇಲ್ಲಿ ಕನ್ನಡದಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ... (Type Kannada text, e.g. ನಮಸ್ಕಾರ, ತುಳುನಾಡ್*)"
              style={{ width: '100%', padding: 16, background: 'transparent', color: 'var(--text-main)', fontSize: '1.05rem', border: 'none', outline: 'none', resize: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              spellCheck="false"
            />
          </div>

          {/* Output Box */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(0,119,182,0.05)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700 }}>
              <span>ತುಳು ಲಿಪಿ (Tulu Script Output)</span>
              <button
                onClick={handleCopy}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: '#FFF', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy Script'}</span>
              </button>
            </div>
            <div
              style={{ fontFamily: "'BaravuTulu', 'Noto Sans Tulu-Tigalari', sans-serif", width: '100%', padding: 16, flex: 1, fontSize: '1.85rem', color: 'var(--primary)', minHeight: 150, lineHeight: 1.8, wordBreak: 'break-word', userSelect: 'text' }}
            >
              {tuluScript || (
                <span style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-light)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  ತುಳು ಲಿಪಿ ಇಲ್ಲೇ ಮೂಡಿ ಬರುವುದು... (Tulu script will appear here live)
                </span>
              )}
            </div>
            {romanPronunciation && (
              <div style={{ padding: '8px 16px', background: 'rgba(0,119,182,0.03)', borderTop: '1px solid var(--border-light)', fontSize: '0.76rem', color: 'var(--secondary)' }}>
                <strong>Pronunciation (IAST):</strong> <em>{romanPronunciation}</em>
              </div>
            )}
          </div>
        </div>

        {/* Note Banner */}
        <div style={{ marginTop: 20, padding: 14, borderRadius: 'var(--radius-md)', background: 'rgba(0,119,182,0.05)', border: '1px solid rgba(0,180,216,0.3)', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
          💡 <strong>Tip:</strong> When <em>Enable special characters</em> is active, type <code>*</code> immediately after 
          characters (e.g. <code>ು*</code> for Tulu half-u vowel / ತುಳು ಅರ್ಧ ಉಕಾರ, <code>ೆ*</code> for open-e, 
          and <code>್*</code> for pure consonant stop).
        </div>
      </div>
    </section>
  );
}
