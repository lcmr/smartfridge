const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    usuario: String,
    password: String
});

const Usuario = module.exports = mongoose.model('usuario',userSchema,'usuarios');

module.exports.getUserById = function (id, callback) {
	Usuario.findById(id, callback);	
}

module.exports.getUserByUsername = function (username, callback) {
	const query = {usuario: username};
	Usuario.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){
                console.log(err);
                res.json({success: false, msg: 'Error encryptando la contraseña'});
            }else{
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
    
}

module.exports.comparePassword = function (candidatePassword, hash, callback ) {
	bcrypt.compare(candidatePassword,hash,(err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
}