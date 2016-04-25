var mongoose = require('mongoose');

module.exports = mongoose.model('Message', new mongoose.Schema({
    message: { type : String, default : "" },
    conversation: { type : String, default : "" },
    user: { type :mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_on: { type : Date, default: Date.now }
}));
