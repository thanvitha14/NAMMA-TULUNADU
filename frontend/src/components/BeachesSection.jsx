import React from 'react';
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react';
import { BEACHES_DATA } from '../data/destinationsData';

export default function BeachesSection({ onSelectBeach, favorites, onToggleFav }) {
  return (
    <section id="beachesSection" className="section">
      <div className="section-header">
        <span className="section-badge">🏖️ Arabian Sea Coastline</span>
        <h2 className="section-title">Pristine <span className="accent-text">Coastal Beaches ({BEACHES_DATA.length})</span></h2>
        <p className="section-desc">
          From the silver sands and sea walkways of Malpe to the dramatic lighthouse cliffs of Kapu, 
          experience India’s most breathtaking coastal waters.
        </p>
      </div>

      <div className="cards-grid">
        {BEACHES_DATA.map((beach) => {
          const isFav = favorites.includes(beach.name);
          return (
            <div
              key={beach.id}
              className="tourism-card"
              onClick={() => onSelectBeach(beach)}
            >
              <div className="card-img-container">
                <img
                src={beach.image}
                alt={beach.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/Beaches/Malpe Beach.jpg';
                }}
              />
                <span className="card-badge-pill">🏖️ COASTAL HAVEN</span>
                <button
                  className={`card-fav-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(beach.name);
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
                    {beach.location}
                  </span>
                  <span className="card-rating">
                    <Star size={13} fill="var(--gold)" color="var(--gold)" />
                    {beach.rating} <small style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>({beach.reviews})</small>
                  </span>
                </div>

                <h3 className="card-title">{beach.name}</h3>
                <p className="card-summary">{beach.shortDesc}</p>

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
