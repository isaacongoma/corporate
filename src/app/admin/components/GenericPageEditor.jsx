"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from './PageHeader';
import Card from './Card';
import Button from './Button';
import Toast from './Toast';
import { FormField, Input, Textarea } from './Form';
import { color, font } from './theme';

export default function GenericPageEditor({ initial }) {
  const router = useRouter();
  const [data, setData] = useState(() => ({
    title: initial?.title ?? '',
    content: initial?.content ?? {},
    slug: initial?.slug ?? '',
  }));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleFieldChange = (sectionKey, fieldKey, value) => {
    setData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [sectionKey]: { ...prev.content[sectionKey], [fieldKey]: value },
      },
    }));
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/pages/${data.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: data.title, content: data.content }),
    });
    setSaving(false);
    if (res.ok) {
      setToast({ variant: 'success', message: 'Changes published successfully.' });
      setTimeout(() => router.push('/admin/pages'), 900);
    } else {
      setToast({ variant: 'danger', message: 'Failed to publish changes.' });
      setTimeout(() => setToast(null), 3500);
    }
  };

  const humanize = (k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();

  return (
    <>
      <PageHeader
        title={`Edit ${data.title || 'Page'}`}
        subtitle={`Editing /${data.slug} — update copy section by section.`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Pages', href: '/admin/pages' },
          { label: data.title || data.slug },
        ]}
        actions={
          <>
            <Button variant="secondary" onClick={() => router.push('/admin/pages')} icon={<BackIcon />}>Back</Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>Publish Update</Button>
          </>
        }
      />

      {toast && (
        <div style={{ marginBottom: 16 }}>
          <Toast variant={toast.variant} onClose={() => setToast(null)}>{toast.message}</Toast>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
          <Card padding={0}>
            <SectionHead title="General" description="Top-level metadata for this page." />
            <div style={{ padding: '0 28px 24px' }}>
              <FormField label="Page Browser Title" required>
                <Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} required />
              </FormField>
            </div>
          </Card>

          {Object.keys(data.content || {}).map(sectionKey => (
            <Card key={sectionKey} padding={0}>
              <SectionHead
                title={humanize(sectionKey)}
                description={`Fields for the ${humanize(sectionKey).toLowerCase()} section.`}
              />
              <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {Object.keys(data.content[sectionKey]).map(fieldKey => {
                  const val = data.content[sectionKey][fieldKey];
                  if (typeof val !== 'string') return null;
                  const isLong = val.length > 60;
                  return (
                    <FormField key={fieldKey} label={humanize(fieldKey)}>
                      {isLong ? (
                        <Textarea rows={4} value={val} onChange={e => handleFieldChange(sectionKey, fieldKey, e.target.value)} />
                      ) : (
                        <Input value={val} onChange={e => handleFieldChange(sectionKey, fieldKey, e.target.value)} />
                      )}
                    </FormField>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <div style={{
          position: 'sticky', bottom: 16, zIndex: 5,
          background: color.surface, border: `1px solid ${color.border}`,
          borderRadius: 12, padding: '12px 20px',
          boxShadow: '0 12px 24px -8px rgba(15,23,42,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
          fontFamily: font.family,
        }}>
          <span style={{ fontSize: 13, color: color.textSubtle }}>
            Changes apply immediately to the public page once published.
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/pages')}>Discard</Button>
            <Button type="submit" variant="primary" loading={saving}>Publish Update</Button>
          </div>
        </div>
      </form>
    </>
  );
}

function SectionHead({ title, description }) {
  return (
    <div style={{
      padding: '20px 28px 18px', borderBottom: `1px solid ${color.divider}`,
      fontFamily: font.family,
    }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: color.text, letterSpacing: '-0.01em' }}>{title}</h3>
      {description && <p style={{ margin: '4px 0 0', fontSize: 13, color: color.textSubtle }}>{description}</p>}
    </div>
  );
}

function BackIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" /></svg>;
}
