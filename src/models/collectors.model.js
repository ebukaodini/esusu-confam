const mongoose = require('mongoose');

let schema = mongoose.Schema({
  memberId: String,
  groupId: String,
  month: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Collector", schema);