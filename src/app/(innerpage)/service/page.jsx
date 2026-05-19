import PageHeading from '@/app/Components/PageHeading';
import Section from '@/app/Components/Section';
import Service from '@/app/Components/Service';
import React from 'react';
import prisma from '@/lib/prisma';

export default async function ServicesPage() {
  const pageData = await prisma.page.findUnique({ where: { slug: 'services' } });
  const content = pageData?.content || {};
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });

  const headingData = { title: pageData?.title || 'Our Services' };

  const serviceData = {
    subtitle: 'PREMIUM SERVICES',
    title: content.heading || 'Comprehensive Security Solutions',
    description: content.description || 'Explore our wide range of professional security services.',
    services: services.map((s, i) => ({
      backgroundImage: '/assets/img/service_bg.jpg',
      iconUrl: s.icon || '/assets/img/icons/service_icon_1.png',
      index: (i + 1).toString().padStart(2, '0'),
      title: s.title,
      subtitle: s.description,
      link: '/contact',
    })),
    footerIcon: '/assets/img/icons/service_footer_icon_1.png',
    footerText: 'Delivering tomorrow’s security solutions for your business.',
    footerLink: '/contact',
    footerLinkText: 'GET A QUOTE',
  };

  return (
    <div>
      <Section className={'cs_page_heading cs_bg_filed cs_center'} backgroundImage="/assets/img/page_heading_bg.jpg">
        <PageHeading data={headingData} />
      </Section>
      <Section topSpaceLg="80" topSpaceMd="120" bottomSpaceLg="80" bottomSpaceMd="120">
        <Service data={serviceData} />
      </Section>
    </div>
  );
}