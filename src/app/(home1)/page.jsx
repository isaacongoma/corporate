import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection1 from '../Components/HeroSection/HeroSection1';
import Section from '../Components/Section';
import AboutSection1 from '../Components/About/AboutSection1';

const CounterSection2    = dynamic(() => import('../Components/FunSection/CounterSection2'));
const ServiceSection2    = dynamic(() => import('../Components/Service/ServiceSection2'));
const BrandsSlider       = dynamic(() => import('../Components/BrandsSection'));
const VideoSection       = dynamic(() => import('../Components/VideoSection'));
const MedicalSolution    = dynamic(() => import('../Components/MedicalSolutionSection/MedicalSolution1'));
const CtaSection2        = dynamic(() => import('../Components/CtaSection/CtaSection2'));
const ProjectsSection1   = dynamic(() => import('../Components/ProjectSection/ProjectsSection1'));
const TeamSection        = dynamic(() => import('../Components/TeamSection'));
const TestimonialSection = dynamic(() => import('../Components/TestimonialSection'));
const ProcessSection     = dynamic(() => import('../Components/ProcessSection'));
const BlogSection        = dynamic(() => import('../Components/BlogsSection'));
import prisma from '@/lib/prisma';
import { defaultHomeContent, mergeWithDefaults } from '@/lib/homeDefaults';

async function getPageData() {
  const [page, rawBlogs] = await Promise.all([
    prisma.page.findUnique({ where: { slug: 'home' } }).catch(() => null),
    prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: { title: true, excerpt: true, content: true, slug: true, featuredImage: true, createdAt: true },
    }).catch(() => []),
  ]);

  const content = page
    ? mergeWithDefaults(defaultHomeContent, page.content)
    : defaultHomeContent;

  return { content, rawBlogs };
}

function toBlogPost(b) {
  return {
    title: b.title,
    subtitle: b.excerpt || b.content?.replace(/<[^>]+>/g, '').substring(0, 100) + '...' || '',
    day: new Date(b.createdAt).getDate(),
    month: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short' }),
    category: 'Security',
    author: 'Admin',
    comments: '0 Comments',
    image: b.featuredImage || '/assets/img/post_1.jpeg',
    linkText: 'Read More',
    link: `/blog/${b.slug}`,
  };
}

function toProjectsData(p) {
  return { ...p, projects: p.items ?? p.projects ?? [] };
}

function toTeamData(t) {
  return { ...t, sliderData: t.members ?? t.sliderData ?? [] };
}

function toTestimonialsData(t) {
  return { ...t, testimonials: t.items ?? t.testimonials ?? [] };
}

export default async function Home() {
  const { content: c, rawBlogs } = await getPageData();

  const blogData = {
    sectionTitle: 'OUR LATEST BLOG',
    sectionSubtitle: 'Latest Posts & Articles',
    blogsData: rawBlogs.map(toBlogPost),
  };

  const SectionFallback = () => <div style={{ minHeight: 120 }} />;

  return (
    <div>
      <HeroSection1 data={c.hero} />

      <Section topSpaceLg="80" topSpaceMd="120" bottomSpaceLg="80" bottomSpaceMd="120" className="cs_about cs_style_1 cs_type_1 position-relative">
        <AboutSection1 data={c.about} />
      </Section>

      <Suspense fallback={<SectionFallback />}>
        <Section bottomSpaceLg="80" bottomSpaceMd="120" className="cs_counter_area_2">
          <CounterSection2 data={c.counter} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="110" bottomSpaceLg="80" bottomSpaceMd="120" className="cs_blue_bg cs_bg_filed" backgroundImage="/assets/img/service_bg_3.jpg">
          <ServiceSection2 data={c.service} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="90" className="cs_brands_section">
          <BrandsSlider hr={true} data={c.brands} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="120" bottomSpaceLg="80" bottomSpaceMd="120" className="cs_video_area position-relative">
          <VideoSection data={c.video} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section className="cs_blue_bg position-relative" backgroundImage="/assets/img/medical_solution_bg_1.jpg">
          <MedicalSolution data={c.medicalSolution} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section className="cs_cta cs_style_3 cs_accent_bg">
          <CtaSection2 data={c.cta} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="110">
          <ProjectsSection1 data={toProjectsData(c.projects)} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="110" className="cs_team_section position-relative">
          <TeamSection variant="cs_pagination cs_style_2 cs_accent_color" bgColor={true} data={toTeamData(c.team)} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="80" topSpaceMd="120" bottomSpaceLg="80" bottomSpaceMd="120" className="cs_testimonial_area" backgroundImage="/assets/img/testomonial_bg_1.png">
          <TestimonialSection data={toTestimonialsData(c.testimonials)} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="110" bottomSpaceLg="80" bottomSpaceMd="120" className="cs_gray_bg_2">
          <ProcessSection data={c.process} />
        </Section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Section topSpaceLg="70" topSpaceMd="110" bottomSpaceLg="80" bottomSpaceMd="120">
          <BlogSection data={blogData} />
        </Section>
      </Suspense>
    </div>
  );
}
