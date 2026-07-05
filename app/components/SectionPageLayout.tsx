import type { MetaFunction } from "@remix-run/node";
import type { ReactNode } from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const SITE_URL = "https://www.kevoncadogan.com";
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/img/kev_logo.png`;

type SectionPageLayoutProps = {
  /** Unique, descriptive H1 for the page (rendered visually hidden so it doesn't
   *  duplicate the section component's existing visible H2). */
  h1: string;
  /** Optional JSON-LD object (serialized into a <script> tag) */
  jsonLd?: object;
  children: ReactNode;
};

/**
 * Thin wrapper that turns a homepage section component into a standalone page:
 * site Header, a top offset to clear the fixed bar, an sr-only H1 for SEO, the
 * section itself, then the Footer. Follows the homepage's <Header /> usage
 * (no props, no sidebar offset) — not the blog routes.
 */
export default function SectionPageLayout({ h1, jsonLd, children }: SectionPageLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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
  keywords,
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = "Kevon Cadogan - Full-Stack Developer",
  imageWidth = "1200",
  imageHeight = "630",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
}): ReturnType<MetaFunction> {
  const url = `${SITE_URL}${path}`;
  const tags: ReturnType<MetaFunction> = [
    { title },
    { name: "description", content: description },
    { name: "author", content: "Kevon Cadogan" },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: imageWidth },
    { property: "og:image:height", content: imageHeight },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:locale", content: "en_US" },
    { property: "og:site_name", content: "Kevon Cadogan Portfolio" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
    { name: "twitter:creator", content: "@kevon_cadogan" },
    { name: "theme-color", content: "#149ddd" },
  ];

  if (keywords) {
    tags.splice(3, 0, { name: "keywords", content: keywords });
  }

  return tags;
}

export { SITE_URL };
