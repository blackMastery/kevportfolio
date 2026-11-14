import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@remix-run/react";
import { CALENDLY_URL } from "~/config/contact";
import { SERVICE_PAGES } from "~/config/services";

/** Outline icon paths (24x24) keyed by service page path. */
const ICONS: Record<string, string> = {
  "/web-design-guyana":
    "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  "/ecommerce-development-guyana":
    "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  "/hire-web-developer-georgetown": "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  "/mobile-app-development-guyana":
    "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  "/agentic-ai-for-business":
    "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
};

const CLOUD_ICON =
  "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z";

function ServiceIcon({ path }: { path: string }) {
  return (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );
}

const CARD_CLASS =
  "flex h-full flex-col rounded-xl bg-gray-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-8";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-100px" });

  return (
    <section id="services" className="py-12 md:py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-gray-600 md:mb-14 md:text-lg">
          I design and build websites, online stores, mobile apps, and AI agents for businesses in
          Georgetown, across Guyana, and remotely. You work directly with me from the first call to
          launch and beyond.
        </p>

        {/* Each offering links to its dedicated, indexable service page. */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {SERVICE_PAGES.map((service) => (
            <Link key={service.path} to={service.path} className={`${CARD_CLASS} group`}>
              <span className="mb-5 text-primary">
                <ServiceIcon path={ICONS[service.path] ?? CLOUD_ICON} />
              </span>
              <h3 className="mb-3 text-xl font-semibold text-gray-800 transition-colors group-hover:text-primary md:text-2xl">
                {service.cardTitle}
              </h3>
              <p className="mb-5 flex-1 leading-relaxed text-gray-600">{service.summary}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}

          <div className={CARD_CLASS}>
            <span className="mb-5 text-primary">
              <ServiceIcon path={CLOUD_ICON} />
            </span>
            <h3 className="mb-3 text-xl font-semibold text-gray-800 md:text-2xl">Cloud &amp; DevOps</h3>
            <p className="flex-1 leading-relaxed text-gray-600">
              Cloud hosting, server migrations, and CI/CD pipelines on AWS and GitHub, planned to
              keep costs down while improving security and performance.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
            Ready to start your next project? Book a free consultation.
          </p>
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-primary to-primary-hover text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Meeting
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}