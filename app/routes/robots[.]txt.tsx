import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const baseUrl = "https://kevportfolio.vercel.app";

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for specific bots (optional)
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 0

# Block access to build artifacts and config files
Disallow: /build/
Disallow: /*.json$
Disallow: /*.config.*

# Allow all images
User-agent: Googlebot-Image
Allow: /img/

# Allow all main resources
Allow: /*.css$
Allow: /*.js$
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};

