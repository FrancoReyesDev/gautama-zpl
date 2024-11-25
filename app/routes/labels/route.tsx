import LabelType from "./types/Label.type";
import { Label } from "./components/Label.component";
import PrintDialog from "./components/PrintDialog.component";
import useLabels from "./hooks/useLabels";

interface ControllersProps {
  addLabel(): void;
  removeAll(): void;
}

function Controllers({ addLabel, removeAll }: ControllersProps) {
  return (
    <div className="grid sticky top-2 grid-cols-3 join justify-between prose">
      <button
        onClick={addLabel}
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

export default function Index() {
  const { labels, addLabel, updateLabel, removeAllLabels, removeLabel } =
    useLabels();

  function createUpdateValuesHandler(id: number) {
    return function (values: LabelType) {
      return updateLabel(id, values);
    };
  }

  function createRemoveLabelHandler(id: number) {
    return function () {
      return removeLabel(id);
    };
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-4 px-4 mt-4">
      <Controllers addLabel={addLabel} removeAll={removeAllLabels} />
      <div className="flex flex-col gap-2 grow">
        {Array.from(labels).map(([id, values]) => (
          <Label
            key={id}
            values={values}
            setValues={createUpdateValuesHandler(id)}
            removeLabel={createRemoveLabelHandler(id)}
          />
        ))}
      </div>
      <PrintDialog labels={labels} />
    </div>
  );
}
