/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.10-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: primewatch-v2
-- ------------------------------------------------------
-- Server version	10.11.10-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Blog`
--

DROP TABLE IF EXISTS `Blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `featuredImage` varchar(191) DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `excerpt` varchar(280) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Blog_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blog`
--

LOCK TABLES `Blog` WRITE;
/*!40000 ALTER TABLE `Blog` DISABLE KEYS */;
INSERT INTO `Blog` VALUES
(1,'Why Security Matters for Businesses in Kenya','why-security-matters-for-businesses-in-kenya','<p>In today\'s dynamic business environment, securing your assets, employees, and clients is paramount. A comprehensive security strategy safeguards not only physical property but also your company\'s reputation and operational continuity.</p><p>Businesses across Nairobi — from Westlands to the CBD and Karen — are increasingly recognising that relying solely on basic measures is no longer sufficient. Corporate espionage, theft, and vandalism remain persistent threats that can cripple operations overnight.</p><p>Prime Watch Security Group recommends a layered approach: combining manned guarding at entry points, CCTV surveillance across all zones, and mobile patrol units for perimeter coverage. This multi-tiered strategy significantly reduces vulnerability and ensures rapid incident response.</p><p>Investing in professional security is not a cost — it is a critical business continuity measure that protects your people, your assets, and your bottom line.</p>','/assets/img/post_1.jpeg',1,'2026-04-19 09:01:29.865','2026-04-19 12:50:58.885','A strong security strategy protects your staff, assets, and reputation. Learn why Nairobi businesses are investing in professional security.'),
(2,'The Power of K9 Security Units in Modern Patrolling','benefits-of-k9-security-units','<p>K9 units offer an unparalleled level of deterrence and detection. Their heightened senses make them incredibly effective in patrol routines, explosive detection, and access control — capabilities no technology can fully replicate.</p><p>In Nairobi\'s industrial areas, warehouses, and large estates, K9 teams from Prime Watch Security have proven instrumental in reducing theft and trespassing incidents. A well-trained security dog can detect intruders, contraband, or threats far faster than a human guard alone.</p><p>Our K9 handlers are fully trained, licensed, and experienced in working with German Shepherds and Belgian Malinois — breeds renowned for their discipline, intelligence, and protective instincts.</p><p>Whether deployed for perimeter patrols, event security, or as a visible deterrent at a corporate facility, K9 units add a powerful layer of protection that dramatically elevates your security posture.</p>','/assets/img/post_2.jpeg',1,'2026-04-19 09:01:29.865','2026-04-19 12:50:58.895','K9 units offer unmatched deterrence and detection capability. Discover why guard dogs are an essential part of modern security operations in Kenya.'),
(3,'How CCTV Surveillance Enhances Safety at Your Premises','how-cctv-enhances-safety','<p>Modern CCTV systems provide 24/7 surveillance, serving as both a strong deterrent against crime and a crucial tool in post-incident investigations. For businesses in Nairobi, a well-designed CCTV network is no longer optional — it is essential.</p><p>At Prime Watch Security Group, we design and install tailored CCTV solutions for offices, malls, residential estates, and industrial sites. Our systems feature high-definition cameras, night vision capability, remote monitoring access, and cloud-based storage for reliable evidence retention.</p><p>Beyond deterrence, CCTV footage is invaluable during police investigations and insurance claims. Many of our clients in Westlands and Karen have successfully resolved theft and vandalism cases using footage captured by our surveillance systems.</p><p>Combined with our 24/7 monitoring centre, your CCTV network becomes a live, active security tool — not just a recording device. Contact Prime Watch today for a free site survey and CCTV proposal.</p>','/assets/img/post_3.jpeg',1,'2026-04-19 09:01:29.865','2026-04-19 12:50:58.903','Modern CCTV systems provide 24/7 coverage and serve as both a powerful deterrent and a vital investigation tool. Here is what you need to know.');
/*!40000 ALTER TABLE `Blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactMessage`
--

DROP TABLE IF EXISTS `ContactMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ContactMessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `message` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactMessage`
--

LOCK TABLES `ContactMessage` WRITE;
/*!40000 ALTER TABLE `ContactMessage` DISABLE KEYS */;
INSERT INTO `ContactMessage` VALUES
(1,'Delroy Brandon Apindi Obulemire','services.krt@gmail.com','0798205436','this is a test email','testing','2026-05-09 12:44:10.287');
/*!40000 ALTER TABLE `ContactMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Page`
--

DROP TABLE IF EXISTS `Page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Page_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Page`
--

LOCK TABLES `Page` WRITE;
/*!40000 ALTER TABLE `Page` DISABLE KEYS */;
INSERT INTO `Page` VALUES
(1,'home','Home','{\"heroSection\":{\"title\":\"Your Safety, Our Priority\",\"cta\":\"Get Protected Today\",\"aboutSummary\":\"We are a leading private security company in Kenya, dedicated to providing top-tier protection services tailored to your specific needs.\"},\"callToActionSection\":{\"title\":\"Professional Security Assessment & Planning\",\"subtitle\":\"Protecting what matters most to you\",\"buttonText\":\"Contact Us Now\"},\"hero\":{\"backgroundImage\":\"/uploads/home/1776623012679-a9f0b7bfa9e9.webp\",\"title\":\"Your Safety Is Our Top Priority.\",\"subtitle\":\"Prime Watch Security delivers professional guarding, surveillance, and rapid response solutions across Kenya.\",\"features\":[\"ISO-certified security personnel, trained and vetted.\",\"We provide 24/7 manned guarding and patrol services.\"],\"btnText\":\"Get Protected Today\",\"btnHref\":\"/contact\",\"BtnText1\":\"How We Work\",\"videoHref\":\"https://www.youtube.com/embed/rRid6GCJtgc\",\"heroShape\":\"/assets/img/icons/hero_shape_1.png\",\"supportText\":{\"number\":\"24\",\"unit\":\"Hours\",\"description\":\"Response\"},\"iconBoxes\":[{\"icon\":\"/assets/img/icons/call_icon_1.png\",\"title\":\"Emergency Line\",\"subtitle\":\"24/7 – Rapid Response Ready\",\"buttonHref\":\"/contact\",\"buttonText\":\"Call Us Now\"},{\"icon\":\"/assets/img/icons/message_icon_1.png\",\"title\":\"Email Us\",\"subtitle\":\"info@primewatch.co.ke\",\"buttonHref\":\"/contact\",\"buttonText\":\"Get a Quote\"}]},\"about\":{\"sectionSubtitle\":\"WHO WE ARE\",\"sectionTitle\":\"Over 15+ Years Delivering Trusted Security.\",\"aboutText\":\"We partner with leading corporates, estates, and institutions across Kenya, delivering reliable guarding and surveillance solutions that safeguard people, property, and assets.\",\"experienceYears\":\"15+\",\"experienceTitle\":\"Years Experience\",\"iconUrl\":\"/assets/img/icons/about_icon_1.png\",\"title\":\"Client Protection\",\"imgUrl\":\"/assets/img/about_img_4.jpg\",\"iconUrl2\":\"/assets/img/icons/about_icon_2.png\",\"title2\":\"Guard Training\",\"imgUrl2\":\"/assets/img/about_img_5.jpg\",\"aboutIconboxSubtitle\":\"Our vetted guards undergo rigorous training for optimal security deployment.\",\"readMoreText\":\"READ MORE +\",\"readMoreLink\":\"/about\",\"videoLink\":\"https://www.youtube.com/embed/rRid6GCJtgc\",\"videoText\":\"How We Work\",\"aboutMoreLink\":\"/about\",\"aboutMoreText\":\"About More\",\"sectionImageUrl\":\"/assets/img/about_section_img_2.png\",\"mainImage\":\"/uploads/homeabout/1776611670281-b48e367dfe9c.jpg\"},\"counter\":[{\"iconSrc\":\"/assets/img/icons/counter_icon_1.png\",\"countTo\":350,\"suffix\":\"+\",\"title\":\"Corporate Clients\"},{\"iconSrc\":\"/assets/img/icons/counter_icon_2.png\",\"countTo\":2,\"suffix\":\"K+\",\"title\":\"Guards Deployed\"},{\"iconSrc\":\"/assets/img/icons/counter_icon_3.png\",\"countTo\":480,\"suffix\":\"+\",\"title\":\"Sites Secured\"},{\"iconSrc\":\"/assets/img/icons/counter_icon_4.png\",\"countTo\":15,\"suffix\":\"+\",\"title\":\"Years of Excellence\"}],\"service\":{\"subtitle\":\"WHAT WE OFFER\",\"title\":\"Professional Security Services For Kenya\",\"description\":\"We deliver a full spectrum of security solutions for businesses, estates, malls, and events — all backed by trained personnel and advanced technology.\",\"services\":[{\"iconSrc\":\"/assets/img/icons/service_icon_15.png\",\"title\":\"Manned Guarding\",\"subtitle\":\"Trained guards protecting your premises<br> around the clock, every day.\",\"link\":\"/service\",\"imageSrc\":\"/assets/img/service_1.png\"},{\"iconSrc\":\"/assets/img/icons/service_icon_16.png\",\"title\":\"Mobile Patrol\",\"subtitle\":\"Scheduled patrol units and rapid alarm<br> response across Nairobi.\",\"link\":\"/service\",\"imageSrc\":\"/assets/img/service_1.png\"},{\"iconSrc\":\"/assets/img/icons/service_icon_17.png\",\"title\":\"CCTV Surveillance\",\"subtitle\":\"24/7 monitoring with advanced video<br> surveillance and remote access.\",\"link\":\"/service\",\"imageSrc\":\"/assets/img/service_1.png\"},{\"iconSrc\":\"/assets/img/icons/service_icon_18.png\",\"title\":\"Access Control\",\"subtitle\":\"Biometric and card-based systems to<br> manage and secure entry points.\",\"link\":\"/service\",\"imageSrc\":\"/assets/img/service_1.png\"}]},\"brands\":[{\"image\":\"/assets/img/envato-logo.png\",\"altText\":\"Safaricom\"},{\"image\":\"/assets/img/envato-logo.png\",\"altText\":\"KCB Bank\"},{\"image\":\"/assets/img/envato-logo.png\",\"altText\":\"Equity Bank\"},{\"image\":\"/assets/img/envato-logo.png\",\"altText\":\"Nation Media\"},{\"image\":\"/assets/img/envato-logo.png\",\"altText\":\"Java House\"},{\"image\":\"/assets/img/envato-logo.png\",\"altText\":\"Two Rivers Mall\"}],\"video\":{\"videoUrl\":\"https://www.youtube.com/embed/rRid6GCJtgc\",\"title\":\"We Deliver Reliable Security\",\"title2\":\"<br /> Across All Of Kenya\",\"highlightedText\":\"Safety\",\"subtitle\":\"From Nairobi CBD to industrial zones and residential estates, Prime Watch Security provides comprehensive protection services.\",\"btnText\":\"Contact Now\",\"btnLink\":\"/contact\",\"btnText1\":\"Our Services\",\"btnLink1\":\"/service\",\"shapeImage\":\"/assets/img/medical_brand.png\"},\"medicalSolution\":{\"sectionSubtitle\":\"WHY CHOOSE US\",\"sectionTitle\":\"More Than Guarding Now,<br> Complete Security Solution.\",\"sectionDescription\":\"We combine trained manpower, modern technology, and proven processes to deliver security solutions that businesses and individuals in Kenya trust.\",\"mainImage\":\"/uploads/homesolution/1776620720656-c713faf90576.png\",\"cards\":[{\"icon\":\"/assets/img/icons/service_icon_19.png\",\"index\":\"01\",\"title\":\"Trained Personnel\",\"description\":\"All our guards are rigorously vetted, licensed, and trained to national security standards.\"},{\"icon\":\"/assets/img/icons/service_icon_10.png\",\"index\":\"02\",\"title\":\"Rapid Response\",\"description\":\"Our mobile units are on standby 24/7 to respond swiftly to alarms and incidents.\"},{\"icon\":\"/assets/img/icons/service_icon_11.png\",\"index\":\"03\",\"title\":\"Advanced Technology\",\"description\":\"We deploy CCTV, access control, and intrusion systems for maximum site protection.\"}]},\"cta\":{\"title\":\"Talk To Our Security Team Today\",\"subtitle\":\"Protecting what matters most to you\",\"buttonText\":\"Contact Now\",\"buttonLink\":\"/contact\"},\"projects\":{\"sectionTitle\":\"Security Projects Delivered Across Kenya\",\"sectionSubtitle\":\"OUR PORTFOLIO\",\"sectionDescription\":\"We have successfully secured corporate offices, malls, residential estates, and financial institutions across Nairobi and beyond.\",\"items\":[{\"id\":1,\"title\":\"Corporate HQ Nairobi\",\"subtitle\":\"Manned Guarding / CCTV\",\"imageSrc\":\"/uploads/homeprojects/1776678325316-6fe1ad3235f0.webp\",\"link\":\"/\"},{\"id\":2,\"title\":\"Westlands Mall Security\",\"subtitle\":\"Patrol / Access Control\",\"imageSrc\":\"/assets/img/project_5.jpg\",\"link\":\"/\"},{\"id\":3,\"title\":\"Karen Estate Patrol\",\"subtitle\":\"Residential / Mobile\",\"imageSrc\":\"/assets/img/project_6.jpg\",\"link\":\"/\"},{\"id\":4,\"title\":\"Bank Escort Nairobi CBD\",\"subtitle\":\"Cash-in-Transit\",\"imageSrc\":\"/assets/img/project_7.jpg\",\"link\":\"/\"},{\"id\":5,\"title\":\"Nairobi Event Security\",\"subtitle\":\"Event / Crowd Control\",\"imageSrc\":\"/assets/img/project_8.jpg\",\"link\":\"/\"},{\"id\":6,\"title\":\"Industrial Area Guard\",\"subtitle\":\"Perimeter / K9 Patrol\",\"imageSrc\":\"/assets/img/project_9.jpg\",\"link\":\"/\"}]},\"blogSection\":{\"sectionTitle\":\"OUR SECURITY BLOG\",\"sectionSubtitle\":\"Latest Security Insights & News\",\"btnText\":\"Read More\"},\"process\":{\"sectionSubtitle\":\"HOW WE WORK\",\"sectionTitle\":\"Our Simple Security<br> Onboarding Process\",\"sectionDescription\":\"Getting started with Prime Watch Security is straightforward. We assess your needs, plan a tailored solution, deploy our team, and provide ongoing protection.\",\"processSlides\":[{\"id\":1,\"imageUrl\":\"/assets/img/process_1.png\",\"title\":\"Request Assessment\",\"subtitle\":\"Reach out for a free site security evaluation\",\"bgImageUrl\":\"/assets/img/overlay_bg_1.jpeg\",\"link\":\"/contact\"},{\"id\":2,\"imageUrl\":\"/assets/img/process_2.png\",\"title\":\"Security Planning\",\"subtitle\":\"We design a tailored security plan for your site\",\"bgImageUrl\":\"/assets/img/overlay_bg_1.jpeg\",\"link\":\"/contact\"},{\"id\":3,\"imageUrl\":\"/assets/img/process_3.png\",\"title\":\"Team Deployment\",\"subtitle\":\"Vetted guards and equipment deployed to your premises\",\"bgImageUrl\":\"/assets/img/overlay_bg_1.jpeg\",\"link\":\"/contact\"},{\"id\":4,\"imageUrl\":\"/assets/img/process_4.png\",\"title\":\"Ongoing Protection\",\"subtitle\":\"Continuous monitoring, reporting, and rapid response\",\"bgImageUrl\":\"/assets/img/overlay_bg_1.jpeg\",\"link\":\"/contact\"}]},\"testimonials\":{\"thumbnail\":\"/uploads/hometestimonials/1776677282386-5ddccfde7146.webp\",\"items\":[{\"rating\":5,\"subtitle\":\"Prime Watch Security has transformed how we protect our Westlands offices. Their guards are professional, punctual, and highly trained. We feel genuinely secure with them on site.\",\"avatar\":\"/assets/img/avatar_1.png\",\"name\":\"James Kamau\",\"position\":\"Facilities Manager, Nairobi Business Centre\"},{\"rating\":5,\"subtitle\":\"We contracted Prime Watch for our annual corporate gala in Karen. Their event security team was outstanding — discreet, efficient, and handled everything seamlessly.\",\"avatar\":\"/assets/img/avatar_2.png\",\"name\":\"Catherine Wanjiku\",\"position\":\"Head of Operations, Serene Hotels Kenya\"},{\"rating\":4,\"subtitle\":\"Their CCTV installation and 24/7 monitoring service gave our Mombasa Road warehouse the protection it needed. Response times are excellent and the team is always reachable.\",\"avatar\":\"/assets/img/avatar_2.png\",\"name\":\"David Otieno\",\"position\":\"Logistics Director, East Africa Freight Ltd\"}]},\"team\":{\"subtitle\":\"OUR LEADERSHIP TEAM\",\"title\":\"Meet Our Security <br />Specialists & Commanders\",\"members\":[{\"name\":\"Col. James Mwangi\",\"profession\":\"Chief Security Officer\",\"imageUrl\":\"/assets/img/team_1.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Grace Akinyi\",\"profession\":\"Operations Manager\",\"imageUrl\":\"/assets/img/team_3.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Sgt. Peter Kariuki\",\"profession\":\"Head of Patrol & Response\",\"imageUrl\":\"/assets/img/team_4.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Amina Hassan\",\"profession\":\"CCTV & Tech Systems Lead\",\"imageUrl\":\"/assets/img/team_5.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Brian Odhiambo\",\"profession\":\"VIP Protection Specialist\",\"imageUrl\":\"/assets/img/team_6.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"}]}}','2026-04-19 09:01:29.850','2026-04-20 09:45:33.599'),
(2,'about','About Us','{\"heading\":{\"title\":\"About Us\",\"backgroundImage\":\"/assets/img/page_heading_bg.jpg\"},\"about\":{\"sectionSubtitle\":\"WHO WE ARE\",\"sectionTitle\":\"Over 15+ Years Securing Lives And Assets.\",\"aboutText\":\"Founded in Nairobi, Prime Watch Security Group has grown into one of Kenya\'s most trusted private security firms, serving corporates, estates, malls, and institutions with excellence.\",\"service\":\"Our highly trained guards and surveillance teams are deployed across Nairobi, Mombasa, and beyond. <a href=\\\"/service\\\">VIEW OUR SERVICES +</a>\",\"experienceYears\":\"15+\",\"experienceTitle\":\"Years Experience\",\"videoUrl\":\"https://www.youtube.com/embed/rRid6GCJtgc\",\"videoText\":\"How We Work\",\"iconboxes\":[{\"imgUrl\":\"/assets/img/icons/about_icon_1.png\",\"title\":\"Client Protection\",\"subtitle\":\"Round-the-clock security for your premises and personnel.\"},{\"imgUrl\":\"/assets/img/icons/about_icon_2.png\",\"title\":\"Guard Excellence\",\"subtitle\":\"All guards are vetted, licensed, and continuously retrained.\"}],\"btnUrl\":\"/contact\",\"btnText\":\"Get In Touch\",\"sectionImgUrl\":\"/assets/img/about_section_img_1.png\",\"headImgUrl\":\"/assets/img/about_img_7.jpeg\"},\"counter\":[{\"iconSrc\":\"/assets/img/icons/counter_icon_1.png\",\"countTo\":350,\"suffix\":\"+\",\"title\":\"Corporate Clients\"},{\"iconSrc\":\"/assets/img/icons/counter_icon_2.png\",\"countTo\":2,\"suffix\":\"K+\",\"title\":\"Guards Deployed\"},{\"iconSrc\":\"/assets/img/icons/counter_icon_3.png\",\"countTo\":480,\"suffix\":\"+\",\"title\":\"Sites Secured\"},{\"iconSrc\":\"/assets/img/icons/counter_icon_4.png\",\"countTo\":15,\"suffix\":\"+\",\"title\":\"Years of Excellence\"}],\"cta\":{\"videoLink\":\"https://www.youtube.com/embed/rRid6GCJtgc\",\"videoButtonText\":\"WATCH VIDEO\",\"subtitle\":\"PRIME WATCH SECURITY GROUP\",\"title\":\"Professional Security Services Across Kenya.\",\"description\":\"From manned guarding and mobile patrols to CCTV installation and VIP protection, we deliver comprehensive security solutions built for Kenyan businesses and communities.\",\"buttonLink\":\"/contact\",\"buttonText\":\"Contact Us Now\",\"brandImage\":\"/assets/img/medical_brand.png\"},\"team\":{\"subtitle\":\"OUR LEADERSHIP TEAM\",\"title\":\"Meet Our Security <br />Specialists & Commanders\",\"members\":[{\"name\":\"Col. James Mwangi\",\"profession\":\"Chief Security Officer\",\"imageUrl\":\"/assets/img/team_1.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Grace Akinyi\",\"profession\":\"Operations Manager\",\"imageUrl\":\"/assets/img/team_3.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Sgt. Peter Kariuki\",\"profession\":\"Head of Patrol & Response\",\"imageUrl\":\"/assets/img/team_4.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Amina Hassan\",\"profession\":\"CCTV & Tech Systems Lead\",\"imageUrl\":\"/assets/img/team_5.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"},{\"name\":\"Brian Odhiambo\",\"profession\":\"VIP Protection Specialist\",\"imageUrl\":\"/assets/img/team_6.jpg\",\"link\":\"/about\",\"facebook\":\"/\",\"pinterest\":\"/\",\"twitter\":\"/\",\"instagram\":\"/\"}]},\"story\":\"Established in Nairobi, Prime Watch Security Group was founded on a simple principle — every Kenyan business and family deserves professional, reliable security. Over 15 years, we have grown from a small guarding firm to a full-spectrum security provider trusted across East Africa.\",\"mission\":\"To deliver reliable, professional, and technology-driven security solutions that protect our clients\' people, property, and peace of mind across Kenya.\",\"vision\":\"To be East Africa\'s most trusted private security group, recognised for integrity, innovation, rapid response, and unwavering commitment to safety.\",\"whyChooseUs\":\"Licensed and vetted personnel, 24/7 operations, advanced surveillance technology, proven rapid response, and a client-first approach that sets us apart.\"}','2026-04-19 09:01:29.850','2026-04-19 12:50:58.859'),
(3,'contact','Contact Us','{\"heading\":\"Get In Touch\",\"description\":\"Contact our Nairobi-based security team for a free assessment and tailored security proposal.\"}','2026-04-19 09:01:29.850','2026-04-19 12:50:58.869'),
(4,'services','Our Services','{\"heading\":\"Comprehensive Security Solutions\",\"description\":\"Explore our full range of professional security services designed for businesses, estates, and events across Kenya.\"}','2026-04-19 09:01:29.850','2026-04-19 12:50:58.878');
/*!40000 ALTER TABLE `Page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES
(1,'Manned Guarding Services','Licensed, uniformed guards providing 24/7 premises protection for offices, malls, estates, and industrial sites across Kenya.','/assets/img/icons/service_icon_15.png','/assets/img/service_1.png','2026-04-19 09:01:29.686','2026-04-19 12:50:58.915'),
(2,'Mobile Patrol & Alarm Response','Scheduled patrol vehicles and on-call rapid response units ensuring continuous coverage and swift alarm reaction across Nairobi.','/assets/img/icons/service_icon_16.png','/assets/img/service_1.png','2026-04-19 09:01:29.707','2026-04-19 12:50:58.924'),
(3,'CCTV Surveillance & Monitoring','HD camera installation, remote monitoring, and 24/7 surveillance centre support for complete visibility of your premises.','/assets/img/icons/service_icon_17.png','/assets/img/service_1.png','2026-04-19 09:01:29.726','2026-04-19 12:50:58.937'),
(4,'Access Control Systems','Biometric fingerprint, card, and PIN-based entry systems that restrict unauthorised access and log all movement records.','/assets/img/icons/service_icon_18.png','/assets/img/service_1.png','2026-04-19 09:01:29.741','2026-04-19 12:50:58.955'),
(5,'VIP Protection / Close Protection','Discreet, highly trained close protection officers for executives, diplomats, and high-profile individuals in Kenya.','/assets/img/icons/service_icon_19.png','/assets/img/service_1.png','2026-04-19 09:01:29.770','2026-04-19 12:50:58.966'),
(6,'Event Security Management','End-to-end security planning, crowd management, and incident response for corporate events, galas, and public gatherings.','/assets/img/icons/service_icon_1.png','/assets/img/service_1.png','2026-04-19 09:01:29.796','2026-04-19 12:50:58.979'),
(7,'K9 Security Services (Guard Dogs)','Trained K9 teams deployed for perimeter patrols, explosive detection, and as a powerful deterrent on large properties.','/assets/img/icons/service_icon_2.png','/assets/img/service_1.png','2026-04-19 09:01:29.808','2026-04-19 12:50:58.991'),
(8,'Cash-in-Transit Security','Armoured escort and secure logistics for transporting cash, valuables, and sensitive cargo across Nairobi and Kenya.','/assets/img/icons/service_icon_3.png','/assets/img/service_1.png','2026-04-19 09:01:29.816','2026-04-19 12:50:58.999'),
(9,'Perimeter Intrusion Detection','Sensor-based and electronic perimeter fencing systems that detect and alert on any unauthorised boundary breach instantly.','/assets/img/icons/service_icon_4.png','/assets/img/service_1.png','2026-04-19 09:01:29.823','2026-04-19 12:50:59.023'),
(10,'Security Risk Assessment & Consulting','Comprehensive vulnerability audits, threat analysis, and strategic security planning delivered by our certified consultants.','/assets/img/icons/service_icon_5.png','/assets/img/service_1.png','2026-04-19 09:01:29.831','2026-04-19 12:50:59.066');
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Setting`
--

DROP TABLE IF EXISTS `Setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(191) NOT NULL DEFAULT 'Prime Watch Security',
  `logo` varchar(191) NOT NULL DEFAULT '/assets/img/logo.svg',
  `contactEmail` varchar(191) NOT NULL DEFAULT 'info@primewatch.co.ke',
  `phoneNumbers` varchar(191) NOT NULL DEFAULT '+254 700 000000',
  `officeLocation` varchar(191) NOT NULL DEFAULT 'Nairobi, Kenya',
  `facebookUrl` varchar(191) DEFAULT NULL,
  `twitterUrl` varchar(191) DEFAULT NULL,
  `instagramUrl` varchar(191) DEFAULT NULL,
  `pinterestUrl` varchar(191) DEFAULT NULL,
  `heroTitle` varchar(191) NOT NULL DEFAULT 'Your Safety, Our Priority',
  `heroSubtitle` varchar(191) NOT NULL DEFAULT 'Comprehensive security solutions tailored for your peace of mind.',
  `heroBtnText` varchar(191) NOT NULL DEFAULT 'Get Protected Today',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `footerContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`footerContent`)),
  `favicon` varchar(191) NOT NULL DEFAULT '/favicon.ico',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Setting`
