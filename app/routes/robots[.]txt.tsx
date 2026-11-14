import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const baseUrl = "https://www.kevoncadogan.com";

  // A single group for every crawler. Rules belong to the User-agent group
  // directly above them, so per-bot groups silently drop the shared rules.
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};
