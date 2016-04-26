var mongoose = require('mongoose');

module.exports = mongoose.model('Report', new mongoose.Schema({
    reason: { type : String, default : "" },
    message: { type : String, default : "" },
    reporter: { type :mongoose.Schema.Types.ObjectId, ref: 'User' },
    reportee: { type :mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_on: { type : Date, default: Date.now }
}));
