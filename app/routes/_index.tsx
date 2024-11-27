import { NavLink } from "@remix-run/react";

export default function Index() {
  return (
    <ul>
      <li>
        <NavLink to={"/labels"}>Generador de etiquetas</NavLink>
      </li>
      <li>
        <NavLink to={"/config"}>Configuracion</NavLink>
      </li>
    </ul>
  );
}
