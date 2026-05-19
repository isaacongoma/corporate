import { NextResponse } from 'next/server';
import path from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB – accept larger originals before conversion
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/tiff', 'image/bmp', 'image/svg+xml']);

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const folder = (form.get('folder') || 'blog').toString().replace(/[^a-z0-9_-]/gi, '');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 415 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File exceeds 10MB.' }, { status: 413 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const stem = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    const dir = path.join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(dir, { recursive: true });

    let name, outBytes;

    if (file.type === 'image/svg+xml') {
      // SVGs are already vector — save as-is
      name = `${stem}.svg`;
      outBytes = bytes;
    } else {
      // Convert everything else to WebP
      name = `${stem}.webp`;
      outBytes = await sharp(bytes)
        .webp({ quality: 82 })
        .toBuffer();
    }

    await writeFile(path.join(dir, name), outBytes);

    return NextResponse.json({
      url: `/uploads/${folder}/${name}`,
      name,
      size: outBytes.length,
      type: file.type === 'image/svg+xml' ? 'image/svg+xml' : 'image/webp',
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
