import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_, { params }) {
  const deal = await prisma.salesDeal.findUnique({ where: { id: Number(params.id) } });
  if (!deal) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(deal);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  if (body.closeDate) body.closeDate = new Date(body.closeDate);
  const deal = await prisma.salesDeal.update({ where: { id: Number(params.id) }, data: body });
  return NextResponse.json(deal);
}

export async function DELETE(_, { params }) {
  await prisma.salesDeal.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
