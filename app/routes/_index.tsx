import type { MetaFunction } from "@remix-run/node";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import { CALENDLY_URL } from "~/config/contact";

const About = lazy(() => import("~/components/About"));
const Skills = lazy(() => import("~/components/Skills"));
const Resume = lazy(() => import("~/components/Resume"));
const Services = lazy(() => import("~/components/Services"));
const Portfolio = lazy(() => import("~/components/Portfolio"));
const Contact = lazy(() => import("~/components/Contact"));
const Footer = lazy(() => import("~/components/Footer"));

export const meta: MetaFunction = () => {
  const title = "Kevon Cadogan - Full-Stack Developer & AI Engineer | React, Node.js, Mobile Development";
  const description = "Experienced full-stack developer specializing in React, Node.js, Django, and mobile development. 5+ years building scalable web and mobile applications. Available for freelance projects.";
  const keywords = "full-stack developer, React developer, Node.js, Django, mobile developer, AI engineer, software engineer, web development, JavaScript, TypeScript, Python, React Native, freelance developer, Georgetown Guyana";
  const siteUrl = "https://www.kevoncadogan.com";
  const imageUrl = `${siteUrl}/img/kev_logo.png`;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: "Kevon Cadogan" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    
    // Open Graph tags for social media
    { property: "og:type", content: "website" },
    { property: "og:url", content: siteUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Kevon Cadogan - Full-Stack Developer" },
    { property: "og:locale", content: "en_US" },
    { property: "og:site_name", content: "Kevon Cadogan Portfolio" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: siteUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Kevon Cadogan - Full-Stack Developer" },
    { name: "twitter:creator", content: "@kevoncadogan" },
    
    // Additional SEO tags
    { name: "theme-color", content: "#149ddd" },
    { name: "msapplication-TileColor", content: "#149ddd" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

export default function Index() {
  // Structured Data (JSON-LD) for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kevon Cadogan",
    "url": "https://www.kevoncadogan.com",
    "image": "https://www.kevoncadogan.com/img/2021-02-24.jpg",
    "jobTitle": "Full-Stack Developer",
    "description": "Website design and development in Georgetown, Guyana including custom websites, e-commerce, and ongoing maintenance.",
    "email": "kev.cadogan300@gmail.com",
    "telephone": "+592-694-3827",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": CALENDLY_URL
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Guyana"
      },
      {
        "@type": "City",
        "name": "Georgetown",
        "addressCountry": "GY"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Georgetown",
      "addressCountry": "GY"
    },
    "serviceType": [
      "website development",
      "web design Georgetown",
      "e-commerce website development",
      "responsive web design",
      "small business website design",
      "website maintenance services in Guyana"
    ],
    "birthDate": "1988-02-05",
    "knowsAbout": [
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Django",
      "MongoDB",
      "MySQL",
      "React Native",
      "Angular",
      "Full-Stack Development",
      "AI Engineering",
      "Mobile Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "V75 Inc",
      "url": "https://v75inc.com"
    },
    "sameAs": [
      "https://github.com/blackMastery",
      "https://www.linkedin.com/in/kevon-cadogan-113034a8",
      "https://x.com/kevon_cadogan",
      "https://www.facebook.com/kevongudlove24",
      "https://v75inc.com/our-team/kevon-cadogan"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "University"
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Top navbar */}
      <Header />

      {/* Main content */}
      <main className="min-h-screen flex flex-col">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Resume />
          <Services />
          <Portfolio />
          <Contact />
          <Footer />
        </Suspense>
      </main>

      {/* Back to top button */}
      <motion.a
        href="#hero"
        className="fixed bottom-4 right-20 md:right-24 w-10 h-10 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center text-white z-40 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={(e) => {
          e.preventDefault();
          const heroSection = document.getElementById('hero');
          if (heroSection) {
            heroSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
    </div>
  );
}