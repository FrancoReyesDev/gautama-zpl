import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import TabLink from "./components/TabLink";
import SettingsIcon from "./components/icons/Settings";

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
        <Meta />
        <Links />
      </head>
      <body className="bg-base-200 min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <header className="navbar border-b-2">
      <div
        role="tablist"
        className="navbar-start tabs prose prose-a:uppercase prose-a:no-underline"
      >
        <TabLink to="/etiquetas">etiquetas</TabLink>
        <TabLink to="/zpl">zpl</TabLink>
      </div>
      <div className="navbar-end ">
        <button className="btn btn-ghost">
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="container mx-auto md:w-4/5 lg:w-3/6 pb-4 lg:py-6">
      <Navbar />
      <Outlet />
    </div>
  );
}
