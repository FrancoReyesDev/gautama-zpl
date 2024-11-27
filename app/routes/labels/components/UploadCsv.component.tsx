import { ChangeEvent } from "react";
import Papa from "papaparse";
import { LabelType } from "../types/Label.type";

interface Props {
  addLabel(labelsData: LabelType[]): void;
}

export default function UploadCsv({ addLabel }: Props) {
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
          ); // Guarda el JSON en el estado
        },
        error: (error) => {
          console.error("Error al procesar el archivo CSV:", error);
        },
      });
    }
  }

  return (
    <div>
      <header className="prose">
        <h3>Cargar desde CSV</h3>
      </header>
      <input
        type="file"
        className="file-input file-input-bordered w-full mt-2"
        accept=".csv"
        onChange={handleFileChange}
      />
    </div>
  );
}
