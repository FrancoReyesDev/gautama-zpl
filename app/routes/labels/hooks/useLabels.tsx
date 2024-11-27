import { useState } from "react";
import { LabelType } from "../types/Label.type";

const defaultLabel = {
  title: "",
  sku: "",
  quantity: 1,
};

interface Labels {
  [id: string]: LabelType;
}

export default function useLabels() {
  const [labels, setLabels] = useState<Labels>({});

  return {
    labels,
    addLabel(labelData: LabelType) {
      const newId = crypto.randomUUID();
      setLabels((currentLabels) => ({
        ...currentLabels,
        [newId]: labelData,
      }));
    },

    updateLabel(id: string, newValues: LabelType) {
      setLabels((currentLabels) => ({ ...currentLabels, [id]: newValues }));
    },

    removeLabel(id: string) {
      setLabels(({ [id]: toDelete, ...rest }) => ({ ...rest }));
    },

    removeAllLabels() {
      setLabels({});
    },
  };
}
