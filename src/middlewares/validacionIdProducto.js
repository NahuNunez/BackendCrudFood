//Acá realizamos la logica para validar los id generados por mongo a cada producto.

import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validacionIdProducto = [
    param("id")
    .isMongoId()
    .withMessage("El id no corresponde con el formato de mongoDB"),
    (req, res, next) => resultadoValidacion(req, res, next)  //--> resultadoValidacion es el que va a manejar los 3 parametros
]

export default validacionIdProducto;