import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// We get the first user since there is no session tracking yet in this mock
export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    // Remove password from response
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const user = await prisma.user.findFirst();
    
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address
    };

    if (data.password && data.password.trim() !== '') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData
    });

    const { password, ...safeUser } = updatedUser;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
