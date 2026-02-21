import { body } from "express-validator";
//import Producto from "../models/producto.js";   //cuando trabajamos de tipo module necesitamos poner la extension del archivo (.js)
import resultadoValidacion from "./resultadoValidacion.js";
import Producto from "../models/producto.js";

const validacionProducto = [
  //invocamos al body (chequeamos que hay en el body de la solicitud)
  body("nombreProducto")
    //metodos de express-validator
    .notEmpty()
    .withMessage("El nombre es un dato obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres")
    .custom(async(valorRealPrueba, {req} ) => {

        const productoExistente = await Producto.findOne({
            nombreProducto: valorRealPrueba
        })
        if (!productoExistente) {
            return true;
        }
        //chequeamos si el id de la peticion PUT ya tiene ese nombre en otro producto
        if (req.params?.id && productoExistente._id.toString() === req.params.id) {
            return true
        }
        //si esto no se cumple enviar un mensaje de error

        throw new Error("Ya existe un producto con ese nombre")
    } ),

  body("precio")
    .notEmpty()
    .withMessage("El precio del producto es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio del producto debe ser numerico")
    .isFloat({ min: 100, max: 1000000 })
    .withMessage(
      "El precio del producto debe estar entre 100 y 1000000 de pesos argentinos",
    ),

  body("descripcion_breve")
    .notEmpty()
    .withMessage("La descripcion breve es un dato obligatorio")
    .isLength({ min: 5, max: 250 })
    .withMessage("La descripcion breve debe tener entre 5 y 250 caracteres"),

  body("descripcion_amplia")
    .notEmpty()
    .withMessage("La descripcion amplia es un dato obligatorio")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion amplia debe tener entre 10 y 500 caracteres"),

  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn([
      "Acompañamientos",
      "bebidas",
      "Ensaladas",
      "Hamburguesas",
      "Postres",
      "Pizzas",
      "Sándwiches y Wraps",
      "Veggie/Veganas",
    ])
    .withMessage(
      'La categoria debe ser uno de los siguientes terminos: ["Acompañamientos","bebidas","Ensaladas","Hamburguesas","Postres","Pizzas","Sándwiches y Wraps", "Veggie/Veganas"]',
    ),

    (req, res, next) => resultadoValidacion(req, res, next)
];
export default validacionProducto;
