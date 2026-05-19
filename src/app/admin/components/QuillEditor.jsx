"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { color, radius, font } from './theme';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <QuillPlaceholder />,
});

const TOOLBAR = [
  [{ header: [2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
  ['clean'],
];

export default function QuillEditor({ value, onChange, placeholder = 'Write your article…', minHeight = 360 }) {
  return (
    <>
      <div style={{ fontFamily: font.family }}>
        <ReactQuill
          theme="snow"
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          modules={{ toolbar: TOOLBAR, clipboard: { matchVisual: false } }}
        />
      </div>
      <style jsx global>{`
        .ql-container, .ql-toolbar {
          border-color: ${color.border} !important;
          font-family: ${font.family} !important;
        }
        .ql-toolbar {
          border-top-left-radius: ${radius.md};
          border-top-right-radius: ${radius.md};
          background: ${color.surfaceAlt};
          padding: 8px 10px !important;
        }
        .ql-container {
          border-bottom-left-radius: ${radius.md};
          border-bottom-right-radius: ${radius.md};
          font-size: 15px;
          line-height: 1.6;
          background: ${color.surface};
        }
        .ql-editor {
          min-height: ${minHeight}px;
          padding: 18px 20px !important;
          color: ${color.text};
        }
        .ql-editor.ql-blank::before {
          color: ${color.textFaint};
          font-style: normal;
          left: 20px;
          right: 20px;
        }
        .ql-snow .ql-stroke { stroke: ${color.textMuted}; }
        .ql-snow .ql-fill   { fill: ${color.textMuted}; }
        .ql-snow .ql-picker { color: ${color.textMuted}; }
        .ql-snow .ql-toolbar button:hover .ql-stroke,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .ql-snow .ql-picker-label:hover .ql-stroke,
        .ql-snow .ql-picker-label.ql-active .ql-stroke,
        .ql-snow .ql-picker-item:hover .ql-stroke,
        .ql-snow .ql-picker-item.ql-selected .ql-stroke { stroke: ${color.brand600} !important; }
        .ql-snow .ql-toolbar button:hover .ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .ql-snow .ql-picker-label:hover .ql-fill,
        .ql-snow .ql-picker-label.ql-active .ql-fill,
        .ql-snow .ql-picker-item:hover .ql-fill,
        .ql-snow .ql-picker-item.ql-selected .ql-fill { fill: ${color.brand600} !important; }
        .ql-snow .ql-toolbar button:hover,
        .ql-snow .ql-toolbar button.ql-active,
        .ql-snow .ql-picker-label:hover,
        .ql-snow .ql-picker-label.ql-active,
        .ql-snow .ql-picker-item:hover,
        .ql-snow .ql-picker-item.ql-selected { color: ${color.brand600} !important; }
        .ql-editor blockquote {
          border-left: 3px solid ${color.brand500};
          background: ${color.brand50};
          padding: 10px 14px;
          color: ${color.text};
          border-radius: 0 ${radius.md} ${radius.md} 0;
        }
        .ql-editor h2 { font-size: 24px; font-weight: 700; letter-spacing: -0.01em; margin: 18px 0 10px; }
        .ql-editor h3 { font-size: 20px; font-weight: 700; margin: 16px 0 8px; }
        .ql-editor h4 { font-size: 17px; font-weight: 600; margin: 14px 0 6px; }
        .ql-editor a  { color: ${color.brand600}; }
      `}</style>
    </>
  );
}

function QuillPlaceholder() {
  return (
    <div style={{
      border: `1px solid ${color.border}`, borderRadius: radius.md,
      minHeight: 400, background: color.surfaceAlt,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: color.textSubtle, fontSize: 13,
    }}>Loading editor…</div>
  );
}
