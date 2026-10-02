import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(localStorage.getItem('tulunadu_user') || 'null');
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username: username || 'CoastalTraveler', email: email || 'traveler@tulunadu.com', role: 'ROLE_TRAVELER' };
    localStorage.setItem('tulunadu_user', JSON.stringify(user));
    setLoggedInUser(user);
    if (onLoginSuccess) onLoginSuccess(user);
    setTimeout(() => onClose(), 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('tulunadu_user');
    setLoggedInUser(null);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(3, 20, 36, 0.65)', backdropFilter: 'blur(8px)', padding: 16 }} onClick={onClose}>
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(24px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          padding: 28,
          position: 'relative',
          animation: 'fadeIn 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        {loggedInUser ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--foam)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <User size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Welcome, {loggedInUser.username}!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{loggedInUser.email}</p>
            <div style={{ marginTop: 16, display: 'inline-block', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0,180,216,0.1)', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700 }}>
              🌿 Coastal Traveler Pass Active
            </div>
            <div style={{ marginTop: 24 }}>
              <button onClick={handleLogout} className="btn-glass" style={{ width: '100%', padding: '10px 0', fontSize: '0.88rem' }}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isRegister ? 'Join NAMMA TULUNADU' : 'Sign In to NAMMA TULUNADU'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Save custom itineraries and bucket list destinations
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Username</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Kaushik"
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="traveler@example.com"
                      style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0', fontSize: '0.92rem', marginTop: 8 }}>
                {isRegister ? 'Create Free Account' : 'Sign In'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
                >
                  {isRegister ? 'Sign In' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
