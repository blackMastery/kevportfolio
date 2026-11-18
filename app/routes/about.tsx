import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import About from "~/components/About";

const PATH = "/about";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "About Kevon Cadogan | Full-Stack & AI Developer in Guyana",
    description:
      "Meet Kevon Cadogan, a Georgetown, Guyana full-stack developer with 5+ years building web apps, mobile apps, AI agents and agentic workflows for growing businesses.",
    keywords:
      "Kevon Cadogan, about, full-stack developer, AI engineer, AI agents, agentic workflows, React, Next.js, React Native, Flutter, Node.js, Python, Django, Georgetown Guyana",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <About /> to differentiate
// this page from the homepage's About section.
export default function AboutPage() {
  return (
    <SectionPageLayout h1="About Kevon Cadogan">
      <About />
    </SectionPageLayout>
  );
}
