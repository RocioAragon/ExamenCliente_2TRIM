//Rocío Aragón 
//2º DAW
const express = require('express'); //Importar librería
const router = express.Router(); //Usando función router que permite usar métodos de esta clase (Como get y post)
const Perros = require('../models/perros'); //require hace que importemos el fichero perros de la carpeta models

//Usamos método get del objeto router
router.get('/', async(req, res) => {
    try {
        //Le pondremos arrayperrosDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPerros que tenemos EN LA VISTA
        const arrayPerrosDB = await Perros.find();
        console.log(arrayPerrosDB);
        res.render("perros", {
            arrayPerros: arrayPerrosDB //parametro que se le pasa a la vista perros con el array que contiene la lista de perros de la DB
        })
    } catch (error) {
        console.error(error)
    }
})

//Da la vista crear
router.get('/crear', (req, res) => {
    res.render('crear') //Nueva vista que crearemos
})

//Crea in perro y redirecciona a la vista perros
router.post('/crear', async(req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
        //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const perrosDB = new Perros(body) //Creamos un nuevo Perro, gracias al modelo
        await perrosDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/perros') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})


//GET ID - Obtiene un perro según el ID
router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "perros.ejs" le pusimos
        //a este campo perros.id, por eso lo llamados con params.id
    try {
        const perrosDB = await Perros.findOne({ _id: id }) //_id porque así lo indica Mongo
            //Esta variable “Perros” está definida arriba con el “require”
            //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(perrosDB) //Para probarlo por consola
        res.render('detalle', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            perros: perrosDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Perros no encontrado!'
        })
    }
})

//Delete - Borra un perro
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const perrosDB = await Perros.findByIdAndDelete({ _id: id });
        console.log(perrosDB)
            // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
            // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!perrosDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el Perro.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Perro eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//Editar - Edita un perro
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const perrosDB = await Perros.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(perrosDB)
        res.json({
            estado: true,
            mensaje: 'Perro editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Perro'
        })
    }
})

module.exports = router;