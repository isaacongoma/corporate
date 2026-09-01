import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const members = await prisma.salesTeamMember.findMany({ orderBy: { revenue: 'desc' } });
  return NextResponse.json(members);
}

export async function POST(req) {
  const body = await req.json();
  if (body.joinDate) body.joinDate = new Date(body.joinDate);
  const member = await prisma.salesTeamMember.create({ data: body });
  return NextResponse.json(member, { status: 201 });
}
