import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import TabLink from "./components/TabLink";
import SettingsIcon from "./components/icons/Settings";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <header className="navbar px-4">
      <div role="tablist" className="navbar-start tabs tabs-bordered ">
        <TabLink to="/labels">etiquetas</TabLink>
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

function RootLayout() {
  return (
    <div className="container mx-auto md:w-4/5 lg:w-3/6 pb-4 lg:py-6">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <main className="container p-2 mx-auto md:w-4/5 lg:w-3/6 pb-4 lg:py-6 ">
      <Outlet />
    </main>
  );
}
