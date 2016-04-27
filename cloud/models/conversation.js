var mongoose = require('mongoose');

module.exports = mongoose.model('Conversation', new mongoose.Schema({
    creator: { type :mongoose.Schema.Types.ObjectId, ref: 'User' },
    recepients: [ { type :mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    created_on: { type : Date, default: Date.now }
}));
