import React from 'react';
import { Compass, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { STATS_DATA } from '../data/destinationsData';

export default function Hero({ onOpenGemini }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="heroSection" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: 100,
      paddingBottom: 60
    }}>
      {/* Background Beach Video */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/beach.mp4" type="video/mp4" />
        </video>
        {/* Coastal Gradient Glass Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(3,20,36,0.6), rgba(0,119,182,0.35), var(--bg-main))',
          backdropFilter: 'blur(2px)'
        }} />
      </div>

      {/* Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 960,
        margin: '0 auto',
        padding: '0 24px',
        textAlign: 'center',
        color: '#FFF'
      }}>
        {/* Brand Logo Emblem */}
        <div style={{ marginBottom: 16, display: 'inline-block' }}>
          <img
            src="/logo.svg"
            alt="Namma Tulunadu Emblem"
            style={{
              height: 'clamp(64px, 10vw, 90px)',
              width: 'auto',
              filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5))',
              transition: 'transform 0.3s ease'
            }}
          />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 18px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 18
        }}>
          <Sparkles size={16} style={{ color: 'var(--gold)' }} />
          <span>🌊 Arabian Sea • Coastal Karnataka • Tulunadu</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.6rem, 6vw, 4.6rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: 18,
          color: '#FFF',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          fontFamily: "'Playfair Display', serif"
        }}>
          NAMMA <span style={{ color: 'var(--gold)' }}>TULUNADU</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#F1F5F9',
          maxWidth: 720,
          margin: '0 auto 32px auto',
          fontWeight: 500,
          lineHeight: 1.65,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Where the azure Arabian Sea kisses ancient coastal temples, golden pristine sands, 
          legendary seafood delicacies, and 800-year-old living cultural epics.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 44 }}>
          <button
            onClick={() => scrollTo('beachesSection')}
            className="btn-primary"
            style={{ fontSize: '0.96rem', padding: '14px 26px', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span>Explore Destinations</span>
            <span>&rarr;</span>
          </button>

          <button
            onClick={onOpenGemini}
            className="btn-glass"
            style={{
              fontSize: '0.96rem',
              padding: '14px 24px',
              color: '#FFF',
              borderColor: 'rgba(255,183,3,0.6)',
              background: 'rgba(255, 183, 3, 0.22)',
              backdropFilter: 'blur(12px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 0 20px rgba(255, 183, 3, 0.3)'
            }}
          >
            <Sparkles size={18} style={{ color: 'var(--gold)' }} />
            <span>✨ Ask Gemini AI Copilot</span>
          </button>

          <button
            onClick={() => scrollTo('trailsMapSection')}
            className="btn-glass"
            style={{ fontSize: '0.96rem', padding: '14px 24px', color: '#FFF', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <MapPin size={18} style={{ color: 'var(--accent)' }} />
            <span>🗺️ Coastal Trails Map &rarr;</span>
          </button>
        </div>

        {/* Interactive Stats Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12,
          maxWidth: 820,
          margin: '0 auto'
        }}>
          {[
            { icon: '🏖️', count: STATS_DATA.beachesCount, label: 'Pristine Beaches', id: 'beachesSection' },
            { icon: '🛕', count: STATS_DATA.templesCount, label: 'Sacred Temples', id: 'templesSection' },
            { icon: '🍤', count: STATS_DATA.foodsCount, label: 'Traditional Foods', id: 'cuisineSection' },
            { icon: '🐟', count: STATS_DATA.marineCount, label: 'Marine Species', id: 'cuisineSection' },
            { icon: '🎭', count: STATS_DATA.cultureCount, label: 'Living Traditions', id: 'cultureSection' }
          ].map((stat, i) => (
            <div
              key={i}
              onClick={() => scrollTo(stat.id)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '1.4rem', marginBottom: 2 }}>{stat.icon}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold)' }}>{stat.count}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
