import { useEffect, useRef, useState } from "react";
import ZPLUtil from "~/utils/ZPL.util";
import qz from "qz-tray";

interface PrintDialogProps {
  labels: Labels;
}

export default function PrintDialog({ labels }: PrintDialogProps) {
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

  async function showPrinters() {
    const qzInstance = await qz.websocket.connect();
    const printers = await qz.printers.find();

    console.log({ printers });
  }

  useEffect(() => {
    showPrinters();
  }, []);

  function handleShowModal() {
    dialogRef.current?.showModal();
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
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">{zpl}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
