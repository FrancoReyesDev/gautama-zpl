import { useState } from "react";

const defaultEtiqueta = {
  title: "",
  sku: "",
  quantity: 1,
};

export default function useEtiquetas() {
  const [etiquetas, setEtiquetas] = useState<Etiquetas>(
    new Map([[1, defaultEtiqueta]])
  );

  return {
    etiquetas,
    addEtiqueta() {
      const newId =
        etiquetas.size === 0 ? 1 : Math.max(...etiquetas.keys()) + 1;
      const newEtiquetas = new Map(etiquetas);
      newEtiquetas.set(newId, { ...defaultEtiqueta });
      setEtiquetas(newEtiquetas);
    },

    updateEtiqueta(id: number, values: Etiqueta) {
      if (!etiquetas.has(id)) {
        console.error(`Etiqueta con id ${id} no encontrada para actualizar.`);
        return; // Salir si el id no existe
      }
      const newEtiquetas = new Map(etiquetas);
      newEtiquetas.set(id, values);
      setEtiquetas(newEtiquetas);
    },

    removeEtiqueta(id: number) {
      if (!etiquetas.has(id)) {
        console.error(`Etiqueta con id ${id} no encontrada para eliminar.`);
        return; // Salir si el id no existe
      }
      const newEtiquetas = new Map(etiquetas);
      newEtiquetas.delete(id);
      setEtiquetas(newEtiquetas);
    },

    removeAllEtiquetas() {
      setEtiquetas(new Map());
    },
  };
}
