import mongoose from "mongoose"
import { Product } from "../index"

const main = async (argumentos: string[], accion: string, usuarios: any[]) => {
  switch (accion) {
    case "help":
      console.table([
        { accion: "help", descripcion: "Muestra la ayuda" },
        { accion: "listar", descripcion: "Listar los productos" },
        { accion: "crear", descripcion: "Crear un producto nuevo" },
        { accion: "actualizar", descripcion: "Actualizar un producto por nombre" },
        { accion: "eliminar", descripcion: "Eliminar un producto por nombre" }
      ]);
      break;


  }
  process.exit(1)
}