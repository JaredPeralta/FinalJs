const express = require("express");
const controlador = require("./controlador")


let router = express.Router() //Objeto para configurar las rutas


router.get("/", (req, res)=>{
    //res.status(200).send("<h1>página principal</h1>")
    res.json({ message: "Hola desde el servidor! de Jared" });
})
router.post("/usuario", controlador.crearUsuario)
router.get("/usuario", controlador.buscarUsuarios)

module.exports = router