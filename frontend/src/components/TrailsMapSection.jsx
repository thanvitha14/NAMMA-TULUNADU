import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Filter } from 'lucide-react';
import L from 'leaflet';
import { TRAILS_DATA } from '../data/trailsData';

export default function TrailsMapSection() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [13.25, 74.75],
        zoom: 9,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      const filtered = TRAILS_DATA.markers.filter((m) => {
        if (filter === 'all') return true;
        return m.category === filter;
      });

      filtered.forEach((m) => {
        const iconColor = m.category === 'beach' ? '#0077B6' : m.category === 'temple' ? '#D97706' : '#059669';
        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="background:${iconColor}; width:32px; height:32px; border-radius:50%; border:3px solid #FFF; box-shadow:0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:#FFF; font-size:14px; font-weight:bold;">
                  ${m.category === 'beach' ? '🏖️' : m.category === 'temple' ? '🛕' : '🍤'}
                </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([m.lat, m.lng], { icon: customIcon });
        marker.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
            <strong style="font-size:14px; color:#0F172A; display:block; margin-bottom:4px;">${m.name}</strong>
            <p style="font-size:12px; color:#64748B; margin:0 0 6px 0;">${m.desc}</p>
            <span style="font-size:10px; font-weight:bold; text-transform:uppercase; color:${iconColor};">${m.category.toUpperCase()}</span>
          </div>
        `);
        marker.addTo(markersLayerRef.current);
      });
    }
  }, [filter]);

  return (
    <section id="trailsMapSection" className="section">
      <div className="section-header">
        <span className="section-badge">🗺️ Navigation &amp; Routing</span>
        <h2 className="section-title">Interactive <span className="accent-text">Coastal Trails</span></h2>
        <p className="section-desc">
          Explore curated routes along National Highway 66 linking beaches, sacred sanctuaries, 
          and coastal food spots from Mangaluru to Murudeshwara.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', backdropFilter: 'blur(14px)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow-md)' }}>
        {/* Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Filter Map Points:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Markers' },
              { id: 'beach', label: '🏖️ Beaches' },
              { id: 'temple', label: '🛕 Temples' },
              { id: 'food', label: '🍤 Food Spots' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: filter === btn.id ? 'none' : '1px solid var(--border-light)',
                  background: filter === btn.id ? 'var(--primary)' : 'var(--bg-main)',
                  color: filter === btn.id ? '#FFF' : 'var(--text-main)'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: 480, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', overflow: 'hidden' }}
        />

        <div style={{ marginTop: 14, fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Navigation size={14} style={{ color: 'var(--primary)' }} />
          <span>Click any marker pin on the map to inspect location details and travel coordinates.</span>
        </div>
      </div>
    </section>
  );
}
