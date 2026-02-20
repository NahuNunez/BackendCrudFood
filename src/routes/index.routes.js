//En Routes vamos a tener las rutas para que el front pueda realizar las solicitudes de GET. POST, PUT, PATH, DELETE.

import { Router } from "express";
import productosRoutes from "./productos.routes.js"

const router = Router();

app.get("/api/test", (req,res)=>{
  res.json({ok:true});
});




router.use("/productos", productosRoutes);

export default router;