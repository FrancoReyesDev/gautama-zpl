import { useState } from "react";
import Controllers from "./components/Controllers.component";
import LabelsTable from "./components/LabelsTable.component";
import NewLabelForm from "./components/NewLabelForm.component";
import UploadCsv from "./components/UploadCsv.component";
import useLabels from "./hooks/useLabels";
import { LabelType } from "./types/Label.type";
import ZPLUtil from "~/utils/ZPL.util";
import { usePrinter } from "~/hooks/usePrinter.hook";

const defaultLabelData = { sku: "", quantity: 1, title: "" };
const zplUtil = new ZPLUtil({ dpi: 203, cols: 2, labelTemplate: "w5cm_h3cm" });

export default function Labels() {
  const [labelData, setLabelData] = useState<LabelType>({
    ...defaultLabelData,
  });
  const { labels, addLabel, removeAllLabels, updateLabel, removeLabel } =
    useLabels();
  const { print } = usePrinter();
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

  function handlePrint() {
    const zpl = zplUtil.createZplFromLabels(Object.values(labels));
    print(zpl);
  }

  return (
    <article className="grid gap-4">
      <header className="prose">
        <h2>Generador de Etiquetas</h2>
      </header>
      <NewLabelForm labelData={labelData} setLabelData={setLabelData} />
      <Controllers
        removeAllLabels={removeAllLabels}
        handleAddLabel={handleAddLabel}
      />
      <UploadCsv addLabel={addLabel} />
      {Object.entries(labels).length > 0 && (
        <>
          <LabelsTable
            removeLabel={removeLabel}
            updateLabel={updateLabel}
            labels={labels}
          />
          <button
            onClick={handlePrint}
            className="btn btn-block btn-neutral btn-sm"
          >
            Imprimir
          </button>
        </>
      )}
    </article>
  );
}
