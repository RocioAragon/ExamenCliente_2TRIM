//Rocío Aragón 
//2º DAW
const express = require('express'); //Importar librería
const router = express.Router(); //Usando función router que permite usar métodos de esta clase (Como get y post)
const Usuarios = require('../models/usuarios'); //require hace que importemos el fichero perros de la carpeta models

router.get('/', (req, res) => {
    res.render("index", { mensaje: "" })
})

//crear usuario
router.post('/', async(req, res) => {

    const body = req.body //Gracias al body parser, de esta forma
        //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    if (body.iniciarSesion != null) {
        try {
            const usuariosDB = await Usuarios.findOne({ user: body.user })
            console.log(usuariosDB)
            if (usuariosDB != null && body.pass == usuariosDB.pass) {
                res.redirect('/perros') //Volvemos al listado
            } else {
                console.log('Se ha producido un error')
                res.render('index', {
                    mensaje: 'Login incorrecto.'
                })
            }
        } catch (error) { //Si el user indicado no se encuentra
            console.log('Se ha producido un error', error)
            res.render('index', {
                mensaje: 'Usuario no encontrado.'
            })
        }
    } else {
        try {
            const usuariosDB = new Usuarios(body) //Creamos un nuevo Usuario, gracias al modelo
            await usuariosDB.save() //Lo guardamos con .save(), gracias a Mongoose
            res.render("index", { mensaje: "Usuario Registrado" })
        } catch (error) {
            console.log('error', error)
        }
    }

})

module.exports = router;