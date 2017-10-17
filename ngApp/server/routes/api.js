const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../models/users');



const db = 'mongodb://AC2G2:1234@ds117251.mlab.com:17251/smart_fridge';
mongoose.Promise = global.Promise;
mongoose.connect(db,{ useMongoClient: true },function(err){
    if(err){
        console.error("Error "+ err);
    }
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

router.post('/usuario',function(req,res){
    console.log('Inserting User');
    
    const crypto = require('crypto');
    var newUser = new Usuario();
    newUser.usuario = req.body.usuario;
    newUser.password = crypto.createHash('md5').update(req.body.password).digest('hex');
    newUser.save(function(err, insertedUser){
        if(err){
            console.log('Error saving user');
        }else{
            res.json(insertedUser);
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

module.exports = router;