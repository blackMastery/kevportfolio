import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";
import { CALENDLY_URL, CONTACT_EMAIL } from "~/config/contact";

export const meta: MetaFunction = () => {
  const title = "Full-Stack Developer in Georgetown, Guyana | Kevon Cadogan";
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
  const siteUrl = "https://www.kevoncadogan.com";
  const portraitUrl = `${siteUrl}/img/kevon-cadogan-full-stack-developer.jpg`;

  // Structured Data (JSON-LD) — Person + ProfessionalService graph for better SEO.
  // Comments below are stripped by JSON.stringify and never reach the rendered markup.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": "Kevon Cadogan",
        "url": siteUrl,
        "image": portraitUrl,
        "jobTitle": "Full-Stack Developer",
        "description": "Website design and development in Georgetown, Guyana including custom websites, e-commerce, and ongoing maintenance.",
        "email": CONTACT_EMAIL,
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
        ]
        // TODO: Add real education credentials as `alumniOf` here, e.g.
        //   "alumniOf": { "@type": "EducationalOrganization", "name": "...", "url": "..." }
        // Removed the placeholder value "University" to avoid shipping fake data.
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        "name": "Kevon Cadogan — Web Design & Development",
        "url": siteUrl,
        "image": portraitUrl,
        "description": "Web design, e-commerce, and mobile app development for businesses in Georgetown and across Guyana.",
        "telephone": "+592-694-3827",
        "email": CONTACT_EMAIL,
        "priceRange": "$$", // TODO: confirm the price range ($/$$/$$$) or remove this field
        "founder": { "@id": `${siteUrl}/#person` },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Georgetown",
          "addressCountry": "GY"
        },
        "areaServed": [
          { "@type": "Country", "name": "Guyana" },
          { "@type": "City", "name": "Georgetown", "addressCountry": "GY" }
        ],
        "serviceType": [
          "website development",
          "web design Georgetown",
          "e-commerce website development",
          "responsive web design",
          "small business website design",
          "website maintenance services in Guyana",
          "mobile app development"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "url": CALENDLY_URL
        },
        "sameAs": [
          "https://github.com/blackMastery",
          "https://www.linkedin.com/in/kevon-cadogan-113034a8",
          "https://x.com/kevon_cadogan",
          "https://www.facebook.com/kevongudlove24"
        ]
      }
    ]
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

      {/* Main content — the homepage is now a landing page (Hero only); the former
          sections live on their own pages (/about, /resume, /services,
          /portfolio, /contact) linked from the nav and footer. */}
      <main className="min-h-screen flex flex-col">
        <Hero />
      </main>
      <Footer />

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