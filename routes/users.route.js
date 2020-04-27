// Cargamos el modulo express para poder usar su metodo Router
const express = require('express');
// Cargamos el modulo bcrypt que es el que se encargara de encriptar y desencriptar la contraseña
const bcrypt = require('bcrypt');
// Cargamos el modulo jwt para poder crear un token y tener sus funcionalidades
const jwt = require('jsonwebtoken');

// Llamamos al metodo Router de express para poder cargar las rutas y tambien usar los metodos Get, Post, Update, Delete
const router = express.Router();

// IMPORTS DE EXPORTS //
// Importamos metodos de otros archivos de nuestro programa que hemos exportado con antelacion.
const functionProtectedRoutes = require("./index.route");

// ESQUEMAS //
// Importamos los esquemas del usuario para la base de datos y poder mapearlos
const User = require("../schemas/User");

// VARIABLES //
// Es la longitud que tendra el encriptado a la hora de encriptar la contraseña
var BCRYPT_SALT_ROUNDS = 12;

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

// PETICIONES //
// Metodo que busca todos los usuarios
router.get("/allUsers", protectedRoutes, async (req, res) => {
    User.find().then(result => {
        res.send(result);
    })
})


router.post("/newUser", protectedRoutes, async (req, res) => {
    password = req.body.password;
    // Encripta la contraseña con un nivel de seguridad de 12
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword){
        password = hashedPassword;
    }).then(function () {
        const user = new User({
            username: req.body.username,
            password: password
        });

        user.save().then(result => {
            res.send("Usuario creado correctamente");
        }).catch(err => {
            res.send("No se a podido crear el usuario correctamente");
        });
    }).catch(function (error) {
        console.log("Error in Bcrypt: ");
        console.log(error);
        next();
    });
});

router.post("/getUser", protectedRoutes, async (req, res) => {
    console.log(req.body.username);
    User.findOne({ username: req.body.username}).then(result => {
        res.send(result);
    })
});

router.delete("/deleteUser", protectedRoutes, async (req, res) => {
    User.deleteOne({ username: req.body.username }).then(result => {
        res.send("Se a borrado el usuario correctamente");
    }).catch(function (error){
        res.send("No se a podido eliminar correctamente el usuario")
    })
});

router.post("/login", async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    try {
        var user = await User.findOne({ username: username}).exec();
        if(!user) {
            return res.status(400).send({ message: "The username does not exist"});
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({message: "The password is invalid"})
        }
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, process.env.KEY);
        userLogged = username;
        res.json({
            mensaje: 'Autenticación correcta',
            username: username,
            token: token
        });
    } catch (error) {
        res.status(500).send("error: " + error);
    }
});

module.exports = router;