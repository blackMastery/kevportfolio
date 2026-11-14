import type { LoaderFunctionArgs } from "@remix-run/node";
import { SERVICE_PAGES } from "~/config/services";
import { SECTION_PAGES } from "~/config/sections";
import { createServerClientHandler } from "~/config/supabase";
import { portfolioProjectPath, portfolioProjects } from "~/data/portfolioProjects";

type SitemapRoute = {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

// Only real dates: a lastmod that is always "today" teaches Google to ignore it.
function formatLastmod(date: string | null | undefined): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().split("T")[0];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const baseUrl = "https://www.kevoncadogan.com";

  const responseHeaders = new Headers();
  const supabase = createServerClientHandler(request, responseHeaders);

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, published_at, updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const blogPostRoutes: SitemapRoute[] = (posts ?? []).map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod: formatLastmod(post.updated_at ?? post.published_at),
  }));

  // Only real, canonical, indexable pages belong in a sitemap — not URL fragments
  // (#about, #skills, …); search engines index the page, not the fragment.
  const routes: SitemapRoute[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/blog", changefreq: "weekly", priority: "0.7" },
    ...blogPostRoutes,
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
    ...portfolioProjects.map((project) => ({
      path: portfolioProjectPath(project),
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>${route.lastmod ? `
    <lastmod>${route.lastmod}</lastmod>` : ""}
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
