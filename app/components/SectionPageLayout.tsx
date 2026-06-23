import type { MetaFunction } from "@remix-run/node";
import type { ReactNode } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const SITE_URL = "https://www.kevoncadogan.com";
const SOCIAL_IMAGE = `${SITE_URL}/img/kev_logo.png`;

type SectionPageLayoutProps = {
  /** Unique, descriptive H1 for the page (rendered visually hidden so it doesn't
   *  duplicate the section component's existing visible H2). */
  h1: string;
  children: ReactNode;
};

/**
 * Thin wrapper that turns a homepage section component into a standalone page:
 * site Header, a top offset to clear the fixed bar, an sr-only H1 for SEO, the
 * section itself, then the Footer. Follows the homepage's <Header /> usage
 * (no props, no sidebar offset) — not the blog routes.
 */
export default function SectionPageLayout({ h1, children }: SectionPageLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <h1 className="sr-only">{h1}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}

/** Builds a Remix `meta` array for a standalone page, mirroring the homepage tag shape. */
export function buildPageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): ReturnType<MetaFunction> {
  const url = `${SITE_URL}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: "Kevon Cadogan" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: SOCIAL_IMAGE },
    { property: "og:site_name", content: "Kevon Cadogan Portfolio" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SOCIAL_IMAGE },
  ];
}
