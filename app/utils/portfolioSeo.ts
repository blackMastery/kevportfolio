import {
  portfolioProjects,
  portfolioProjectPath,
  type PortfolioProject,
} from "~/data/portfolioProjects";
import { SITE_URL } from "~/components/SectionPageLayout";

const PORTFOLIO_PATH = "/portfolio";
const PORTFOLIO_URL = `${SITE_URL}${PORTFOLIO_PATH}`;
export const PORTFOLIO_OG_IMAGE = `${SITE_URL}/img/portfolio/banner/optimized/portfolio-og.jpg`;

/** Absolute URL of a project's detail page. */
export function projectPageUrl(project: PortfolioProject) {
  return `${SITE_URL}${portfolioProjectPath(project)}`;
}

/** Absolute URL of the image that best represents a project. */
export function projectImageUrl(project: PortfolioProject) {
  return `${SITE_URL}${project.banner?.src ?? project.logo}`;
}

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
          // The detail page, so the list gives crawlers a path into each project.
          url: projectPageUrl(project),
          item: {
            "@type": "WebSite",
            "@id": `${PORTFOLIO_URL}#${project.id}`,
            name: project.name,
            description: project.description,
            url: project.url,
            image: projectImageUrl(project),
            creator: { "@id": `${SITE_URL}/#person` },
          },
        })),
      },
    ],
  };
}

/** WebPage + project + breadcrumb graph for a single project detail page. */
export function buildProjectJsonLd({
  project,
  title,
  description,
}: {
  project: PortfolioProject;
  title: string;
  description: string;
}) {
  const pageUrl = projectPageUrl(project);
  const image = projectImageUrl(project);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        primaryImageOfPage: image,
        isPartOf: { "@id": `${PORTFOLIO_URL}#webpage` },
        about: { "@id": `${pageUrl}#project` },
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#project`,
        name: project.name,
        description: project.detail.tagline,
        url: project.url,
        image,
        creator: { "@id": `${SITE_URL}/#person` },
        keywords: project.detail.stack.join(", "),
        ...(project.detail.year ? { dateCreated: project.detail.year } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
