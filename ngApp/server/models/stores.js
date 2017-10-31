const mongoose = require('mongoose');
const config = require('../config/database');


const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: { 
        type : String,
        required : true,
    },
    address: { 
        type : String,
        required : true
    },
    telephone: { 
        type : String
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});

const Store = module.exports = mongoose.model('store',storeSchema,'stores');

module.exports.getStoreById = function (id, callback) {
	Store.findById(id, callback);	
}

module.exports.getSotoreByName = function (name, callback) {
	const query = {name: name};
	Store.findOne(query,callback);
}

module.exports.addStore = function(newStore, callback) {
    newStore.save(callback);
}

module.exports.getStoresByUser = function(id, callback){
	const query = {user : id};
	Store.find(query, callback);
}

module.exports.deleteStore = function (id, callback) {
    Store.findByIdAndRemove(id, callback);
}