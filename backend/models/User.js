const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  numero: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
  role: { type: String, enum: ['passager', 'administration', 'agent'], default: 'passager' }
}, {
  timestamps: true
});


module.exports = mongoose.model('User', UserSchema);
