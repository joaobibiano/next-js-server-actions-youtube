"use server";

import prismaClient from "@/prismaClient";
import { revalidatePath } from "next/cache";

export async function updateAvailability(id: number, isAvailable: boolean) {
  "use server";

  const car = await prismaClient.car.update({
    where: {
      id,
    },
    data: {
      isAvailable,
    },
  });

  revalidatePath("/cars");

  return car;
}

export async function deleteCar(id: number) {
  "use server";

  const car = await prismaClient.car.delete({
    where: {
      id,
    },
  });

  revalidatePath("/cars");

  return car;
}
