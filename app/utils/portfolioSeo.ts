import { portfolioProjects } from "~/data/portfolioProjects";
import { SITE_URL } from "~/components/SectionPageLayout";

const PORTFOLIO_PATH = "/portfolio";
const PORTFOLIO_URL = `${SITE_URL}${PORTFOLIO_PATH}`;
export const PORTFOLIO_OG_IMAGE = `${SITE_URL}/img/portfolio/banner/impact-bg.png`;

export function buildPortfolioJsonLd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PORTFOLIO_URL}#webpage`,
        url: PORTFOLIO_URL,
        name: title,
        description,
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${PORTFOLIO_URL}#projects` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PORTFOLIO_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: PORTFOLIO_URL,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${PORTFOLIO_URL}#projects`,
        name: "Web & App Projects by Kevon Cadogan",
        numberOfItems: portfolioProjects.length,
        itemListElement: portfolioProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebSite",
            "@id": `${PORTFOLIO_URL}#${project.id}`,
            name: project.name,
            description: project.description,
            url: project.url,
            image: `${SITE_URL}${project.banner ?? project.logo}`,
            creator: { "@id": `${SITE_URL}/#person` },
          },
        })),
      },
    ],
  };
}
