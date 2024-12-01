import { useNavigate, useOutletContext } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    ref.current?.show();
  }, []);

  console.log({ printLabels });

  useEffect(() => {
    // printLabels([labels[queue]]);
    // setQueue((q) => q + 1);
  }, [labels]);

  return (
    <dialog className="modal modal-open" ref={ref}>
      <div className="modal-box">
        <header className="prose">
          <h3>Impresion Remota</h3>
        </header>
        {labels.length === 0 ? (
          "Esperando mensajes..."
        ) : (
          <div className="overflow-auto">
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
                {labels.map(({ sku, title, quantity }, index) => (
                  <tr key={index}>
                    <td>{sku}</td>
                    <td>{title}</td>
                    <td>{quantity}</td>
                    <td>{index < queue ? "impreso" : "en espera"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="modal-backdrop">
        <button onClick={() => navigate(-1)}>close</button>
      </div>
    </dialog>
  );
}
