import About from '@/app/Components/About';
import CtaSection1 from '@/app/Components/CtaSection/CtaSection1';
import CounterSection2 from '@/app/Components/FunSection/CounterSection2';
import PageHeading from '@/app/Components/PageHeading';
import Section from '@/app/Components/Section';
import TeamSection from '@/app/Components/TeamSection';
import React from 'react';
import prisma from '@/lib/prisma';
import { defaultAboutContent, mergeWithDefaults } from '@/lib/homeDefaults';

async function getAboutContent() {
  try {
    const page = await prisma.page.findUnique({ where: { slug: 'about' } });
    if (!page) return defaultAboutContent;
    return mergeWithDefaults(defaultAboutContent, page.content);
  } catch {
    return defaultAboutContent;
  }
}

/* TeamSection expects sliderData; DB stores members */
function toTeamData(t) {
  return { ...t, sliderData: t.members ?? t.sliderData ?? [] };
}

export default async function AboutPage() {
  const c = await getAboutContent();

  return (
    <div className="about-page-area">
      {/* Page Heading */}
      <Section
        className="cs_page_heading cs_bg_filed cs_center"
        backgroundImage={c.heading?.backgroundImage || '/assets/img/page_heading_bg.jpg'}
      >
        <PageHeading data={{ title: c.heading?.title || 'About Us' }} />
      </Section>

      {/* About */}
      <Section
        topSpaceLg="70"
        topSpaceMd="120"
        bottomSpaceLg="80"
        bottomSpaceMd="120"
        className="cs_about cs_style_1 position-relative"
      >
        <About data={c.about} />
      </Section>

      {/* Counter */}
      <Section bottomSpaceLg="80" bottomSpaceMd="120" className="cs_counter_area_2">
        <CounterSection2 data={c.counter} />
      </Section>

      {/* CTA / Video */}
      <Section
        topSpaceLg="70"
        topSpaceMd="110"
        bottomSpaceLg="80"
        bottomSpaceMd="120"
        className="cs_cta cs_style_2 cs_blue_bg cs_bg_filed cs_center"
        backgroundImage="/assets/img/cta_bg_1.jpeg"
      >
        <CtaSection1 data={c.cta} />
      </Section>

      {/* Team */}
      <Section topSpaceLg="70" topSpaceMd="110" bottomSpaceLg="80" bottomSpaceMd="0">
        <TeamSection hr={true} variant="cs_pagination cs_style_2" data={toTeamData(c.team)} />
      </Section>
    </div>
  );
}
