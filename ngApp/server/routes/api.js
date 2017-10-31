const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../models/users');
const Tienda = require('../models/stores');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const TokenGenerator = require('../config/tokengenerator');



//------------------------------------------------------------------Administracion de Usuarios

//-- Crear usuario
router.post('/usuario',function(req,res){
    console.log('Inserting User');
    
    var newUser = new Usuario();
    newUser.usuario = req.body.usuario;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.nombre = req.body.nombre;

    Usuario.addUser(newUser, (err, user) => {
        if(err){
            console.log('Error saving user');
            res.json({success: false, msg: 'Error al registrar el usuario'});
        }else{
            res.json({success: true, msg: 'Usuario registrado exitosamente'});
        }
    });

});

// Autenticar Usuario

router.post('/autenticar',function(req, res, next) {
    const username = req.body.usuario;
    const password = req.body.password;

    Usuario.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'Usuario no encontrado'});
        }

        Usuario.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch){
                var _user = {
                    _id: user._id,
                    usuario: user.usuario,
                    password: user.password,
                    nombre: user.nombre,
                    email: user.email,
                    _v: user._v
                };

                const tokenGenerator = new TokenGenerator(config.secret, 'pubKey', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '1d', notBefore: '2s' })
                token = tokenGenerator.sign(_user, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })

                res.json({
                    success: true, 
                    token: 'JWT ' + token,
                    usuario: {
                        id: user._id,
                        usuario: user.usuario,
                        nombre: user.nombre,
                        email: user.email
                    }
                });
            }else{
                res.json({success: false, msg: 'La contraseña no coincide'});
            }
        });
    });
});

//perfil
router.get('/perfil', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    Tienda.getStoresByUser(req.user._id, (err,store) => {
       if(err) throw err;
       
       if(!store){
        return res.json({user: req.user});
       } else{
        return res.json({user: req.user, stores: store});
       }
    });
});

router.get('/usuarios', function(req, res){
    console.log('Get Request of all users');
    Usuario.find({})
    .exec(function(err,usuarios){
        if(err){
            console.log('Error al recibir informacion');
        }else{
            res.json(usuarios);
        }
    });
});

router.get('/usuarios/:id', function(req, res){
    console.log('Get Request of a user');
    Usuario.findById(req.params.id)
    .exec(function(err,usuario){
        if(err){
            console.log('Error al recibir informacion');
        }else{
            res.json(usuario);
        }
    });
});


router.put('/usuario/:id', function(req, res){
    console.log('Updating User');   
    const crypto = require('crypto');
    
    Usuario.findByIdAndUpdate(req.params.id,
        {
            $set: {usuario: req.body.usuario, password: crypto.createHash('md5').update(req.body.password).digest('hex')}
        },
        {
            new: true
        },
        {
            function (err, updatedUser){
                if(err){
                    res.send('Error updating video')
                }else{
                    res.json(updatedUser);
                }
            }
        }
    );
});

router.delete('/usuario/:id',function(req, res) {
   console.log('Deleting User...');
   Usuario.findByIdAndRemove(req.params.id,function (err, deletedUser) {
      if(err){
        res.send('Error deleting user');
      } else{
        res.json(deletedUser);
      }
   });
});


//------------------------------------------------Tiendas------------------------------------------------

//Crear tienda

router.post('/tienda',function (req, res) {
    console.log('Inserting Store');
    
    var newStore = new Tienda();
    newStore.name = req.body.name;
    newStore.address = req.body.address;
    newStore.telephone = req.body.telephone;
    newStore.user = req.body.user;

    Tienda.addStore(newStore, (err, store) => {
        if(err){
            console.log('Error saving store');
            res.json({success: false, msg: 'Error al registrar la tienda'});
        }else{
            res.json({success: true, msg: 'Tienda registrada exitosamente'});
        }
    });

});


router.delete('/tienda/:id',function(req, res) {
   console.log('Deleting Store...');

   Tienda.deleteStore(req.params.id, (err, store) => {
        if(err){
            console.log('Error saving store');
            res.json({success: false, msg: 'Error al eliminar la tienda'});
        }else{
            res.json({success: true, msg: 'Tienda eliminada exitosamente'});
        }
   });
});


module.exports = router;