import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ServicePageLayout, {
  buildServiceMeta,
  buildServiceJsonLd,
  ServiceCTA,
  OtherServices,
} from "~/components/ServicePageLayout";

const PATH = "/ecommerce-development-guyana";

export const meta: MetaFunction = () =>
  buildServiceMeta({
    title: "E-Commerce Development in Guyana | Online Stores",
    description:
      "E-commerce development in Guyana. Secure online stores with smooth checkout, payment integration, and inventory management so you can start selling online.",
    path: PATH,
  });

export default function EcommerceDevelopmentGuyana() {
  const jsonLd = buildServiceJsonLd({
    name: "E-Commerce Development in Guyana",
    description:
      "Custom e-commerce websites and online stores for businesses in Guyana.",
    path: PATH,
    serviceType: "E-Commerce Development",
  });

  return (
    <ServicePageLayout
      h1="E-Commerce Development in Guyana"
      intro="Sell online with a custom store built for the Guyanese market — secure checkout, the payment methods your customers use, and an admin panel that makes managing products easy."
      jsonLd={jsonLd}
    >
      {/* TODO: Review this placeholder marketing copy. Confirm which payment gateways
          you actually integrate (e.g. local bank options, Stripe, PayPal) before
          publishing — the list below is generic. Replace any claim you can't back up. */}

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">An online store that&apos;s easy to run</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          I build online stores that are simple for your customers to buy from and simple for you
          to manage. Add products, track orders, and update prices from a clean dashboard — no
          technical knowledge required. Every store is built mobile-first, because that&apos;s how
          most shoppers in Guyana browse.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What your store can include</h2>
        <ul className="space-y-3">
          {[
            "Product catalog with categories, search, and filtering",
            "Secure checkout and payment integration", // TODO: name the specific gateways you support
            "Inventory and order management dashboard",
            "Customer accounts, wishlists, and order history",
            "Discount codes, shipping options, and tax rules",
            "Email notifications for orders and receipts",
          ].map((item) => (
            <li key={item} className="flex items-start text-gray-600">
              <span className="mr-2 mt-1 flex-shrink-0 text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Built to grow with your business</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Whether you&apos;re launching your first product line or moving an established shop
          online, I&apos;ll build a store that can scale with you. You can start small and add
          features — subscriptions, multi-currency, integrations — as you grow. Want to see the
          kind of work I do? Browse my{" "}
          <Link to="/portfolio" className="text-primary hover:underline">
            portfolio
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            book a call
          </Link>
          .
        </p>
      </section>

      <ServiceCTA />
      <OtherServices currentPath={PATH} />
    </ServicePageLayout>
  );
}
