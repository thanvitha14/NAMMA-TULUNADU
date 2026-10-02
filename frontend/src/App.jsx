import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Compass, LogOut, Map, MessageCircle, Moon, Sun, UserRound } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import api from './services/api.js';
import Hero from './components/Hero.jsx';
import BeachesSection from './components/BeachesSection.jsx';
import TemplesSection from './components/TemplesSection.jsx';
import CuisineSection from './components/CuisineSection.jsx';
import CultureSection from './components/CultureSection.jsx';
import TrailsMapSection from './components/TrailsMapSection.jsx';
import TripPlannerSection from './components/TripPlannerSection.jsx';
import TulusiriSection from './components/TulusiriSection.jsx';
import Footer from './components/Footer.jsx';
import DetailModal from './components/Modals/DetailModal.jsx';
import GeminiCopilotModal from './components/Modals/GeminiCopilotModal.jsx';
import { BEACHES_DATA, CULTURE_DATA, CUISINE_DATA, TEMPLES_DATA } from './data/destinationsData.js';

const categoryConfig = {
  beaches: { title: 'Beaches', description: 'Coastal escapes, island trips, and sunset spots.', path: '/beaches', icon: '🏖️', catalog: BEACHES_DATA },
  temples: {
    title: 'Temples',
    description: 'Historic shrines and sacred destinations.',
    path: '/temples',
    icon: '🛕',
    catalog: TEMPLES_DATA,
    aliases: {
      'sri krishna matha': 'sri krishna matha - iconic pilgrimage, udupi',
      'kateel sri durgaparameshwari': 'kateel temple - kondemula, kulai',
      'murudeshwara temple': 'murudeshwara temple - famous shiva temple, murudeshwara',
      'kollur mookambika temple': 'om mookambika temple - kollur, byndoor'
    }
  },
  cuisine: { title: 'Cuisine', description: 'Traditional food and coastal flavours.', path: '/foods', icon: '🍲', catalog: CUISINE_DATA },
  culture: { title: 'Culture', description: 'Living traditions, festivals, and heritage.', path: '/culture/traditions', catalog: CULTURE_DATA }
};

const categoryRows = Object.entries(categoryConfig);

function normalizeName(value) {
  return String(value || '').trim().toLocaleLowerCase().replace(/\s+/g, ' ');
}

function catalogKey(value, aliases = {}) {
  const normalized = normalizeName(value);
  return aliases[normalized] || normalized;
}

function catalogImage(item) {
  const image = item.image || item.imageUrl;
  if (!image || image.startsWith('/') || /^https?:\/\//i.test(image)) return image;
  return `/${image}`;
}

function ProtectedRoute() {
  const { token } = useAuth();
  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

function AuthPage({ isRegister }) {
  const { login, register, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', email: '', fullName: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isRegister) await register(form);
      else await login({ username: form.username, password: form.password });
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message
        || requestError.response?.data?.detail
        || (requestError.request
          ? `No HTTP response from ${requestError.config ? api.getUri(requestError.config) : api.defaults.baseURL}. Check the Spring Boot service and browser CORS policy.`
          : requestError.message)
        || 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <Link className="brand-link" to="/login">NAMMA TULUNADU</Link>
        <h1>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p>Sign in to plan and save your coastal Karnataka journey.</p>
        {error && <div className="form-error" role="alert">{error}</div>}
        <label>Username<input autoComplete="username" minLength="3" maxLength="50" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></label>
        {isRegister && <>
          <label>Email<input type="email" autoComplete="email" maxLength="100" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Full name<input autoComplete="name" maxLength="100" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
        </>}
        <label>Password<input type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 8 : undefined} maxLength="72" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="btn-primary" type="submit" disabled={busy}>{busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}</button>
        <div className="auth-switch">
          {isRegister ? 'Already registered? ' : 'New to Namma Tulunadu? '}
          <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create account'}</Link>
        </div>
      </form>
    </main>
  );
}

function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => sessionStorage.getItem('tulunadu_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    sessionStorage.setItem('tulunadu_theme', theme);
  }, [theme]);

  return (
    <div className="portal">
      <header className="portal-header">
        <Link className="brand-link" to="/dashboard">NAMMA TULUNADU</Link>
        <nav aria-label="Main navigation">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/trip-planner">Trip Planner</Link>
          <Link to="/ai-assistant">AI Assistant</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/favorites">Saved places</Link>
        </nav>
        <div className="portal-account">
          <span><UserRound size={16} /> {user?.username}</span>
          <button className="icon-button" type="button" onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} aria-label="Toggle color theme">
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button className="icon-button" type="button" onClick={() => { logout(); navigate('/login', { replace: true }); }} aria-label="Sign out">
            <LogOut size={17} />
          </button>
        </div>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  return (
    <main>
      <Hero onOpenGemini={() => navigate('/ai-assistant')} />
      <section className="portal-section">
        <div className="section-header">
          <span className="section-badge">Your journey starts here</span>
          <h1 className="section-title">Discover <span className="accent-text">Tulunadu</span></h1>
          <p className="section-desc">Choose a category to explore the coast, then save your favourites and build a trip.</p>
        </div>
        <CategoryCards />
        <div className="dashboard-actions">
          <Link className="dashboard-action" to="/trip-planner"><Map /> Build a trip itinerary</Link>
          <Link className="dashboard-action" to="/ai-assistant"><MessageCircle /> Ask the coastal AI guide</Link>
        </div>
      </section>
    </main>
  );
}

