import { useNavigate, useOutletContext } from "@remix-run/react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import usePrintEventSource from "~/hooks/usePrintEventSource";
import { LabelType } from "../labels/types/Label.type";

export default function Remote() {
  const { printLabels } = useOutletContext<{
    printLabels(label: LabelType[]): void;
  }>();
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement>(null);
  const { labels } = usePrintEventSource({
    eventSourceUrl: "/labels/remote/sse",
  });
  const [queue, setQueue] = useState(0);
  const [printCadency, setPrintCadency] = useState("2");

  const arrayLabels = useMemo(() => {
    return labels.reduce((acc, label) => {
      const newArray = new Array(label.quantity);
      newArray.fill({ ...label, quantity: 1 });
      acc.push(...newArray);
      return acc;
    }, [] as LabelType[]);
  }, [labels]);

  const availableLabels = arrayLabels.slice(queue);

  function handleChangePrintCadency(event: ChangeEvent<HTMLInputElement>) {
    setPrintCadency(event.target.value);
  }

  function printRemainingLabelsInQueue() {
    const remainingLabels = arrayLabels.slice(queue);
    console.log("impriminedo restantes", { remainingLabels });
    setQueue((q) => q + remainingLabels.length);
  }

  useEffect(() => {
    ref.current?.show();

    return printRemainingLabelsInQueue;
  }, []);

  function printLabelsInQueue() {
    const printCadencyToNumber = Number(printCadency) || 1;

    if (availableLabels.length < printCadencyToNumber) return;

    const labelsToPrint = availableLabels.slice(0, printCadencyToNumber);
    console.log("impriminedo", { labelsToPrint });
    setQueue((q) => q + printCadencyToNumber);
  }

  useEffect(() => {
    if (arrayLabels.length !== 0) printLabelsInQueue();
  }, [queue, arrayLabels]);

  return (
    <dialog className="modal modal-open" ref={ref}>
      <div className="modal-box grid gap-2">
        <header className="prose">
          <h3>Impresion Remota</h3>
        </header>
        <div className="grid gap-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Cadencia de impresion</span>
            </div>
            <input
              type="number"
              className="input input-bordered"
              value={printCadency}
              onChange={handleChangePrintCadency}
            />
          </label>
        </div>

        {labels.length === 0 ? (
          <p className="prose">Esperando mensajes...</p>
        ) : (
          <>
            <div className="overflow-auto ">
              <table className="table table-pin-rows">
                <thead>
                  <tr>
                    <th>sku</th>
                    <th>titulo</th>
                    <th>cantidad</th>
                    <th>estado</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayLabels.map(({ sku, title, quantity }, index) => (
                    <tr key={index}>
                      <td>{sku}</td>
                      <td>{title}</td>
                      <td>{quantity}</td>
                      <td>
                        {index < queue ? "impreso" : "en espera"} {queue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              disabled={availableLabels.length === 0}
              onClick={printRemainingLabelsInQueue}
              className="btn btn-sm btn-block btn-neutral"
            >
              Imprimir Restantes
            </button>
          </>
        )}
      </div>

      <div className="modal-backdrop">
        <button onClick={() => navigate(-1)}>close</button>
      </div>
    </dialog>
  );
}
