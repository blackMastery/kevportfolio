import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import About from "~/components/About";
import Facts from "~/components/Facts";
import Skills from "~/components/Skills";
import Resume from "~/components/Resume";
import Services from "~/components/Services";
import Contact from "~/components/Contact";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio: Kevon Cadogan" },
    { name: "description", content: "Full-stack developer portfolio" },
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

  return (
    <div className="relative min-h-screen">
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
        <Resume />
        <Services />
        <Contact />
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