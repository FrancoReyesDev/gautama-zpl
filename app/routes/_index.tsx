import type { MetaFunction } from "@remix-run/node";
import BackspaceIcon from "~/components/icons/Backspace";

export const meta: MetaFunction = () => {
  return [
    { title: "Gautama ZPL" },
    { name: "description", content: "Print ZPL" },
  ];
};

function Controllers() {
  return (
    <div className="flex gap-2 justify-between prose">
      <button className="btn btn-ghost btn-sm text-success">agregar</button>
      <button className="btn btn-ghost btn-sm">cargar csv</button>
      <button className="btn btn-ghost btn-sm text-error">borrar todo</button>
    </div>
  );
}

function Etiqueta() {
  return (
    <div className="grid grid-rows-2 grid-cols-5 md:grid-rows-1 gap-1">
      <input
        type="text"
        className="input-sm col-span-5 input-bordered w-full max-w-xs rounded"
        placeholder="titulo: casco mt thunder"
      />
      <input
        type="text"
        className="input-sm input-bordered col-span-3 w-full max-w-xs rounded"
        placeholder="codigo: u8231s"
      />
      <input
        type="number"
        className="input-sm input-bordered w-full max-w-xs rounded"
        placeholder="cantidad"
        min={1}
        defaultValue={1}
      />
      <button className="btn btn-sm btn-outline btn-error btn-block">
        <BackspaceIcon />
      </button>
    </div>
  );
}

export default function Index() {
  return (
    <div className="flex flex-col px-4 my-2">
      <Controllers />
      <div className="flex flex-col gap-1 mt-2">
        <Etiqueta />
      </div>
    </div>
  );
}
