const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  img: { type: String },
  likes: { type: Number },
  comments: [{
    comment: { type: String },
    _id: mongoose.Types.ObjectId
  }],
  author: {
    _id: mongoose.Types.ObjectId,
    followers: { type: Number },
    name: { type: String }
  }
}, { timestamps: true });

const Pin = mongoose.model('pin', pinSchema);

module.exports = Pin;

