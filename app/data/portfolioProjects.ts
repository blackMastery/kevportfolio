export interface PortfolioBanner {
  /** JPEG fallback / default src */
  src: string;
  /** Responsive WebP srcset */
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  banner?: PortfolioBanner;
  logoDarkBg?: boolean;
}

const BANNER_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function optimizedBanner(slug: string, width = 800, height = 450): PortfolioBanner {
  const base = `/img/portfolio/banner/optimized/${slug}`;
  return {
    src: `${base}-800.jpg`,
    srcSet: `${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`,
    sizes: BANNER_SIZES,
    width,
    height,
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "cmeprep",
    name: "cmeprep.me",
    description:
      "Medical board and exit exam prep platform with practice questions, timed mock exams, per-topic analytics, and an OSCE station bank across 7 examination question banks.",
    url: "https://www.cmeprep.me/",
    logo: "/img/portfolio/cmeprep-logo.jpg",
    banner: optimizedBanner("cmeprep"),
  },
  {
    id: "waronretailguyana",
    name: "War On Retail Guyana",
    description:
      "Guyana's trusted electronics and home-appliance store. Authentic products with manufacturer warranties, nationwide delivery, and real human support on every order.",
    url: "https://www.waronretailguyana.com/",
    logo: "/img/portfolio/waronretailguyana-logo.png",
    banner: optimizedBanner("waronretail"),
  },
  {
    id: "mistaconciergetravel",
    name: "Mista Concierge Travel",
    description:
      "Specialty Caribbean and Latin America travel provider offering solo, private, and guided vacations with full concierge-level service across 15+ islands.",
    url: "https://www.mistaconciergetravel.com/",
    logo: "/img/portfolio/mc-logo.png",
    banner: optimizedBanner("mista"),
  },
  {
    id: "impact-business-solutions",
    name: "Impact Business Solutions",
    description:
      "Since 2021, Impact Business Solutions has been empowering businesses to grow both online and offline through innovative marketing and business development strategies. We are a boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.",
    url: "https://impact-business-solutions.vercel.app/",
    logo: "/img/portfolio/impact-business-solutions-logo.png",
    banner: optimizedBanner("impact"),
    logoDarkBg: true,
  },
  {
    id: "healthyzway",
    name: "Healthyzway",
    description:
      "Proudly Guyanese-Owned 🇬🇾 Premium SeaMoss Gel - Nature's 92 minerals for your complete wellness",
    url: "https://healthyzway.vercel.app/",
    logo: "/img/portfolio/healthyzway-logo.png",
    banner: optimizedBanner("healthyzway"),
  },
  {
    id: "selenafurniturestore",
    name: "Selena's Furniture Store Guyana",
    description:
      "Selena's Furniture Store Guyana is a furniture store that sells furniture for the home and office.",
    url: "https://selenafurniturestore.com/",
    logo: "/img/portfolio/selenafurniturestore-logo.jpg",
    banner: optimizedBanner("selena"),
  },
  {
    id: "bucketlistcaribbean",
    name: "Bucketlist Caribbean",
    description:
      "Guyanese travel company specializing in Caribbean tours and vacations — curated getaways, all-inclusive packages, and island journeys across the region.",
    url: "https://www.bucketlistcaribbean.com/",
    logo: "/img/portfolio/bucketlistcaribbean-logo.png",
    banner: optimizedBanner("bucketlistcaribbean"),
  },
];

export const portfolioProjectNames = portfolioProjects.map((project) => project.name);

/** First-row images to preload on the dedicated portfolio page */
export const portfolioPriorityBanners = portfolioProjects
  .slice(0, 2)
  .map((project) => project.banner)
  .filter((banner): banner is PortfolioBanner => Boolean(banner));
