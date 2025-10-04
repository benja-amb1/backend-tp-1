

import mongoose, { Schema } from 'mongoose'

const URI_DB = "mongodb://localhost:27017/backend-tp-1";

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

const main = async (argumentos: string[], accion: string) => {
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
      if (productos.length === 0) {
        console.log("No hay productos");
        break;
      }
      console.log(productos);
      break;

    case "agregar":
      const producto = await Product.create({
        name: argumentos[3],
        price: +argumentos[4],
      });
      if (!producto) {
        console.log("No se pudo agregar el producto");
        break;
      }

      if (!argumentos[3] || !argumentos[4]) {
        console.log("Todos los campos son obligatorios");
        break;
      }

      await producto.save();
      console.log(producto);
      break;

    case "eliminar":
      const eliminar = await Product.deleteOne({ name: argumentos[3] });
      if (!eliminar) {
        console.log("No se pudo eliminar el producto");
        break;
      }

      if (!argumentos[3]) {
        console.log("Todos los campos son obligatorios");
        break;
      }

      console.log(eliminar);
      break;

    case "actualizar":
      const actualizar = await Product.updateOne({ name: argumentos[3] }, { name: argumentos[4], price: +argumentos[5] });

      if (!actualizar) {
        console.log("No se pudo actualizar el producto");
        break;
      }

      if (!argumentos[3] || !argumentos[4] || !argumentos[5]) {
        console.log("Todos los campos son obligatorios");
        break;
      }

      console.log(actualizar);
      break;

    case "buscar":
      const buscar = await Product.findOne({ name: argumentos[3] });

      if (!buscar) {
        console.log("No se pudo buscar el producto");
        break;
      }

      if (!argumentos[3]) {
        console.log("Todos los campos son obligatorios");
        break;
      }
      console.log(buscar);
      break;
  }

  process.exit(1);
}
export { main }
