// Cargamos el modulo express para poder usar su metodo Router
const express = require('express');
// Llamamos al metodo Router de express para poder cargar las rutas y tambien usar los metodos Get, Post, Update, Delete
const router = express.Router();

const User = require("../schemas/User");

// Metodo que busca todos los usuarios
router.get("/allUsers", async (req, res) => {
    User.find().then(result => {
        res.send(result);
    })
})

module.exports = router;