import { useState } from "react";

const defaultLabel = {
  title: "",
  sku: "",
  quantity: 1,
};

export default function useLabels() {
  const [labels, setLabels] = useState<Labels>(
    new Map([[1, defaultLabel]])
  );

  return {
    labels,
    addLabel() {
      const newId =
        labels.size === 0 ? 1 : Math.max(...labels.keys()) + 1;
      const newLabels = new Map(labels);
      newLabels.set(newId, { ...defaultLabel });
      setLabels(newLabels);
    },

    updateLabel(id: number, values: Label) {
      if (!labels.has(id)) {
        console.error(`Label con id ${id} no encontrada para actualizar.`);
        return; // Salir si el id no existe
      }
      const newLabels = new Map(labels);
      newLabels.set(id, values);
      setLabels(newLabels);
    },

    removeLabel(id: number) {
      if (!labels.has(id)) {
        console.error(`Label con id ${id} no encontrada para eliminar.`);
        return; // Salir si el id no existe
      }
      const newLabels = new Map(labels);
      newLabels.delete(id);
      setLabels(newLabels);
    },

    removeAllLabels() {
      setLabels(new Map());
    },
  };
}
