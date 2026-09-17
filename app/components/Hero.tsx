import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { CALENDLY_URL } from "~/config/contact";
import { Spotlight } from "@/components/ui/spotlight";

// Kept in sync with the <link rel="preload"> in root.tsx — this is the LCP image.
const HERO_PORTRAIT = "/img/kevon-cadogan-portrait-cutout.webp";

/** Each role carries its own article so "Agentic" reads "an", not "a". */
const ROLES = [
  "a Website Developer",
  "an Agentic AI Engineer",
  "a Mobile Developer",
];

/** Headline figures mirror the numbers published on the /about facts section. */
const STATS = [
  { value: "121", label: "Projects delivered", short: "Projects" },
  { value: "32", label: "Happy clients", short: "Clients" },
  { value: "5+", label: "Years building", short: "Years" },
];

function TypedRoles() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: ROLES,
      typeSpeed: 70,
      backSpeed: 3,
      backDelay: 1000,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      {/* The cursor animation is noise to a screen reader, so the roles are
          exposed once as static text and the animated node is hidden. */}
      <span className="sr-only">{ROLES.join(", ")}</span>
      <span ref={el} aria-hidden="true">
        a Website Developer
      </span>
    </>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Staggered entrance: each element declares its own slot in the sequence.
  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-dark pt-16"
      aria-label="Introduction"
    >
      {/* ---------- backdrop ---------- */}
      {/* A deep navy base rather than a bright blue one: the suit is navy, and it
          only reads as a silhouette against something darker than itself. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 72% 85%, rgba(20,157,221,0.28), transparent 70%), linear-gradient(145deg, #071426 0%, #0c2444 42%, #050d1a 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 35%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 35%, #000 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent"
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      {/* ---------- content ---------- */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-end gap-8 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        <div className="self-center py-6 text-center sm:py-10 lg:py-24 lg:text-left">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-sm sm:px-4 sm:text-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </motion.p>

          <motion.h1
            {...rise(0.05)}
            className="mt-5 font-raleway text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl"
          >
            Kevon Cadogan
          </motion.h1>

          <motion.p
            {...rise(0.1)}
            className="mt-3 font-open-sans text-xl text-gray-300 sm:text-2xl md:text-3xl"
          >
            I&apos;m{" "}
            <span className="font-semibold text-primary">
              <TypedRoles />
            </span>
          </motion.p>

          <motion.p
            {...rise(0.15)}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300/90 sm:text-base md:mt-6 md:text-lg lg:mx-0"
          >
            Full-stack developer in Georgetown, Guyana, building fast, reliable web
            and mobile products — and the agentic AI that makes them smarter.
          </motion.p>

          <motion.div
            {...rise(0.2)}
            className="mt-6 flex flex-row items-center justify-center gap-3 sm:mt-8 lg:justify-start"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white sm:px-7 sm:py-3.5 sm:text-base shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:hover:translate-y-0"
            >
              Book a Meeting
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white sm:px-7 sm:py-3.5 sm:text-base backdrop-blur-sm transition hover:border-white/40 hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View My Work
            </Link>
          </motion.div>

          <motion.dl
            {...rise(0.28)}
            className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-5 sm:gap-4 md:mt-10 lg:mx-0"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-raleway text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-wider text-gray-400 sm:text-xs">
                    <span className="sm:hidden">{stat.short}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------- portrait ---------- */}
        <motion.div
          className="relative flex h-full min-h-[40svh] items-end justify-center lg:min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* concentric rings and a rim glow give the figure a stage to stand on */}
          <div
            aria-hidden="true"
            className="absolute bottom-[6%] left-1/2 hidden aspect-square w-[105%] max-w-[34rem] -translate-x-1/2 rounded-full border border-white/10 lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[6%] left-1/2 hidden aspect-square w-[78%] max-w-[26rem] -translate-x-1/2 rounded-full border border-white/[0.06] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-[65%] w-[120%] max-w-[38rem] -translate-x-1/2 rounded-[100%] bg-primary/20 blur-[90px]"
          />
          {/* contact shadow — the cutout dropped the studio floor shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-1 left-1/2 h-8 w-[60%] max-w-[18rem] -translate-x-1/2 -translate-y-1 rounded-[100%] bg-black/70 blur-xl"
          />

          <motion.img
            src={HERO_PORTRAIT}
            alt="Kevon Cadogan, full-stack developer, standing in a navy suit"
            width={354}
            height={1136}
            loading="eager"
            // @ts-expect-error -- fetchpriority is valid HTML that React 18 types lack
            fetchpriority="high"
            decoding="async"
            className="relative h-auto max-h-[40svh] w-auto object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.55)] sm:max-h-[46svh] lg:max-h-[calc(100svh-8rem)]"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </section>
  );
}
