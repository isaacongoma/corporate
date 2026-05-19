import Image from 'next/image';
import Link from 'next/link';
import { BsTwitter } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaLocationDot, FaPinterestP, FaRegClock } from 'react-icons/fa6';
import prisma from '@/lib/prisma';

const defaultFooter = {
  backgroundImage: '/assets/img/footer_bg.jpg',
  logo: '/assets/img/footer_logo.svg',
  contactHours: 'Open Hours: Mon - Fri: 8.00 am. - 6.00 pm.',
  contactAddress: '13/A, Miranda Halim City.',
  contactPhone: '099 695 695 35',
  copyrightText: 'Copyright © 2024. All Rights Reserved.',
  widgets: [
    { title: 'Service', links: [
      { href: '/service/service-details', text: 'Plastic Surgery' },
      { href: '/service/service-details', text: 'Pharmacology' },
      { href: '/service/service-details', text: 'Dental Care' },
      { href: '/service/service-details', text: 'Orthopedic' },
    ]},
    { title: 'Quick Link', links: [
      { href: '/', text: 'Home' },
      { href: '/about', text: 'About Us' },
      { href: '/service', text: 'Our Services' },
      { href: '/contact', text: 'Contact' },
    ]},
  ],
  footerMenu: [
    { href: '/about', text: 'About Us' },
    { href: '/', text: 'Events' },
    { href: '/blog', text: 'News' },
    { href: '/service', text: 'Service' },
  ],
};

async function getFooterData() {
  const setting = await prisma.setting.findFirst({
    select: { footerContent: true, facebookUrl: true, twitterUrl: true, instagramUrl: true, pinterestUrl: true },
  }).catch(() => null);

  const recentBlogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 2,
    select: { title: true, slug: true, featuredImage: true, createdAt: true },
  }).catch(() => []);

  const fc = { ...defaultFooter, ...(setting?.footerContent || {}) };

  return {
    fc,
    social: {
      facebook:  setting?.facebookUrl  || '/',
      twitter:   setting?.twitterUrl   || '/',
      instagram: setting?.instagramUrl || '/',
      pinterest: setting?.pinterestUrl || '/',
    },
    recentPosts: recentBlogs.map(b => ({
      href: `/blog/${b.slug}`,
      image: b.featuredImage || '/assets/img/recent_post_1.png',
      date: new Date(b.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: b.title,
    })),
  };
}

const Footer = async () => {
  const { fc, social, recentPosts } = await getFooterData();

  return (
    <footer
      className="cs_footer cs_blue_bg cs_bg_filed cs_white_color"
      style={{ backgroundImage: `url(${fc.backgroundImage})` }}
    >
      <div className="container">
        <div className="cs_footer_row">
          {/* Highlighted contact column */}
          <div className="cs_footer_col">
            <div className="cs_footer_highlight_col cs_accent_bg">
              <div className="cs_footer_logo">
                <Image src={fc.logo} alt="logo" width={205} height={53} />
              </div>
              <ul className="cs_footer_contact cs_mp_0">
                <li>
                  <i style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><FaRegClock /></i>
                  <span dangerouslySetInnerHTML={{ __html: fc.contactHours }} />
                </li>
                <li>
                  <i style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><FaLocationDot /></i>
                  <span dangerouslySetInnerHTML={{ __html: fc.contactAddress }} />
                </li>
                <li>
                  <i style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><FaPhoneAlt /></i>
                  <span dangerouslySetInnerHTML={{ __html: fc.contactPhone }} />
                </li>
              </ul>
              <div className="cs_social_btns cs_style_1">
                <Link href={social.facebook} className="cs_center"><i><FaFacebookF /></i></Link>
                <Link href={social.pinterest} className="cs_center"><i><FaPinterestP /></i></Link>
                <Link href={social.twitter} className="cs_center"><i><BsTwitter /></i></Link>
                <Link href={social.instagram} className="cs_center"><i><FaInstagram /></i></Link>
              </div>
            </div>
          </div>

          {/* Link widgets */}
          {(fc.widgets || []).map((widget, i) => (
            <div className="cs_footer_col" key={i}>
              <div className="cs_footer_widget">
                <h2 className="cs_footer_widget_title">{widget.title}</h2>
                <ul className="cs_footer_widget_nav_list cs_mp_0">
                  {(widget.links || []).map((link, j) => (
                    <li key={j}><Link href={link.href}>{link.text}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Recent posts — from blog module */}
          <div className="cs_footer_col">
            <div className="cs_footer_widget">
              <h2 className="cs_footer_widget_title">Recent Posts</h2>
              <ul className="cs_recent_post_list cs_mp_0">
                {recentPosts.map((post, i) => (
                  <li key={i}>
                    <div className="cs_recent_post">
                      <Link href={post.href} className="cs_recent_post_thumb">
                        <Image src={post.image} alt="img" width={85} height={85} />
                      </Link>
                      <div className="cs_recent_post_right">
                        <p>{post.date}</p>
                        <h3 className="cs_recent_post_title">
                          <Link href={post.href}>{post.title}</Link>
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
                {recentPosts.length === 0 && (
                  <li style={{ opacity: 0.6, fontSize: 13 }}>No posts yet.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="cs_footer_bottom cs_primary_bg">
        <div className="container">
          <div className="cs_footer_bottom_in">
            <p className="cs_footer_copyright mb-0">{fc.copyrightText}</p>
            <ul className="cs_footer_menu cs_mp_0">
              {(fc.footerMenu || []).map((item, i) => (
                <li key={i}><Link href={item.href}>{item.text}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
