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

export const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos)

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error al listar los productos"})
    }
}

export const obtenerProducto = async (req, res) =>{
    try {
        console.log(req.params);
        const productoBuscado = await Producto.findById(req.params.id)

        if (!productoBuscado) {
            return res.status(404).json({
                mensaje: "No se encontro el producto :("
            })
        }
        res.status(200).json(productoBuscado)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Ocurrio un error al obtener el producto"
        })
    }
}

export const borrarProductoPorID = async (req, res) =>{
    try {
        const productoBuscado = await Producto.findByIdAndDelete(req.params.id)
        if (!productoBuscado) {
            return res.status(404).json({
                mensaje: "No se encontro el producto"
            })
        }
        return res.status(200).json({
            mensaje: "El producto fue borrado correctamente"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Ocurrio un error, no se pudo eliminar el producto"
        })        
    }
}

export const editarProductoPorID = async (req, res) =>{
    try {
        const productoBuscado = await Producto.findByIdAndUpdate(req.params.id, req.body)
        if (!productoBuscado) {
            return res.status(404).json({
                mensaje: "No se encontro el producto"
            })
        }
        return res.status(200).json({
            mensaje: "El producto fue editado correctamente"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Ocurrio un error, no se pudo actualizar el producto correctamente"
        })
    }
}