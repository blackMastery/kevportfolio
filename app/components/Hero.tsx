import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { CALENDLY_URL } from "~/config/contact";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

function scheduleIdleWork(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }

  const timeoutId = setTimeout(callback, 300);
  return () => clearTimeout(timeoutId);
}

function TypedComponent() {
  const el = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && el.current) {
      const typed = new Typed(el.current, {
        strings: [
          "Website Developer",
          "Agentic AI Engineer",
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
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    return scheduleIdleWork(() => setShowSpline(true));
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden"
      aria-label="Hero section with introduction"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-8">
        <motion.div
          className="flex-1 text-center lg:text-left text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold font-raleway mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            Kevon Cadogan
          </motion.h1>

          <motion.div
            className="text-2xl md:text-4xl font-open-sans"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="text-gray-200">I'm a </span>
            <span className="text-primary font-semibold">
              <TypedComponent />
            </span>
          </motion.div>

          <motion.p
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            I am a full-stack developer with a passion for creating innovative web solutions.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
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

        <motion.div
          className="flex-1 w-full h-[360px] sm:h-[440px] lg:h-[600px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {showSpline && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
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
