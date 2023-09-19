const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  cupon: { type: String, default: '' }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
