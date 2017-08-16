var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Cart = new Schema({
    username    : ObjectId,
    goodsname : String,
    price : String,
    count : String
});

module.exports = Cart;