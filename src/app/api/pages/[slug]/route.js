import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { pageDefaults, mergeWithDefaults } from '@/lib/homeDefaults';

export async function GET(request, { params }) {
  try {
    const slug = params.slug;
    let page = await prisma.page.findUnique({ where: { slug } });

    if (!page && pageDefaults[slug]) {
      const seed = pageDefaults[slug];
      page = await prisma.page.create({
        data: { slug, title: seed.title, content: seed.content },
      });
    }

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    if (pageDefaults[slug]) {
      page = { ...page, content: mergeWithDefaults(pageDefaults[slug].content, page.content) };
    }

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const slug = params.slug;
    const data = await request.json();
    const updated = await prisma.page.update({
      where: { slug },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
