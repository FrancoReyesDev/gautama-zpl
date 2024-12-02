import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import usePrintEventSource from "~/hooks/usePrintEventSource";
import { LabelType } from "../types/Label.type";

interface Props {
  printLabels(label: LabelType[]): void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RemotePrints({ printLabels, open, setOpen }: Props) {
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
    printLabels(remainingLabels);
    setQueue((q) => q + remainingLabels.length);
  }

  useEffect(() => {
    if (open) ref.current?.show();
    else ref.current?.close();

    return printRemainingLabelsInQueue;
  }, [open]);

  function printLabelsInQueue() {
    const printCadencyToNumber = Number(printCadency) || 1;

    if (availableLabels.length < printCadencyToNumber) return;

    const labelsToPrint = availableLabels.slice(0, printCadencyToNumber);
    printLabels(labelsToPrint);
    setQueue((q) => q + printCadencyToNumber);
  }

  useEffect(() => {
    if (arrayLabels.length !== 0) printLabelsInQueue();
  }, [queue, arrayLabels]);

  return (
    <dialog className="modal" ref={ref}>
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
        <button onClick={() => setOpen(false)}>close</button>
      </div>
    </dialog>
  );
}
