import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ServicePageLayout, {
  buildServiceMeta,
  buildServiceJsonLd,
  ServiceCTA,
  OtherServices,
} from "~/components/ServicePageLayout";

const PATH = "/hire-web-developer-georgetown";

export const meta: MetaFunction = () =>
  buildServiceMeta({
    title: "Hire a Web Developer in Georgetown, Guyana",
    description:
      "Hire a local full-stack web developer in Georgetown, Guyana. Work directly with me — React, Node.js, Django, and mobile — for web apps, sites, and ongoing support.",
    path: PATH,
  });

export default function HireWebDeveloperGeorgetown() {
  const jsonLd = buildServiceJsonLd({
    name: "Hire a Web Developer in Georgetown",
    description:
      "Freelance full-stack web development services in Georgetown, Guyana.",
    path: PATH,
    serviceType: "Web Development",
  });

  return (
    <ServicePageLayout
      h1="Hire a Web Developer in Georgetown"
      intro="Looking to hire a web developer in Georgetown? Work directly with me — no agency middlemen. I handle the front-end, the back-end, and everything in between, with clear communication and dependable delivery."
      jsonLd={jsonLd}
    >
      {/* TODO: Review this placeholder copy. The "five years" experience claim mirrors
          your About section — update it if that figure changes. Add real engagement
          rates / availability if you want them public. */}

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">A developer who works with you, not around you</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          When you hire me, you talk to the person actually building your project. That means
          fewer misunderstandings, faster decisions, and code you can trust. I&apos;ve spent years
          building client and server applications across a range of industries, and I bring an
          agile, detail-oriented approach to every engagement.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What I can help with</h2>
        <ul className="space-y-3">
          {[
            "Full-stack web applications (React, Node.js, Django)",
            "Marketing sites, landing pages, and business websites",
            "E-commerce stores and custom dashboards",
            "Mobile apps for iOS and Android",
            "API development and third-party integrations",
            "Ongoing maintenance, fixes, and performance tuning",
          ].map((item) => (
            <li key={item} className="flex items-start text-gray-600">
              <span className="mr-2 mt-1 flex-shrink-0 text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Ways to work together</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Some clients need a single project delivered end to end; others want a developer on call
          for changes and new features. I&apos;m flexible on both — project-based or ongoing,
          whatever fits how you work. Take a look at my{" "}
          <Link to="/resume" className="text-primary hover:underline">
            background
          </Link>{" "}
          and{" "}
          <Link to="/portfolio" className="text-primary hover:underline">
            recent work
          </Link>
          , then{" "}
          <Link to="/contact" className="text-primary hover:underline">
            reach out
          </Link>{" "}
          to discuss yours.
        </p>
      </section>

      <ServiceCTA />
      <OtherServices currentPath={PATH} />
    </ServicePageLayout>
  );
}
