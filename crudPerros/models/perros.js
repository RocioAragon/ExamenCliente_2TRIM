//Rocío Aragón 
//2º DAW
const mongoose = require('mongoose'); //Para añadir librería mongoose y sus funciones
const Schema = mongoose.Schema;

const perrosSchema = new Schema({
    nombre: String,
    raza: String,
    descripcion: String,
    foto: String
});

//Creamos el modelo
const Perros = mongoose.model('perros', perrosSchema, "perros");

module.exports = Perros; //Para sacar el esquema