import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Services from "~/components/Services";

const PATH = "/services";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "Web, Mobile & AI Development Services in Guyana | Kevon Cadogan",
    description:
      "Website design, e-commerce stores, mobile apps, and AI agents for businesses in Georgetown and across Guyana. Work directly with a local full-stack developer.",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <Services /> to differentiate
// this page from the homepage's Services section.
export default function ServicesPage() {
  return (
    <SectionPageLayout h1="Web, E-Commerce, Mobile & AI Development Services in Guyana">
      <Services />
    </SectionPageLayout>
  );
}
