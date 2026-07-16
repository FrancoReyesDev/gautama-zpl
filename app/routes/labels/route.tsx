import { useMemo, useState } from "react";
import ZPLUtil from "~/utils/ZPL.util";
import LabelsTable from "./components/LabelsTable.component";
import NewLabelForm from "./components/NewLabelForm.component";
import useLabels from "./hooks/useLabels";
import { LabelType } from "./types/Label.type";
import useAddFromCsvDialog from "./hooks/useAddFromCsvDialog.component";
import usePrinter from "~/hooks/usePrinter";
import LocalPrinterConfig from "./components/LocalPrinterConfig";
import { PrinterContextProvider } from "~/contexts/PrinterContext";

const defaultLabelData = { sku: "", quantity: 1, title: "" };

export default function Labels() {
  const [labelData, setLabelData] = useState<LabelType>({
    ...defaultLabelData,
  });

  const { labels, addLabel, removeAllLabels, updateLabel, removeLabel } =
    useLabels();
  const printer = usePrinter();

  const zpl = useMemo(
    () =>
      new ZPLUtil({
        dpi: 203,
        cols: Number(printer.localPrinterConfig.cols) || 1,
        labelTemplate: printer.localPrinterConfig.template,
      }).createZplFromLabels(Object.values(labels)),
    [labels, printer.localPrinterConfig]
  );

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
    <PrinterContextProvider externalPrinter={printer}>
      <article className="grid gap-4">
        <header className="prose">
          <h2>Generador de Etiquetas</h2>
        </header>

        <LocalPrinterConfig />

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
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="label-text font-semibold">ZPL generado</span>
                <button
                  onClick={() => navigator.clipboard.writeText(zpl)}
                  className="btn btn-primary btn-sm"
                >
                  Copiar ZPL
                </button>
              </div>
              <textarea
                readOnly
                value={zpl}
                rows={10}
                className="textarea textarea-bordered font-mono text-xs w-full"
              />
            </div>
          </>
        )}
        <AddFromCsvDialog />
      </article>
    </PrinterContextProvider>
  );
}
