const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  telephone: String,
  groupId: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Member", schema);