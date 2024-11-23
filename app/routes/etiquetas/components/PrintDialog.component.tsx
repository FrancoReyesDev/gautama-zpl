import { useRef } from "react";

interface PrintDialogProps {
  zpl: string;
}

export default function PrintDialog({ zpl }: PrintDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
