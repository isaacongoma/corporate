import { Rubik, Poppins } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './sass/style.scss';
import prisma from '@/lib/prisma';
import NextTopLoader from 'nextjs-toploader';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--body-font',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--heading-font',
});

export const metadata = {
  title: {
    absolute: '',
    default: 'Prime Watch Security Group | Professional Security Services in Kenya',
    template: '%s | Prime Watch Security Group',
  },
  description: 'Prime Watch Security Group delivers professional manned guarding, mobile patrol, CCTV surveillance, and event security services across Kenya.',
  openGraph: {
    title: 'Prime Watch Security Group',
    description: 'Professional security services trusted by businesses and individuals across Kenya.',
    image: '/assets/img/logo.svg',
  },
};

async function getFavicon() {
  const s = await prisma.setting.findFirst({ select: { favicon: true } }).catch(() => null);
  return s?.favicon || '/favicon.ico';
}

export default async function RootLayout({ children }) {
  const favicon = await getFavicon();
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Prime Watch Security" />
        <link rel="icon" href={favicon} sizes="any" />
      </head>
      <body className={`${rubik.variable} ${poppins.variable}`}>
        <NextTopLoader color="#980a07" height={3} showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
