import { NavLink } from "@remix-run/react";

interface TabLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function TabLink({ to, children }: TabLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ["tab", isActive ? "tab-active" : ""].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
