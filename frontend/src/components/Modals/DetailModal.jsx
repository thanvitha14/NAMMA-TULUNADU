import React, { useState, useEffect } from 'react';
import { X, MapPin, Star, ExternalLink, Heart, Navigation, Info, Compass, Sparkles } from 'lucide-react';

export default function DetailModal({ item, onClose, isFav, onToggleFav, onAskGemini }) {
  if (!item) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const images = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const mapQuery = item.mapQuery || item.name + ' Tulunadu Karnataka';
  const googleMapsUrl = item.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  const formatList = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) return val.join(' • ');
    return val;
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close modal (Esc)">
          <X size={20} />
        </button>

        {/* Hero Image Area */}
        <div className="modal-hero">
          <img
            src={images[activeImgIndex] || item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/Beaches/Malpe Beach.jpg';
            }}
          />
          <button
            onClick={() => onToggleFav(item.name)}
            className="card-fav-btn"
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              width: 44,
              height: 44,
              background: 'rgba(255,255,255,0.95)',
              boxShadow: 'var(--shadow-md)'
            }}
            title={isFav ? 'Remove Favorite' : 'Save Favorite'}
          >
            <Heart size={22} fill={isFav ? 'var(--coral)' : 'none'} color={isFav ? 'var(--coral)' : '#64748B'} />
          </button>
        </div>

        {/* Multi-Image Thumbnails Gallery */}
        {images.length > 1 && (
          <div className="modal-thumbnails">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActiveImgIndex(idx)}
                className={`modal-thumb ${activeImgIndex === idx ? 'active' : ''}`}
                style={{
                  border: activeImgIndex === idx ? '2px solid var(--primary)' : '2px solid transparent',
                  opacity: activeImgIndex === idx ? 1 : 0.65,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="modal-body">
          {/* Header Row */}
          <div className="modal-title-row">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className="section-badge" style={{ marginBottom: 0, fontSize: '0.72rem', padding: '4px 10px' }}>
                  {item.category ? item.category.toUpperCase() : 'COASTAL TULUNADU'}
                </span>
                {item.location && (
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={13} />
                    {item.location}
                  </span>
                )}
                {item.rating && (
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Star size={13} fill="var(--gold)" color="var(--gold)" />
                    {item.rating} ({item.reviews || 100}+ reviews)
                  </span>
                )}
                {item.price && (
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--foam)', padding: '2px 8px', borderRadius: 6 }}>
                    💰 {item.price}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.01em' }}>
                {item.name}
              </h2>
            </div>
          </div>

          {/* Full Narrative Description */}
          <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 20 }}>
            {item.fullDesc || item.shortDesc}
          </p>

          {/* Dynamic Information Grid */}
          <div className="modal-info-grid">
            {item.bestTime && (
              <div className="modal-info-item">
                <strong>🗓️ Best Time to Visit</strong>
                <span>{item.bestTime}</span>
              </div>
            )}
            {item.distance && (
              <div className="modal-info-item">
                <strong>📍 Distance &amp; Access</strong>
                <span>{item.distance}</span>
              </div>
            )}
            {item.timings && (
              <div className="modal-info-item">
                <strong>⏰ Darshan / Visiting Hours</strong>
                <span>{item.timings}</span>
              </div>
            )}
            {item.architecture && (
              <div className="modal-info-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏛️ Architectural Heritage</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{item.architecture}</span>
              </div>
            )}
            {item.history && (
              <div className="modal-info-item" style={{ gridColumn: '1 / -1' }}>
                <strong>📜 Historical Significance</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{item.history}</span>
              </div>
            )}
            {item.importance && (
              <div className="modal-info-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🌟 Cultural Importance</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{item.importance}</span>
              </div>
            )}
            {item.festivals && (
              <div className="modal-info-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎉 Major Annual Festivals</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{formatList(item.festivals)}</span>
              </div>
            )}
            {item.ingredients && (
              <div className="modal-info-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🥥 Key Ingredients</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{formatList(item.ingredients)}</span>
              </div>
            )}
            {item.origin && (
              <div className="modal-info-item">
                <strong>🍲 Culinary Origin</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{item.origin}</span>
              </div>
            )}
            {item.placesToTry && (
              <div className="modal-info-item">
                <strong>🍴 Popular Places to Try</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{formatList(item.placesToTry)}</span>
              </div>
            )}
            {item.photographyTips && (
              <div className="modal-info-item" style={{ gridColumn: '1 / -1' }}>
                <strong>📸 Photography Guidance</strong>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{item.photographyTips}</span>
              </div>
            )}
          </div>

          {/* Activities Badges */}
          {item.activities && item.activities.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em' }}>
                🏄 Recommended Activities &amp; Experiences:
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {item.activities.map((act, i) => (
                  <span
                    key={i}
                    style={{ padding: '6px 12px', borderRadius: 8, background: 'var(--foam)', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700 }}
                  >
                    ✨ {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Travel Tips Callout Box */}
          {item.travelTips && (
            <div style={{
              marginBottom: 20,
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 183, 3, 0.08)',
              border: '1px solid rgba(255, 183, 3, 0.3)',
              fontSize: '0.86rem',
              lineHeight: 1.6,
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10
            }}>
              <Info size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: 2 }}>Travel Tips &amp; Etiquette:</strong>
                <span>{item.travelTips}</span>
              </div>
            </div>
          )}

          {/* Nearby Attractions */}
          {item.nearbyAttractions && item.nearbyAttractions.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <strong style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em' }}>
                🗺️ Nearby Attractions to Explore:
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {item.nearbyAttractions.map((attraction, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(0, 119, 182, 0.06)',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--secondary)'
                    }}
                  >
                    📍 {attraction}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border-light)', flexWrap: 'wrap' }}>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass"
              style={{
                fontSize: '0.82rem',
                padding: '9px 18px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                color: 'var(--primary)',
                fontWeight: 700
              }}
            >
              <Navigation size={15} style={{ color: 'var(--primary)' }} />
              <span>Get Directions (Google Maps)</span>
              <ExternalLink size={12} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {onAskGemini && (
                <button
                  onClick={() => {
                    onAskGemini(`Tell me more about ${item.name} in Tulunadu, including its history, visiting tips, and nearby spots.`);
                    onClose();
                  }}
                  className="btn-glass"
                  style={{
                    fontSize: '0.82rem',
                    padding: '9px 18px',
                    borderColor: 'rgba(255, 183, 3, 0.6)',
                    background: 'rgba(255, 183, 3, 0.15)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <Sparkles size={14} style={{ color: 'var(--gold)' }} />
                  <span>Ask Gemini AI</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '9px 24px' }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
