const express = require("express");
const Room = require("../models/Room");
const crypto = require("crypto");
const router = express.Router();

console.log("Room routes loaded");

// Create a room
router.post("/create", async (req, res) => {
  const { creator, topic, participantsLimit } = req.body;
  const roomKey = crypto.randomBytes(4).toString("hex");

  if (participantsLimit < 1 || participantsLimit > 10) {
    return res.status(400).json({
      success: false,
      message: "Participant limit must be between 1 and 10",
    });
  }

  try {
    const newRoom = new Room({ creator, topic, participantsLimit, roomKey });
    await newRoom.save();
    
    // Emit socket event through req.app.get('io')
    const io = req.app.get('io');
    io.emit('roomCreated', newRoom);

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Join a room using a roomKey
router.post("/join", async (req, res) => {
  const { roomKey, username } = req.body;

  try {
    const room = await Room.findOne({ roomKey });

    if (!room) {
      console.log(`Failed join attempt: Room with key ${roomKey} not found`);
      return res.status(404).json({ 
        success: false, 
        message: "Room not found" 
      });
    }

    // Emit socket event through req.app.get('io')
    const io = req.app.get('io');
    io.to(roomKey).emit('userJoined', { username, roomKey });

    res.json({ success: true, room });
  } catch (error) {
    console.error("Error joining room:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get room details
router.get("/:roomKey", async (req, res) => {
  try {
    const room = await Room.findOne({ roomKey: req.params.roomKey });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
