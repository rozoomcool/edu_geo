const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2
    },
    lastname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2
    },
    birthDay: {
      type: Date,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 16
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 24
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      required: true,
    },
});
  
const User = mongoose.model('User', userSchema);
module.exports = User;