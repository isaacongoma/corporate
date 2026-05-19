import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { pageDefaults, mergeWithDefaults } from '@/lib/homeDefaults';
import HomePageEditor from '../../components/HomePageEditor';
import GenericPageEditor from '../../components/GenericPageEditor';

export default async function EditPage({ params }) {
  const { slug } = params;

  let page = await prisma.page.findUnique({ where: { slug } });

  if (!page && pageDefaults[slug]) {
    const seed = pageDefaults[slug];
    page = await prisma.page.create({
      data: { slug, title: seed.title, content: seed.content },
    });
  }

  if (!page) notFound();

  if (pageDefaults[slug]) {
    page = { ...page, content: mergeWithDefaults(pageDefaults[slug].content, page.content) };
  }

  if (slug === 'home') {
    return <HomePageEditor initial={page} />;
  }

  return <GenericPageEditor initial={page} />;
}
