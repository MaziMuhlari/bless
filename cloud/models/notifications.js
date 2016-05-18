var mongoose = require('mongoose');

module.exports = mongoose.model('Notification', new mongoose.Schema({
    chat: { type : Boolean, default : true },
    email: { type : Boolean, default : true },
    newsletter: { type : Boolean, default : true },
    created_on: { type : Date, default: Date.now }
}));