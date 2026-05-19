"use client"
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Card, { CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Toast from '../components/Toast';
import { FormField, FormRow, Input } from '../components/Form';
import { CardSkeleton } from '../components/Skeleton';
import { color, font } from '../components/theme';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => {
      setProfile({
        name: d.name || '',
        email: d.email || '',
        phone: d.phone || '',
        address: d.address || '',
        password: '',
      });
    });
  }, []);

  const update = (patch) => setProfile(prev => ({ ...prev, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setToast({ variant: 'success', message: 'Profile updated successfully.' });
        update({ password: '' });
      } else {
        setToast({ variant: 'danger', message: 'Failed to save profile.' });
      }
    } catch {
      setToast({ variant: 'danger', message: 'Network error.' });
    }
    setLoading(false);
    setTimeout(() => setToast(null), 3500);
  };

  if (!profile) return <CardSkeleton />;

  const initial = profile.name ? profile.name.charAt(0).toUpperCase() : 'A';

  return (
    <>
      <PageHeader
        title="My Account"
        subtitle="Manage your personal profile and security credentials."
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'My Account' }]}
      />

      {toast && (
        <div style={{ marginBottom: 16 }}>
          <Toast variant={toast.variant} onClose={() => setToast(null)}>{toast.message}</Toast>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card padding={0}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 20, padding: 28,
            borderBottom: `1px solid ${color.divider}`, fontFamily: font.family,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `linear-gradient(135deg, ${color.brand500}, ${color.brand700})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 28, fontWeight: 800,
              boxShadow: '0 6px 14px -4px rgba(16,185,129,0.4)', flexShrink: 0,
            }}>{initial}</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: color.text, letterSpacing: '-0.01em' }}>
                {profile.name || 'Admin User'}
              </h2>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <Badge variant="brand">Super Administrator</Badge>
                {profile.email && <span style={{ fontSize: 13, color: color.textSubtle }}>{profile.email}</span>}
              </div>
            </div>
          </div>

          <Section
            title="Personal Information"
            description="Shown on your profile and in account-related communications."
          >
            <FormRow columns={2}>
              <FormField label="Full Name" required>
                <Input value={profile.name} onChange={e => update({ name: e.target.value })} />
              </FormField>
              <FormField label="Email Address" help="Email cannot be changed.">
                <Input type="email" value={profile.email} disabled style={{ background: color.surfaceAlt, color: color.textFaint, cursor: 'not-allowed' }} />
              </FormField>
              <FormField label="Phone Number">
                <Input value={profile.phone} onChange={e => update({ phone: e.target.value })} placeholder="+254 700 000 000" />
              </FormField>
              <FormField label="Physical Address">
                <Input value={profile.address} onChange={e => update({ address: e.target.value })} placeholder="Nairobi, Kenya" />
              </FormField>
            </FormRow>
          </Section>

          <Section
            title="Security"
            description="Leave blank to keep your current password. Use a strong, unique password."
          >
            <FormField label="New Password" help="Minimum 8 characters with a mix of letters, numbers and symbols.">
              <Input
                type="password"
                value={profile.password}
                onChange={e => update({ password: e.target.value })}
                placeholder="••••••••"
                style={{ maxWidth: 420 }}
              />
            </FormField>
          </Section>

          <CardFooter>
            <Button type="button" variant="secondary" onClick={() => window.location.reload()}>Discard Changes</Button>
            <Button type="submit" variant="primary" loading={loading}>Update Account</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

function Section({ title, description, children }) {
  return (
    <div style={{ padding: 28, borderBottom: `1px solid ${color.divider}`, fontFamily: font.family }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: color.text, letterSpacing: '-0.01em' }}>{title}</h3>
        {description && <p style={{ margin: '6px 0 0', fontSize: 13, color: color.textSubtle, lineHeight: 1.5 }}>{description}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
    </div>
  );
}
