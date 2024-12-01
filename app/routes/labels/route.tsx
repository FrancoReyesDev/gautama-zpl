import { ChangeEvent, createContext, useMemo, useState } from "react";
import LabelsTable from "./components/LabelsTable.component";
import NewLabelForm from "./components/NewLabelForm.component";
import useLabels from "./hooks/useLabels";
import { LabelType } from "./types/Label.type";
import ZPLUtil from "~/utils/ZPL.util";
import useAddFromCsvDialog from "./hooks/useAddFromCsvDialog.component";
import templates from "~/utils/ZPL.util/templates";
import { NavLink, Outlet } from "@remix-run/react";
import usePrinter from "~/hooks/usePrinter";

const defaultLabelData = { sku: "", quantity: 1, title: "" };
const labelTemplateNames = Object.keys(
  templates
) as unknown as (keyof typeof templates)[];

export default function Labels() {
  const [labelData, setLabelData] = useState<LabelType>({
    ...defaultLabelData,
  });
  const [labelTemplate, setLabelTemplate] = useState(labelTemplateNames[0]);
  const [labelCols, setLabelCols] = useState("");

  const zplUtil = useMemo(() => {
    const zplUtil = new ZPLUtil({
      dpi: 203,
      cols: Number(labelCols) || 1,
      labelTemplate,
    });
    return zplUtil;
  }, [labelTemplate, labelCols]);
  const { labels, addLabel, removeAllLabels, updateLabel, removeLabel } =
    useLabels();
  const { print, printers, setPrinter, printer } = usePrinter();
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

  function printLabels(labels: LabelType[]) {
    const zpl = zplUtil.createZplFromLabels(labels);
    print(zpl);
  }

  function handleChangeLabelTemplate(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    setLabelTemplate(value as keyof typeof templates);
  }

  function handleChangeLabelCols(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setLabelCols(value);
  }

  function handleOpenAddFromCsvDialog() {
    setOpenCsvDialog(true);
  }

  function handleChangePrinter(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setPrinter(value);
  }

  return (
    <>
      <article className="grid gap-4">
        <header className="prose">
          <h2>Generador de Etiquetas</h2>
        </header>

        <div className="grid grid-cols-3 gap-2">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Impresora</span>
            </div>
            <select
              className="select select-bordered"
              value={printer || "none"}
              onChange={handleChangePrinter}
            >
              <option value="none">-</option>
              {printers.map((printer, index) => (
                <option key={index} value={printer}>
                  {printer}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Plantilla</span>
            </div>
            <select
              className="select select-bordered"
              value={labelTemplate}
              onChange={handleChangeLabelTemplate}
            >
              {labelTemplateNames.map((template, index) => (
                <option key={index} value={template}>
                  {template}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Columnas</span>
            </div>
            <input
              type="number"
              className="input input-bordered"
              value={labelCols}
              min={1}
              onChange={handleChangeLabelCols}
            />
          </label>
        </div>

        <div>
          <NavLink to={"/labels/remote"} className="btn btn-info">
            Impresora Remota
          </NavLink>
        </div>

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
              onClick={() => printLabels(Object.values(labels))}
              className="btn btn-block btn-neutral btn-sm"
            >
              Imprimir
            </button>
          </>
        )}
      </article>
      <AddFromCsvDialog />
      <Outlet context={{ printLabels }} />
    </>
  );
}
