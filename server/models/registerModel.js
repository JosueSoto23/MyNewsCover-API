const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  country: { type: String },
  city: { type: String },
  postalCode: { type: String },
  phoneNumber: { type: String },
  role: { type: String }
});

module.exports = mongoose.model('user', user);