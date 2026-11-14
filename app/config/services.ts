// Single source of truth for the dedicated service landing pages.
// Used by the Header dropdown, the Footer "Services" links, and the
// "Other services" cross-links inside each service page.

export type ServicePage = {
  /** Route path, e.g. "/web-design-guyana" */
  path: string;
  /** Short label for the nav dropdown and footer */
  navLabel: string;
  /** Longer title used on cross-link cards */
  cardTitle: string;
  /** One-line summary used on cross-link cards */
  cardDescription: string;
  /** Two-sentence, client-facing description used on the /services page */
  summary: string;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    path: "/web-design-guyana",
    navLabel: "Web Design in Guyana",
    cardTitle: "Web Design in Guyana",
    cardDescription: "Custom, responsive websites for Guyanese businesses.",
    summary:
      "Fast, mobile-friendly websites designed around your brand and built to turn visitors into enquiries. From a simple business site to a full custom web app.",
  },
  {
    path: "/ecommerce-development-guyana",
    navLabel: "E-Commerce Development",
    cardTitle: "E-Commerce Development in Guyana",
    cardDescription: "Online stores with secure checkout and inventory.",
    summary:
      "Sell online with a store built for the Guyanese market: secure checkout, product and inventory management, and an admin panel that's easy to run day to day.",
  },
  {
    path: "/hire-web-developer-georgetown",
    navLabel: "Hire a Web Developer",
    cardTitle: "Hire a Web Developer in Georgetown",
    cardDescription: "Work directly with a local full-stack developer.",
    summary:
      "Work directly with the developer building your product, with no agency middlemen. Front-end, back-end, and everything in between, with clear communication throughout.",
  },
  {
    path: "/mobile-app-development-guyana",
    navLabel: "Mobile App Development",
    cardTitle: "Mobile App Development in Guyana",
    cardDescription: "iOS and Android apps built for local users.",
    summary:
      "Cross-platform iOS and Android apps built with React Native: one codebase, a native feel, and a smooth path to the App Store and Google Play.",
  },
  {
    path: "/agentic-ai-for-business",
    navLabel: "Agentic AI",
    cardTitle: "Agentic AI for Business & Government",
    cardDescription: "Custom AI agents that automate tasks and cut costs.",
    summary:
      "Custom AI agents and agentic workflows that take repetitive work off your team's plate, plus AI audits and hands-on staff training.",
  },
];
