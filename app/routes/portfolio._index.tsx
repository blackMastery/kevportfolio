import type { LinksFunction, MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Portfolio from "~/components/Portfolio";
import {
  portfolioPriorityBanners,
  portfolioProjectNames,
} from "~/data/portfolioProjects";
import { buildPortfolioJsonLd, PORTFOLIO_OG_IMAGE } from "~/utils/portfolioSeo";

const PATH = "/portfolio";
const TITLE = "Portfolio | Web & App Projects in Guyana — Kevon Cadogan";
const H1 = "Web & App Projects Built in Guyana";
const PORTFOLIO_DESCRIPTION = `Selected web and application projects built by Kevon Cadogan, full-stack developer based in Georgetown, Guyana. Projects include ${portfolioProjectNames.join(", ")}.`;
const PORTFOLIO_KEYWORDS =
  "web developer portfolio Guyana, e-commerce website Georgetown, travel website development Guyana, React developer portfolio, full-stack developer projects, website design Guyana";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: TITLE,
    description: PORTFOLIO_DESCRIPTION,
    path: PATH,
    keywords: PORTFOLIO_KEYWORDS,
    image: PORTFOLIO_OG_IMAGE,
    imageAlt: "Portfolio of web and app projects built by Kevon Cadogan in Guyana",
    imageWidth: "1200",
    imageHeight: "630",
  });

export const links: LinksFunction = () =>
  portfolioPriorityBanners.flatMap((banner) => [
    {
      rel: "preload",
      as: "image",
      href: banner.src.replace("-800.jpg", "-800.webp"),
      type: "image/webp",
      imageSrcSet: banner.srcSet,
      imageSizes: banner.sizes,
    },
  ]);

const portfolioJsonLd = buildPortfolioJsonLd({
  title: TITLE,
  description: PORTFOLIO_DESCRIPTION,
});

export default function PortfolioPage() {
  return (
    <SectionPageLayout h1={H1} jsonLd={portfolioJsonLd}>
      <div className="container mx-auto max-w-3xl px-3 xs:px-4 pb-2 pt-8 text-center">
        <p className="text-sm leading-relaxed text-white xs:text-base sm:text-lg">
          A selection of live websites and web applications I&apos;ve designed and built for
          businesses in Guyana and the Caribbean — from e-commerce and retail to travel and
          marketing agencies.
        </p>
      </div>
      <Portfolio />
    </SectionPageLayout>
  );
}