function CategoryCards() {
  return (
    <div className="category-grid">
      {categoryRows.map(([key, item]) => (
        <Link className="category-card" key={key} to={`/categories/${key}`}>
          <span className="category-icon" aria-hidden="true">{item.icon}</span>
          <h2>{item.title}</h2><p>{item.description}</p>
          <span className="category-cta">Explore destinations →</span>
        </Link>
      ))}
    </div>
  );
}

function CategoriesPage() {
  return <main className="portal-section"><div className="section-header"><span className="section-badge">Browse by interest</span><h1 className="section-title">Tourism <span className="accent-text">Categories</span></h1></div><CategoryCards /></main>;
}

function CategoryPage() {
  const { category } = useParams();
  const config = categoryConfig[category];
  const [items, setItems] = useState(config?.catalog || []);
  const [foodFilter, setFoodFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('tulunadu_favs') || '[]'));
  const [detailError, setDetailError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!config) return;
    let active = true;
    setItems(config.catalog);
    setLoading(true);
    setError('');
    api.get(config.path)
      .then((response) => {
        if (!active) return;
        const records = response.data?.data || [];
        const recordsByName = new globalThis.Map(records.map((record) => [catalogKey(record.name || record.title, config.aliases), record]));
        const mergedCatalog = config.catalog.map((curatedItem) => {
          const key = catalogKey(curatedItem.name, config.aliases);
          const record = recordsByName.get(key);
          if (!record) return curatedItem;
          recordsByName.delete(key);
          return {
            ...record,
            ...curatedItem,
            id: record.id ?? curatedItem.id,
            apiId: record.id,
            image: catalogImage(curatedItem) || catalogImage(record)
          };
        });
        recordsByName.forEach((record) => mergedCatalog.push({ ...record, image: catalogImage(record) }));
        setItems(mergedCatalog);
      })
      .catch((requestError) => {
        if (active) setError(`Live catalogue update unavailable; showing the complete built-in catalogue. ${requestError.response?.data?.detail || requestError.message || ''}`.trim());
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [config]);

  useEffect(() => { localStorage.setItem('tulunadu_favs', JSON.stringify(favorites)); }, [favorites]);

  if (!config) return <Navigate to="/categories" replace />;

  const toggleFavorite = (name) => setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const visibleItems = category === 'cuisine' && foodFilter !== 'all'
    ? items.filter((item) => item.category === foodFilter)
    : items;
  const foodCategories = [
    { id: 'all', label: 'All', count: items.length },
    { id: 'veg', label: 'Vegetarian', count: items.filter((item) => item.category === 'veg').length },
    { id: 'nonveg', label: 'Non-vegetarian', count: items.filter((item) => item.category === 'nonveg').length },
    { id: 'fish', label: 'Fish & seafood', count: items.filter((item) => item.category === 'fish').length }
  ];
  const openDetails = async (item) => {
    setDetailError('');
    if (!item.apiId) {
      setSelected({
        ...item,
        image: catalogImage(item),
        gallery: item.gallery || (catalogImage(item) ? [catalogImage(item)] : []),
        location: item.location || item.district
      });
      return;
    }
    try {
      const response = await api.get(`${config.path}/${item.apiId}`);
      const detail = response.data?.data;
      if (!detail) throw new Error('The server returned no destination details.');
      setSelected({
        ...detail,
        ...item,
        image: catalogImage(item) || catalogImage(detail),
        gallery: item.gallery || (catalogImage(item) ? [catalogImage(item)] : []),
        location: item.location || detail.district
      });
    } catch (requestError) {
      setDetailError(requestError.response?.data?.detail || requestError.response?.data?.message || requestError.message || 'Unable to load destination details.');
    }
  };
  return (
    <main className="portal-section">
      <div className="section-header"><span className="section-badge">{config.icon} Destination category</span><h1 className="section-title">{config.title} <span className="accent-text">of Tulunadu</span></h1><p className="section-desc">{config.description}</p></div>
      {loading && <p role="status">Loading {config.title.toLowerCase()}…</p>}
      {error && <div className="form-error" role="alert">{error}</div>}
      {detailError && <div className="form-error" role="alert">{detailError}</div>}
      {category === 'cuisine' && (
        <div className="category-filters" aria-label="Filter food by category">
          {foodCategories.map((foodCategory) => (
            <button
              key={foodCategory.id}
              type="button"
              className={`food-category-filter${foodFilter === foodCategory.id ? ' active' : ''}`}
              aria-pressed={foodFilter === foodCategory.id}
              onClick={() => setFoodFilter(foodCategory.id)}
            >
              {foodCategory.label} ({foodCategory.count})
            </button>
          ))}
        </div>
      )}
      {!loading && visibleItems.length === 0 && <p>No destinations are available in this category yet.</p>}
      <div className="destination-grid">
        {visibleItems.map((item, index) => (
          <article className="destination-card" key={item.id || item.name || index}>
            {catalogImage(item) && <img src={catalogImage(item)} alt={item.name || item.title || ''} loading="lazy" />}
            <div className="destination-content">
              <h2>{item.name || item.title}</h2>
              <p>{item.shortDesc || item.description || item.significance || item.culturalImportance || item.fullDesc || item.district || 'Discover this Tulunadu experience.'}</p>
              {item.category && <small>{item.category === 'veg' ? 'Vegetarian' : item.category === 'nonveg' ? 'Non-vegetarian' : item.category === 'fish' ? 'Fish & seafood' : item.category}</small>}
              {(item.district || item.location) && <small>{item.district || item.location}</small>}
              <button
                className="btn-primary"
                type="button"
                onClick={() => openDetails(item)}
              >
                View details
              </button>
            </div>
          </article>
        ))}
      </div>
      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} isFav={favorites.includes(selected.name)} onToggleFav={toggleFavorite} onAskGemini={() => navigate('/ai-assistant')} />}
    </main>
  );
}

