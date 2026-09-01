import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const search = searchParams.get('search');

  const where = {};
  if (type) where.type = type;
  if (search) where.OR = [
    { name: { contains: search } },
    { email: { contains: search } },
    { industry: { contains: search } },
  ];

  const customers = await prisma.salesCustomer.findMany({
    where,
    include: { deals: { select: { id: true, status: true } } },
    orderBy: { revenue: 'desc' },
  });

  return NextResponse.json(customers);
}

export async function POST(req) {
  const body = await req.json();
  const customer = await prisma.salesCustomer.create({ data: body });
  return NextResponse.json(customer, { status: 201 });
}
