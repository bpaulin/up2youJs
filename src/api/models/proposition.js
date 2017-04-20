var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PropositionSchema = new Schema({
  name: String,
  sex: { type: String, enum: ['male', 'female'] },
  count: { type: Number, default: 1 },
  lastSent: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposition', PropositionSchema);
