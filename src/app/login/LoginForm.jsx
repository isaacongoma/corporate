"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ logo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
        setLoading(false);
      }
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '48px 40px', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)', width: '100%', maxWidth: '420px', border: '1px solid #f3f4f6' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          {logo
            ? <img src={logo} alt="Logo" style={{ maxWidth: 180, maxHeight: 60, objectFit: 'contain' }} />
            : <div style={{ width: '48px', height: '48px', backgroundColor: '#980a07', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>P</div>
          }
        </div>

        <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', color: '#111827', fontSize: '24px', fontWeight: 'bold' }}>Welcome back</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', margin: '0 0 32px 0', fontSize: '14px' }}>Please enter your details to sign in.</p>

        {error && <div style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '6px', marginBottom: '24px', fontSize: '14px', textAlign: 'center', border: '1px solid #fee2e2' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#980a07'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#980a07'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          <button type="submit" disabled={loading}
            style={{ marginTop: '8px', padding: '14px', backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 50 50" style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }}>
                  <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="rgba(255,255,255,0.3)" />
                  <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="#fff" strokeLinecap="round" strokeDasharray="31.4 100" />
                </svg>
                Processing...
              </span>
            ) : 'Sign in'}
          </button>
        </form>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />
      </div>
    </div>
  );
}
