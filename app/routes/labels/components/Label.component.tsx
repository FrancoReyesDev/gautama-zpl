import { ChangeEvent } from "react";
import LabelType from "../types/Label.type";
import BackspaceIcon from "~/components/icons/Backspace";

const defaultLabel: LabelType = {
  title: "",
  sku: "",
  quantity: 1,
};

interface Props {
  values: typeof defaultLabel;
  setValues(newValues: typeof defaultLabel): void;
  removeLabel(): void;
}

export function Label({ values, setValues, removeLabel }: Props) {
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
    <div className="grid grid-rows-2 grid-cols-5 md:grid-rows-1 gap-1 p-2 bg-base-100 shadow rounded">
      <input
        type="text"
        className="input-sm input-bordered input col-span-4 w-full rounded"
        placeholder="codigo: u8231s"
        value={values["sku"]}
        onChange={createChangeHandler("sku")}
      />

      <input
        type="number"
        className="input-sm input-bordered col-span-1 input w-full rounded"
        placeholder="cantidad"
        min={1}
        value={values["quantity"]}
        onChange={createChangeHandler("quantity")}
      />
      <input
        type="text"
        className="input-sm input-bordered col-span-4 input w-full rounded"
        placeholder="titulo: casco mt thunder"
        value={values["title"]}
        onChange={createChangeHandler("title")}
      />

      <button
        type="button"
        onClick={() => {
          removeLabel();
        }}
        className="btn btn-sm btn-error col-span-1"
      >
        <BackspaceIcon />
      </button>
    </div>
  );
}
