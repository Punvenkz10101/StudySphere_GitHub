const express = require("express");
const Room = require("../models/Room");
const crypto = require("crypto");
const router = express.Router();

console.log("Room routes loaded");

// Create a room
router.post("/create", async (req, res) => {
  const { creator, topic, participantsLimit } = req.body;
  const roomKey = crypto.randomBytes(4).toString("hex");

  // Validate participants limit
  if (participantsLimit < 1 || participantsLimit > 10) {
    return res.status(400).json({
      success: false,
      message: "Participant limit must be between 1 and 10",
    });
  }

  try {
    const newRoom = new Room({ creator, topic, participantsLimit, roomKey });
    const response = await newRoom.save();
    console.log(`Room created: ${JSON.stringify(newRoom, null, 2)}`);

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Join a room using a roomKey
router.post("/join", async (req, res) => {
  const { roomKey } = req.body;

  try {
    // Find the room by its unique key
    const room = await Room.findOne({ roomKey });

    if (!room) {
      console.log(`Failed join attempt: Room with key ${roomKey} not found`);
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    console.log(`Room joined: ${JSON.stringify(room, null, 2)}`);
    res.json({ success: true, room });
  } catch (error) {
    console.error("Error joining room:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
