import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const stage = searchParams.get('stage');
  const search = searchParams.get('search');

  const where = {};
  if (status && status !== 'All') where.status = status;
  if (stage) where.stage = stage;
  if (search) where.OR = [
    { company: { contains: search } },
    { contact: { contains: search } },
    { rep: { contains: search } },
  ];

  const deals = await prisma.salesDeal.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(deals);
}

export async function POST(req) {
  const body = await req.json();
  if (body.closeDate) body.closeDate = new Date(body.closeDate);
  const deal = await prisma.salesDeal.create({ data: body });
  return NextResponse.json(deal, { status: 201 });
}
