const express = require("express");
const controlador = require("./controlador")


let router = express.Router() //Objeto para configurar las rutas


router.get("/", (req, res)=>{
    res.json({ message: "Hola desde el servidor! Apiiiiiii" });
})
router.post("/usuario", controlador.crearUsuario)
router.get("/usuario", controlador.buscarUsuarios)
router.put("/usuario", controlador.actualizarUsuario)
router.delete("/usuario", controlador.eliminarUsuario)
router.get("/musuario", controlador.mostrarUsuarios)

module.exports = router