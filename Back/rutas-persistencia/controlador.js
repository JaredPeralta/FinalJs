let fs = require("fs")

let control = {
    crearEstudiante: function (req, res) {
        //#region paso a paso
        let usuarios = require("../usuarios.json") // ruta relativa desde este archivo
        let resultado = usuarios;

        let nuevoUsuario = {
            codigo: resultado.estudiantes[resultado.estudiantes.length - 1].codigo + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            materias: []
        };
        resultado.estudiantes.push(nuevoUsuario);

        let usuariosMod = JSON.stringify(resultado, null, 4) // Convierte el objeto de usuarios de vuelta a texto

        fs.writeFile('usuarios.json', usuariosMod, 'utf8', (err) => {
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
        let usuarios = require("../usuarios.json") // ruta relativa desde este archivo
        let resultado = usuarios;
        if (resultado.length != 0) {
            res.json(resultado.estudiantes);
        }
        else {
            res.status(404).send({
                mensaje: "no se encontró el usuario"
            })
        }
    },
    buscarUsuarios: function (req, res) {
        let usuarios = require("../usuarios.json") // ruta relativa desde este archivo
        let id = req.query.id;
        let resultado = usuarios.filter((usuario) => usuario.id == id)

        if (resultado.length != 0) {
            res.status(200).send({
                encontrados: resultado
            })
        }
        else {
            res.status(404).send({
                mensaje: "no se encontró el usuario"
            })
        }
    },
    actualizarEstudiante: function (req, res) {
        let codigo = req.body.codigo;
        let usuarios = require("../usuarios.json") // ruta relativa desde este archivo
        let resultado = usuarios;

        let encontrado = false;


        usuarios.estudiantes.map((usuario) => {
            if (usuario.codigo == codigo) {
                usuario.nombre = req.body.nombre;
                usuario.apellido = req.body.apellido;
                encontrado = true;
            }
            return usuario
        })

        if (encontrado) {
            fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 4), 'utf8', (err) => {
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
        let usuarios = require("../usuarios.json");

        let encontrado = false
        usuarios.estudiantes = usuarios.estudiantes.filter(usuario => {
            if (usuario.codigo != codigo) {
                return true;
            }
            else {
                encontrado = true;
                return false;
            }
        })

        if (encontrado) {
            fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 4), 'utf8', (err) => {
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
    }

}


module.exports = control;