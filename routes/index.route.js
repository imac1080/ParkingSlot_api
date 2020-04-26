// Cargamos el modulo express para poder ejecutar la ruta
const express = require('express'); 
// Cargamos la ruta de user.route que es donde tendremos todas las rutas de usuario
const users = require('./users.route');
// Cargamos el metodo Router del modulo express para usar la ruta /user
const router = express.Router();

/* Le decimos que cuando se use la ruta /user se vaya a la carpeta de /user.router
* y mire las rutas que hay alli definidas
*/
router.use('/user', users);

module.exports = router;

