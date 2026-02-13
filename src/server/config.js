import express from "express"; //Al ser modulos no necesitan una url o ubicacion
import morgan from "morgan";
import cors from "cors"

import { dirname } from "path" /* importa la función dirname del módulo nativo path de Node.js, utilizada para extraer el directorio principal de una ruta de archivo. 
Elimina el último componente (nombre del archivo o directorio) y devuelve la ruta al directorio padre, siendo útil para obtener la ubicación de archivos en módulos ES6 o CommonJS.  */
import { fileURLToPath } from "url";

//Estamos creando la instacion para ejectuar el servidor y configurando express que nos permite acceder al puerto.
export default class Server {

    constructor(){
        this.app = express(); // llamamos a express
        this.port = process.env.PORT || 3001; //llamamos al puerto; Caso que el puerto no este disponible que vaya al 3001

        //Ejecuta el metodo middleware
        this.middlewares();
    }

    middlewares(){ //invocamos las propiedades del metodo (THIS)

        this.app.use(cors()); //cors nos permite las conexiones remotas cuando lo tengamos en prooduccion
        this.app.use(express.json()); //nos permite interpretar los datos que lleguen en la solicitud en formato .json
        this.app.use(morgan("dev")) // nos da informacion extra en la terminal

        const __dirname = dirname(fileURLToPath(import.meta.url));/* acá guardamos la ruta en una variable const; Estariamos
        extrayendo en esta variable el nombre de la carpeta raiz que nos permite ver si realmente esta funcionando el backend. */

        console.log(__dirname);

        this.app.use(express.static(__dirname + "/../../public")) /* En castellano humano significa:
        “Decile a Express que permita acceder desde el navegador a los archivos que estén dentro de la carpeta public” */
    }

    listen() {
        this.app.listen(this.port, () => 
        console.info(`El servidor se esta ejecutando en: http:localhost: ${this.port}`)
        )
    }
}