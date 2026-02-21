//Aqui va el modelo de usuario que necesitaremos para usar en las validaciones

import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
    nombreUsuario:{
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            vaidator: (valor) => {
                return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate: {
            validator: (valor) => {
                return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,64}$/.test(valor)
            }
        }
    },
},
{
    timestamps: true
})

const Usuario = mongoose.model("usuario", usuarioSchema); //guardamos el schema en una variable para poder exportarlo

export default Usuario