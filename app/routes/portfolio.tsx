import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Portfolio from "~/components/Portfolio";

const PATH = "/portfolio";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "Portfolio | Web & App Projects in Guyana — Kevon Cadogan",
    description:
      "Selected web and application projects built by Kevon Cadogan, full-stack developer based in Georgetown, Guyana.",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <Portfolio /> to differentiate
// this page from the homepage's Portfolio section.
export default function PortfolioPage() {
  return (
    <SectionPageLayout h1="Portfolio">
      <Portfolio />
    </SectionPageLayout>
  );
}
