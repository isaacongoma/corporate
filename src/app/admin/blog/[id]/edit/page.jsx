import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogEditor from '../../../components/BlogEditor';

export default async function EditBlogPost({ params }) {
  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) notFound();
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) notFound();
  return <BlogEditor mode="edit" initial={blog} />;
}
