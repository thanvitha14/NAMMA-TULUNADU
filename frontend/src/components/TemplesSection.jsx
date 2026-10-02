import React from 'react';
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react';
import { TEMPLES_DATA } from '../data/destinationsData';

export default function TemplesSection({ onSelectTemple, favorites, onToggleFav }) {
  return (
    <section id="templesSection" className="section" style={{ background: 'rgba(0, 119, 182, 0.04)', borderRadius: 'var(--radius-xl)', padding: '4rem 1.5rem', marginBottom: '2rem' }}>
      <div className="section-header">
        <span className="section-badge">🛕 Ancient Pilgrimages</span>
        <h2 className="section-title">Sacred <span className="accent-text">Temple Shrines ({TEMPLES_DATA.length})</span></h2>
        <p className="section-desc">
          Explore centuries-old sanctuaries of deep spiritual energy, river island sanctums, 
          and exquisite coastal wooden architecture.
        </p>
      </div>

      <div className="cards-grid">
        {TEMPLES_DATA.map((temple) => {
          const isFav = favorites.includes(temple.name);
          return (
            <div
              key={temple.id}
              className="tourism-card"
              onClick={() => onSelectTemple(temple)}
            >
              <div className="card-img-container">
                <img
                src={temple.image}
                alt={temple.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/history/Sri Krishna Matha - Iconic Pilgrimage, Udupi.jpg';
                }}
              />
                <span className="card-badge-pill">🛕 HERITAGE SHRINE</span>
                <button
                  className={`card-fav-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(temple.name);
                  }}
                  title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart size={18} fill={isFav ? 'var(--coral)' : 'none'} color={isFav ? 'var(--coral)' : '#64748B'} />
                </button>
              </div>

              <div className="card-content">
                <div className="card-meta-row">
                  <span className="card-location">
                    <MapPin size={13} />
                    {temple.location}
                  </span>
                  <span className="card-rating">
                    <Star size={13} fill="var(--gold)" color="var(--gold)" />
                    {temple.rating} <small style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>({temple.reviews})</small>
                  </span>
                </div>

                <h3 className="card-title">{temple.name}</h3>
                <p className="card-summary">{temple.shortDesc}</p>

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
