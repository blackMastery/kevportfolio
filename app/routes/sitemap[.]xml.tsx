import type { LoaderFunction } from "@remix-run/node";
import { SERVICE_PAGES } from "~/config/services";
import { SECTION_PAGES } from "~/config/sections";

export const loader: LoaderFunction = () => {
  const baseUrl = "https://www.kevoncadogan.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // Only real, canonical, indexable pages belong in a sitemap — not URL fragments
  // (#about, #skills, …); search engines index the page, not the fragment.
  const routes: { path: string; changefreq: string; priority: string }[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/blog", changefreq: "weekly", priority: "0.7" },
    ...SERVICE_PAGES.map((service) => ({
      path: service.path,
      changefreq: "monthly",
      priority: "0.8",
    })),
    ...SECTION_PAGES.map((section) => ({
      path: section.path,
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      "X-Robots-Tag": "all",
    },
  });
};
