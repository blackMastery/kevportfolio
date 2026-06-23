import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Skills from "~/components/Skills";

const PATH = "/skills";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "Skills & Tech Stack | Kevon Cadogan",
    description:
      "The languages, frameworks, and tools Kevon Cadogan works with — including React, Node.js, Python, Django, React Native, and TypeScript.",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <Skills /> to differentiate
// this page from the homepage's Skills section.
export default function SkillsPage() {
  return (
    <SectionPageLayout h1="Skills & Technologies">
      <Skills />
    </SectionPageLayout>
  );
}
