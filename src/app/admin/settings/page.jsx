"use client"
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Card, { CardFooter } from '../components/Card';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { FormField, FormRow, Input, Textarea } from '../components/Form';
import ImageUpload from '../components/ImageUpload';
import RepeatableList from '../components/RepeatableList';
import { CardSkeleton } from '../components/Skeleton';
import { color, font } from '../components/theme';

const TABS = [
  { id: 'general',  label: 'General',         icon: <GeneralIcon /> },
  { id: 'branding', label: 'Branding',        icon: <BrandingIcon /> },
  { id: 'hero',     label: 'Hero Section',    icon: <HeroIcon /> },
  { id: 'social',   label: 'Social Profiles', icon: <SocialIcon /> },
  { id: 'footer',   label: 'Footer',          icon: <FooterIcon /> },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [active, setActive] = useState('general');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d));
  }, []);

  const update = (patch) => setSettings(prev => ({ ...prev, ...patch }));
  const updateFooter = (patch) => setSettings(prev => ({
    ...prev,
    footerContent: { ...(prev.footerContent || {}), ...patch },
  }));
  const fc = settings?.footerContent || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setToast(res.ok
        ? { variant: 'success', message: 'Settings saved successfully.' }
        : { variant: 'danger',  message: 'Failed to save settings. Try again.' });
    } catch {
      setToast({ variant: 'danger', message: 'Network error. Please retry.' });
    }
    setLoading(false);
    setTimeout(() => setToast(null), 3500);
  };

  if (!settings) return <CardSkeleton />;

  return (
    <>
      <PageHeader
        title="System Settings"
        subtitle="Configure your company profile, branding, website hero and social presence."
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Settings' }]}
      />

      {toast && (
        <div style={{ marginBottom: 16 }}>
          <Toast variant={toast.variant} onClose={() => setToast(null)}>{toast.message}</Toast>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, alignItems: 'start' }}>
        <nav style={{
          background: color.surface, border: `1px solid ${color.border}`,
          borderRadius: 12, padding: 8, position: 'sticky', top: 16, fontFamily: font.family,
        }}>
          {TABS.map(t => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', marginBottom: 2,
                  background: isActive ? color.brand50 : 'transparent',
                  color: isActive ? color.brand700 : color.textMuted,
                  border: 'none', borderRadius: 8, cursor: 'pointer',
                  fontSize: 13, fontWeight: isActive ? 700 : 600, textAlign: 'left',
                  fontFamily: font.family, transition: 'background-color .15s, color .15s',
                }}
                onMouseOver={e => { if (!isActive) e.currentTarget.style.background = color.surfaceAlt; }}
                onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ display: 'inline-flex', color: isActive ? color.brand600 : color.textFaint }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </nav>

        <form onSubmit={handleSubmit}>
          <Card padding={0}>
            {active === 'general' && (
              <Section
                title="Company Profile"
                description="Core information used across the site and in communications."
              >
                <FormRow columns={2}>
                  <FormField label="Company Name" required>
                    <Input value={settings.companyName || ''} onChange={e => update({ companyName: e.target.value })} />
                  </FormField>
                  <FormField label="Contact Email" required>
                    <Input type="email" value={settings.contactEmail || ''} onChange={e => update({ contactEmail: e.target.value })} />
                  </FormField>
                  <FormField label="Phone Numbers" help="Separate multiple numbers with a comma.">
                    <Input value={settings.phoneNumbers || ''} onChange={e => update({ phoneNumbers: e.target.value })} />
                  </FormField>
                  <FormField label="Office Location">
                    <Input value={settings.officeLocation || ''} onChange={e => update({ officeLocation: e.target.value })} />
                  </FormField>
                </FormRow>
              </Section>
            )}

            {active === 'branding' && (
              <Section
                title="Branding"
                description="Upload your logo and favicon. Use SVG or transparent PNG for best results."
              >
                <FormRow columns={2}>
                  <FormField label="Site Logo" help="Shown in the header and footer. SVG or transparent PNG recommended.">
                    <div style={{ maxWidth: 240 }}>
                      <ImageUpload
                        value={settings.logo}
                        onChange={url => update({ logo: url })}
                        folder="branding"
                        aspect="205 / 53"
                        label={null}
                        help="Recommended: 205×53px"
                      />
                    </div>
                  </FormField>
                  <FormField label="Favicon" help="Small icon shown in browser tabs. PNG or ICO, 32×32px recommended.">
                    <div style={{ maxWidth: 120 }}>
                      <ImageUpload
                        value={settings.favicon}
                        onChange={url => update({ favicon: url })}
                        folder="branding"
                        aspect="1 / 1"
                        label={null}
                        help="32×32 or 64×64px"
                      />
                    </div>
                  </FormField>
                </FormRow>
              </Section>
            )}

            {active === 'hero' && (
              <Section
                title="Homepage Hero"
                description="The hero banner displayed at the top of your public homepage."
              >
                <FormField label="Hero Title">
                  <Input value={settings.heroTitle || ''} onChange={e => update({ heroTitle: e.target.value })} />
                </FormField>
                <FormField label="Hero Subtitle">
                  <Textarea rows={3} value={settings.heroSubtitle || ''} onChange={e => update({ heroSubtitle: e.target.value })} />
                </FormField>
                <FormField label="CTA Button Text">
                  <Input value={settings.heroBtnText || ''} onChange={e => update({ heroBtnText: e.target.value })} />
                </FormField>
              </Section>
            )}

            {active === 'social' && (
              <Section
                title="Social Profiles"
                description="Links shown in the footer and social widgets."
              >
                <FormRow columns={2}>
                  <FormField label="Facebook URL"><Input type="url" value={settings.facebookUrl || ''} onChange={e => update({ facebookUrl: e.target.value })} placeholder="https://facebook.com/…" /></FormField>
                  <FormField label="Twitter / X URL"><Input type="url" value={settings.twitterUrl || ''} onChange={e => update({ twitterUrl: e.target.value })} placeholder="https://x.com/…" /></FormField>
                  <FormField label="Instagram URL"><Input type="url" value={settings.instagramUrl || ''} onChange={e => update({ instagramUrl: e.target.value })} placeholder="https://instagram.com/…" /></FormField>
                  <FormField label="Pinterest URL"><Input type="url" value={settings.pinterestUrl || ''} onChange={e => update({ pinterestUrl: e.target.value })} placeholder="https://pinterest.com/…" /></FormField>
                </FormRow>
              </Section>
            )}

            {active === 'footer' && settings && (
              <>
                <Section title="Footer Identity" description="Logo, background image and copyright line shown in the footer.">
                  <FormRow columns={2}>
                    <FormField label="Footer Logo">
                      <div style={{ maxWidth: 200 }}>
                        <ImageUpload value={fc.logo} onChange={url => updateFooter({ logo: url })} folder="footer" aspect="205 / 53" label={null} help="SVG or transparent PNG." />
                      </div>
                    </FormField>
                    <FormField label="Background Image">
                      <div style={{ maxWidth: 200 }}>
                        <ImageUpload value={fc.backgroundImage} onChange={url => updateFooter({ backgroundImage: url })} folder="footer" aspect="16 / 9" label={null} />
                      </div>
                    </FormField>
                  </FormRow>
                  <FormField label="Copyright Text">
                    <Input value={fc.copyrightText || ''} onChange={e => updateFooter({ copyrightText: e.target.value })} placeholder="Copyright © 2024. All Rights Reserved." />
                  </FormField>
                </Section>

                <Section title="Contact Info" description="Hours, address and phone shown in the highlighted footer column.">
                  <FormField label="Opening Hours" help="HTML allowed, e.g. line break with &lt;br /&gt;">
                    <Input value={fc.contactHours || ''} onChange={e => updateFooter({ contactHours: e.target.value })} placeholder="Mon - Fri: 8.00 am. - 6.00 pm." />
                  </FormField>
                  <FormField label="Address">
                    <Input value={fc.contactAddress || ''} onChange={e => updateFooter({ contactAddress: e.target.value })} placeholder="13/A, Miranda Halim City." />
                  </FormField>
                  <FormField label="Phone">
                    <Input value={fc.contactPhone || ''} onChange={e => updateFooter({ contactPhone: e.target.value })} placeholder="099 695 695 35" />
                  </FormField>
                </Section>

                <Section title="Link Widgets" description="Two columns of links shown in the footer body (e.g. Services, Quick Links).">
                  {(fc.widgets || []).map((widget, wi) => (
                    <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <FormField label={`Widget ${wi + 1} Title`} style={{ flex: 1 }}>
                          <Input
                            value={widget.title || ''}
                            onChange={e => {
                              const widgets = [...(fc.widgets || [])];
                              widgets[wi] = { ...widgets[wi], title: e.target.value };
                              updateFooter({ widgets });
                            }}
                            placeholder="Service"
                          />
                        </FormField>
                      </div>
                      <RepeatableList
                        label="Link"
                        items={widget.links || []}
                        onChange={links => {
                          const widgets = [...(fc.widgets || [])];
                          widgets[wi] = { ...widgets[wi], links };
                          updateFooter({ widgets });
                        }}
                        emptyRow={() => ({ href: '/', text: '' })}
                        addLabel="Add link"
                        renderRow={(item, _i, onRowChange) => (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <FormField label="Label">
                              <Input value={item.text || ''} onChange={e => onRowChange({ ...item, text: e.target.value })} placeholder="About Us" />
                            </FormField>
                            <FormField label="URL">
                              <Input value={item.href || ''} onChange={e => onRowChange({ ...item, href: e.target.value })} placeholder="/about" />
                            </FormField>
                          </div>
                        )}
                      />
                      {wi < (fc.widgets || []).length - 1 && <hr style={{ border: 'none', borderTop: `1px solid ${color.divider}`, margin: '4px 0' }} />}
                    </div>
                  ))}
                </Section>

                <Section title="Footer Bottom Menu" description="Links shown in the thin strip at the very bottom of the footer.">
                  <RepeatableList
                    label="Menu item"
                    items={fc.footerMenu || []}
                    onChange={footerMenu => updateFooter({ footerMenu })}
                    emptyRow={() => ({ href: '/', text: '' })}
                    addLabel="Add item"
                    renderRow={(item, _i, onRowChange) => (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <FormField label="Label">
                          <Input value={item.text || ''} onChange={e => onRowChange({ ...item, text: e.target.value })} placeholder="About Us" />
                        </FormField>
                        <FormField label="URL">
                          <Input value={item.href || ''} onChange={e => onRowChange({ ...item, href: e.target.value })} placeholder="/about" />
                        </FormField>
                      </div>
                    )}
                  />
                </Section>
              </>
            )}

            <CardFooter>
              <Button type="button" variant="secondary" onClick={() => window.location.reload()}>Discard Changes</Button>
              <Button type="submit" variant="primary" loading={loading}>Save Settings</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

function Section({ title, description, children }) {
  return (
    <div style={{ padding: 28, fontFamily: font.family }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: color.text, letterSpacing: '-0.01em' }}>{title}</h3>
        {description && <p style={{ margin: '6px 0 0', fontSize: 13, color: color.textSubtle, lineHeight: 1.5 }}>{description}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
    </div>
  );
}

function GeneralIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"/></svg>; }
function BrandingIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2 3 7l9 5 9-5-9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>; }
function HeroIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v10H4zM8 19h8M12 15v4"/></svg>; }
function SocialIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M18 8a3 3 0 1 0-2.83-4M6 16a3 3 0 1 0 2.83 4M6 8a3 3 0 1 1-2.83-4m11.66 12 -5.66-3.33m5.66-9.34L9.17 6.66"/></svg>; }
function FooterIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M4 5h16M4 12h16"/></svg>; }
