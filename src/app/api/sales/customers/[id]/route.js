import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_, { params }) {
  const customer = await prisma.salesCustomer.findUnique({
    where: { id: Number(params.id) },
    include: { deals: true },
  });
  if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(customer);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const customer = await prisma.salesCustomer.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(customer);
}

export async function DELETE(_, { params }) {
  await prisma.salesCustomer.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
