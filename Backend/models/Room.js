// backend/models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  creator: { 
    type: String, 
    required: true, 
    trim: true 
  },
  topic: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 3, 
    maxlength: 100 
  },
  participantsLimit: { 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  },
  roomKey: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
