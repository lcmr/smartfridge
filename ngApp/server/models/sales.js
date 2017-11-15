const mongoose = require('mongoose');
const config = require('../config/database');


const Schema = mongoose.Schema;

const salesSchema = new Schema({
    fridge: { 
    	type: Schema.Types.ObjectId, ref: 'fridges' 
    },
    store: { 
    	type: Schema.Types.ObjectId, ref: 'stores' 
    },
    quantity: { 
        type : Number
    },
    datetime: { 
        type : Date,
        default :  Date.now
    }
});

const Sale = module.exports = mongoose.model('sale',salesSchema,'sales');

module.exports.getSaleByFridge = function (fridgeId, callback) {
	Sale.find({'fridge' : fridgeId}, callback);	
}

module.exports.getSaleByStore = function (storeId, callback) {
	Sale.find({'store' : storeId}, callback);	
}


module.exports.getSaleByDate = function (name, callback) {
	const query = {name: name};
	Sale.findOne(query,callback);
}

module.exports.addSale = function(newSale, callback) {
    newSale.save(callback);
}

module.exports.getFridgeByStore = function(id, callback){
	const query = {store : id};
	Fridge.find(query, callback);
}

module.exports.deleteFridge = function (id, callback) {
    Fridge.findByIdAndRemove(id, callback);
}

module.exports.findFridgesByArray = function(ids,callback) {
    Fridge.find({_id : { $all : ids}},callback);
}