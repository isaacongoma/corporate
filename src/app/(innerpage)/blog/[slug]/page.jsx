import BlogsLeft from '@/app/Components/BlogsDetailsSide/BlogsLeft';
import BlogsRight from '@/app/Components/BlogsDetailsSide/BlogsRight';
import PageHeading from '@/app/Components/PageHeading';
import Section from '@/app/Components/Section';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug }, select: { title: true, excerpt: true } });
  if (!blog) return { title: 'Not Found' };
  return { title: blog.title, description: blog.excerpt };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = params;

  const [blog, recentBlogs] = await Promise.all([
    prisma.blog.findUnique({ where: { slug } }),
    prisma.blog.findMany({
      where: { NOT: { slug } },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { title: true, slug: true, featuredImage: true, createdAt: true },
    }),
  ]);

  if (!blog) notFound();

  const leftData = {
    imageSrc: blog.featuredImage || '/assets/img/post_details_1.jpeg',
    text: 'Admin',
    secText: new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    htmlContent: blog.content,
    thirdSecTitle: 'Leave a Comment',
    commentTitle: `Comments`,
    comments: [],
    serviceOption: [],
  };

  const rightData = {
    searchPlaceholder: 'Search....',
    secTitle: 'Categories',
    service: {
      backgroundImage: '/assets/img/suegery_overlay.jpg',
      icon: '/assets/img/icons/service_icon_19.png',
      title: 'Our Services',
      subtitle: 'Professional security solutions tailored for you',
      link: '/service',
    },
    recentPosts: recentBlogs.map(b => ({
      imgSrc: b.featuredImage || '/assets/img/latest_post_1.jpeg',
      date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: b.title,
      link: `/blog/${b.slug}`,
    })),
    categories: [
      { name: 'Security',   link: '/blog' },
      { name: 'Technology', link: '/blog' },
      { name: 'Safety',     link: '/blog' },
    ],
    secTitle2: 'Tags',
    tags: [
      { tagTitle: 'Security',  tagUrl: '/blog' },
      { tagTitle: 'Safety',    tagUrl: '/blog' },
      { tagTitle: 'Business',  tagUrl: '/blog' },
      { tagTitle: 'Kenya',     tagUrl: '/blog' },
    ],
  };

  return (
    <div>
      <Section
        className="cs_page_heading cs_bg_filed cs_center"
        backgroundImage="/assets/img/page_heading_bg.jpg"
      >
        <PageHeading data={{ title: blog.title }} />
      </Section>

      <Section topSpaceLg="80" topSpaceMd="120" bottomSpaceLg="80" bottomSpaceMd="120">
        <div className="container">
          <div className="row">
            <BlogsLeft data={leftData} />
            <BlogsRight data={rightData} />
          </div>
        </div>
      </Section>
    </div>
  );
}
