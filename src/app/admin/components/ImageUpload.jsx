"use client"
import React, { useRef, useState, useCallback } from 'react';
import { color, radius, font } from './theme';
import { useTheme, themes } from '../context/ThemeContext';
import Button from './Button';

const ACCEPT = 'image/*';
const MAX_MB = 10;

/**
 * <ImageUpload value={url} onChange={setUrl} folder="blog" />
 */
export default function ImageUpload({ value, onChange, folder = 'blog', label = 'Featured image', help, aspect = '16 / 9' }) {
  const { theme } = useTheme();
  const th = themes[theme];
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = useCallback(async (file) => {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setError(`Image must be under ${MAX_MB}MB.`); return; }

    setUploading(true); setProgress(0);
    try {
      const url = await xhrUpload(file, folder, setProgress);
      onChange?.(url);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false); setProgress(0);
    }
  }, [folder, onChange]);

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) upload(file);
  };

  const hasImage = !!value;

  return (
    <div style={{ fontFamily: font.family }}>
      {label && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: th.text }}>{label}</span>
          {hasImage && !uploading && (
            <button type="button" onClick={() => onChange?.('')} style={{
              background: 'transparent', border: 'none', color: color.danger,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0,
            }}>Remove</button>
          )}
        </div>
      )}

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        style={{
          position: 'relative',
          border: `${dragging ? 2 : 1}px dashed ${dragging ? color.brand500 : hasImage ? th.border : th.borderStrong}`,
          borderRadius: radius.lg,
          background: dragging ? 'rgba(16,185,129,0.08)' : hasImage ? th.surface : th.surfaceHover,
          overflow: 'hidden',
          cursor: uploading ? 'progress' : 'pointer',
          transition: 'background-color .15s, border-color .15s',
          aspectRatio: aspect,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {hasImage && !uploading && (
          <>
            <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.65), rgba(15,23,42,0))',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 14,
              opacity: 0, transition: 'opacity .15s',
            }}
              onMouseOver={e => e.currentTarget.style.opacity = '1'}
              onMouseOut={e => e.currentTarget.style.opacity = '0'}
            >
              <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
                <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()} icon={<UploadIcon />}>Replace</Button>
                <Button size="sm" variant="danger" onClick={() => onChange?.('')} icon={<TrashIcon />}>Remove</Button>
              </div>
            </div>
          </>
        )}

        {!hasImage && !uploading && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            padding: '24px 16px', gap: 10,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', background: color.brand50,
              color: color.brand600, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${color.brand200}`,
            }}>
              <UploadIcon size={22} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: th.text }}>
              Drop an image, or <span style={{ color: color.brand600 }}>click to browse</span>
            </div>
            <div style={{ fontSize: 12, color: th.textSubtle }}>
              Any image format · saved as WebP · max {MAX_MB}MB
            </div>
          </div>
        )}

        {uploading && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '24px 16px', gap: 12, width: '80%',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: th.text }}>Uploading… {progress}%</div>
            <div style={{ width: '100%', height: 6, borderRadius: 999, background: th.border, overflow: 'hidden' }}>
              <div style={{
                width: `${progress}%`, height: '100%', background: color.brand500,
                transition: 'width .15s',
              }} />
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef} type="file" accept={ACCEPT} style={{ display: 'none' }}
        onChange={e => upload(e.target.files?.[0])}
      />

      {(error || help) && (
        <p style={{
          margin: '8px 0 0', fontSize: 12,
          color: error ? color.danger : th.textSubtle,
        }}>{error || help}</p>
      )}
    </div>
  );
}

function xhrUpload(file, folder, onProgress) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/uploads');
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) onProgress?.(Math.round((evt.loaded / evt.total) * 100));
    };
    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(body.url);
        else reject(new Error(body.error || 'Upload failed'));
      } catch { reject(new Error('Unexpected server response')); }
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(form);
  });
}

function UploadIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 20h16" /></svg>;
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12m-9 4v6m6-6v6M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /></svg>;
}
