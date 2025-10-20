import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const manifest = {
    name: "Kevon Cadogan - Full-Stack Developer Portfolio",
    short_name: "Kevon Cadogan",
    description: "Professional portfolio of Kevon Cadogan, Full-Stack Developer & AI Engineer specializing in React, Node.js, and mobile development",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#149ddd",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/img/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/img/apple-touch-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["portfolio", "technology", "developer"],
    lang: "en-US",
    dir: "ltr",
    scope: "/",
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
};

