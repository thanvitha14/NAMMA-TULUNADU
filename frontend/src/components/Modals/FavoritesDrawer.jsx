import React from 'react';
import { X, Heart, Trash2 } from 'lucide-react';

export default function FavoritesDrawer({ isOpen, onClose, favorites, onRemoveFav, onSelectName }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, overflow: 'hidden' }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />

      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          maxWidth: 400,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid var(--border-light)',
          padding: 24,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Heart size={20} fill="var(--coral)" color="var(--coral)" />
            <h3 style={{ fontSize: '1.12rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>NAMMA TULUNADU Bucket List</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '40px 0', color: 'var(--text-muted)' }}>
              <Heart size={44} style={{ margin: '0 auto 12px auto', color: '#CBD5E1' }} />
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Your bucket list is empty</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 4 }}>
                Click the heart icon on any beach, temple, or food item to save it.
              </p>
            </div>
          ) : (
            favorites.map((name) => (
              <div
                key={name}
                style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 10,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span
                  onClick={() => {
                    onClose();
                    onSelectName(name);
                  }}
                  style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', cursor: 'pointer', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {name}
                </span>
                <button
                  onClick={() => onRemoveFav(name)}
                  style={{ color: 'var(--coral)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
