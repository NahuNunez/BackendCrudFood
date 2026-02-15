//Acá vamos a tener todas las rutas para las peticiones
import { Router } from "express";
import { prueba } from "../controllers/productos.controllers.js";

const router = Router();

router.route("/").get(prueba)

/* router.route("/").get((req, res) => {
    console.log("desde el controlador de prueba");
    res.send("Prueba desde el controlador")
    //por peticion unicamente se puede enviar un solo mensaje, sino se rompre el codigo
} ) */

export default router;