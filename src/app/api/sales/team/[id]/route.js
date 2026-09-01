import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const body = await req.json();
  if (body.joinDate) body.joinDate = new Date(body.joinDate);
  const member = await prisma.salesTeamMember.update({ where: { id: Number(params.id) }, data: body });
  return NextResponse.json(member);
}

export async function DELETE(_, { params }) {
  await prisma.salesTeamMember.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
