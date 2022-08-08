const express = require("express");
const controlador = require("./controlador")


let router = express.Router() //Objeto para configurar las rutas


router.get("/", (req, res)=>{
    res.json({ message: "Hola desde el servidor! Apiiiiiii" });
})

// Rutas Estudiantes
router.get("/mestudiante", controlador.mostrarEstudiantes)
router.post("/estudiante", controlador.crearEstudiante)
router.get("/estudiante", controlador.buscarEstudiantes) //Falta este
router.put("/estudiante", controlador.actualizarEstudiante)
router.delete("/estudiante", controlador.eliminarEstudiante)

// Rutas Materias
router.get("/mmaterias", controlador.mostrarMaterias)
router.post("/materia", controlador.crearMateria)
router.put("/materia", controlador.actualizarMateria)
router.delete("/materia", controlador.eliminarMateria)

module.exports = router