"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from './PageHeader';
import Card from './Card';
import Button from './Button';
import Toast from './Toast';
import Badge from './Badge';
import { FormField, Input, Textarea, FormSection } from './Form';
import ImageUpload from './ImageUpload';
import RepeatableList from './RepeatableList';
import { color, font, radius } from './theme';
import { useTheme, themes } from '../context/ThemeContext';

const SECTIONS = [
  { key: 'hero',    label: 'Hero',           icon: '✦' },
  { key: 'about',   label: 'About',          icon: '○' },
  { key: 'counter',         label: 'Counter Stats',    icon: '◈' },
  { key: 'service',         label: 'Services',         icon: '◇' },
  { key: 'brands',          label: 'Brand Logos',      icon: '◻' },
  { key: 'video',           label: 'Video Section',    icon: '▷' },
  { key: 'medicalSolution', label: 'Why Choose Us', icon: '✦' },
  { key: 'cta',             label: 'CTA Banner',       icon: '◉' },
  { key: 'projects',        label: 'Portfolio',        icon: '◧' },
  { key: 'team',            label: 'Team',             icon: '◎' },
  { key: 'testimonials',   label: 'Testimonials',     icon: '❝' },
  { key: 'process',        label: 'Process',          icon: '⟳' },
  { key: 'blogSection',    label: 'Blog Section',     icon: '✎' },
];

