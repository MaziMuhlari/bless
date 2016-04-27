var mongoose = require('mongoose');

module.exports = mongoose.model('Conversation', new mongoose.Schema({
    creator: { type :mongoose.Schema.Types.ObjectId, ref: 'User' },
    last_message_excerpt: { type : String, default : "" },
    last_message_sent: { type : Date },
    recepients: [ { type :mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    created_on: { type : Date, default: Date.now }
}));
