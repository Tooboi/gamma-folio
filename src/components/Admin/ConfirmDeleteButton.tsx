"use client";

import { useRef } from "react";
import FormSubmitButton from "../FormSubmitButton";

type Props = {
  id: string;
  action: (formData: FormData) => Promise<void>;
  label?: string;
  title?: string;
  message?: string;
  className?: string;
};

export default function ConfirmDeleteButton({
  id,
  action,
  label = "Delete",
  title = "Delete this?",
  message = "You cannot undo this action!",
  className = "btn w-48 rounded-lg border-2 border-rose-700 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-rose-600 hover:bg-rose-950 hover:text-rose-500",
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={className}
      >
        {label}
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box border-2 border-rose-700 bg-brand-900">
          <h3 className="text-lg font-bold text-brand-200">{title}</h3>
          <p className="py-4 text-brand-400">{message}</p>
          <div className="modal-action flex w-full justify-between">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn w-32 rounded-lg border-0 bg-brand-600 text-lg font-medium text-brand-300 transition-all hover:border-2 hover:border-teal-600 hover:bg-teal-950/80 hover:text-teal-500"
            >
              Nevermind
            </button>
            <form action={action}>
              <input type="hidden" name="id" value={id} />
              <FormSubmitButton className="w-32 rounded-lg border-2 border-rose-700 bg-rose-950 text-lg font-medium text-rose-400 hover:border-rose-500 hover:bg-rose-900">
                Delete
              </FormSubmitButton>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
