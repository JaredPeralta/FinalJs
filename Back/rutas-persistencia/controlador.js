let fs = require("fs")

let control = {
    crearUsuario: function(req, res){
        //#region paso a paso
        
        let usuarios = fs.readFileSync("usuarios.json", "utf8"); //Ruta relativa desde el index.js
        let usuariosJson = JSON.parse(usuarios); // Convierte la lectura del archivo (texto) a un objeto

        let nuevoUsuario = {
            nombre: req.body.nombre,
            contrasenna: req.body.contrasenna,
            id: usuariosJson[usuariosJson.length-1].id + 1
        };
        usuariosJson.push(nuevoUsuario);

        let usuariosMod = JSON.stringify(usuariosJson, null, 4) // Convierte el objeto de usuarios de vuelta a texto

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
        /* */
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
    mostrarUsuarios: function(req, res){
        let usuarios = require("../usuarios.json") // ruta relativa desde este archivo
        let resultado = usuarios;
        if(resultado.length != 0){
            res.json(resultado); 
        }
        else{
            res.status(404).send({
                mensaje: "no se encontró el usuario"
            })
        }
    },
    buscarUsuarios: function(req, res){
        let usuarios = require("../usuarios.json") // ruta relativa desde este archivo
        let id = req.query.id;
        let resultado = usuarios.filter( (usuario) => usuario.id == id )

        if(resultado.length != 0){
            res.status(200).send({
                encontrados: resultado
            })
        }
        else{
            res.status(404).send({
                mensaje: "no se encontró el usuario"
            })
        }
    },
    actualizarUsuario: function(req, res){
        let id = req.body.id;
        let usuarios = require("../usuarios.json");

        let encontrado = false;
        let usuariosMod = usuarios.map((usuario)=>{
            if(usuario.id == id){
                usuario.nombre = req.body.nombre;
                usuario.contrasenna = req.body.contrasenna;
                encontrado = true;
            }
            return usuario
        })

        if(encontrado){
            fs.writeFile('usuarios.json', JSON.stringify(usuariosMod, null, 4), 'utf8', (err) => {
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
    eliminarUsuario: function(req, res){
        let id = req.body.id;
        let usuarios = require("../usuarios.json");

        let encontrado = false
        usuarios = usuarios.filter(usuario => {
            if(usuario.id != id){
                return true;
            }
            else{
                encontrado = true;
                return false;
            }
        })

        if(encontrado){
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