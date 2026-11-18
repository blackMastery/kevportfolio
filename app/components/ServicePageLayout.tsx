import type { MetaFunction } from "@remix-run/node";
import type { ReactNode } from "react";
import { Link } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CALENDLY_URL } from "~/config/contact";
import { SERVICE_PAGES } from "~/config/services";
import { buildPageMeta, SITE_URL } from "~/components/SectionPageLayout";

type ServicePageLayoutProps = {
  /** Single H1 for the page */
  h1: string;
  /** Lead paragraph shown under the H1 */
  intro: string;
  /** Optional JSON-LD object (serialized into a <script> tag) */
  jsonLd?: object;
  children: ReactNode;
};

/**
 * Shared chrome for the service landing pages: site Header, a styled <main>
 * with a single H1 + intro, then the page body, then the Footer. Mirrors the
 * homepage usage of <Header /> (no props, no sidebar offset) — do NOT copy the
 * blog routes here.
 */
export default function ServicePageLayout({ h1, intro, jsonLd, children }: ServicePageLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-3 xs:px-4">
          <div className="mb-10 xs:mb-12">
            <h1 className="mb-4 font-raleway text-3xl font-bold text-gray-800 xs:text-4xl sm:text-5xl">
              {h1}
            </h1>
            <div className="mb-6 h-1 w-20 bg-primary"></div>
            <p className="text-base leading-relaxed text-gray-600 xs:text-lg">{intro}</p>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

/** Builds a Remix `meta` array for a service page (same tag set as every other page). */
export function buildServiceMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): ReturnType<MetaFunction> {
  return buildPageMeta({
    title,
    description,
    path,
    imageAlt: "Kevon Cadogan - Full-Stack Developer & AI Engineer in Guyana",
  });
}

/** Builds a WebPage + Service JSON-LD graph tied back to the homepage Person/Business by @id. */
export function buildServiceJsonLd({
  name,
  description,
  path,
  serviceType,
  faqs,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  /** When given, adds an FAQPage node. Pass the same list rendered by <ServiceFAQ />. */
  faqs?: FAQItem[];
}) {
  const pageUrl = `${SITE_URL}${path}`;
  // FAQPage markup must match the visible Q&A text exactly, so it is built from
  // the same list the page renders rather than written separately.
  const faqNode =
    faqs && faqs.length > 0
      ? [
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            isPartOf: { "@id": `${pageUrl}#webpage` },
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name,
        description,
        about: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Service",
        name,
        serviceType,
        description,
        url: pageUrl,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          { "@type": "Country", name: "Guyana" },
          { "@type": "City", name: "Georgetown", addressCountry: "GY" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name, item: pageUrl },
        ],
      },
      ...faqNode,
    ],
  };
}

export type FAQItem = {
  question: string;
  /** Plain text: it is reused verbatim as the FAQPage JSON-LD answer. */
  answer: string;
};

/**
 * Frequently asked questions as native <details> accordions: crawlable, keyboard
 * accessible, and working without JavaScript. Pair with `faqs` in buildServiceJsonLd.
 */
export function ServiceFAQ({ faqs, heading = "Frequently asked questions" }: { faqs: FAQItem[]; heading?: string }) {
  if (faqs.length === 0) return null;
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-6 text-2xl font-semibold text-gray-800">
        {heading}
      </h2>
      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-gray-800 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span>{faq.question}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <p className="pb-5 leading-relaxed text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Shared call-to-action block for service pages. */
export function ServiceCTA() {
  return (
    <section className="mt-12 rounded-xl bg-gray-50 p-6 text-center shadow-sm xs:p-8">
      <h2 className="mb-3 text-2xl font-semibold text-gray-800">Ready to start your project?</h2>
      <p className="mx-auto mb-6 max-w-xl text-gray-600">
        Book a free consultation and let&apos;s talk about what you need and how I can help.
      </p>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-gradient-to-r from-primary to-primary-hover px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
      >
        Book a Meeting
      </a>
    </section>
  );
}

/** Cross-links to the other service pages (internal-link equity + discovery). */
export function OtherServices({ currentPath }: { currentPath: string }) {
  const others = SERVICE_PAGES.filter((service) => service.path !== currentPath);
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Other services</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {others.map((service) => (
          <Link
            key={service.path}
            to={service.path}
            className="block rounded-lg border border-gray-200 p-5 transition-colors hover:border-primary hover:bg-gray-50"
          >
            <h3 className="mb-1 text-lg font-semibold text-gray-800">{service.cardTitle}</h3>
            <p className="text-sm text-gray-600">{service.cardDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
