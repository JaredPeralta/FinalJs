let fs = require("fs");
const { Z_DEFAULT_COMPRESSION } = require("zlib");

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
      const est = Object.assign({}, resultado[0])
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
    let materias = datos.materias;

    let encontrado = false;
    let encontrado2 = false;
    datos.estudiantes = datos.estudiantes.filter(estudiante => {
      if (estudiante.codigo != codigo) {
        return true;
      }
      else {
        encontrado = true;
        return false;
      }
    })

    materias = materias.map(materia => {
      let contador = 0;
      materia.estudiantesInscritos.map(estudiante => {
        if (estudiante.codigo === codigo) {
          materia.estudiantesInscritos.splice(contador, 1);
          console.log("Se elimino el estudiante con id " + estudiante.id)
          encontrado2 = true;
        }
        contador++;
        return estudiante
      })
      console.log(materia);
      return materia
    })

    datos.materias = materias;

    if (encontrado && encontrado2) {
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
    let estudiantes = datos.estudiantes;

    let encontrado = false;
    let encontrado2 = false;
    datos.materias = datos.materias.filter(materia => {
      if (materia.id != codigo) {
        return true;
      }
      else {
        encontrado = true;
        return false;
      }
    })
    estudiantes = estudiantes.map(estudiante => {
      let contador = 0;
      estudiante.materias.map(materia => {
        if (materia.id === codigo) {
          estudiante.materias.splice(contador, 1);
          console.log("Se elimino la materia con id " + materia.id)
          encontrado2 = true;
        }
        contador++;
        return materia
      })
      console.log(estudiante);
      return estudiante
    })

    datos.estudiantes = estudiantes;

    if (encontrado && encontrado2) {
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
  },
  buscarMateria: function (req, res) {
    let codigo = req.query.id;
    let datos = require("../datos.json");
    let resultado = datos;
    let estudiantes = datos.estudiantes;
    let estudiantesInscritos = [];
    let respuesta = [];

    let encontrado = false;
    resultado.materias.map(materia => {
      if (materia.id == codigo) {
        encontrado = true;
        materia.estudiantesInscritos.map(estudiante => {
          estudiantes.map(estudiante2 => {
            if (estudiante.codigo == estudiante2.codigo) {
              estudiantesInscritos.push(estudiante2);
            }
          })
        })
        //console.log(estudiantesInscritos);
        respuesta.push(materia);
        respuesta.push(estudiantesInscritos);
        res.json(respuesta);
      }
    })
    if (!encontrado) {
      res.status(404).send({
        mensaje: "La materia no existe"
      })
    }
  },
  agregarEstudianteMateria: function (req, res) {
    let codigoEstudiante = req.body.codigo;
    let codigoMateria = req.body.codigoMateria;
    let tipoMateria = req.body.info;
    let nota1 = req.body.nota1;
    let nota2 = req.body.nota2;
    let nota3 = req.body.nota3;
    let datos = require("../datos.json");
    let resultado = datos;
    let encontrado = false;
    let boolEstInscrito = false;

    let nuevoEstudiante = {};
    let nuevaMateria = {};

    datos.estudiantes.map(estudiante => {
      if (estudiante.codigo == codigoEstudiante) {
        encontrado = true;
        datos.materias.map(materia => {
          if (materia.id == codigoMateria) {
            materia.estudiantesInscritos.map(estudianteInscrito => {
              if (estudianteInscrito.codigo == codigoEstudiante) {
                boolEstInscrito = true;
                console.log("El estudiante ya esta inscrito en la materia");
                res.status(400).send({
                  mensaje: "El estudiante ya esta inscrito en la materia"
                })
              }
            })
            if (!boolEstInscrito) {
              if (tipoMateria == "t") {
                let notaFinal = nota1*0.35 + nota2*0.35 + nota3*0.3;
                nuevoEstudiante = {
                  codigo: codigoEstudiante,
                  nota1: nota1,
                  nota2: nota2,
                  nota3: nota3,
                  notaF: notaFinal
                }
              }else{
                let notaLab = req.body.notaLab;
                let notaFinal = nota1*0.30 + nota2*0.25 + nota3*0.20 + notaLab*0.25;
                nuevoEstudiante = {
                  codigo: codigoEstudiante,
                  nota1: nota1,
                  nota2: nota2,
                  nota3: nota3,
                  notaLab: notaLab,
                  notaF: notaFinal
                }
              }
            }
            materia.estudiantesInscritos.push(nuevoEstudiante);
          }
        })
        if(!boolEstInscrito){
          nuevaMateria = {
            id: codigoMateria
          }
          estudiante.materias.push(nuevaMateria);
        }
      }
    })

    if (!encontrado) {
      console.log("El estudiante no existe");
      res.status(404).send({
        mensaje: "El estudiante no existe"
      })
    }

    if (encontrado && !boolEstInscrito) {
      fs.writeFile('datos.json', JSON.stringify(resultado, null, 4), 'utf8', (err) => {
        if (err) {
          console.log("Error al agregar el estudiante a la materia");
          res.status(500).send({
            mensaje: "Error al agregar el estudiante a la materia"
          })
        } else {
          res.status(200).send({
            mensaje: "estudiante agregado a la materia"
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
  eliminarEstudianteMateria: function (req, res) {
    let codigo = req.body.codigo;
    let codigoMateria = req.body.codigoMateria;
    let datos = require("../datos.json");
    let encontrado = false;
    let encontrado2 = false;
    datos.materias.map(materia => {
      if(materia.id == codigoMateria){
        let contador = 0;
        console.log(materia.id);
        materia.estudiantesInscritos.map((estudianteInscrito) => {
          if (estudianteInscrito.codigo == codigo) {
            materia.estudiantesInscritos.splice(contador, 1);
            console.log(materia.estudiantesInscritos);
            encontrado = true;
          }
          contador++;
        })
      }
    })

    datos.estudiantes.map(estudiante => {
      if (estudiante.codigo == codigo) {
        let contador = 0;
        estudiante.materias.map((materia) => {
          if (materia.id == codigoMateria) {
            estudiante.materias.splice(contador, 1);
            encontrado2 = true;
          }
          contador++;
        })
      }
    })

    if (encontrado && encontrado2) {
      fs.writeFile('datos.json', JSON.stringify(datos, null, 4), 'utf8', (err) => {
        if (err) {
          res.status(500).send({
            mensaje: "Error al eliminar el estudiante de materia"
          })
        } else {
          console.log("estudiante eliminado de la materia");
          res.status(200).send({
            mensaje: "estudiante eliminado"
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
  actualizarNotasEstudiante: function (req, res) {
    let codigo = req.body.codigo; //Codigo Estudiante
    let codigoMateria = req.body.codigoMateria; //Codigo Materia
    let tipoMateria = req.body.info; //Tipo Materia
    let datos = require("../datos.json");
    let modificado = false;
    datos.materias.map(materia => {
      if (materia.id == codigoMateria) {
        materia.estudiantesInscritos.map((estudianteInscrito) => {
          if (estudianteInscrito.codigo == codigo) {
            estudianteInscrito.nota1 = req.body.nota1;
            estudianteInscrito.nota2 = req.body.nota2;
            estudianteInscrito.nota3 = req.body.nota3;
            if (tipoMateria == "t") {
              let notaFinal = estudianteInscrito.nota1*0.35 + estudianteInscrito.nota2*0.35 + estudianteInscrito.nota3*0.3;
              estudianteInscrito.notaF = notaFinal;
            }else{
              estudianteInscrito.notaLab = req.body.notaLab;
              let notaFinal = estudianteInscrito.nota1*0.30 + estudianteInscrito.nota2*0.25 + estudianteInscrito.nota3*0.20 + estudianteInscrito.notaLab*0.25;
              estudianteInscrito.notaF = notaFinal;
            }
            console.log(estudianteInscrito);
            modificado = true;
          }
        })
      }
    })
    if (modificado) {
      fs.writeFile('datos.json', JSON.stringify(datos, null, 4), 'utf8', (err) => {
        if (err) {
          res.status(500).send({
            mensaje: "Error al actualizar notas del estudiante"
          })
        } else {
          console.log("Notas actualizadas");
          res.status(200).send({
            mensaje: "Notas actualizadas"
          })
        }
      });
    }
    else {
      res.status(404).send({
        mensaje: "El usuario no existe"
      })
    }
  }

}


module.exports = control;