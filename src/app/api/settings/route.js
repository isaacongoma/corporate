import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.setting.findFirst();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const existing = await prisma.setting.findFirst();
    if (existing) {
      const updated = await prisma.setting.update({
        where: { id: existing.id },
        data
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.setting.create({ data });
      return NextResponse.json(created);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
