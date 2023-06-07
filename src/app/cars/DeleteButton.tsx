"use client";

import { deleteCar } from "./actions";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: number;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  let [isPending, startTransition] = useTransition();

  return (
    <label>
      {isPending && <span>...</span>}
      <button
        type="button"
        onClick={(ev) => {
          startTransition(() => {
            deleteCar(id);
          });
        }}
      >
        Excluir
      </button>
    </label>
  );
}
