// Cargar modulo de express
const express = require("express");
// Llamamos a express para poder crear el servidor
const app = express();
// Cargamos el modulo de mongoose, necesario para conectarte a mongoDB
const mongoose = require('mongoose');
// Cargamos modulo dotenv, necesario para poder llamar a las variables del archivo .env
const config = require("dotenv").config();
// Cargamos el archivo que tendra todas las rutas, donde dependiendo de cada ruta ira a un lugar o a otro.
const routesIndex = require("./routes/index.route");




/*
* URL para conectarte con mongo atlas, las variables estan en el fichero .env
* el fichero no se sube a github por seguridad a si que dejare un enlace para descargar el archivo .env
*/

const url = "mongodb+srv://" + process.env.ATLASUSERNAME + ":" + process.env.ATLASPASSWORD + "@parkingslotcluster-r2jyp.mongodb.net/parkingslot?retryWrites=true&w=majority";

/*
* Conexion a la base de datos 
*/
mongoose
    .connect(process.env.MONGODB_URI || url , {
        // Comprueba que sea una url
        useNewUrlParser: true,
        // Comprueba el motor y el servidor
        useUnifiedTopology: true
    });

    /*
    * Metodos para comprobar si se conecta o no a la base de datos de mongoAtlas
    * Es necesario hacer el mongoose.connection si no no detecta los metodos on y once
    */
    var mongoConnect = mongoose.connection;
    // Para saber si la conexion es erronea
    mongoConnect.on('error', () => { 
        console.log('connection error:')
    });
    // Para saber si la conexion es exitosa
    mongoConnect.once('open', () => {
        console.log('Conectado correctamente');
    })

const PORT = process.env.PORT || 8080;

// Le decimos a la aplicacion que escuche en el puerto declarado anteriormente
app.listen(PORT, () => {
    console.log(`El servidor esta inicializado en el puerto ${PORT}`);
})

// Le decimos que use las rutas que se encuentran en routesIndex
app.use(routesIndex);