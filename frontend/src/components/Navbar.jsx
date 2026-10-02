import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Heart, Menu, X, Sparkles, User, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, favCount, openFavDrawer, onOpenGemini, onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('heroSection');
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const navLinks = [
    { label: 'Home', href: '#heroSection', id: 'heroSection' },
    { label: 'Beaches', href: '#beachesSection', id: 'beachesSection' },
    { label: 'Temples', href: '#templesSection', id: 'templesSection' },
    { label: 'Cuisine', href: '#cuisineSection', id: 'cuisineSection' },
    { label: 'Culture', href: '#cultureSection', id: 'cultureSection' },
    { label: 'Trails Map', href: '#trailsMapSection', id: 'trailsMapSection' },
    { label: 'Trip Planner', href: '#tripPlannerSection', id: 'tripPlannerSection' },
    { label: '🔤 Tulusiri', href: '#tulusiriSection', id: 'tulusiriSection' }
  ];

  // Scroll listener for sticky glass header and active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    setIsMuted(prev => {
      const next = !prev;
      try {
        if (!next) {
          if (!audioRef.current) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = ctx.sampleRate * 2;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.06;
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(320, ctx.currentTime);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.25, ctx.currentTime);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
            audioRef.current = { ctx, gain, noise };
          } else {
            audioRef.current.ctx.resume();
          }
        } else if (audioRef.current) {
          audioRef.current.ctx.suspend();
        }
      } catch (err) {
        console.log('Ambient audio:', err);
      }
      return next;
    });
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'var(--bg-glass)' : 'rgba(3, 20, 36, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid var(--border-light)' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        padding: isScrolled ? '8px 24px' : '14px 24px'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('heroSection');
            }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logo.svg"
              alt="NAMMA TULUNADU"
              style={{ height: 44, width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.id)}
                  style={{
                    background: isActive ? 'var(--foam)' : 'transparent',
                    border: 'none',
                    padding: '6px 11px',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? 'var(--primary)' : isScrolled ? 'var(--text-main)' : '#FFF',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(0, 119, 182, 0.15)' : 'none'
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Action Controls & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Audio Toggle (Mute/Unmute) */}
            <button
              onClick={toggleAudio}
              style={{
                padding: '7px 9px',
                borderRadius: 'var(--radius-md)',
                background: isScrolled ? 'var(--bg-card)' : 'rgba(255,255,255,0.18)',
                border: '1px solid var(--border-light)',
                color: isMuted ? 'var(--text-muted)' : 'var(--primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)'
              }}
              title={isMuted ? 'Unmute Ambient Waves' : 'Mute Ambient Waves'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} style={{ color: 'var(--primary)' }} />}
            </button>

            {/* Favorites Trigger */}
            <button
              onClick={openFavDrawer}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 11px',
                borderRadius: 'var(--radius-md)',
                background: isScrolled ? 'var(--bg-card)' : 'rgba(255,255,255,0.18)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.82rem',
                color: 'var(--coral)',
                backdropFilter: 'blur(8px)'
              }}
              title="Saved Coastal Bucket List"
            >
              <Heart size={16} fill="var(--coral)" />
              <span style={{
                background: 'var(--coral)',
                color: '#FFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 12
              }}>
                {favCount}
              </span>
            </button>

            {/* Login / Profile Trigger */}
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                background: isScrolled ? 'var(--bg-card)' : 'rgba(255,255,255,0.18)',
                border: '1px solid var(--border-light)',
                color: isScrolled ? 'var(--text-main)' : '#FFF',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 700,
                backdropFilter: 'blur(8px)'
              }}
              title="Traveler Account Login"
            >
              <User size={15} />
              <span>Login</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                padding: '7px 9px',
                borderRadius: 'var(--radius-md)',
                background: isScrolled ? 'var(--bg-card)' : 'rgba(255,255,255,0.18)',
                border: '1px solid var(--border-light)',
                color: isScrolled ? 'var(--text-main)' : '#FFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} style={{ color: 'var(--gold)' }} /> : <Moon size={16} />}
            </button>

            {/* Gemini AI Copilot Trigger */}
            <button
              onClick={onOpenGemini}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 13px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #0077B6, #00B4D8)',
                border: 'none',
                color: '#FFF',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 800,
                boxShadow: '0 2px 10px rgba(0, 180, 216, 0.4)'
              }}
              title="Open Gemini AI Coastal Copilot"
            >
              <Sparkles size={14} style={{ color: 'var(--gold)' }} />
              <span>✨ Gemini AI</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              style={{
                padding: 7,
                borderRadius: 'var(--radius-md)',
                background: isScrolled ? 'var(--bg-card)' : 'rgba(255,255,255,0.18)',
                border: '1px solid var(--border-light)',
                color: isScrolled ? 'var(--text-main)' : '#FFF',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          animation: 'fadeIn 0.2s ease'
        }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.id)}
                style={{
                  textAlign: 'left',
                  background: isActive ? 'var(--foam)' : 'transparent',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.label}</span>
                {isActive && <Sparkles size={14} style={{ color: 'var(--primary)' }} />}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
