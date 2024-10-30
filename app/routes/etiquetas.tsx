import type { MetaFunction } from "@remix-run/node";
import { ChangeEvent, useState } from "react";
import PrintDialog from "~/components/dialogs/Print";
import BackspaceIcon from "~/components/icons/Backspace";

export const meta: MetaFunction = () => {
  return [
    { title: "Gautama ZPL" },
    { name: "description", content: "Print ZPL" },
  ];
};

interface ControllersProps {
  addEtiqueta(): void;
  removeAll(): void;
}

function Controllers({ addEtiqueta, removeAll }: ControllersProps) {
  return (
    <div className="grid sticky top-2 grid-cols-3 join justify-between prose">
      <button
        onClick={addEtiqueta}
        className="btn btn-sm bg-base-100 join-item text-success"
      >
        agregar
      </button>
      <button className="btn btn-sm bg-base-100 join-item text-neutral">
        cargar csv
      </button>
      <button
        onClick={removeAll}
        className="btn btn-sm bg-base-100 join-item text-error"
      >
        borrar todo
      </button>
    </div>
  );
}

const defaultEtiqueta = {
  title: "",
  sku: "",
  quantity: 1,
};

interface EtiquetaProps {
  values: typeof defaultEtiqueta;
  setValues(newValues: typeof defaultEtiqueta): void;
  removeEtiqueta(): void;
}

function Etiqueta({ values, setValues, removeEtiqueta }: EtiquetaProps) {
  function createChangeHandler(field: keyof typeof values) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value;
      setValues({
        ...values,
        [field]: field === "quantity" ? Number(newValue) ?? 1 : newValue,
      });
    };
  }

  return (
    <div className="grid grid-rows-2 grid-cols-5 md:grid-rows-1 gap-1 p-2 bg-base-100 border rounded">
      <input
        type="text"
        className="input-sm col-span-5 input-ghost border w-full max-w-xs rounded"
        placeholder="titulo: casco mt thunder"
        value={values["title"]}
        onChange={createChangeHandler("title")}
      />
      <input
        type="text"
        className="input-sm input-ghost border col-span-3 w-full max-w-xs rounded"
        placeholder="codigo: u8231s"
        value={values["sku"]}
        onChange={createChangeHandler("sku")}
      />
      <input
        type="number"
        className="input-sm input-ghost border w-full max-w-xs rounded"
        placeholder="cantidad"
        min={1}
        defaultValue={1}
        value={values["quantity"]}
        onChange={createChangeHandler("quantity")}
      />
      <button
        type="button"
        onClick={(event) => {
          removeEtiqueta();
        }}
        className="btn btn-sm btn-error"
      >
        <BackspaceIcon />
      </button>
    </div>
  );
}

export default function Index() {
  const [etiquetas, setEtiquetas] = useState<
    Map<number, typeof defaultEtiqueta>
  >(new Map([[1, defaultEtiqueta]]));

  function addEtiqueta() {
    const newId = etiquetas.size === 0 ? 1 : Math.max(...etiquetas.keys()) + 1;
    etiquetas.set(newId, { ...defaultEtiqueta });
    setEtiquetas(new Map(etiquetas));
  }

  function setValues(id: number, newValues: typeof defaultEtiqueta) {
    etiquetas.set(id, newValues);
    setEtiquetas(new Map(etiquetas));
  }

  function removeEtiqueta(id: number) {
    etiquetas.delete(id);
    setEtiquetas(new Map(etiquetas));
  }

  function removeAll() {
    etiquetas.clear();
    setEtiquetas(new Map(etiquetas));
  }

  function createSetValuesHandler(id: number) {
    return function (newValues: typeof defaultEtiqueta) {
      return setValues(id, newValues);
    };
  }

  function createRemoveEtiquetaHandler(id: number) {
    return function () {
      return removeEtiqueta(id);
    };
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-4 px-4 mt-4">
      <Controllers addEtiqueta={addEtiqueta} removeAll={removeAll} />
      <div className="flex flex-col gap-2 grow">
        {Array.from(etiquetas).map(([id, values]) => (
          <Etiqueta
            key={id}
            values={values}
            setValues={createSetValuesHandler(id)}
            removeEtiqueta={createRemoveEtiquetaHandler(id)}
          />
        ))}
      </div>
      <PrintDialog zpl="hola" />
    </div>
  );
}
