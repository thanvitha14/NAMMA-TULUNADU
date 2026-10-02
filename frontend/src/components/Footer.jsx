import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--deep-ocean)', color: '#E2E8F0', paddingTop: 64, paddingBottom: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {/* Brand Col */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <img src="/logo.svg" alt="NAMMA TULUNADU" style={{ height: 48, width: 'auto' }} />
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '0.05em', color: '#FFF', fontFamily: "'Playfair Display', serif", textTransform: 'uppercase', margin: 0 }}>
              NAMMA <span style={{ color: 'var(--gold)' }}>TULUNADU</span>
            </h3>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: 440 }}>
            A modern tribute to Coastal Karnataka (Dakshina Kannada, Udupi &amp; Uttara Kannada). 
            Celebrating pristine Arabian Sea shores, sacred temple lore, vibrant living folk arts, 
            and authentic regional culinary heritage.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#FFF', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            Explore
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: '#94A3B8' }}>
            <li><button onClick={() => scrollTo('beachesSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Pristine Beaches</button></li>
            <li><button onClick={() => scrollTo('templesSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Sacred Temples</button></li>
            <li><button onClick={() => scrollTo('cuisineSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Coastal Cuisine</button></li>
            <li><button onClick={() => scrollTo('cultureSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Yakshagana &amp; Kambala</button></li>
          </ul>
        </div>

        {/* Plan Trip */}
        <div>
          <h4 style={{ color: '#FFF', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            Plan &amp; Learn
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: '#94A3B8' }}>
            <li><button onClick={() => scrollTo('trailsMapSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Interactive Trails Map</button></li>
            <li><button onClick={() => scrollTo('tripPlannerSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>3-Day Trip Planner</button></li>
            <li><button onClick={() => scrollTo('tulusiriSection')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Tulusiri Transliterator</button></li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '24px 24px 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748B', flexWrap: 'wrap', gap: 12 }}>
        <p>&copy; {new Date().getFullYear()} NAMMA TULUNADU Tourism Platform. All rights reserved.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          Crafted with <Heart size={12} style={{ color: 'var(--coral)', fill: 'var(--coral)' }} /> for Coastal Karnataka
        </p>
      </div>
    </footer>
  );
}
