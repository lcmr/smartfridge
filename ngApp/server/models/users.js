const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    usuario: String,
    password: String
});

module.exports = mongoose.model('usuario',userSchema,'usuarios');