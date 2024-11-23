import useEtiquetas from "~/routes/etiquetas/hooks/useEtiquetas";
import LabelType from "./types/Label.type";
import { Label } from "./components/Label.component";
import PrintDialog from "./components/PrintDialog.component";
import ZPLUtil from "./utils/ZPL.util";

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

export default function Index() {
  const {
    etiquetas,
    addEtiqueta,
    updateEtiqueta,
    removeAllEtiquetas,
    removeEtiqueta,
  } = useEtiquetas();

  function createUpdateValuesHandler(id: number) {
    return function (values: LabelType) {
      return updateEtiqueta(id, values);
    };
  }

  function createRemoveEtiquetaHandler(id: number) {
    return function () {
      return removeEtiqueta(id);
    };
  }

  const zplUtil = new ZPLUtil({
    dpi: 203,
    cols: 1,
    labelTemplate: "w5cm_h3cm",
  });

  console.log(
    zplUtil.createItemLabels([{ sku: "123456", title: "holaa", quantity: 1 }])
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-4 px-4 mt-4">
      <Controllers addEtiqueta={addEtiqueta} removeAll={removeAllEtiquetas} />
      <div className="flex flex-col gap-2 grow">
        {Array.from(etiquetas).map(([id, values]) => (
          <Label
            key={id}
            values={values}
            setValues={createUpdateValuesHandler(id)}
            removeEtiqueta={createRemoveEtiquetaHandler(id)}
          />
        ))}
      </div>
      <PrintDialog zpl="hola" />
    </div>
  );
}
