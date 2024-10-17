const mongoose = require('mongoose');

// Schema
const UserSchema = new mongoose.Schema({
    name: { type: String }
},{ timestamps: true }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;
