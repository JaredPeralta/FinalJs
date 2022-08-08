let fs = require("fs")

let control = {
  crearEstudiante: function (req, res) {
    //#region paso a paso
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let resultado = datos;

    let nuevoUsuario = {
      codigo: resultado.estudiantes[resultado.estudiantes.length - 1].codigo + 1,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      materias: []
    };
    resultado.estudiantes.push(nuevoUsuario);

    let usuariosMod = JSON.stringify(resultado, null, 4) // Convierte el objeto de usuarios de vuelta a texto

    fs.writeFile('datos.json', usuariosMod, 'utf8', (err) => {
      if (err) {
        res.status(500).send({
          mensaje: "Error al crear el usuario"
        })
      } else {
        res.status(200).send({
          mensaje: "usuario creado",
          usuario: nuevoUsuario
        })
      }
    });
    //#endregion

    //#region directo
    /*
    let usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf8") );
    let nuevoUsuario = {
        nombre: req.body.nombre,
        contrasenna: req.body.contrasenna,
        id: usuarios[usuarios.length-1].id + 1
    };
    usuarios.push(nuevoUsuario);

    fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 4), 'utf8', (err) => {
        if (err) {
            res.status(500).send({
                mensaje: "Error al crear el usuario"
            })
        } else {
            res.status(200).send({
                mensaje: "usuario creado",
                usuario: nuevoUsuario
            })
        }
    });
    /* */
    //#endregion

  },
  mostrarEstudiantes: function (req, res) {
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let resultado = datos;
    if (resultado.estudiantes.length != 0) {
      res.json(resultado.estudiantes);
    }
    else {
      res.status(404).send({
        mensaje: "no se encontró el usuario"
      })
    }
  },
  buscarEstudiantes: function (req, res) {
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let codigo = req.query.codigo;
    let resultado = datos.estudiantes.filter((estudiante) => estudiante.codigo == codigo)
    if (resultado.length != 0) {
      let estudianteEncontrado = {
        nombre: resultado[0].nombre,
        apellido: resultado[0].apellido,
      };
      const est = Object.assign({},resultado[0])
      res.json(estudianteEncontrado);
    }
    else {
      res.status(404).send({
        mensaje: "no se encontró el usuario"
      })
    }
  },
  actualizarEstudiante: function (req, res) {
    let codigo = req.body.codigo;
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let resultado = datos;

    let encontrado = false;


    datos.estudiantes.map((estudiante) => {
      if (estudiante.codigo == codigo) {
        estudiante.nombre = req.body.nombre;
        estudiante.apellido = req.body.apellido;
        encontrado = true;
      }
      return estudiante
    })

    if (encontrado) {
      fs.writeFile('datos.json', JSON.stringify(datos, null, 4), 'utf8', (err) => {
        if (err) {
          res.status(500).send({
            mensaje: "Error al actualizar el usuario"
          })
        } else {
          res.status(200).send({
            mensaje: "usuario actualizado"
          })
        }
      });
    }
    else {
      res.status(404).send({
        mensaje: "El usuario no existe"
      })
    }

  },
  eliminarEstudiante: function (req, res) {
    let codigo = req.body.codigo;
    let datos = require("../datos.json");

    let encontrado = false
    datos.estudiantes = datos.estudiantes.filter(estudiante => {
      if (estudiante.codigo != codigo) {
        return true;
      }
      else {
        encontrado = true;
        return false;
      }
    })

    if (encontrado) {
      fs.writeFile('datos.json', JSON.stringify(datos, null, 4), 'utf8', (err) => {
        if (err) {
          res.status(500).send({
            mensaje: "Error al eliminar el usuario"
          })
        } else {
          res.status(200).send({
            mensaje: "usuario eliminado"
          })
        }
      });
    }
    else {
      res.status(404).send({
        mensaje: "El usuario no existe"
      })
    }
  },
  crearMateria: function (req, res) {
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let resultado = datos;

    let nuevaMateria = {
      id: resultado.materias[resultado.materias.length - 1].id + 1,
      nombre: req.body.nombre,
      creditos: req.body.creditos,
      tipo: req.body.tipo,
      estudiantesInscritos: []
    };
    resultado.materias.push(nuevaMateria);

    let materiasMod = JSON.stringify(resultado, null, 4) // Convierte el objeto de usuarios de vuelta a texto

    fs.writeFile('datos.json', materiasMod, 'utf8', (err) => {
      if (err) {
        res.status(500).send({
          mensaje: "Error al crear la materia"
        })
      } else {
        res.status(200).send({
          mensaje: "materia creada",
          materia: nuevaMateria
        })
      }
    });
  },
  mostrarMaterias: function (req, res) {
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let resultado = datos;
    if (resultado.length != 0) {
      res.json(resultado.materias);
    }
    else {
      res.status(404).send({
        mensaje: "no se encontró la materia"
      })
    }
  },
  actualizarMateria: function (req, res) {
    let codigo = req.body.id;
    let datos = require("../datos.json") // ruta relativa desde este archivo
    let resultado = datos;

    let encontrado = false;

    datos.materias.map((materia) => {
      if (materia.id == codigo) {
        materia.nombre = req.body.nombre;
        materia.creditos = req.body.creditos;
        encontrado = true;
      }
      return materia
    })

    if (encontrado) {
      fs.writeFile('datos.json', JSON.stringify(datos, null, 4), 'utf8', (err) => {
        if (err) {
          res.status(500).send({
            mensaje: "Error al actualizar la materia"
          })
        } else {
          res.status(200).send({
            mensaje: "materia actualizada"
          })
        }
      });
    }
    else {
      res.status(404).send({
        mensaje: "La materia no existe"
      })
    }
  },
  eliminarMateria: function (req, res) {
    let codigo = req.body.id;
    let datos = require("../datos.json");

    let encontrado = false
    datos.materias = datos.materias.filter(materia => {
      if (materia.id != codigo) {
        return true;
      }
      else {
        encontrado = true;
        return false;
      }
    })

    if (encontrado) {
      fs.writeFile('datos.json', JSON.stringify(datos, null, 4), 'utf8', (err) => {
        if (err) {
          res.status(500).send({
            mensaje: "Error al eliminar la materia"
          })
        } else {
          res.status(200).send({
            mensaje: "materia eliminada"
          })
        }
      });
    }
    else {
      res.status(404).send({
        mensaje: "La materia no existe"
      })
    }
  }

}


module.exports = control;