const mongoose = require('mongoose');

let schema = mongoose.Schema({
  name: String,
  description: String,
  periodicAmount: Number,
  capacity: { type: Number, default: 1 },
  maxCapacity: Number,
  isSearchable: Boolean,
  groupAdmin: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Group", schema);