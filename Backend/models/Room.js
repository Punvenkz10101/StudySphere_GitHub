// backend/models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  topic: { type: String, required: true },
  participantsLimit: { type: Number, required: true },
  roomKey: { type: String, required: true, unique: true }, // Ensure roomKey is unique
}, { timestamps: true }); // Added timestamps for creation and update times

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
