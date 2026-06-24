import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { lazy, Suspense, useEffect, useState } from "react";

import "./tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix"
const Chatbot = lazy(() => import("~/components/Chatbot"));

function DeferredChatbot() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShow(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const timeoutId = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "preconnect", href: "https://prod.spline.design" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", type: "image/png", href: "/img/kev_logo.png" },
  { rel: "apple-touch-icon", href: "/img/kev_logo.png" },
  { rel: "manifest", href: "/manifest.json" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentUrl = `https://www.kevoncadogan.com${location.pathname}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href={currentUrl} />
        <Meta />
        <Links />
      </head>
      <body>
      <Analytics />
      <SpeedInsights />
        {children}
        <DeferredChatbot />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
