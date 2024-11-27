import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { LabelType } from "../types/Label.type";

interface Props {
  labelData: LabelType;
  setLabelData: Dispatch<SetStateAction<LabelType>>;
}

export default function NewLabelForm({ labelData, setLabelData }: Props) {
  function handleChangeLabel(field: keyof LabelType) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;

      setLabelData((currentLabelData) => ({
        ...currentLabelData,
        [field]: value,
      }));
    };
  }

  return (
    <div className="grid gap-2 mt-4 ">
      <div className="form-control w-full">
        <span className="label-text font-medium">Codigo</span>
        <input
          onChange={handleChangeLabel("sku")}
          className="input input-bordered "
          type="text"
          value={labelData.sku}
        />
      </div>
      <div className="form-control w-full">
        <span className="label-text font-medium">Titulo</span>

        <input
          placeholder={labelData.title === "" ? labelData.sku : ""}
          onChange={handleChangeLabel("title")}
          className="input input-bordered "
          type="text"
          value={labelData.title}
        />
      </div>
      <div className="form-control w-full">
        <span className="label-text font-medium">Cantidad</span>

        <input
          onChange={handleChangeLabel("quantity")}
          className="input input-bordered "
          type="number"
          value={labelData.quantity}
        />
      </div>
    </div>
  );
}
