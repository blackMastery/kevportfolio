import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ServicePageLayout, {
  buildServiceMeta,
  buildServiceJsonLd,
  ServiceCTA,
  OtherServices,
} from "~/components/ServicePageLayout";

const PATH = "/mobile-app-development-guyana";

export const meta: MetaFunction = () =>
  buildServiceMeta({
    title: "Mobile App Development in Guyana | iOS & Android",
    description:
      "Mobile app development in Guyana for iOS and Android. Fast, reliable cross-platform apps built with React Native — from idea and design to launch on the app stores.",
    path: PATH,
  });

export default function MobileAppDevelopmentGuyana() {
  const jsonLd = buildServiceJsonLd({
    name: "Mobile App Development in Guyana",
    description:
      "Cross-platform iOS and Android mobile app development for clients in Guyana.",
    path: PATH,
    serviceType: "Mobile App Development",
  });

  return (
    <ServicePageLayout
      h1="Mobile App Development in Guyana"
      intro="Bring your idea to the App Store and Google Play. I build cross-platform mobile apps with React Native — one codebase, native performance, and a smooth experience for your users in Guyana and beyond."
      jsonLd={jsonLd}
    >
      {/* TODO: Review this placeholder copy. Confirm the platforms/stack you commit to
          (React Native is assumed from your skills) and replace any capability you
          don't want to advertise. */}

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">One app, both app stores</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Building separately for iOS and Android usually means double the cost and double the
          maintenance. With React Native I build a single codebase that runs natively on both —
          so you reach every customer without paying twice. You get an app that feels fast,
          looks polished, and is straightforward to update.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What I can build</h2>
        <ul className="space-y-3">
          {[
            "Cross-platform iOS and Android apps with React Native",
            "Customer-facing apps: booking, ordering, loyalty, and more",
            "Apps backed by a custom API and secure user accounts",
            "Push notifications and offline-friendly experiences",
            "App Store and Google Play submission and setup",
            "Updates, new features, and maintenance after launch",
          ].map((item) => (
            <li key={item} className="flex items-start text-gray-600">
              <span className="mr-2 mt-1 flex-shrink-0 text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">From idea to launch</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          I&apos;ll work with you from the first sketch through to a published app — planning,
          design, development, testing, and store submission. If your app needs a website or
          admin panel too, I can build that as part of the same project. See related work in my{" "}
          <Link to="/portfolio" className="text-primary hover:underline">
            portfolio
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            tell me about your idea
          </Link>
          .
        </p>
      </section>

      <ServiceCTA />
      <OtherServices currentPath={PATH} />
    </ServicePageLayout>
  );
}
