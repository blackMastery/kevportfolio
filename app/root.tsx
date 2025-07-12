import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio: Kevon Cadogan</title>
        <meta name="title" content="Kevon Cadogan full-stack developer" />
        <meta name="description" content="I am a full-stack developer with an eye for detail, building client and server application for five years, with the diverse set of skills from HTML and javascript, with frameworks like react and angular to django, mysql, mongodb etc." />
        <meta name="keywords" content="FrontEnd, reactjs, react remix, javascript, nodejs, react native" />
        <link rel="icon" href="/img/2021-02-24.jpg" />
        <link rel="apple-touch-icon" href="/img/2021-02-24.jpg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
