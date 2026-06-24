import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Resume from "~/components/Resume";

const PATH = "/resume";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "Resume | Kevon Cadogan, Full-Stack Developer",
    description:
      "Kevon Cadogan's resume — education, certifications in AI agents, deep learning, and AWS, and professional background as a full-stack developer based in Georgetown, Guyana.",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <Resume /> to differentiate
// this page from the homepage's Resume section.
export default function ResumePage() {
  return (
    <SectionPageLayout h1="Resume">
      <Resume />
    </SectionPageLayout>
  );
}