function TripPage() {
  const [toast, setToast] = useState('');
  return <main className="portal-section"><TripPlannerSection onToast={(message) => { setToast(message); window.setTimeout(() => setToast(''), 3000); }} />{toast && <div className="portal-toast" role="status">{toast}</div>}</main>;
}

function AssistantPage() {
  const navigate = useNavigate();
  return <main className="portal-section assistant-page"><div className="section-header"><span className="section-badge">Travel help, powered by Gemini</span><h1 className="section-title">Coastal <span className="accent-text">AI Assistant</span></h1><p className="section-desc">Ask about places, food, traditions, or your route.</p></div><GeminiCopilotModal isOpen onClose={() => navigate('/dashboard')} /></main>;
}

function ExplorePage() {
  const [toast, setToast] = useState('');
  return <main className="portal-section"><TrailsMapSection /><TulusiriSection onToast={setToast} />{toast && <div className="portal-toast" role="status">{toast}</div>}</main>;
}

function FavoritesPage() {
  const saved = JSON.parse(localStorage.getItem('tulunadu_favs') || '[]');
  return <main className="portal-section"><div className="section-header"><span className="section-badge">Saved places</span><h1 className="section-title">Your <span className="accent-text">Bucket List</span></h1></div>{saved.length ? <ul className="saved-list">{saved.map((name) => <li key={name}>{name}</li>)}</ul> : <p>No saved places yet. Open a destination and save it to your bucket list.</p>}</main>;
}

function AppRoutes() {
  const { token } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<AuthPage isRegister={false} />} />
      <Route path="/register" element={<AuthPage isRegister />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<PortalLayout />}>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/trip-planner" element={<TripPage />} />
          <Route path="/ai-assistant" element={<AssistantPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default function App() {
  return <BrowserRouter><AuthProvider><AppRoutes /></AuthProvider></BrowserRouter>;
}
