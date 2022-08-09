const express = require("express");
const controlador = require("./controlador")


let router = express.Router() //Objeto para configurar las rutas


router.get("/", (req, res)=>{
    res.json({ message: "Hola desde el servidor! Apiiiiiii" });
})

// Rutas Estudiantes
router.get("/mestudiante", controlador.mostrarEstudiantes)
router.post("/estudiante", controlador.crearEstudiante)
router.get("/estudiante", controlador.buscarEstudiantes)
router.put("/estudiante", controlador.actualizarEstudiante)
router.delete("/estudiante", controlador.eliminarEstudiante)
router.get("/promedioestudiante", controlador.calcularPromedioPonderado)
router.get("/mejorpromedioestudiante", controlador.mostrarEstudiantesMejorPromedio)

// Rutas Materias
router.get("/mmaterias", controlador.mostrarMaterias)
router.post("/materia", controlador.crearMateria)
router.put("/materia", controlador.actualizarMateria)
router.delete("/materia", controlador.eliminarMateria)
router.get("/materia", controlador.buscarMateria)
router.post("/aemateria", controlador.agregarEstudianteMateria)
router.delete("/eemateria", controlador.eliminarEstudianteMateria)
router.put("/mnemateria", controlador.actualizarNotasEstudiante)


//Rutas Backup
router.get("/backup", controlador.cargarDatosExistentes)

module.exports = router