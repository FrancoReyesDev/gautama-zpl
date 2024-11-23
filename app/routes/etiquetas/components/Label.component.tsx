import { ChangeEvent } from "react";
import LabelType from "../types/Label.type";
import BackspaceIcon from "~/components/icons/Backspace";

const defaultEtiqueta: LabelType = {
  title: "",
  sku: "",
  quantity: 1,
};

interface Props {
  values: typeof defaultEtiqueta;
  setValues(newValues: typeof defaultEtiqueta): void;
  removeEtiqueta(): void;
}

export function Label({ values, setValues, removeEtiqueta }: Props) {
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
