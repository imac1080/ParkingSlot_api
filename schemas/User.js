// MODULOS //
// Cargamos el modulo de mongoose 
const mongoose = require("mongoose");

/* 
* Esquema que utilizamos para mapear el contenido que nos viene de la peticion a la base de datos
* con mongoose.Schema podemos crear un esquema de mongo en nuestra api para que lo entienda a la
* hora de mapearlo a la base de datos por eso importamos aqui el modulo mongoose para usar su Schema
*/
var userSchema = mongoose.Schema ({
    username: String,
    password: String
});

// El mongoose model busca en la base de datos la coleccion User pero en minuscula y en plural ¡¡Dato Importante!!
module.exports = mongoose.model("User", userSchema);