var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var User = new Schema({
    id    : ObjectId,
    username : String,
    psw      : String,
    date     : Date
});

module.exports = User;