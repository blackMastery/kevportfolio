import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ServicePageLayout, {
  buildServiceMeta,
  buildServiceJsonLd,
  ServiceCTA,
  OtherServices,
} from "~/components/ServicePageLayout";

const PATH = "/web-design-guyana";

export const meta: MetaFunction = () =>
  buildServiceMeta({
    title: "Web Design in Guyana | Custom Business Websites",
    description:
      "Custom, responsive web design for businesses in Guyana. Fast, modern, mobile-friendly websites that turn visitors into customers — built in Georgetown.",
    path: PATH,
  });

export default function WebDesignGuyana() {
  const jsonLd = buildServiceJsonLd({
    name: "Web Design in Guyana",
    description:
      "Custom, responsive web design and development for businesses across Guyana.",
    path: PATH,
    serviceType: "Web Design",
  });

  return (
    <ServicePageLayout
      h1="Web Design in Guyana"
      intro="I design and build custom websites for businesses across Guyana — fast, responsive, and built to convert. From a simple brochure site to a full custom web app, every project is tailored to your goals."
      jsonLd={jsonLd}
    >
      {/* TODO: Review this placeholder marketing copy and replace generic claims
          with your real specifics (turnaround times, packages, pricing, number of
          clients, guarantees). Nothing here states a hard number on purpose. */}

      <section className="prose-gray">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Websites built for results, not just looks</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          A good website should do more than look modern — it should load quickly, work
          flawlessly on phones, and guide visitors toward getting in touch or buying. I build
          every site with clean, hand-written code so it stays fast, ranks well, and is easy to
          grow as your business does.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What&apos;s included</h2>
        <ul className="space-y-3">
          {[
            "Custom, mobile-first design that matches your brand",
            "Fast-loading pages optimized for Google and Core Web Vitals",
            "Clear calls to action so visitors know what to do next",
            "On-page SEO basics: titles, meta descriptions, and structured data",
            "Contact forms, booking links, and social integration",
            "Training so you can update content yourself",
          ].map((item) => (
            <li key={item} className="flex items-start text-gray-600">
              <span className="mr-2 mt-1 flex-shrink-0 text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Web design for the Guyanese market</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Being based in Georgetown means I understand the local market, the devices and networks
          your customers actually use, and how to present your business so it stands out here at
          home. Whether you&apos;re a small business getting online for the first time or an
          established company that needs a refresh, I&apos;ll meet you where you are. See a few
          recent builds in my{" "}
          <Link to="/portfolio" className="text-primary hover:underline">
            portfolio
          </Link>
          , or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            get in touch
          </Link>{" "}
          to talk through your project.
        </p>
      </section>

      <ServiceCTA />
      <OtherServices currentPath={PATH} />
    </ServicePageLayout>
  );
}