export default function HomePageEditor({ initial }) {
  const router = useRouter();
  const { theme } = useTheme();
  const th = themes[theme];
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent] = useState(() => initial?.content ?? {});
  const [title, setTitle] = useState(initial?.title ?? 'Home');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const patchSection = (section, patch) =>
    setContent(prev => ({ ...prev, [section]: { ...(prev[section] ?? {}), ...patch } }));

  const hero           = content.hero           ?? {};
  const about          = content.about          ?? {};
  const counter        = content.counter        ?? [];
  const service        = content.service        ?? {};
  const brands         = content.brands         ?? [];
  const video          = content.video          ?? {};
  const medicalSolution = content.medicalSolution ?? {};
  const cta            = content.cta            ?? {};
  const projects       = content.projects       ?? {};
  const team           = content.team           ?? {};
  const testimonials   = content.testimonials   ?? {};
  const process        = content.process        ?? {};
  const blogSection    = content.blogSection    ?? {};

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/pages/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error();
      setToast({ variant: 'success', message: 'Homepage updated.' });
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({ variant: 'danger', message: 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  const sectionInfo = SECTIONS.find(s => s.key === activeSection);

  return (
    <>
      <PageHeader
        title="Edit Homepage"
        subtitle="Update section content for the public home page."
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Pages', href: '/admin/pages' },
          { label: 'Home' },
        ]}
        actions={
          <>
            <Button variant="secondary" onClick={() => router.push('/admin/pages')}>Back</Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>Publish Changes</Button>
          </>
        }
      />

      {toast && (
        <div style={{ marginBottom: 16 }}>
          <Toast variant={toast.variant} onClose={() => setToast(null)}>{toast.message}</Toast>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0,1fr)', gap: 20, alignItems: 'start' }}>
        {/* Section navigation sidebar */}
        <div style={{ position: 'sticky', top: 16 }}>
          <Card padding={0}>
            <div style={{
              padding: '14px 16px', borderBottom: `1px solid ${th.border}`,
              fontFamily: font.family,
            }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: th.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sections</p>
            </div>
            <nav style={{ padding: '6px 8px' }}>
              {SECTIONS.map(sec => (
                <button
                  key={sec.key}
                  onClick={() => setActiveSection(sec.key)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', border: 'none', borderRadius: radius.md,
                    cursor: 'pointer', fontFamily: font.family,
                    background: activeSection === sec.key ? 'rgba(16,185,129,0.1)' : 'transparent',
                    color: activeSection === sec.key ? color.brand700 : th.textMuted,
                    fontWeight: activeSection === sec.key ? 600 : 400,
                    fontSize: 13, textAlign: 'left', transition: 'background .15s',
                  }}
                >
                  <span style={{ fontSize: 11, opacity: 0.7, width: 14, textAlign: 'center' }}>{sec.icon}</span>
                  <span style={{ flex: 1 }}>{sec.label}</span>
                  {sec.stub && (
                    <Badge variant="default" style={{ fontSize: 10 }}>Soon</Badge>
                  )}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Active section editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sectionInfo?.stub ? (
            <Card padding={0}>
              <SectionHead title={sectionInfo.label} description={`Editor for the ${sectionInfo.label} section — coming soon.`} />
              <div style={{ padding: '40px 28px', textAlign: 'center', color: th.textFaint, fontSize: 13, fontFamily: font.family }}>
                This section editor is not yet available. Select Hero to get started.
              </div>
            </Card>
          ) : activeSection === 'hero' ? (
            <HeroSectionEditor
              hero={hero}
              onChange={(patch) => patchSection('hero', patch)}
            />
          ) : activeSection === 'about' ? (
            <AboutSectionEditor about={about} onChange={(patch) => patchSection('about', patch)} />
          ) : activeSection === 'counter' ? (
            <CounterSectionEditor counter={counter} onChange={(v) => setContent(p => ({ ...p, counter: v }))} />
          ) : activeSection === 'service' ? (
            <ServiceSectionEditor service={service} onChange={(patch) => patchSection('service', patch)} />
          ) : activeSection === 'brands' ? (
            <BrandsSectionEditor brands={brands} onChange={(v) => setContent(p => ({ ...p, brands: v }))} />
          ) : activeSection === 'video' ? (
            <VideoSectionEditor video={video} onChange={(patch) => patchSection('video', patch)} />
          ) : activeSection === 'medicalSolution' ? (
            <MedicalSolutionEditor medicalSolution={medicalSolution} onChange={(patch) => patchSection('medicalSolution', patch)} />
          ) : activeSection === 'cta' ? (
            <CtaSectionEditor cta={cta} onChange={(patch) => patchSection('cta', patch)} />
          ) : activeSection === 'projects' ? (
            <ProjectsSectionEditor projects={projects} onChange={(patch) => patchSection('projects', patch)} />
          ) : activeSection === 'team' ? (
            <TeamSectionEditor team={team} onChange={(patch) => patchSection('team', patch)} />
          ) : activeSection === 'testimonials' ? (
            <TestimonialsSectionEditor testimonials={testimonials} onChange={(patch) => patchSection('testimonials', patch)} />
          ) : activeSection === 'process' ? (
            <ProcessSectionEditor process={process} onChange={(patch) => patchSection('process', patch)} />
          ) : activeSection === 'blogSection' ? (
            <BlogSectionEditor blogSection={blogSection} onChange={(patch) => patchSection('blogSection', patch)} />
          ) : null}

          {/* Sticky save bar */}
          <div style={{
            position: 'sticky', bottom: 16, zIndex: 5,
            background: th.surface, border: `1px solid ${th.border}`,
            borderRadius: 12, padding: '12px 20px',
            boxShadow: '0 12px 24px -8px rgba(15,23,42,.15)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: font.family,
          }}>
            <span style={{ fontSize: 13, color: th.textSubtle }}>
              Changes are published immediately to the public site.
            </span>
            <Button variant="primary" onClick={handleSave} loading={saving}>Publish Changes</Button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Hero section editor ── */
function HeroSectionEditor({ hero, onChange }) {
  const p = (patch) => onChange(patch);

  return (
    <>
      {/* Background + Hero shape images */}
      <Card padding={0}>
        <SectionHead title="Hero Images" description="Background photo and decorative shape overlay." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <FormField label="Background Image" required>
            <ImageUpload
              value={hero.backgroundImage}
              onChange={(url) => p({ backgroundImage: url })}
              folder="home"
              aspect="16 / 9"
              help="Full-width hero background photo."
              label={null}
            />
          </FormField>
          <FormField label="Hero Shape Overlay">
            <ImageUpload
              value={hero.heroShape}
              onChange={(url) => p({ heroShape: url })}
              folder="home"
              aspect="1 / 1"
              help="Decorative PNG shape (transparent)."
              label={null}
            />
          </FormField>
        </div>
      </Card>

      {/* Main copy */}
      <Card padding={0}>
        <SectionHead title="Headline & Copy" description="Primary heading, subtitle and bullet features." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Title" required>
            <Input
              value={hero.title ?? ''}
              onChange={(e) => p({ title: e.target.value })}
              placeholder="Doctors Need Help Patient Service."
              style={{ fontSize: 16, fontWeight: 600 }}
            />
          </FormField>
          <FormField label="Subtitle">
            <Textarea
              rows={3}
              value={hero.subtitle ?? ''}
              onChange={(e) => p({ subtitle: e.target.value })}
              placeholder="A short supporting sentence…"
            />
          </FormField>
          <FormField label="Bullet Features" help="Short lines shown as feature bullet points.">
            <RepeatableList
              label="Feature"
              items={hero.features ?? []}
              onChange={(features) => p({ features })}
              addLabel="Add feature"
            />
          </FormField>
        </div>
      </Card>

      {/* Buttons */}
      <Card padding={0}>
        <SectionHead title="CTA Buttons" description="Primary button and secondary video link text." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FormField label="Primary Button Text">
            <Input value={hero.btnText ?? ''} onChange={(e) => p({ btnText: e.target.value })} placeholder="Contact Now" />
          </FormField>
          <FormField label="Primary Button URL">
            <Input value={hero.btnHref ?? ''} onChange={(e) => p({ btnHref: e.target.value })} placeholder="/contact" />
          </FormField>
          <FormField label="Video Button Text">
            <Input value={hero.BtnText1 ?? ''} onChange={(e) => p({ BtnText1: e.target.value })} placeholder="How We Work" />
          </FormField>
          <FormField label="Video Embed URL">
            <Input value={hero.videoHref ?? ''} onChange={(e) => p({ videoHref: e.target.value })} placeholder="https://youtube.com/embed/…" />
          </FormField>
        </div>
      </Card>

      {/* Support badge */}
      <Card padding={0}>
        <SectionHead title="Support Badge" description="Small badge shown on the hero (e.g. '24 Hours Support')." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <FormField label="Number">
            <Input
              value={hero.supportText?.number ?? ''}
              onChange={(e) => p({ supportText: { ...(hero.supportText ?? {}), number: e.target.value } })}
              placeholder="24"
            />
          </FormField>
          <FormField label="Unit">
            <Input
              value={hero.supportText?.unit ?? ''}
              onChange={(e) => p({ supportText: { ...(hero.supportText ?? {}), unit: e.target.value } })}
              placeholder="Hours"
            />
          </FormField>
          <FormField label="Description">
            <Input
              value={hero.supportText?.description ?? ''}
              onChange={(e) => p({ supportText: { ...(hero.supportText ?? {}), description: e.target.value } })}
              placeholder="Support"
            />
          </FormField>
        </div>
      </Card>

      {/* Icon boxes */}
      <Card padding={0}>
        <SectionHead title="Icon Boxes" description="Small info cards shown at the bottom of the hero." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Icon Box"
            items={hero.iconBoxes ?? []}
            onChange={(iconBoxes) => p({ iconBoxes })}
            emptyRow={() => ({ icon: '', title: '', subtitle: '', buttonHref: '', buttonText: '' })}
            addLabel="Add icon box"
            renderRow={(box, _i, onRowChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, alignItems: 'start' }}>
                  <FormField label="Icon Image">
                    <ImageUpload
                      value={box.icon}
                      onChange={(url) => onRowChange({ ...box, icon: url })}
                      folder="home/icons"
                      aspect="1 / 1"
                      help="PNG icon (transparent bg)."
                      label={null}
                    />
                  </FormField>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <FormField label="Title">
                      <Input
                        value={box.title ?? ''}
                        onChange={(e) => onRowChange({ ...box, title: e.target.value })}
                        placeholder="Emergency Call"
                      />
                    </FormField>
                    <FormField label="Subtitle / Detail">
                      <Input
                        value={box.subtitle ?? ''}
                        onChange={(e) => onRowChange({ ...box, subtitle: e.target.value })}
                        placeholder="24/7 – Support and easy"
                      />
                    </FormField>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <FormField label="Button Text">
                    <Input
                      value={box.buttonText ?? ''}
                      onChange={(e) => onRowChange({ ...box, buttonText: e.target.value })}
                      placeholder="Appointment Now"
                    />
                  </FormField>
                  <FormField label="Button URL">
                    <Input
                      value={box.buttonHref ?? ''}
                      onChange={(e) => onRowChange({ ...box, buttonHref: e.target.value })}
                      placeholder="/appointments"
                    />
                  </FormField>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── Counter section editor ── */
function CounterSectionEditor({ counter, onChange }) {
  return (
    <Card padding={0}>
      <SectionHead title="Counter Stats" description="Animated number counters shown below the about section." />
      <div style={{ padding: '0 28px 24px' }}>
        <RepeatableList
          label="Stat"
          items={counter}
          onChange={onChange}
          emptyRow={() => ({ iconSrc: '', countTo: 0, suffix: '+', title: '' })}
          addLabel="Add stat"
          renderRow={(item, _i, onRowChange) => (
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 1fr', gap: 12, alignItems: 'start' }}>
              <FormField label="Icon">
                <ImageUpload value={item.iconSrc} onChange={(url) => onRowChange({ ...item, iconSrc: url })} folder="home/counter" aspect="1 / 1" label={null} help="Small icon PNG." />
              </FormField>
              <FormField label="Count To">
                <Input type="number" value={item.countTo ?? ''} onChange={(e) => onRowChange({ ...item, countTo: Number(e.target.value) })} placeholder="567" />
              </FormField>
              <FormField label="Suffix">
                <Input value={item.suffix ?? ''} onChange={(e) => onRowChange({ ...item, suffix: e.target.value })} placeholder="+" />
              </FormField>
              <FormField label="Label">
                <Input value={item.title ?? ''} onChange={(e) => onRowChange({ ...item, title: e.target.value })} placeholder="Active Clients" />
              </FormField>
            </div>
          )}
        />
      </div>
    </Card>
  );
}

/* ── Service section editor ── */
function ServiceSectionEditor({ service, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Section Heading" description="Overline, title and description for the services block." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Sub-label">
            <Input value={service.subtitle ?? ''} onChange={(e) => p({ subtitle: e.target.value })} placeholder="OUR BEST SERVICE" />
          </FormField>
          <FormField label="Title" required>
            <Input value={service.title ?? ''} onChange={(e) => p({ title: e.target.value })} placeholder="High-Quality Services This Doctor" style={{ fontWeight: 600 }} />
          </FormField>
          <FormField label="Description">
            <Textarea rows={3} value={service.description ?? ''} onChange={(e) => p({ description: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card padding={0}>
        <SectionHead title="Service Cards" description="Each card shows an icon, title, subtitle and link." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Service"
            items={service.services ?? []}
            onChange={(services) => p({ services })}
            emptyRow={() => ({ iconSrc: '', title: '', subtitle: '', link: '/service/service-details', imageSrc: '' })}
            addLabel="Add service"
            renderRow={(item, _i, onRowChange) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: 12, alignItems: 'start' }}>
                  <FormField label="Icon">
                    <ImageUpload value={item.iconSrc} onChange={(url) => onRowChange({ ...item, iconSrc: url })} folder="home/services" aspect="1 / 1" label={null} />
                  </FormField>
                  <FormField label="Title">
                    <Input value={item.title ?? ''} onChange={(e) => onRowChange({ ...item, title: e.target.value })} placeholder="Pharmacology" />
                  </FormField>
                  <FormField label="Link URL">
                    <Input value={item.link ?? ''} onChange={(e) => onRowChange({ ...item, link: e.target.value })} placeholder="/service/service-details" />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 12, alignItems: 'start' }}>
                  <FormField label="Subtitle">
                    <Input value={item.subtitle ?? ''} onChange={(e) => onRowChange({ ...item, subtitle: e.target.value })} placeholder="Short description…" />
                  </FormField>
                  <FormField label="Card Image">
                    <ImageUpload value={item.imageSrc} onChange={(url) => onRowChange({ ...item, imageSrc: url })} folder="home/services" aspect="189 / 174" label={null} />
                  </FormField>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── Brands section editor ── */
function BrandsSectionEditor({ brands, onChange }) {
  return (
    <Card padding={0}>
      <SectionHead title="Brand Logos" description="Logos shown in the scrolling slider strip." />
      <div style={{ padding: '0 28px 24px' }}>
        <RepeatableList
          label="Brand"
          items={brands}
          onChange={onChange}
          emptyRow={() => ({ image: '', altText: '' })}
          addLabel="Add brand"
          renderRow={(item, _i, onRowChange) => (
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, alignItems: 'start' }}>
              <FormField label="Logo">
                <ImageUpload value={item.image} onChange={(url) => onRowChange({ ...item, image: url })} folder="home/brands" aspect="122 / 23" label={null} help="Preferably PNG with transparent bg." />
              </FormField>
              <FormField label="Alt Text">
                <Input value={item.altText ?? ''} onChange={(e) => onRowChange({ ...item, altText: e.target.value })} placeholder="Brand name" />
              </FormField>
            </div>
          )}
        />
      </div>
    </Card>
  );
}

/* ── Video section editor ── */
function VideoSectionEditor({ video, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Headline & Copy" description="Text displayed over the video background." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Main Title">
            <Input value={video.title ?? ''} onChange={(e) => p({ title: e.target.value })} placeholder="We Provide Medical This Services" style={{ fontWeight: 600 }} />
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FormField label="Highlighted Word (accent colour)">
              <Input value={video.highlightedText ?? ''} onChange={(e) => p({ highlightedText: e.target.value })} placeholder="Health" />
            </FormField>
            <FormField label="Title Line 2 (HTML allowed)">
              <Input value={video.title2 ?? ''} onChange={(e) => p({ title2: e.target.value })} placeholder="<br /> Who Generally Alone" />
            </FormField>
          </div>
          <FormField label="Subtitle">
            <Textarea rows={2} value={video.subtitle ?? ''} onChange={(e) => p({ subtitle: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card padding={0}>
        <SectionHead title="Buttons & Video" description="CTA links and the video embed URL." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FormField label="Button 1 Text">
            <Input value={video.btnText ?? ''} onChange={(e) => p({ btnText: e.target.value })} placeholder="Contact Now" />
          </FormField>
          <FormField label="Button 1 URL">
            <Input value={video.btnLink ?? ''} onChange={(e) => p({ btnLink: e.target.value })} placeholder="/contact" />
          </FormField>
          <FormField label="Button 2 Text">
            <Input value={video.btnText1 ?? ''} onChange={(e) => p({ btnText1: e.target.value })} placeholder="Discover More" />
          </FormField>
          <FormField label="Button 2 URL">
            <Input value={video.btnLink1 ?? ''} onChange={(e) => p({ btnLink1: e.target.value })} placeholder="/about" />
          </FormField>
          <FormField label="Video Embed URL" style={{ gridColumn: '1 / -1' }}>
            <Input value={video.videoUrl ?? ''} onChange={(e) => p({ videoUrl: e.target.value })} placeholder="https://youtube.com/embed/…" />
          </FormField>
        </div>
      </Card>

      <Card padding={0}>
        <SectionHead title="Shape Image" description="Decorative spinning shape shown beside the video." />
        <div style={{ padding: '0 28px 24px' }}>
          <ImageUpload value={video.shapeImage} onChange={(url) => p({ shapeImage: url })} folder="home/video" aspect="140 / 164" label={null} help="Decorative PNG (transparent bg)." />
        </div>
      </Card>
    </>
  );
}

/* ── Why Choose Us section editor ── */
function MedicalSolutionEditor({ medicalSolution: ms, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Section Heading" description="Text displayed above the feature cards." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Sub-label">
            <Input value={ms.sectionSubtitle ?? ''} onChange={(e) => p({ sectionSubtitle: e.target.value })} placeholder="OUR CHOOSE US" />
          </FormField>
          <FormField label="Title (HTML allowed for line break)">
            <Input value={ms.sectionTitle ?? ''} onChange={(e) => p({ sectionTitle: e.target.value })} placeholder="More Than Working Now<br> Solution Medical." style={{ fontWeight: 600 }} />
          </FormField>
          <FormField label="Description">
            <Textarea rows={3} value={ms.sectionDescription ?? ''} onChange={(e) => p({ sectionDescription: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card padding={0}>
        <SectionHead title="Main Image" description="Large photo shown beside the cards." />
        <div style={{ padding: '0 28px 24px' }}>
          <div style={{ maxWidth: 200 }}>
            <ImageUpload value={ms.mainImage} onChange={(url) => p({ mainImage: url })} folder="home/solution" aspect="650 / 719" label={null} />
          </div>
        </div>
      </Card>

      <Card padding={0}>
        <SectionHead title="Solution Cards" description="Icon cards stacked beside the main image." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Card"
            items={ms.cards ?? []}
            onChange={(cards) => p({ cards })}
            emptyRow={() => ({ icon: '', index: '', title: '', description: '' })}
            addLabel="Add card"
            renderRow={(item, _i, onRowChange) => (
              <div style={{ display: 'grid', gridTemplateColumns: '100px 60px 1fr', gap: 12, alignItems: 'start' }}>
                <FormField label="Icon">
                  <ImageUpload value={item.icon} onChange={(url) => onRowChange({ ...item, icon: url })} folder="home/solution" aspect="1 / 1" label={null} />
                </FormField>
                <FormField label="#">
                  <Input value={item.index ?? ''} onChange={(e) => onRowChange({ ...item, index: e.target.value })} placeholder="01" />
                </FormField>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <FormField label="Title">
                    <Input value={item.title ?? ''} onChange={(e) => onRowChange({ ...item, title: e.target.value })} placeholder="Medical Service" />
                  </FormField>
                  <FormField label="Description">
                    <Input value={item.description ?? ''} onChange={(e) => onRowChange({ ...item, description: e.target.value })} placeholder="Short description…" />
                  </FormField>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── CTA section editor ── */
function CtaSectionEditor({ cta, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <Card padding={0}>
      <SectionHead title="CTA Banner" description="Call-to-action strip shown between portfolio and team sections." />
      <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FormField label="Title" style={{ gridColumn: '1 / -1' }}>
          <Input value={cta.title ?? ''} onChange={(e) => p({ title: e.target.value })} placeholder="Meet The Team Support" style={{ fontWeight: 600 }} />
        </FormField>
        <FormField label="Subtitle" style={{ gridColumn: '1 / -1' }}>
          <Input value={cta.subtitle ?? ''} onChange={(e) => p({ subtitle: e.target.value })} placeholder="For us, there are because a quality" />
        </FormField>
        <FormField label="Button Text">
          <Input value={cta.buttonText ?? ''} onChange={(e) => p({ buttonText: e.target.value })} placeholder="Contact Now" />
        </FormField>
        <FormField label="Button URL">
          <Input value={cta.buttonLink ?? ''} onChange={(e) => p({ buttonLink: e.target.value })} placeholder="/contact" />
        </FormField>
      </div>
    </Card>
  );
}

/* ── Projects section editor ── */
function ProjectsSectionEditor({ projects, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Section Heading" description="Portfolio section overline, title and description." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Sub-label">
            <Input value={projects.sectionSubtitle ?? ''} onChange={(e) => p({ sectionSubtitle: e.target.value })} placeholder="OUR PORTFOLIO" />
          </FormField>
          <FormField label="Title" required>
            <Input value={projects.sectionTitle ?? ''} onChange={(e) => p({ sectionTitle: e.target.value })} placeholder="All The Great Work That Medical Service" style={{ fontWeight: 600 }} />
          </FormField>
          <FormField label="Description">
            <Textarea rows={3} value={projects.sectionDescription ?? ''} onChange={(e) => p({ sectionDescription: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card padding={0}>
        <SectionHead title="Portfolio Items" description="Cards in the portfolio grid." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Project"
            items={projects.items ?? []}
            onChange={(items) => p({ items })}
            emptyRow={(arr) => ({ id: (arr?.length ?? 0) + 1, title: '', subtitle: '', imageSrc: '', link: '/' })}
            addLabel="Add project"
            renderRow={(item, _i, onRowChange) => (
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, alignItems: 'start' }}>
                <FormField label="Image">
                  <ImageUpload value={item.imageSrc} onChange={(url) => onRowChange({ ...item, imageSrc: url })} folder="home/projects" aspect="907 / 581" label={null} />
                </FormField>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <FormField label="Title">
                    <Input value={item.title ?? ''} onChange={(e) => onRowChange({ ...item, title: e.target.value })} placeholder="Medical Board" />
                  </FormField>
                  <FormField label="Subtitle / Category">
                    <Input value={item.subtitle ?? ''} onChange={(e) => onRowChange({ ...item, subtitle: e.target.value })} placeholder="Medical / Doctor" />
                  </FormField>
                  <FormField label="Link URL">
                    <Input value={item.link ?? ''} onChange={(e) => onRowChange({ ...item, link: e.target.value })} placeholder="/" />
                  </FormField>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── Team section editor ── */
function TeamSectionEditor({ team, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Section Heading" description="Overline and title for the team slider." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Sub-label">
            <Input value={team.subtitle ?? ''} onChange={(e) => p({ subtitle: e.target.value })} placeholder="OUR TEAM MEMBER" />
          </FormField>
          <FormField label="Title (HTML allowed for line break)">
            <Input value={team.title ?? ''} onChange={(e) => p({ title: e.target.value })} placeholder="Meet Our Specialist This Doctor" style={{ fontWeight: 600 }} />
          </FormField>
        </div>
      </Card>
      <Card padding={0}>
        <SectionHead title="Team Members" description="Each card shows a photo, name, role and social links." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Member"
            items={team.members ?? []}
            onChange={(members) => p({ members })}
            emptyRow={() => ({ name: '', profession: '', imageUrl: '', link: '/doctors/doctor-details', facebook: '/', pinterest: '/', twitter: '/', instagram: '/' })}
            addLabel="Add member"
            renderRow={(item, _i, onRowChange) => (
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, alignItems: 'start' }}>
                <FormField label="Photo">
                  <ImageUpload value={item.imageUrl} onChange={(url) => onRowChange({ ...item, imageUrl: url })} folder="home/team" aspect="306 / 429" label={null} />
                </FormField>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <FormField label="Name">
                    <Input value={item.name ?? ''} onChange={(e) => onRowChange({ ...item, name: e.target.value })} placeholder="Dr. Norma Pedric" />
                  </FormField>
                  <FormField label="Role / Profession">
                    <Input value={item.profession ?? ''} onChange={(e) => onRowChange({ ...item, profession: e.target.value })} placeholder="Neurologist" />
                  </FormField>
                  <FormField label="Profile URL">
                    <Input value={item.link ?? ''} onChange={(e) => onRowChange({ ...item, link: e.target.value })} placeholder="/doctors/doctor-details" />
                  </FormField>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <FormField label="Facebook URL">
                      <Input value={item.facebook ?? ''} onChange={(e) => onRowChange({ ...item, facebook: e.target.value })} placeholder="/" />
                    </FormField>
                    <FormField label="Twitter URL">
                      <Input value={item.twitter ?? ''} onChange={(e) => onRowChange({ ...item, twitter: e.target.value })} placeholder="/" />
                    </FormField>
                    <FormField label="Instagram URL">
                      <Input value={item.instagram ?? ''} onChange={(e) => onRowChange({ ...item, instagram: e.target.value })} placeholder="/" />
                    </FormField>
                    <FormField label="Pinterest URL">
                      <Input value={item.pinterest ?? ''} onChange={(e) => onRowChange({ ...item, pinterest: e.target.value })} placeholder="/" />
                    </FormField>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── Testimonials section editor ── */
function TestimonialsSectionEditor({ testimonials: t, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Side Thumbnail" description="Large image shown on the left of the testimonial slider." />
        <div style={{ padding: '0 28px 24px' }}>
          <div style={{ maxWidth: 200 }}>
            <ImageUpload value={t.thumbnail} onChange={(url) => p({ thumbnail: url })} folder="home/testimonials" aspect="484 / 463" label={null} />
          </div>
        </div>
      </Card>
      <Card padding={0}>
        <SectionHead title="Testimonials" description="Individual review cards shown in the slider." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Testimonial"
            items={t.items ?? []}
            onChange={(items) => p({ items })}
            emptyRow={() => ({ rating: 5, subtitle: '', avatar: '', name: '', position: '' })}
            addLabel="Add testimonial"
            renderRow={(item, _i, onRowChange) => (
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, alignItems: 'start' }}>
                <FormField label="Avatar">
                  <ImageUpload value={item.avatar} onChange={(url) => onRowChange({ ...item, avatar: url })} folder="home/testimonials" aspect="1 / 1" label={null} />
                </FormField>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: 10 }}>
                    <FormField label="Name">
                      <Input value={item.name ?? ''} onChange={(e) => onRowChange({ ...item, name: e.target.value })} placeholder="Dr. Mehara Bara" />
                    </FormField>
                    <FormField label="Stars (1–5)">
                      <Input type="number" min={1} max={5} value={item.rating ?? 5} onChange={(e) => onRowChange({ ...item, rating: Number(e.target.value) })} />
                    </FormField>
                  </div>
                  <FormField label="Position / Title">
                    <Input value={item.position ?? ''} onChange={(e) => onRowChange({ ...item, position: e.target.value })} placeholder="Dental Manager" />
                  </FormField>
                  <FormField label="Review Text">
                    <Textarea rows={3} value={item.subtitle ?? ''} onChange={(e) => onRowChange({ ...item, subtitle: e.target.value })} placeholder="Write review text…" />
                  </FormField>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── Process section editor ── */
function ProcessSectionEditor({ process: proc, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <>
      <Card padding={0}>
        <SectionHead title="Section Heading" description="Overline, title and description for the process steps." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Sub-label">
            <Input value={proc.sectionSubtitle ?? ''} onChange={(e) => p({ sectionSubtitle: e.target.value })} placeholder="OUR WORKING PROCESS" />
          </FormField>
          <FormField label="Title (HTML allowed)">
            <Input value={proc.sectionTitle ?? ''} onChange={(e) => p({ sectionTitle: e.target.value })} placeholder="This Doctor Supporting This Patient Work" style={{ fontWeight: 600 }} />
          </FormField>
          <FormField label="Description">
            <Textarea rows={3} value={proc.sectionDescription ?? ''} onChange={(e) => p({ sectionDescription: e.target.value })} />
          </FormField>
        </div>
      </Card>
      <Card padding={0}>
        <SectionHead title="Process Steps" description="Cards shown in the process slider." />
        <div style={{ padding: '0 28px 24px' }}>
          <RepeatableList
            label="Step"
            items={proc.processSlides ?? []}
            onChange={(processSlides) => p({ processSlides })}
            emptyRow={(arr) => ({ id: (arr?.length ?? 0) + 1, imageUrl: '', title: '', subtitle: '', bgImageUrl: '', link: '/' })}
            addLabel="Add step"
            renderRow={(item, _i, onRowChange) => (
              <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1fr', gap: 12, alignItems: 'start' }}>
                <FormField label="Icon">
                  <ImageUpload value={item.imageUrl} onChange={(url) => onRowChange({ ...item, imageUrl: url })} folder="home/process" aspect="1 / 1" label={null} />
                </FormField>
                <FormField label="Background">
                  <ImageUpload value={item.bgImageUrl} onChange={(url) => onRowChange({ ...item, bgImageUrl: url })} folder="home/process" aspect="1 / 1" label={null} help="Card BG photo." />
                </FormField>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <FormField label="Step Title">
                    <Input value={item.title ?? ''} onChange={(e) => onRowChange({ ...item, title: e.target.value })} placeholder="Make Appointment" />
                  </FormField>
                  <FormField label="Subtitle">
                    <Input value={item.subtitle ?? ''} onChange={(e) => onRowChange({ ...item, subtitle: e.target.value })} placeholder="Short description…" />
                  </FormField>
                  <FormField label="Link URL">
                    <Input value={item.link ?? ''} onChange={(e) => onRowChange({ ...item, link: e.target.value })} placeholder="/service/service-details" />
                  </FormField>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </>
  );
}

/* ── Blog section editor ── */
function BlogSectionEditor({ blogSection: bs, onChange }) {
  const p = (patch) => onChange(patch);
  return (
    <Card padding={0}>
      <SectionHead title="Blog Section Heading" description="The heading shown above the blog slider. Posts are pulled automatically from published blog entries." />
      <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <FormField label="Overline Label">
          <Input value={bs.sectionTitle ?? ''} onChange={(e) => p({ sectionTitle: e.target.value })} placeholder="OUR LARGEST BLOG" />
        </FormField>
        <FormField label="Section Title">
          <Input value={bs.sectionSubtitle ?? ''} onChange={(e) => p({ sectionSubtitle: e.target.value })} placeholder="Latest Posts & Articles" style={{ fontWeight: 600 }} />
        </FormField>
        <FormField label="Post Button Text">
          <Input value={bs.btnText ?? ''} onChange={(e) => p({ btnText: e.target.value })} placeholder="Read More" />
        </FormField>
        <div style={{
          padding: '12px 16px', borderRadius: 8,
          background: color.brand50, border: `1px solid ${color.brand200}`,
          fontSize: 13, color: color.brand700, fontFamily: font.family,
        }}>
          Posts are sourced automatically from your published blog entries — manage them in the Blog module.
        </div>
      </div>
    </Card>
  );
}

/* ── About section editor ── */
function AboutSectionEditor({ about, onChange }) {
  const { theme } = useTheme();
  const th = themes[theme];
  const p = (patch) => onChange(patch);

  return (
    <>
      {/* Section heading */}
      <Card padding={0}>
        <SectionHead title="Section Heading" description="Overline label and main title shown above the about content." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Section Sub-label">
            <Input value={about.sectionSubtitle ?? ''} onChange={(e) => p({ sectionSubtitle: e.target.value })} placeholder="OUR ABOUT US" />
          </FormField>
          <FormField label="Section Title" required>
            <Input
              value={about.sectionTitle ?? ''}
              onChange={(e) => p({ sectionTitle: e.target.value })}
              placeholder="More Than 26+ Years About Provide Medical."
              style={{ fontWeight: 600 }}
            />
          </FormField>
          <FormField label="About Text">
            <Textarea rows={4} value={about.aboutText ?? ''} onChange={(e) => p({ aboutText: e.target.value })} placeholder="Short description paragraph…" />
          </FormField>
        </div>
      </Card>

      {/* Experience badge */}
      <Card padding={0}>
        <SectionHead title="Experience Badge" description="Floating badge showing years of experience." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FormField label="Years (e.g. 26+)">
            <Input value={about.experienceYears ?? ''} onChange={(e) => p({ experienceYears: e.target.value })} placeholder="26+" />
          </FormField>
          <FormField label="Label (e.g. Experience)">
            <Input value={about.experienceTitle ?? ''} onChange={(e) => p({ experienceTitle: e.target.value })} placeholder="Experience" />
          </FormField>
        </div>
      </Card>

      {/* Main about image */}
      <Card padding={0}>
        <SectionHead title="Main Photo" description="Large photo shown on the left side of the about section." />
        <div style={{ padding: '0 28px 24px' }}>
          <div style={{ maxWidth: 260 }}>
            <ImageUpload
              value={about.mainImage}
              onChange={(url) => p({ mainImage: url })}
              folder="home/about"
              aspect="680 / 751"
              label={null}
              help="Main about section photo."
            />
          </div>
        </div>
      </Card>

      {/* Icon boxes */}
      <Card padding={0}>
        <SectionHead title="Icon Boxes" description="Two small cards shown beside the about text (Client Support / Doctor Support)." />
        <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { label: 'Box 1', titleKey: 'title',  iconKey: 'iconUrl',  imgKey: 'imgUrl'  },
            { label: 'Box 2', titleKey: 'title2', iconKey: 'iconUrl2', imgKey: 'imgUrl2' },
          ].map(({ label, titleKey, iconKey, imgKey }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: th.textFaint, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 72px 180px', gap: 16, alignItems: 'start' }}>
                <FormField label="Title">
                  <Input value={about[titleKey] ?? ''} onChange={(e) => p({ [titleKey]: e.target.value })} placeholder="Client Support" />
                </FormField>
                <FormField label="Icon">
                  <div style={{ width: 72 }}>
                    <ImageUpload value={about[iconKey]} onChange={(url) => p({ [iconKey]: url })} folder="home/about" aspect="1 / 1" label={null} help="Icon PNG." />
                  </div>
                </FormField>
                <FormField label="Photo">
                  <ImageUpload value={about[imgKey]} onChange={(url) => p({ [imgKey]: url })} folder="home/about" aspect="16 / 9" label={null} help="Small photo." />
                </FormField>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Icon box check line */}
      <Card padding={0}>
        <SectionHead title="Checkmark Line" description="A tick icon with a short sentence and read-more link." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 160px 160px', gap: 16 }}>
          <FormField label="Text">
            <Input value={about.aboutIconboxSubtitle ?? ''} onChange={(e) => p({ aboutIconboxSubtitle: e.target.value })} placeholder="There are many variations…" />
          </FormField>
          <FormField label="Link Text">
            <Input value={about.readMoreText ?? ''} onChange={(e) => p({ readMoreText: e.target.value })} placeholder="READ MORE +" />
          </FormField>
          <FormField label="Link URL">
            <Input value={about.readMoreLink ?? ''} onChange={(e) => p({ readMoreLink: e.target.value })} placeholder="/" />
          </FormField>
        </div>
      </Card>

      {/* Buttons */}
      <Card padding={0}>
        <SectionHead title="Action Buttons" description="Video play button and 'About More' CTA." />
        <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FormField label="Video Button Text">
            <Input value={about.videoText ?? ''} onChange={(e) => p({ videoText: e.target.value })} placeholder="How We Work" />
          </FormField>
          <FormField label="Video Embed URL">
            <Input value={about.videoLink ?? ''} onChange={(e) => p({ videoLink: e.target.value })} placeholder="https://youtube.com/embed/…" />
          </FormField>
          <FormField label="CTA Button Text">
            <Input value={about.aboutMoreText ?? ''} onChange={(e) => p({ aboutMoreText: e.target.value })} placeholder="About More" />
          </FormField>
          <FormField label="CTA Button URL">
            <Input value={about.aboutMoreLink ?? ''} onChange={(e) => p({ aboutMoreLink: e.target.value })} placeholder="/about" />
          </FormField>
        </div>
      </Card>

      {/* Section decoration image */}
      <Card padding={0}>
        <SectionHead title="Decorative Section Image" description="Floating image displayed at the edge of the section." />
        <div style={{ padding: '0 28px 24px' }}>
          <div style={{ maxWidth: 200 }}>
            <ImageUpload
              value={about.sectionImageUrl}
              onChange={(url) => p({ sectionImageUrl: url })}
              folder="home/about"
              aspect="228 / 248"
              label={null}
              help="Decorative accent image (transparent PNG recommended)."
            />
          </div>
        </div>
      </Card>
    </>
  );
}

function SectionHead({ title, description }) {
  const { theme } = useTheme();
  const th = themes[theme];
  return (
    <div style={{
      padding: '20px 28px 18px', borderBottom: `1px solid ${th.border}`,
      fontFamily: font.family,
    }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: th.text, letterSpacing: '-0.01em' }}>{title}</h3>
      {description && <p style={{ margin: '4px 0 0', fontSize: 13, color: th.textSubtle }}>{description}</p>}
    </div>
  );
}
