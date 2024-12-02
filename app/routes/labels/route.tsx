import { useState } from "react";
import LabelsTable from "./components/LabelsTable.component";
import NewLabelForm from "./components/NewLabelForm.component";
import useLabels from "./hooks/useLabels";
import { LabelType } from "./types/Label.type";
import useAddFromCsvDialog from "./hooks/useAddFromCsvDialog.component";
import usePrinter from "~/hooks/usePrinter";
import LocalPrinterConfig from "./components/LocalPrinterConfig";
import { PrinterContextProvider } from "~/contexts/PrinterContext";
import RemotePrinterConfig from "./components/RemotePrinterConfig";

const defaultLabelData = { sku: "", quantity: 1, title: "" };

export default function Labels() {
  const [labelData, setLabelData] = useState<LabelType>({
    ...defaultLabelData,
  });

  const { labels, addLabel, removeAllLabels, updateLabel, removeLabel } =
    useLabels();
  const printer = usePrinter();
  const { setOpen: setOpenCsvDialog, Dialog: AddFromCsvDialog } =
    useAddFromCsvDialog({ addLabel });

  function handleAddLabel() {
    if (labelData.quantity !== 0 && labelData.sku !== "") {
      addLabel({
        ...labelData,
        title: labelData.title || labelData.sku,
        quantity: Number(labelData.quantity) || 1,
      });
      setLabelData({ ...defaultLabelData });
    }
  }

  function handleOpenAddFromCsvDialog() {
    setOpenCsvDialog(true);
  }

  return (
    <PrinterContextProvider {...printer}>
      <article className="grid gap-4">
        <header className="prose">
          <h2>Generador de Etiquetas</h2>
        </header>

        <div className="form-control">
          <label className="label cursor-pointer flex justify-start gap-2 ">
            <input
              type="checkbox"
              className="toggle"
              checked={printer.isRemote}
              onChange={(e) => printer.setIsRemote(e.target.checked)}
            />
            <span className="label-text">
              {printer.isRemote ? "Impresora Remota" : "Impresora Local"}
            </span>
          </label>
        </div>

        {printer.isRemote ? <RemotePrinterConfig /> : <LocalPrinterConfig />}

        <NewLabelForm labelData={labelData} setLabelData={setLabelData} />
        <div className="flex gap-2 mt-4 overflow-auto">
          <button onClick={handleAddLabel} className="btn btn-neutral">
            Agregar Etiqueta
          </button>
          <button
            onClick={handleOpenAddFromCsvDialog}
            className="btn btn-warning"
          >
            Cargar Desde CSV
          </button>
          <button onClick={removeAllLabels} className="btn btn-error">
            Eliminar Todas las Etiquetas
          </button>
        </div>

        {Object.entries(labels).length > 0 && (
          <>
            <LabelsTable
              removeLabel={removeLabel}
              updateLabel={updateLabel}
              labels={labels}
            />
            <button
              onClick={() => printer.printLabels(Object.values(labels))}
              className="btn btn-block btn-neutral btn-sm"
            >
              Imprimir
            </button>
          </>
        )}
        <AddFromCsvDialog />
      </article>
    </PrinterContextProvider>
  );
}
