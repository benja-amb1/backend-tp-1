import { main } from "./controllers/controller"
const argumentos = process.argv
const accion = argumentos[2]
main(argumentos, accion)