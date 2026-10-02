import React from 'react';
import { Star, Sparkles, Heart, ArrowRight, Calendar } from 'lucide-react';
import { CULTURE_DATA } from '../data/destinationsData';

export default function CultureSection({ onSelectCulture, favorites, onToggleFav }) {
  return (
    <section id="cultureSection" className="section" style={{ background: 'rgba(0, 119, 182, 0.04)', borderRadius: 'var(--radius-xl)', padding: '4rem 1.5rem', marginBottom: '2rem' }}>
      <div className="section-header">
        <span className="section-badge">🎭 Living Traditions &amp; Folklore</span>
        <h2 className="section-title">Heritage &amp; <span className="accent-text">Folk Arts ({CULTURE_DATA.length})</span></h2>
        <p className="section-desc">
          Witness the vibrant soul of Tulunadu through thunderous Chande drums, dramatic Yakshagana, 
          sacred Bhoota Kola, and the agrarian adrenaline of Kambala.
        </p>
      </div>

      <div className="cards-grid">
        {CULTURE_DATA.map((item) => {
          const isFav = favorites.includes(item.name);
          return (
            <div
              key={item.id}
              className="tourism-card"
              onClick={() => onSelectCulture(item)}
            >
              <div className="card-img-container">
                <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/Culture/Yakshagana.jpg';
                }}
              />
                <span className="card-badge-pill">🎭 LIVING TRADITION</span>
                <button
                  className={`card-fav-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(item.name);
                  }}
                  title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart size={18} fill={isFav ? 'var(--coral)' : 'none'} color={isFav ? 'var(--coral)' : '#64748B'} />
                </button>
              </div>

              <div className="card-content">
                <div className="card-meta-row">
                  <span className="card-location">
                    <Sparkles size={13} />
                    {item.location || 'Coastal Karnataka'}
                  </span>
                  <span className="card-rating">
                    <Star size={13} fill="var(--gold)" color="var(--gold)" />
                    {item.rating} <small style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>({item.reviews})</small>
                  </span>
                </div>

                <h3 className="card-title">{item.name}</h3>
                <p className="card-summary">{item.shortDesc}</p>

                {item.seasonalTiming && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    background: 'var(--foam)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    marginBottom: 14
                  }}>
                    <span>{item.seasonalTiming}</span>
                  </div>
                )}

                <div className="card-action-bar">
                  <button className="card-action-btn">
                    <span>📷 View Photo &amp; Details</span>
                    <ArrowRight size={14} />
                  </button>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-light)' }}>#Tulunadu</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
