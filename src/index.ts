import mongoose, { Schema, model } from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tp1");
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}
interface ProductoInterface {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
}
const productSchema = new Schema<ProductoInterface>({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  quantity: Number,
});

const Product = model<ProductoInterface>("Product", productSchema);

