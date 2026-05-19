import ContactSection from '@/app/Components/ContactSection';
import LocationMap from '@/app/Components/LocationMap/Index';
import PageHeading from '@/app/Components/PageHeading';
import Section from '@/app/Components/Section';
import React from 'react';
import prisma from '@/lib/prisma';

export default async function ContactPage() {
  const settings = await prisma.setting.findFirst();
  
  const headingData = {
    backgroundImage: '/assets/img/page_heading_bg.jpg',
    title: 'Contact Us',
  };
  
  const contactData = {
    sectionSubtitle: 'CONTACT US',
    SectionTitle: 'Get In Touch For Professional Security',
    teethShapeImg: '/assets/img/icons/hero_shape_3.png',
    contactImg: '/assets/img/contact_2.png',
    iconBox: {
      style: 'cs_style_4',
      icon: '/assets/img/icons/call_icon_1.png',
      title: 'Emergency Call',
      subtitle: settings?.phoneNumbers || '24/7 – Support and rapid response',
    },
  };
  
  const mapData = {
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036281522!2d36.70730744805044!3d-1.3032051502422032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus',
  };

  return (
    <div>
      <Section className={'cs_page_heading cs_bg_filed cs_center'} backgroundImage="/assets/img/page_heading_bg.jpg">
        <PageHeading data={headingData} />
      </Section>
      <Section topSpaceLg="70" topSpaceMd="110" bottomSpaceLg="80" bottomSpaceMd="120">
        <ContactSection reverseOrder={true} data={contactData} />
      </Section>
      <Section bottomSpaceLg="0" bottomSpaceMd="0">
        <LocationMap mapSrc={mapData.mapSrc} />
      </Section>
    </div>
  );
}