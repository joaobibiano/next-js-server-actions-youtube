import prismaClient from "@/prismaClient";
import { revalidatePath } from "next/cache";
import AvailableCheckbox from "./AvailableCheckbox";
import DeleteButton from "./DeleteButton";

export default async function Cars() {
  let cars = await prismaClient.car.findMany();

  async function createCar(data: FormData) {
    "use server";

    const car = await prismaClient.car.create({
      data: {
        name: data.get("name") as string,
        brand: data.get("brand") as string,
        isAvailable: data.get("isAvailable") === "on",
      },
    });

    revalidatePath("/cars");

    return car;
  }

  return (
    <div>
      <h1>Locadora de Veículos</h1>

      <form action={createCar}>
        <input type="text" placeholder="Nome" name="name" />
        <input type="text" placeholder="Marca" name="brand" />

        <label>
          Disponível?
          <input type="checkbox" name="isAvailable" />
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      <table
        style={{
          marginTop: 24,
        }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Is Available</th>
            <th>Delete?</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>
                <AvailableCheckbox isAvailable={car.isAvailable} id={car.id} />
              </td>
              <td>
                <DeleteButton id={car.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
