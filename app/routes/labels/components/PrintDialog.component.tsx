import { useEffect, useRef, useState } from "react";
import ZPLUtil from "~/utils/ZPL.util";
import qz from "qz-tray";
import { LabelType } from "../types/Label.type";

interface PrintDialogProps {
  labels: LabelType[];
}

export default function PrintDialog({ labels }: PrintDialogProps) {
  const [qzConnection, setQzConnection] = useState<boolean | null>(null);

  const zplUtil = new ZPLUtil({
    dpi: 203,
    cols: 2,
    labelTemplate: "w5cm_h3cm",
  });

  const [zpl, setZpl] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const newZpl = zplUtil.createZplFromLabels(Array.from(labels.values()));
    setZpl(newZpl);
  }, [labels]);

  useEffect(() => {
    qz.websocket
      .connect()
      .then(() => {
        setQzConnection(true);
      })
      .catch(() => {
        console.error();
        setQzConnection(false);
      });
  }, []);



  async function handlePrint() {
    const printers = await qz.printers.find();

    const config = qz.configs.create(printers[0]);
    qz.print(config, [zpl]).then(console.log).catch(console.error);
    handleCloseModal();
  }

  function handleShowModal() {
    dialogRef.current?.showModal();
  }

  function handleCloseModal() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        className="btn btn-neutral btn-block btn-sm"
        onClick={handleShowModal}
      >
        imprimir
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Imprimir {labels.length} etiquetas?
          </h3>

          <p className="py-4">{zpl}</p>
          <div className="modal-action">
            <button onClick={handleCloseModal} className="btn btn-sm btn-ghost">
              Cancelar
            </button>
            <button
              onClick={handlePrint}
              disabled={qzConnection === false || qzConnection === null}
              className="btn btn-sm btn-warning"
            >
              Aceptar
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
