import { useFetcher } from "@remix-run/react";
import { useRef } from "react";

interface PrintDialogProps {
  zpl: string;
}

export default function PrintDialog({ zpl }: PrintDialogProps) {
  const { submit, Form } = useFetcher();
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
      <dialog ref={dialogRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
}
