const mongoose = require('mongoose');

let driverSchema = mongoose.Schema({
  memberId: String,
  groupId: String,
  month: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Collector", driverSchema);