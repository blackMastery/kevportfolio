import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Services from "~/components/Services";

const PATH = "/services";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "Services | Web, E-Commerce & Mobile Development in Guyana",
    description:
      "Web development, e-commerce, mobile apps, DevOps, and cloud services for businesses in Georgetown and across Guyana.",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <Services /> to differentiate
// this page from the homepage's Services section.
export default function ServicesPage() {
  return (
    <SectionPageLayout h1="Services">
      <Services />
    </SectionPageLayout>
  );
}
