import React from 'react';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import prisma from '@/lib/prisma';

async function getLogo() {
  const s = await prisma.setting.findFirst({ select: { logo: true } }).catch(() => null);
  return s?.logo || null;
}

const layout = async ({ children }) => {
  const logoUrl = await getLogo();
  return (
    <div className='main-page-area2'>
      <Header isTopBar={true} logoUrl={logoUrl} />
      {children}
      <Footer />
    </div>
  );
};

export default layout;