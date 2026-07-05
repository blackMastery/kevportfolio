export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  banner?: string;
  logoDarkBg?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "waronretailguyana",
    name: "War On Retail Guyana",
    description:
      "Guyana's trusted electronics and home-appliance store. Authentic products with manufacturer warranties, nationwide delivery, and real human support on every order.",
    url: "https://www.waronretailguyana.com/",
    logo: "/img/portfolio/banner/waronretail-banner.png",
    banner: "/img/portfolio/banner/waronretail-banner.png",
  },
  {
    id: "mistaconciergetravel",
    name: "Mista Concierge Travel",
    description:
      "Specialty Caribbean and Latin America travel provider offering solo, private, and guided vacations with full concierge-level service across 15+ islands.",
    url: "https://www.mistaconciergetravel.com/",
    logo: "/img/portfolio/mc-logo.png",
    banner: "/img/portfolio/banner/mista-banner.png",
  },
  {
    id: "impact-business-solutions",
    name: "Impact Business Solutions",
    description:
      "Since 2021, Impact Business Solutions has been empowering businesses to grow both online and offline through innovative marketing and business development strategies. We are a boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.",
    url: "https://impact-business-solutions.vercel.app/",
    logo: "/img/portfolio/impact-business-solutions-logo.png",
    banner: "/img/portfolio/banner/impact-bg.png",
    logoDarkBg: true,
  },
  {
    id: "healthyzway",
    name: "Healthyzway",
    description:
      "Proudly Guyanese-Owned 🇬🇾 Premium SeaMoss Gel - Nature's 92 minerals for your complete wellness",
    url: "https://healthyzway.vercel.app/",
    logo: "/img/portfolio/healthyzway-logo.png",
    banner: "/img/portfolio/banner/healthyzway-banner.png",
  },
  {
    id: "selenafurniturestore",
    name: "Selena's Furniture Store Guyana",
    description:
      "Selena's Furniture Store Guyana is a furniture store that sells furniture for the home and office.",
    url: "https://selenafurniturestore.com/",
    logo: "/img/portfolio/selenafurniturestore-logo.jpg",
    banner: "/img/portfolio/banner/selena-banner.png",
  },

  {
    id: "bucketlistcaribbean",
    name: "Bucketlist Caribbean",
    description:
      "Guyanese travel company specializing in Caribbean tours and vacations — curated getaways, all-inclusive packages, and island journeys across the region.",
    url: "https://www.bucketlistcaribbean.com/",
    logo: "/img/portfolio/bucketlistcaribbean-logo.png",
    banner: "/img/portfolio/banner/busketlistcaribbean2.png",
  },
];

export const portfolioProjectNames = portfolioProjects.map((project) => project.name);
