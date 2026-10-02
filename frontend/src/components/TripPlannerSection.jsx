import React, { useEffect, useState } from 'react';
import { Calendar, Plus, Trash2, Sparkles, Bookmark } from 'lucide-react';
import api from '../services/api.js';

export default function TripPlannerSection({ onToast }) {
  const [title, setTitle] = useState('My Coastal Karnataka Dream Journey');
  const [destination, setDestination] = useState('Coastal Karnataka');
  const [numberOfDays, setNumberOfDays] = useState(3);
  const [budgetCategory, setBudgetCategory] = useState('Moderate');
  const [travelPreference, setTravelPreference] = useState('Culture and coast');
  const [selectedPlace, setSelectedPlace] = useState('Malpe Beach');
  const [selectedDay, setSelectedDay] = useState(1);
  const [savedTrips, setSavedTrips] = useState([]);
  const [savedTripsError, setSavedTripsError] = useState('');
  const [itinerary, setItinerary] = useState({
    1: ['Panambur Beach', 'Giri Manja\'s Seafood', 'Kudroli Temple'],
    2: ['Sri Krishna Matha, Udupi', 'Malpe Beach', 'Neer Dosa'],
    3: ['Kapu Beach & Lighthouse', 'Yakshagana', 'Kori Rotti & Chicken Curry']
  });

  const availablePlaces = [
    'Malpe Beach', 'Kapu Beach', 'Panambur Beach', 'Maravanthe Beach', 'Tannirbhavi Beach',
    'Sri Krishna Matha, Udupi', 'Kateel Sri Durgaparameshwari', 'Dharmasthala Sri Manjunatha',
    'Kukke Sri Subramanya Temple', 'Murudeshwara Shiva Temple', 'Neer Dosa', 'Kori Rotti & Chicken Curry',
    'Mangalorean Chicken Ghee Roast', 'Anjal (Kingfish) Tawa Masala Fry', 'Yakshagana', 'Kambala (Buffalo Race)'
  ];

  useEffect(() => {
    let active = true;
    api.get('/trips')
      .then((response) => {
        if (!response.data?.success) throw new Error(response.data?.message || 'Unable to load saved trips.');
        if (active) setSavedTrips(response.data.data || []);
      })
      .catch((error) => {
        if (active) setSavedTripsError(error.response?.data?.detail || error.response?.data?.message || error.message);
      });
    return () => { active = false; };
  }, []);

  const handleAddStop = () => {
    if (!selectedPlace) return;
    setItinerary((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), selectedPlace]
    }));
    if (onToast) onToast(`Added "${selectedPlace}" to Day ${selectedDay}!`);
  };

  const handleRemoveStop = (day, index) => {
    setItinerary((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, idx) => idx !== index)
    }));
  };

  const handleSmartRecommend = () => {
    setNumberOfDays(3);
    setSelectedDay(1);
    setItinerary({
      1: ['Panambur Beach & Water Sports', 'Goli Baje & Mangaluru Breakfast', 'Kudroli Gokarnanatha Temple'],
      2: ['Sri Krishna Matha Darshan', 'Authentic Neer Dosa Feast', 'Malpe Beach & St. Mary\'s Island Cruise'],
      3: ['Kapu Beach 1901 Lighthouse Climb', 'Kori Rotti Coastal Dinner', 'Yakshagana Night Performance']
    });
    if (onToast) onToast('Loaded AI Auto-Recommended 3-Day Coastal Circuit! ✨');
  };

  const handleDurationChange = (days) => {
    setNumberOfDays(days);
    setSelectedDay((currentDay) => Math.min(currentDay, days));
    setItinerary((current) => {
      const next = { ...current };
      for (let day = 1; day <= days; day += 1) {
        if (!next[day]) next[day] = [];
      }
      Object.keys(next).forEach((day) => {
        if (Number(day) > days) delete next[day];
      });
      return next;
    });
  };

  const handleSaveItinerary = async () => {
    if (!title.trim() || !destination.trim()) {
      if (onToast) onToast('Trip title and destination are required.');
      return;
    }
    try {
      const response = await api.post('/trips', {
        title: title.trim(),
        durationDays: numberOfDays,
        budgetCategory,
        itineraryData: JSON.stringify({ destination, travelPreference, schedule: itinerary })
      });
      if (!response.data?.success) throw new Error(response.data?.message || 'Unable to save your itinerary.');
      setSavedTrips((currentTrips) => [response.data.data, ...currentTrips]);
      localStorage.setItem('tulunadu_custom_trip', JSON.stringify({ title, itinerary }));
      if (onToast) onToast('Itinerary saved to your account.');
    } catch (error) {
      const message = error.response?.data?.detail || error.response?.data?.message || error.message || 'Unable to save your itinerary.';
      if (onToast) onToast(message);
    }
  };

  return (
    <section id="tripPlannerSection" className="section" style={{ background: 'rgba(0, 119, 182, 0.04)', borderRadius: 'var(--radius-xl)', padding: '4rem 1.5rem', marginBottom: '2rem' }}>
      <div className="section-header">
        <span className="section-badge">🗺️ Custom Day-by-Day Organizer</span>
        <h2 className="section-title">Coastal <span className="accent-text">Trip Planner</span></h2>
        <p className="section-desc">
          Craft your personalized coastal Karnataka vacation itinerary. 
          Mix pristine beach sunsets, ancient sanctums, coastal delicacies, and folk spectacles.
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', backdropFilter: 'blur(14px)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
        {/* Header Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto', gap: 14, alignItems: 'end', marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Trip Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              maxLength={150}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Select Attraction
            </label>
            <select
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            >
              {availablePlaces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Number of Days
            </label>
            <select
              value={numberOfDays}
              onChange={(e) => handleDurationChange(Number(e.target.value))}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            >
              {Array.from({ length: 14 }, (_, index) => index + 1).map((day) => <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Travel Preference
            </label>
            <select
              value={travelPreference}
              onChange={(e) => setTravelPreference(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            >
              <option>Culture and coast</option>
              <option>Food and local markets</option>
              <option>Temples and heritage</option>
              <option>Beaches and nature</option>
              <option>Relaxed pace</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Budget
            </label>
            <select
              value={budgetCategory}
              onChange={(e) => setBudgetCategory(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            >
              <option>Budget</option>
              <option>Moderate</option>
              <option>Premium</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Assign to Day
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}
            >
              {Array.from({ length: numberOfDays }, (_, index) => index + 1).map((day) => (
                <option key={day} value={day}>Day {day}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddStop}
            className="btn-primary"
            style={{ height: 42, padding: '0 20px' }}
          >
            <Plus size={16} />
            <span>Add Stop</span>
          </button>
        </div>

        {/* 3 Days Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {Array.from({ length: numberOfDays }, (_, index) => index + 1).map((day) => (
            <div
              key={day}
              style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: 18, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: 10, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Calendar size={16} style={{ color: 'var(--primary)' }} />
                  <strong style={{ fontSize: '0.9rem', fontWeight: 800 }}>DAY {day}</strong>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 12, background: 'var(--foam)', color: 'var(--primary)' }}>
                  {day === 1 ? 'Arrival' : day === 2 ? 'Explore' : day === numberOfDays ? 'Departure' : 'Discover'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 140 }}>
                {(itinerary[day] || []).length === 0 ? (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
                    No stops added yet. Choose an attraction above.
                  </p>
                ) : (
                  (itinerary[day] || []).map((item, idx) => (
                    <div
                      key={idx}
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => handleRemoveStop(day, idx)}
                        style={{ color: 'var(--coral)', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                        title="Remove Stop"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-light)', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            💾 Save your customized itinerary to access it anytime during your trip.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleSmartRecommend}
              className="btn-glass"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              <Sparkles size={14} style={{ color: 'var(--gold)' }} />
              <span>Smart Recommend</span>
            </button>
            <button
              onClick={handleSaveItinerary}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '8px 18px' }}
            >
              <Bookmark size={14} />
              <span>Save Itinerary</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-light)' }}>
          <h3 style={{ marginBottom: 10 }}>Saved itineraries</h3>
          {savedTripsError && <p className="form-error" role="alert">{savedTripsError}</p>}
          {!savedTripsError && savedTrips.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Your saved trips will appear here.</p>}
          <div style={{ display: 'grid', gap: 8 }}>
            {savedTrips.map((trip) => (
              <div key={trip.id} style={{ padding: '10px 12px', background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                <strong>{trip.title}</strong>
                <span style={{ marginLeft: 8, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {trip.durationDays} days · {trip.budgetCategory}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
