import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

function TypedComponent() {
  const el = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && el.current) {
      const typed = new Typed(el.current, {
        strings: ["Designer", "Developer", "Freelancer", "ChatBot Dev"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return <span ref={el}>Developer</span>;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0  bg-cover bg-center bg-no-repeat"></div>
      </div>
      
      {/* Animated Particles */}
      {typeof window !== "undefined" && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <motion.div
        className="hero-container text-center text-white z-10 px-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold font-raleway mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Kevon Cadogan
        </motion.h1>
        
        <motion.div
          className="text-2xl md:text-4xl font-open-sans"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className="text-gray-200">I'm </span>
          <span className="text-primary font-semibold">
            <TypedComponent />
          </span>
        </motion.div>

        <motion.a
          href="https://v75inc.com/our-team/kevon-cadogan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-300 hover:text-primary transition-colors mt-6 text-base md:text-lg group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Full-Stack Developer at V75 Inc</span>
          <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}