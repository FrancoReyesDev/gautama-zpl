import { ChangeEvent, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { LabelType } from "../types/Label.type";

interface Props {
  addLabel(label: LabelType[]): void;
}

export default function useAddFromCsvDialog({ addLabel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  function Dialog() {
    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0];

      if (file) {
        Papa.parse<
          [sku: string, title: string, quantity: string, details: string]
        >(file, {
          header: false, // Convierte el CSV directamente en objetos basados en las cabeceras
          complete: (result) => {
            addLabel(
              result.data.map(([sku, title, quantity]) => ({
                sku,
                title,
                quantity: Number(quantity) || 1,
              }))
            );
          },
          error: (error) => {
            console.error("Error al procesar el archivo CSV:", error);
          },
        });
        setOpen(false);
      }
    }

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <header className="prose">
            <h3>Agregar desde un CSV</h3>
          </header>
          <p className="prose my-4">
            Recorda que el formato del CSV debe ser: <br />
            <strong>codigo, titulo, cantidad</strong>
          </p>
          <input
            type="file"
            className="file-input file-input-bordered w-full mt-2"
            accept=".csv"
            onChange={handleFileChange}
          />
          <div className="modal-action">
            <button className="btn" onClick={() => setOpen(false)}>
              cerrar
            </button>
          </div>
        </div>
        <div className="modal-backdrop">
          <button onClick={() => setOpen(false)}>close</button>
        </div>
      </dialog>
    );
  }

  return { setOpen, Dialog };
}
