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
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    path: "/web-design-guyana",
    navLabel: "Web Design in Guyana",
    cardTitle: "Web Design in Guyana",
    cardDescription: "Custom, responsive websites for Guyanese businesses.",
  },
  {
    path: "/ecommerce-development-guyana",
    navLabel: "E-Commerce Development",
    cardTitle: "E-Commerce Development in Guyana",
    cardDescription: "Online stores with secure checkout and inventory.",
  },
  {
    path: "/hire-web-developer-georgetown",
    navLabel: "Hire a Web Developer",
    cardTitle: "Hire a Web Developer in Georgetown",
    cardDescription: "Work directly with a local full-stack developer.",
  },
  {
    path: "/mobile-app-development-guyana",
    navLabel: "Mobile App Development",
    cardTitle: "Mobile App Development in Guyana",
    cardDescription: "iOS and Android apps built for local users.",
  },
];
