import { body } from "express-validator";
//import Producto from "../models/producto.js";   //cuando trabajamos de tipo module necesitamos poner la extension del archivo (.js)
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
    //invocamos al body (chequeamos que hay en el body de la solicitud)
    body("nombreProducto")

    //metodos de express-validator
    .notEmpty()
    .withMessage("El nombre es un dato obligatorio")
    .isLength({min: 2, max: 100})
    .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),

    (req,res,next) => resultadoValidacion(req, res, next)
]

export default validacionProducto