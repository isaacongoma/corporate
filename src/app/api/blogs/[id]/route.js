import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_request, { params }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(params.id, 10) },
    });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updated = await prisma.blog.update({
      where: { id: parseInt(params.id, 10) },
      data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    await prisma.blog.delete({ where: { id: parseInt(params.id, 10) } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
