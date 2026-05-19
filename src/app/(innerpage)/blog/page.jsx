import BlogsSection1 from '@/app/Components/BlogsSection/BlogsSection1';
import PageHeading from '@/app/Components/PageHeading';
import Section from '@/app/Components/Section';
import React from 'react';
import prisma from '@/lib/prisma';

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  
  const headingData = { title: 'Blog & News' };
  
  const blogsSectionData = {
    sectionSubtitle: 'LATEST INSIGHTS',
    sectionTitle: 'Security Articles & News',
    blogsData: blogs.map(b => ({
      id: b.id,
      category: 'Security',
      day: new Date(b.createdAt).getDate(),
      month: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short' }),
      author: 'Admin',
      comments: '0 Comments',
      title: b.title,
      subtitle: b.content.replace(/<[^>]+>/g, '').substring(0, 80) + '...',
      image: b.featuredImage || '/assets/img/post_1.jpeg',
      link: `/blog/${b.slug}`,
      linkText: 'Read More',
    }))
  };

  return (
    <div>
      <Section className={'cs_page_heading cs_bg_filed cs_center'} backgroundImage="/assets/img/page_heading_bg.jpg">
        <PageHeading data={headingData} />
      </Section>           
      <Section topSpaceLg="70" topSpaceMd="110" bottomSpaceLg="80" bottomSpaceMd="120">
        <BlogsSection1 data={blogsSectionData} />
      </Section>
    </div>
  );
}