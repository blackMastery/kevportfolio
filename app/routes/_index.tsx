import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import About from "~/components/About";
import Facts from "~/components/Facts";
import Skills from "~/components/Skills";
import Portfolio from "~/components/Portfolio";
import Resume from "~/components/Resume";
import Services from "~/components/Services";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  const title = "Kevon Cadogan - Full-Stack Developer & AI Engineer | React, Node.js, Mobile Development";
  const description = "Experienced full-stack developer specializing in React, Node.js, Django, and mobile development. 5+ years building scalable web and mobile applications. Available for freelance projects.";
  const keywords = "full-stack developer, React developer, Node.js, Django, mobile developer, AI engineer, software engineer, web development, JavaScript, TypeScript, Python, React Native, freelance developer, Georgetown Guyana";
  const siteUrl = "https://kevportfolio.vercel.app";
  const imageUrl = `${siteUrl}/img/2021-02-24.jpg`;

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Structured Data (JSON-LD) for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kevon Cadogan",
    "url": "https://kevportfolio.vercel.app",
    "image": "https://kevportfolio.vercel.app/img/2021-02-24.jpg",
    "jobTitle": "Full-Stack Developer",
    "description": "Experienced full-stack developer specializing in React, Node.js, Django, and mobile development",
    "email": "kev.cadogan300@gmail.com",
    "telephone": "+592-694-3827",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Georgetown",
      "addressCountry": "GY"
    },
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
      {/* Mobile nav toggle */}
      <button
        type="button"
        className="fixed top-4 right-4 z-50 xl:hidden w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Header/Sidebar */}
      <Header isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content */}
      <main className="xl:ml-80 min-h-screen flex flex-col">
        <Hero />
        <About />
        <Facts />
        <Skills />
        <Portfolio />
        <Resume />
        <Services />
        <Contact />
        <Footer />
      </main>

      {/* Back to top button */}
      <motion.a
        href="#hero"
        className="fixed bottom-4 right-4 w-10 h-10 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center text-white z-40 transition-colors"
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
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
    </div>
  );
}