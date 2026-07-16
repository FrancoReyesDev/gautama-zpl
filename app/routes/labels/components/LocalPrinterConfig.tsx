import { ChangeEvent } from "react";
import { usePrinterContext } from "~/contexts/PrinterContext";
import templates from "~/utils/ZPL.util/templates";

export default function LocalPrinterConfig() {
  const { localPrinterConfig, setLocalPrinterConfig, printers } =
    usePrinterContext();

  function handleChaneLocalPrinterConfig(
    field: keyof typeof localPrinterConfig
  ) {
    return function (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
      const value = event.target.value;

      setLocalPrinterConfig((currentConfig) => ({
        ...currentConfig,
        [field]: value,
      }));
    };
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Impresora</span>
          </div>
          <select
            className="select select-bordered"
            value={localPrinterConfig.printer || "none"}
            onChange={handleChaneLocalPrinterConfig("printer")}
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
            value={localPrinterConfig.template}
            onChange={handleChaneLocalPrinterConfig("template")}
          >
            {Object.keys(templates).map((template, index) => (
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
            value={localPrinterConfig.cols}
            min={1}
            onChange={handleChaneLocalPrinterConfig("cols")}
          />
        </label>
      </div>

    </>
  );
}
