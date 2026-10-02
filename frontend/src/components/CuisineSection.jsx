import React, { useState } from 'react';
import { Star, Heart, ArrowRight, Utensils, MapPin } from 'lucide-react';
import { CUISINE_DATA } from '../data/destinationsData';

export default function CuisineSection({ onSelectDish, favorites, onToggleFav }) {
  const [activeTab, setActiveTab] = useState('all');

  const vegCount = CUISINE_DATA.filter((i) => i.category === 'veg').length;
  const nonvegCount = CUISINE_DATA.filter((i) => i.category === 'nonveg').length;
  const fishCount = CUISINE_DATA.filter((i) => i.category === 'fish').length;

  const filteredCuisine = CUISINE_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="cuisineSection" className="section">
      <div className="section-header">
        <span className="section-badge">🍤 Coastal Karnataka Gastronomy &amp; Marine Bounty</span>
        <h2 className="section-title">Authentic <span className="accent-text">Coastal Cuisine &amp; Marine Life</span></h2>
        <p className="section-desc">
          Explore all 34 traditional coastal dishes and 35 Arabian Sea marine catches. 
          From gossamer Neer Dosa and banana Buns to fiery Chicken Ghee Roast, Anjal Tawa Fry, and Malpe mackerel.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: `🌊 All Highlights (${CUISINE_DATA.length})` },
          { id: 'veg', label: `🥗 Pure Veg (${vegCount})` },
          { id: 'nonveg', label: `🍗 Coastal Non-Veg (${nonvegCount})` },
          { id: 'fish', label: `🐟 Marine Life (${fishCount})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-light)',
              background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === tab.id ? '#FFF' : 'var(--text-main)',
              boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {filteredCuisine.map((dish) => {
          const isFav = favorites.includes(dish.name);
          const badgeLabel = dish.category === 'veg'
            ? '🥗 PURE VEG'
            : dish.category === 'nonveg'
            ? '🍗 COASTAL NON-VEG'
            : '🐟 ARABIAN SEA FISH';

          return (
            <div
              key={dish.id}
              className="tourism-card"
              onClick={() => onSelectDish(dish)}
            >
              <div className="card-img-container">
                <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/Food/Non-Veg Food.jpg';
                }}
              />
                <span className="card-badge-pill">{badgeLabel}</span>
                <button
                  className={`card-fav-btn ${isFav ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(dish.name);
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
                    {dish.location || 'Coastal Karnataka'}
                  </span>
                  <span className="card-rating">
                    <Star size={13} fill="var(--gold)" color="var(--gold)" />
                    {dish.rating} <small style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>({dish.reviews})</small>
                  </span>
                </div>

                <h3 className="card-title">{dish.name}</h3>
                <p className="card-summary">{dish.shortDesc}</p>

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
