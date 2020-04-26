const mongoose = require("mongoose");

var userSchema = mongoose.Schema ({
    username: String,
    password: String
});

// El mongoose model busca en la base de datos la collecion User pero en minuscula y en plural ¡¡Dato Importante!!
module.exports = mongoose.model("User", userSchema);