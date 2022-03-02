//Rocío Aragón 
//2º DAW
//Archivo ppal de la App, se ejucuta para que la App funcione.
//Librerías de Node
const express = require('express') //Front
const bodyParser = require('body-parser') //Para recoger los campos que se mandan mediante POST cuando este se use
const app = express() //Ejecuta express y lo guarda en una variable
require('dotenv').config(); //Para coger el fichero .env
const port = process.env.PORT || 4000 //Hacemos uso de las variables de entorno se guarda en una variable el puerto del archivo .env coge la varibale port

//Conexión a base de datos
const mongoose = require('mongoose'); //Para coger la librería de Mongoose
//Dirección de la BBDD online (su url)
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ltn3v.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))


// Motor de plantillas (Los archivos irán dentro de la carpeta views)
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Cambiar la raiz de los ficheros estáticos (van a /public)
app.use(express.static(__dirname + "/public"));

//Body parser (Configura el body parser para parsear/leer/traducir objetos jsons a, por ejemplo, cadena)
app.use(bodyParser.urlencoded({ extended: false }))
    //Parse aplicaion/json
app.use(bodyParser.json())

//Llamdas a rutas (redireccion a rutas)
app.use('/', require('./router/usuarios'));
app.use('/perros', require('./router/perros'));

// Poner en escucha el servidor encendido para recibir peticiones
app.listen(port, () => {
    console.log(`
Example app listening on port $ { port }
`);
})

//Cuando la respuesta sea un estado 404 te redirige a la vista 404
app.use((req, res) => {
    res.status(404).render("404", {
        titulo: "Error 404",
        descripcion: "Page not found"
    });
})