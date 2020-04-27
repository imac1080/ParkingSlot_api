// MODULOS //
// Cargamos el modulo express para poder ejecutar la ruta
const express = require('express');
// Cargamos el modulo jwt para poder tener token
const jwt = require('jsonwebtoken');
// Cargamos la ruta de user.route que es donde tendremos todas las rutas de usuario
const users = require('./users.route');
// Cargamos la funcion Router del modulo express para direccionar las rutas
const router = express.Router();

const protectedRoutes = express.Router();

// METODOS //

protectedRoutes.use((req, res, next) => {
    var token = req.headers['authorization'] || (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['access-token'] || req.token;

    console.log(token);
  
    if (token) {
      jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Token invalido' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
        mensaje: 'Token invalido'
      });
    }
});

/* Le decimos que cuando se use la ruta /user se vaya a la carpeta de /user.router
* y mire las rutas que hay alli definidas
*/
router.use('/user', users);

module.exports = router;
exports.protectedRoutes = protectedRoutes;
