

import mongoose, { Schema } from 'mongoose'

const URI_DB = "mongodb://localhost:27017/db_mongo_utn";

const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI)
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.log("❌ Error al conectarse a la DB", error);
  }
}

interface ProductoInterface {
  name: string;
  price: number;
}

const ProductSchema = new Schema<ProductoInterface>({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true }
}, { timestamps: true, versionKey: false });

const Product = mongoose.model("Product", ProductSchema);

const main = async (argumentos: string[], accion: string, usuarios: any[]) => {
  connectDB(URI_DB);
  switch (accion) {
    case "help":
      console.table([
        { accion: "listar", descripcion: "Listar todos los productos" },
        { accion: "agregar", descripcion: "Agregar un producto" },
        { accion: "eliminar", descripcion: "Eliminar un producto por nombre" },
        { accion: "actualizar", descripcion: "Actualizar un producto por nombre" },
        { accion: "buscar", descripcion: "Buscar un producto por nombre" },
      ]);
      break;

    case "listar":
      const productos = await Product.find();
      console.table(productos);
      break;

    case "agregar":
      const producto = await Product.create({
        name: argumentos[3],
        price: Number(argumentos[4]),
      });
      console.log(producto);
      break;

  }
}
export { main }
