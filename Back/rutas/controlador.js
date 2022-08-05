
usuarios = [] // Mala practica

let control = {
    crearUsuario: function(req, res){

        let nuevoUsuario = {
            nombre: req.body.nombre,
            contrasenna: req.body.contrasenna,
            id: parseInt(Math.random()*100)
        };
        usuarios.push(nuevoUsuario);
        res.status(200).send({
            mensaje: "usuario creado",
            usuario: nuevoUsuario
        })
    
    },
    buscarUsuarios: function(req, res){
        let id = req.query.id;
        let resultado;
        if(id.trim() != ""){
            resultado = usuarios.filter( (usuario) => usuario.id == id )
        }
        else {
            resultado = usuarios;
        }

        res.status(200).send({
            encontrados: resultado
        })
    }
}


module.exports = control;