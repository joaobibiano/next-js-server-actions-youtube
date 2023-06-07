"use client";

import { updateAvailability } from "./actions";
import { useTransition } from "react";

type AvailableCheckboxProps = {
  isAvailable: boolean;
  id: number;
};

export default function AvailableCheckbox({
  isAvailable,
  id,
}: AvailableCheckboxProps) {
  let [isPending, startTransition] = useTransition();

  return (
    <label>
      {isPending && <span>...</span>}
      <input
        type="checkbox"
        checked={isAvailable}
        onChange={(ev) => {
          startTransition(() => {
            updateAvailability(id, ev.target.checked);
          });
        }}
      />
    </label>
  );
}
