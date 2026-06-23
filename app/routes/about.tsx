import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import About from "~/components/About";

const PATH = "/about";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "About Kevon Cadogan | Full-Stack Developer in Guyana",
    description:
      "Learn about Kevon Cadogan, a full-stack developer based in Georgetown, Guyana, building modern web and mobile applications.",
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
