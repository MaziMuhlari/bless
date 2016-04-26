var mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    username: { type : String, default : "" },
    password: { type : String, default : "" },
    gender: { type : String, default : "Other" },
    is_active: { type : Boolean, default : false },
    name: { type : String, default : "" },
    surname: { type : String, default : "" },
    description: { type : String, default : "" },
    is_blesser: { type : Boolean, default : false },
    blessing: { type : Number, default : 0 },
    created_on: { type : Date, default: Date.now }
}));
