const mongoose = require('mongoose');

let schema = mongoose.Schema({
  memberId: String,
  groupId: String,
  amount: Number,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contribution", schema);