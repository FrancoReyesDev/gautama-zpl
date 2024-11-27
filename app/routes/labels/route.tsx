import { useState } from "react";
import Controllers from "./components/Controllers.component";
import LabelsTable from "./components/LabelsTable.component";
import NewLabelForm from "./components/NewLabelForm.component";
import UploadCsv from "./components/UploadCsv.component";
import useLabels from "./hooks/useLabels";
import { LabelType } from "./types/Label.type";

const defaultLabelData = { sku: "", quantity: 1, title: "" };

export default function Labels() {
  const [labelData, setLabelData] = useState<LabelType>({
    ...defaultLabelData,
  });
  const { labels, addLabel, removeAllLabels, updateLabel, removeLabel } =
    useLabels();

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
      <UploadCsv />
      {Object.entries(labels).length > 0 && (
        <LabelsTable
          removeLabel={removeLabel}
          updateLabel={updateLabel}
          labels={labels}
        />
      )}
    </article>
  );
}
