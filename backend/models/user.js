// backend/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Faculty', 'HOD', 'Registrar', 'CPO'], required: true },
  department: { type: String, required: function() { return this.role === 'Faculty' || this.role === 'HOD'; } }
});

const User = mongoose.model('User', userSchema);
module.exports = User;