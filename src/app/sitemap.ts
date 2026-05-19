import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://primewatchsecurity.co.ke';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/about`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/service`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  ];

  const blogs = await prisma.blog.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
