const express = require("express");
const controlador = require("./controlador")


let router = express.Router() //Objeto para configurar las rutas


router.get("/", (req, res)=>{
    res.json({ message: "Hola desde el servidor! Apiiiiiii" });
})
router.get("/mestudiante", controlador.mostrarEstudiantes)
router.post("/estudiante", controlador.crearEstudiante)
router.get("/usuario", controlador.buscarUsuarios) //Falta este
router.put("/estudiante", controlador.actualizarEstudiante)
router.delete("/estudiante", controlador.eliminarEstudiante)

module.exports = router