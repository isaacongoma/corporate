import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Create Admin
  const adminEmail = 'admin@primewatch.co.ke';
  const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('Admin user created (admin@primewatch.co.ke / admin123)');
  }

  // Create Settings
  const existingSettings = await prisma.setting.findFirst();
  if (!existingSettings) {
    await prisma.setting.create({
      data: {
        companyName: "Prime Watch Security",
        logo: "/assets/img/logo.svg",
        contactEmail: "info@primewatch.co.ke",
        phoneNumbers: "+254 700 000000",
        officeLocation: "Nairobi, Kenya",
        heroTitle: "Your Safety, Our Priority",
        heroSubtitle: "Comprehensive security solutions tailored for your peace of mind.",
        heroBtnText: "Get Protected Today"
      }
    });
    console.log('Default settings created');
  }

  // Define Services
  const servicesData = [
    { title: "Manned Guarding Services", description: "Professional and trained security personnel for premises protection.", icon: "/assets/img/icons/service_icon_15.png", image: "/assets/img/service_1.png" },
    { title: "Mobile Patrol & Alarm Response", description: "Rapid response units and scheduled patrols for enhanced security.", icon: "/assets/img/icons/service_icon_16.png", image: "/assets/img/service_1.png" },
    { title: "CCTV Surveillance & Monitoring", description: "24/7 monitoring and advanced video surveillance systems.", icon: "/assets/img/icons/service_icon_17.png", image: "/assets/img/service_1.png" },
    { title: "Access Control Systems", description: "Advanced biometric and card access control solutions.", icon: "/assets/img/icons/service_icon_18.png", image: "/assets/img/service_1.png" },
    { title: "VIP Protection / Close Protection", description: "Highly trained bodyguards for high-profile personnel.", icon: "/assets/img/icons/service_icon_19.png", image: "/assets/img/service_1.png" },
    { title: "Event Security Management", description: "Comprehensive security planning and crowd control for events.", icon: "/assets/img/icons/service_icon_1.png", image: "/assets/img/service_1.png" },
    { title: "K9 Security Services (Guard Dogs)", description: "Highly trained guard dogs for patrol and threat detection.", icon: "/assets/img/icons/service_icon_2.png", image: "/assets/img/service_1.png" },
    { title: "Cash-in-Transit Security", description: "Secure transportation of cash and valuables.", icon: "/assets/img/icons/service_icon_3.png", image: "/assets/img/service_1.png" },
    { title: "Perimeter Intrusion Detection", description: "Advanced systems to detect and prevent unauthorized perimeter access.", icon: "/assets/img/icons/service_icon_4.png", image: "/assets/img/service_1.png" },
    { title: "Security Risk Assessment & Consulting", description: "Expert evaluation of security vulnerabilities and strategic planning.", icon: "/assets/img/icons/service_icon_5.png", image: "/assets/img/service_1.png" }
  ];

  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    for (const srv of servicesData) {
      await prisma.service.create({ data: srv });
    }
    console.log('Services seeded');
  }

  // Define Pages (Home, About, Services, Contact)
  const existingPages = await prisma.page.count();
  if (existingPages === 0) {
    await prisma.page.createMany({
      data: [
        {
          slug: 'home',
          title: 'Home',
          content: {
            heroSection: {
              title: "Your Safety, Our Priority",
              cta: "Get Protected Today",
              aboutSummary: "We are a leading private security company in Kenya, dedicated to providing top-tier protection services tailored to your specific needs."
            },
            callToActionSection: {
              title: "Professional Security Care Measure",
              subtitle: "For us, there are because a quality",
              buttonText: "Contact Us Now"
            }
          }
        },
        {
          slug: 'about',
          title: 'About Us',
          content: {
            story: "Founded with the mission to redefine safety in Kenya, Prime Watch Security has grown into a trusted partner for businesses and individuals alike.",
            mission: "To deliver reliable, innovative, and professional security solutions that ensure peace of mind for our clients.",
            vision: "To be the premier security service provider in East Africa, recognized for excellence, integrity, and proactive risk management.",
            whyChooseUs: "Highly trained personnel, state-of-the-art technology, rapid response, and client-centric approach."
          }
        },
        {
          slug: 'contact',
          title: 'Contact Us',
          content: {
            heading: "Get in Touch",
            description: "Reach out to us for a free security assessment and consultation."
          }
        },
        {
          slug: 'services',
          title: 'Our Services',
          content: {
            heading: "Comprehensive Security Solutions",
            description: "Explore our wide range of professional security services."
          }
        }
      ]
    });
    console.log('Pages seeded');
  }

  // Define Blogs
  const existingBlogs = await prisma.blog.count();
  if (existingBlogs === 0) {
    await prisma.blog.createMany({
      data: [
        {
          title: "Why Security Matters for Businesses in Kenya",
          slug: "why-security-matters-for-businesses-in-kenya",
          content: "<p>In today's dynamic business environment, securing your assets, employees, and clients is paramount. A comprehensive security strategy safeguards not only physical property but also your company's reputation.</p>",
          featuredImage: "/assets/img/post_1.jpeg",
          published: true
        },
        {
          title: "Benefits of K9 Security Units",
          slug: "benefits-of-k9-security-units",
          content: "<p>K9 units offer an unparalleled level of deterrence and detection. Their heightened senses make them incredibly effective in patrol routines, bomb detection, and access control.</p>",
          featuredImage: "/assets/img/post_2.jpeg",
          published: true
        },
        {
          title: "How CCTV Enhances Safety",
          slug: "how-cctv-enhances-safety",
          content: "<p>Modern CCTV systems provide 24/7 surveillance, serving as both a strong deterrent against crime and a crucial tool in post-incident investigations.</p>",
          featuredImage: "/assets/img/post_3.jpeg",
          published: true
        }
      ]
    });
    console.log('Blogs seeded');
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
