import type { MetaFunction } from "@remix-run/node";
import type { ReactNode } from "react";
import { Link } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CALENDLY_URL } from "~/config/contact";
import { SERVICE_PAGES } from "~/config/services";

const SITE_URL = "https://www.kevoncadogan.com";
const SOCIAL_IMAGE = `${SITE_URL}/img/kev_logo.png`;

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

/** Builds a Remix `meta` array for a service page, mirroring the homepage tag shape. */
export function buildServiceMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): ReturnType<MetaFunction> {
  const url = `${SITE_URL}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: "Kevon Cadogan" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:site_name", content: "Kevon Cadogan Portfolio" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ];
}

/** Builds a WebPage + Service JSON-LD graph tied back to the homepage Person/Business by @id. */
export function buildServiceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  const pageUrl = `${SITE_URL}${path}`;
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
    ],
  };
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
