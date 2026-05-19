import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import prisma from '@/lib/prisma';

async function getLogo() {
  const s = await prisma.setting.findFirst({ select: { logo: true } }).catch(() => null);
  return s?.logo || null;
}

const DefalultLayout = async ({ children }) => {
  const logoUrl = await getLogo();
  return (
    <div className='main-page-area'>
      <Header logoUrl={logoUrl} />
      {children}
      <Footer />
    </div>
  );
};

export default DefalultLayout;