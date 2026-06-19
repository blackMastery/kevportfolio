import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { CALENDLY_URL } from "~/config/contact";
import ParticlesBackground from "./ParticlesBackground";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

function TypedComponent() {
  const el = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && el.current) {
      const typed = new Typed(el.current, {
        strings: [
          "Website Developer in Guyana",
          "Responsive Web Design Specialist",
          "E-commerce Developer",
          "AI Engineer",
          "Mobile Developer",
        ],
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
      className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden"
      aria-label="Hero section with introduction"
    >
      {/* Particles Background */}
      <ParticlesBackground id="hero-particles" />

      {/* Spotlight glow */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-8">
        {/* Left: intro text */}
        <motion.div
          className="flex-1 text-center lg:text-left text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-raleway mb-6"
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
            <span className="text-gray-200">I'm a </span>
            <span className="text-primary font-semibold">
              <TypedComponent />
            </span>
          </motion.div>

          <motion.p
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >

            I am a full-stack developer with a passion for creating innovative web solutions. 
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-primary-hover transition-colors"
            >
              Book a Meeting
            </a>
          </motion.div>
        </motion.div>

        {/* Right: interactive 3D scene */}
        <motion.div
          className="flex-1 w-full h-[360px] sm:h-[440px] lg:h-[600px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
    </section>
  );
}
