var mongoose = require('mongoose');

module.exports = mongoose.model('Blesser', new mongoose.Schema({
  name: { type : String, default : "" },
  surname: { type : String, default : "" },
  description: { type : String, default : "" },
  blessing: { type : Number, default : 0 },
  user: { type :mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_on: { type : Date, default: Date.now }
}));