--

LOCK TABLES `Setting` WRITE;
/*!40000 ALTER TABLE `Setting` DISABLE KEYS */;
INSERT INTO `Setting` VALUES
(1,'Prime Watch Security Group','/uploads/branding/1776676270058-6b96c453e439.png','info@primewatch.co.ke','+254 722 100 200, +254 733 200 300','Westlands Business Park, Nairobi, Kenya',NULL,NULL,NULL,NULL,'Your Safety Is Our Top Priority','Prime Watch Security delivers professional guarding, surveillance, and rapid response across Kenya.','Get Protected Today','2026-04-19 09:01:29.647','2026-04-19 12:50:58.814','{\"backgroundImage\":\"/assets/img/footer_bg.jpg\",\"logo\":\"/assets/img/footer_logo.svg\",\"contactHours\":\"Open Hours: Mon - Fri: 8.00 am. - 6.00 pm.\",\"contactAddress\":\"Westlands Business Park, Nairobi, Kenya\",\"contactPhone\":\"+254 722 100 200\",\"copyrightText\":\"Copyright © 2025 Prime Watch Security Group. All Rights Reserved.\",\"widgets\":[{\"title\":\"Our Services\",\"links\":[{\"href\":\"/service\",\"text\":\"Manned Guarding\"},{\"href\":\"/service\",\"text\":\"Mobile Patrol\"},{\"href\":\"/service\",\"text\":\"CCTV Surveillance\"},{\"href\":\"/service\",\"text\":\"Event Security\"}]},{\"title\":\"Quick Links\",\"links\":[{\"href\":\"/\",\"text\":\"Home\"},{\"href\":\"/about\",\"text\":\"About Us\"},{\"href\":\"/service\",\"text\":\"Our Services\"},{\"href\":\"/contact\",\"text\":\"Contact\"}]}],\"footerMenu\":[{\"href\":\"/about\",\"text\":\"About Us\"},{\"href\":\"/service\",\"text\":\"Services\"},{\"href\":\"/blog\",\"text\":\"News\"},{\"href\":\"/contact\",\"text\":\"Contact\"}]}','/uploads/branding/1776676275615-48acf63908fd.jpg');
/*!40000 ALTER TABLE `Setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'ADMIN',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `address` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
(1,'admin@primewatch.co.ke','$2b$10$NyQZG7ZXG9yjJVUv.yGaiOCd/5TEG49DvHWBok6zd5WFQeXPQ1olu','ADMIN','2026-04-19 09:01:29.604','2026-04-19 11:36:20.075','Nairobi, Kenya','Peter Aswani','0724491457');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-19 20:14:29
