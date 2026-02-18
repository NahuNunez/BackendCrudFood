//Controllers es el corazon del proyecto. Va a procesar datos, responder al front, estara la mayor parte de la logica.

import Producto from "../models/producto.js";


export const prueba = (req, res) => {
    console.log("desde el controlador de prueba");
    res.send("Prueba desde el controlador")
}

export const crearProducto = async (req, res) => {
    //enviamos una respuesta
    //res.send("Aqui tenemos que crear el producto")

    try {
        console.log(req);
        
        const productoNuevo = new Producto (req.body)
        await productoNuevo.save();

        //codigo hecho por chatgpt
        res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto: productoNuevo
        })

    } catch (error) {
        console.error(error);
        //error interno del server
        res.status(500).json({
        mensaje: "Ocurrio un error al crear un producto"
    })
    }
}