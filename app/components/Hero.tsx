import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import ParticlesBackground from "./ParticlesBackground";

function TypedComponent() {
  const el = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && el.current) {
      const typed = new Typed(el.current, {
        strings: [ "Software Developer",  "AI Engineer", "Mobile Developer"],
        typeSpeed: 70,
        backSpeed: 3,
        backDelay: 1000,
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
      aria-label="Hero section with introduction"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0  bg-cover bg-center bg-no-repeat"></div>
      </div>
      
      {/* Particles Background */}
      <ParticlesBackground id="hero-particles" />

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
          <span className="text-gray-200">I'm a  </span>
          <span className="text-primary font-semibold">
            <TypedComponent />
          </span>
        </motion.div>


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