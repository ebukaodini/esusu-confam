const mongoose = require('mongoose');

let schema = mongoose.Schema({
  groupId: String,
  memberId: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Group-Member", schema);