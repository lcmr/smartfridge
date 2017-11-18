const mongoose = require('mongoose');
const config = require('../config/database');


const Schema = mongoose.Schema;

const firdgeSchema = new Schema({
    name: { 
        type : String,
        required : true,
        unique: true
    },
    trays: { 
        type : Number
    },
    columns: { 
        type : Number
    },
    rows: { 
        type : Number
    },
    temperature: { 
        type : String
    },
    array : {
        type: [[Number]],
        default : []
    },
    store: { type: Schema.Types.ObjectId, ref: 'stores' } 
});

const Fridge = module.exports = mongoose.model('fridge',firdgeSchema,'fridges');

module.exports.getFridgeById = function (id, callback) {
	Fridge.findById(id, callback);	
}

module.exports.getFridgeByName = function (name, callback) {
	const query = {name: name};
	Fridge.findOne(query,callback);
}

module.exports.addFridge = function(newFridge, callback) {
    newFridge.save(callback);
}

module.exports.getFridgeByStore = function(id, callback){
	const query = {store : id};
	Fridge.find(query, callback);
}

module.exports.deleteFridge = function (id, callback) {
    Fridge.findByIdAndRemove(id, callback);
}

module.exports.findFridgesByArray = function(ids,callback) {
    Fridge.find({ _id : {$in: ids}},callback);
}

module.exports.getStore = function(id,callback) {
    Fridge.findById(id,{store: 1}, callback);
}