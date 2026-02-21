//bcrypt es una librería (y un algoritmo) que se usa para hashear contraseñas de forma segura antes de guardarlas en una base de datos.
import bcrypt from "bcrypt" 
import Usuario from "../models/usuario.js" //acá colocamos la extension porque es algo que creamos nosotros


export const crearUsuario = async (req, res) =>{
    try {
        const saltos = bcrypt.genSaltSync(10) //El genSaltSync() viene incorporado su async y await, si elegimos el genSalt() debemos colocarlos nosotros.
        const passwordEncriptado = bcrypt.hashSync(req.body.password, saltos) //los dos parametros que añadimos son el password que esta en el body y los saltos que predefinimos

        req.body.password = passwordEncriptado


        //Aqui creamos al usuario nuevo y lo guardamos
        const usuarioNuevo = new Usuario(req.body)
        await usuarioNuevo.save();
        res.status(201).json({mensaje: "Usuario creado correctamente"})

    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Ocurrio un error, no se pudo crear el usuario."})
    }
}