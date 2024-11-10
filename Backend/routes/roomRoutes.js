// backend/routes/roomRoutes.js
const express = require('express');
const Room = require('../models/Room');
const crypto = require('crypto'); // For generating a unique roomKey
const router = express.Router();

// Create a room
router.post('/create', async (req, res) => {
  const { creator, topic, participantsLimit } = req.body;

  // Generate a unique roomKey using crypto
  const roomKey = crypto.randomBytes(4).toString('hex'); // Generates a 8-character hex string

  try {
    const newRoom = new Room({
      creator,
      topic,
      participantsLimit,
      roomKey, // Save the generated roomKey
    });

    await newRoom.save(); // Save to MongoDB

    res.json({ success: true, room: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Join a room using a roomKey
router.post('/join', async (req, res) => {
  const { roomKey } = req.body;
  
  try {
    const room = await Room.findOne({ roomKey });
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
