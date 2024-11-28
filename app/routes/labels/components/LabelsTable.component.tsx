import { ChangeEvent, MouseEvent } from "react";
import { LabelType } from "../types/Label.type";

interface Props {
  labels: { [id: string]: LabelType };
  updateLabel(id: string, newValues: LabelType): void;
  removeLabel(id: string): void;
}

export default function LabelsTable({
  labels,
  updateLabel,
  removeLabel,
}: Props) {
  function handleUpdateLabel(
    id: string,
    label: LabelType,
    field: keyof LabelType
  ) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value;

      updateLabel(id, { ...label, [field]: newValue });
    };
  }

  function handleRemoveLabel(id: string) {
    return function (event: MouseEvent<HTMLButtonElement>) {
      removeLabel(id);
    };
  }

  return (
    <div>
      <header className="prose">
        <h3>Etiquetas</h3>
      </header>
      <div className=" overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>codigo</th>
              <th>titulo</th>
              <th>cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(labels).map(([id, label]) => (
              <tr key={id}>
                <td className="p-1">
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    value={label.sku}
                    onChange={handleUpdateLabel(id, label, "sku")}
                  />
                </td>
                <td className="p-1">
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    value={label.title}
                    onChange={handleUpdateLabel(id, label, "title")}
                  />
                </td>
                <td className="p-1">
                  <input
                    type="number"
                    className="input input-sm input-bordered w-full"
                    value={label.quantity}
                    onChange={handleUpdateLabel(id, label, "quantity")}
                  />
                </td>
                <td className="p-1">
                  <button
                    onClick={handleRemoveLabel(id)}
                    className="btn btn-sm btn-block btn-error"
                  >
                    eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
