var mongoose = require('mongoose');

module.exports = mongoose.model('Message', new mongoose.Schema({
    message: { type : String, default : "" },
    users: [ { type :mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    created_on: { type : Date, default: Date.now }
}));
