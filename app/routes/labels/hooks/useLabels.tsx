import { useState } from "react";
import { LabelType } from "../types/Label.type";
import { v4 as uuid } from "uuid";

interface Labels {
  [id: string]: LabelType;
}

export default function useLabels() {
  const [labels, setLabels] = useState<Labels>({});

  return {
    labels,
    addLabel(labelData: LabelType | LabelType[]) {
      const data = Array.isArray(labelData) ? labelData : [labelData];

      data.forEach((label) => {
        const newId = uuid();
        setLabels((currentLabels) => ({
          ...currentLabels,
          [newId]: label,
        }));
      });
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
