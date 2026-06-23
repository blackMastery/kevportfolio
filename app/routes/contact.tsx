import type { MetaFunction } from "@remix-run/node";
import SectionPageLayout, { buildPageMeta } from "~/components/SectionPageLayout";
import Contact from "~/components/Contact";

const PATH = "/contact";

export const meta: MetaFunction = () =>
  buildPageMeta({
    title: "Contact Kevon Cadogan | Web Developer in Georgetown, Guyana",
    description:
      "Get in touch with Kevon Cadogan — book a meeting, email, or call. Full-stack web developer based in Georgetown, Guyana.",
    path: PATH,
  });

// TODO: Optionally add a unique intro paragraph above <Contact /> to differentiate
// this page from the homepage's Contact section.
export default function ContactPage() {
  return (
    <SectionPageLayout h1="Contact">
      <Contact />
    </SectionPageLayout>
  );
}
