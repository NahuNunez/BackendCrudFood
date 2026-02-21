//Acá vamos a tener todas las rutas para las peticiones
import { Router } from "express";
import { borrarProductoPorID, crearProducto, editarProductoPorID, listarProductos, obtenerProducto, prueba } from "../controllers/productos.controllers.js";
import validacionProducto from "../middlewares/validacionProducto.js";

const router = Router();

router.route("/test").get(prueba)

/* router.route("/").get((req, res) => {
    console.log("desde el controlador de prueba");
    res.send("Prueba desde el controlador")
    //por peticion unicamente se puede enviar un solo mensaje, sino se rompre el codigo
} ) */

router.route("/").post(validacionProducto, crearProducto).get(listarProductos)

router.route("/:id").get(obtenerProducto).delete(borrarProductoPorID).put( validacionProducto ,editarProductoPorID)

export default router;