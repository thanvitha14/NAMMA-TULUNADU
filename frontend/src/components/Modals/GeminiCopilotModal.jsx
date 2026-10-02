import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User, Compass, HelpCircle } from 'lucide-react';
import api from '../../services/api.js';

export default function GeminiCopilotModal({ isOpen, onClose, initialPrompt = '' }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaskara! 🌊 Welcome to Namma Tulunadu! I'm your Gemini AI Coastal Copilot. Ask me for custom beach itineraries, seafood spots, temple darshan timings, or Tulu phrases!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.post('/ai/chat', { message: query });
      const reply = response.data?.data?.reply;
      if (!reply) throw new Error('The AI service returned an empty response.');
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      const message = err.response?.data?.detail || err.response?.data?.message || err.message || 'Unable to retrieve a response.';
      setMessages(prev => [...prev, { sender: 'bot', text: `⚠️ ${message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const sampleChips = [
    "Plan a 3-Day Coastal Tour",
    "Best seafood spots in Mangaluru",
    "Udupi Krishna Matha darshan rules",
    "Kambala buffalo race schedule",
    "Teach me essential Tulu phrases"
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(3, 20, 36, 0.65)', backdropFilter: 'blur(8px)', padding: 16 }} onClick={onClose}>
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          height: '82vh',
          maxHeight: 700,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(24px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #0077B6, #00B4D8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>NAMMA TULUNADU • Gemini AI</h3>
              <p style={{ fontSize: '0.72rem', opacity: 0.9, margin: 0 }}>Intelligent Coastal Karnataka Travel Assistant</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: 6, borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ padding: '10px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: 8, overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {sampleChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--foam)',
                color: 'var(--primary)',
                border: '1px solid var(--border-light)',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              ✨ {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: 10,
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%'
              }}
            >
              {m.sender === 'bot' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={16} />
                </div>
              )}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  background: m.sender === 'user' ? 'var(--primary)' : 'var(--bg-main)',
                  color: m.sender === 'user' ? '#FFF' : 'var(--text-main)',
                  border: m.sender === 'bot' ? '1px solid var(--border-light)' : 'none',
                  boxShadow: 'var(--shadow-sm)',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--secondary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} />
              </div>
              <div style={{ padding: '10px 16px', borderRadius: 14, background: 'var(--bg-main)', border: '1px solid var(--border-light)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Gemini Copilot is thinking... ✨
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '14px 20px', background: 'var(--bg-main)', borderTop: '1px solid var(--border-light)', display: 'flex', gap: 10 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Gemini about coastal spots, seafood, timings..."
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#FFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
