//resultadoValidacion.js nos va a ayudar con las validaciones de lo que el objeto producto debe tener para que se edite, cree o elimine.
//Nos ayuda a validar las peticiones que hagamos desde el front

import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) =>{ //next es si pasa de esta logica ejecutá la siguiente linea de codigo

    const errores = validationResult(req)

    //si ocurrieron errores en la validacion
    if (!errores.isEmpty()) {

        //enviamos msj de error 400(bad request) porque falto una parte del body (producto incompleto)
        return res.status(400).json(errores.array()) //en este array nos muestra que es lo que ha fallado en la peticion
    }
    //continua con la siguiente ejecucion
    next()
}

export default resultadoValidacion;