const express = require("express");
const Room = require("../models/Room");
const crypto = require("crypto");
const router = express.Router();

console.log("Room routes loaded");

// Add OPTIONS handler for the create endpoint
router.options('/create', (req, res) => {
    res.status(200).end();
});

// Create a room
router.post("/create", async (req, res) => {
    // Add CORS headers explicitly for this route
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

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
        
        // Get io instance from app
        const io = req.app.get('io');
        if (io) {
            io.emit('roomCreated', newRoom);
        }

        res.status(201).json({ success: true, room: newRoom });
    } catch (error) {
        console.error("Error creating room:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Join a room using a roomKey
router.post("/join", async (req, res) => {
    console.log("Join request:", req.body);
    const { roomKey, username } = req.body;

    if (!roomKey || !username) {
        return res.status(400).json({
            success: false,
            message: "Room key and username are required"
        });
    }

    try {
        const room = await Room.findOne({ roomKey });

        if (!room) {
            console.log(`Failed join attempt: Room with key ${roomKey} not found`);
            return res.status(404).json({ 
                success: false, 
                message: "Room not found" 
            });
        }

        // Get io instance from app
        const io = req.app.get('io');
        if (io) {
            io.to(roomKey).emit('userJoined', { username, roomKey });
        }

        res.json({ 
            success: true, 
            room: {
                roomKey: room.roomKey,
                topic: room.topic,
                creator: room.creator,
                participantsLimit: room.participantsLimit
            } 
        });
    } catch (error) {
        console.error("Error joining room:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message 
        });
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
