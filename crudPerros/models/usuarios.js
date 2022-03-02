//Rocío Aragón 
//2º DAW
const mongoose = require('mongoose'); //Para añadir librería mongoose y sus funciones
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    user: String,
    pass: String
});

//Creamos el modelo
const Usuarios = mongoose.model('usuarios', usuariosSchema, "usuarios");

module.exports = Usuarios; //Para sacar el esquema