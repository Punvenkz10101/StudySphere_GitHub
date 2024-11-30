const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const roomRoutes = require("./routes/roomRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CORS_ORIGIN 
      : ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set('io', io);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? true 
    : process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Add before your routes
app.options('*', cors()); // Enable preflight requests for all routes

// Database Connection
try {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/contacts", contactRoutes);

// Move roomTasks to the top level scope
const roomTasks = new Map();
const roomMembers = new Map();
const roomPomodoros = new Map();
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle room creation
  socket.on("createRoom", async (roomData) => {
    try {
      const { roomKey, creator } = roomData;

      // Initialize room data
      if (!roomMembers.has(roomKey)) {
        roomMembers.set(roomKey, new Map());
      }
      if (!roomTasks.has(roomKey)) {
        roomTasks.set(roomKey, []);
      }
      if (!roomPomodoros.has(roomKey)) {
        roomPomodoros.set(roomKey, {
          running: false,
          timeLeft: 0,
          startTime: null,
          duration: 0,
          interval: null,
          sessionCount: 0
        });
      }

      // Add creator to room members
      roomMembers.get(roomKey).set(socket.id, creator);

      socket.join(roomKey);

      // Send initial room state
      io.to(roomKey).emit("roomCreated", {
        roomKey,
        creator,
        members: [creator],
        tasks: [],
      });
    } catch (error) {
      socket.emit("error", { message: "Error creating room" });
    }
  });

  // Handle room joining
  socket.on("joinRoom", async ({ roomKey, username }) => {
    try {
      socket.join(roomKey);

      // Initialize room if it doesn't exist
      if (!roomMembers.has(roomKey)) {
        roomMembers.set(roomKey, new Map());
      }
      if (!roomTasks.has(roomKey)) {
        roomTasks.set(roomKey, []);
      }

      // Add member to room
      roomMembers.get(roomKey).set(socket.id, username);

      // Get current room state
      const members = Array.from(roomMembers.get(roomKey).values());
      const tasks = roomTasks.get(roomKey);

      // Send current state to the joining user
      socket.emit("roomJoined", {
        roomKey,
        members,
        tasks,
      });

      // Notify others about new user
      io.to(roomKey).emit("userJoined", { username, members });

      // Send Pomodoro state if exists
      if (rooms.has(roomKey) && rooms.get(roomKey)?.timer) {
        const room = rooms.get(roomKey);
        socket.emit('pomodoroState', {
          running: room.timer.isRunning,
          timeLeft: room.timer.timeLeft,
          duration: room.timer.duration,
          sessionCount: room.sessionCount || 0
        });
      }
    } catch (error) {
      socket.emit("error", { message: "Error joining room" });
    }
  });

  // Handle disconnection with room cleanup
  socket.on("disconnect", () => {
    roomMembers.forEach((members, roomKey) => {
      if (members.has(socket.id)) {
        const username = members.get(socket.id);
        members.delete(socket.id);

        // Notify room about user leaving
        io.to(roomKey).emit("userLeft", { username });

        // Clean up empty rooms
        if (members.size === 0) {
          roomMembers.delete(roomKey);
          roomTasks.delete(roomKey);
          roomPomodoros.delete(roomKey);
        }
      }
    });
  });

  // Handle messages
  socket.on("sendMessage", ({ roomKey, message, sender }) => {
    const messageData = {
      id: Date.now(),
      sender,
      content: message,
      timestamp: new Date(),
    };
    io.to(roomKey).emit("newMessage", messageData);
  });

  // Todo list handlers
  socket.on("addTask", ({ roomKey, task }) => {
    if (!roomTasks.has(roomKey)) {
      roomTasks.set(roomKey, []);
    }

    const taskData = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      createdBy: socket.id,
    };

    roomTasks.get(roomKey).push(taskData);
    io.to(roomKey).emit("taskAdded", taskData);
  });

  socket.on("deleteTask", ({ roomKey, taskId }) => {
    if (roomTasks.has(roomKey)) {
      const tasks = roomTasks.get(roomKey);
      roomTasks.set(roomKey, tasks.filter(task => task.id !== taskId));
      io.to(roomKey).emit("taskDeleted", taskId);
    }
  });

  socket.on("editTask", ({ roomKey, taskId, newText }) => {
    if (roomTasks.has(roomKey)) {
      const tasks = roomTasks.get(roomKey);
      roomTasks.set(roomKey, tasks.map(task => 
        task.id === taskId ? { ...task, text: newText } : task
      ));
      io.to(roomKey).emit("taskEdited", { taskId, newText });
    }
  });

  socket.on("startPomodoro", ({ roomKey, duration }) => {
    let room = rooms.get(roomKey) || {};
    
    // Clear existing interval if any
    if (room.timer?.intervalId) {
      clearInterval(room.timer.intervalId);
    }
    
    room.timer = {
      duration: parseInt(duration),
      timeLeft: parseInt(duration),
      isRunning: true,
      intervalId: setInterval(() => {
        if (room.timer.timeLeft > 0) {
          room.timer.timeLeft--;
          io.to(roomKey).emit('pomodoroTick', {
            timeLeft: room.timer.timeLeft,
            running: true
          });
        } else {
          clearInterval(room.timer.intervalId);
          room.timer.isRunning = false;
          room.sessionCount = (room.sessionCount || 0) + 1;
          io.to(roomKey).emit('pomodoroComplete', {
            sessionCount: room.sessionCount
          });
        }
      }, 1000)
    };

    rooms.set(roomKey, room);
    io.to(roomKey).emit('pomodoroStarted', {
      running: true,
      timeLeft: room.timer.timeLeft,
      duration: room.timer.duration,
      sessionCount: room.sessionCount || 0
    });
  });

  socket.on("pausePomodoro", ({ roomKey }) => {
    const room = rooms.get(roomKey);
    if (room?.timer) {
      clearInterval(room.timer.intervalId);
      room.timer.isRunning = false;
      room.timer.intervalId = null;
      
      io.to(roomKey).emit('pomodoroPaused', {
        running: false,
        timeLeft: room.timer.timeLeft,
        sessionCount: room.sessionCount || 0
      });
    }
  });

  socket.on("resetPomodoro", ({ roomKey }) => {
    const room = rooms.get(roomKey);
    if (room?.timer) {
      clearInterval(room.timer.intervalId);
      room.timer.timeLeft = 0;
      room.timer.isRunning = false;
      room.timer.intervalId = null;
      
      io.to(roomKey).emit('pomodoroReset', {
        running: false,
        timeLeft: 0,
        sessionCount: room.sessionCount || 0
      });
    }
  });

  // Add this socket handler inside the io.on("connection") block
  socket.on("leaveRoom", ({ roomKey, username }) => {
    if (roomMembers.has(roomKey)) {
      const members = roomMembers.get(roomKey);
      members.delete(socket.id);
      
      // Remove user from room
      socket.leave(roomKey);
      
      // Notify others in the room
      io.to(roomKey).emit("userLeft", { username });
      
      // Clean up empty rooms
      if (members.size === 0) {
        roomMembers.delete(roomKey);
        roomTasks.delete(roomKey);
        roomPomodoros.delete(roomKey);
      }
    }
  });

  // Add this inside your io.on("connection", (socket) => { ... }) block
  socket.on("durationChange", ({ roomKey, newDuration }) => {
    // Broadcast the duration change to all users in the room except the sender
    socket.to(roomKey).emit("durationChange", {
      newDuration: newDuration
    });
  });

  // New event handler for time duration change
  socket.on('changeDuration', (data) => {
    // Broadcast the duration change to all users in the same room
    io.to(data.roomId).emit('durationUpdated', {
      duration: data.duration,
      userId: socket.id
    });
  });

  // Update the break timer implementation
  socket.on("startBreak", ({ roomKey, duration }) => {
    let room = rooms.get(roomKey) || {};
    
    // Clear existing break interval if any
    if (room.breakInterval) {
      clearInterval(room.breakInterval);
    }
    
    room.breakTimer = {
      duration: parseInt(duration),
      timeLeft: parseInt(duration),
      isRunning: true
    };

    room.breakInterval = setInterval(() => {
      if (room.breakTimer.timeLeft > 0) {
        room.breakTimer.timeLeft--;
        io.to(roomKey).emit('breakTick', {
          timeLeft: room.breakTimer.timeLeft,
          running: true
        });
      } else {
        clearInterval(room.breakInterval);
        room.breakTimer.isRunning = false;
        room.breakSessionCount = (room.breakSessionCount || 0) + 1;
        io.to(roomKey).emit('breakComplete', {
          sessionCount: room.breakSessionCount
        });
      }
    }, 1000);

    rooms.set(roomKey, room);
    io.to(roomKey).emit('breakStarted', {
      running: true,
      timeLeft: room.breakTimer.timeLeft,
      duration: room.breakTimer.duration,
      sessionCount: room.breakSessionCount || 0
    });
  });

  socket.on("pauseBreak", ({ roomKey }) => {
    const room = rooms.get(roomKey);
    if (room?.breakTimer) {
      clearInterval(room.breakInterval);
      room.breakTimer.isRunning = false;
      
      io.to(roomKey).emit('breakTick', {
        timeLeft: room.breakTimer.timeLeft,
        running: false
      });
    }
  });

  socket.on("resetBreak", ({ roomKey }) => {
    const room = rooms.get(roomKey);
    if (room) {
      clearInterval(room.breakInterval);
      if (room.breakTimer) {
        room.breakTimer.timeLeft = 0;
        room.breakTimer.isRunning = false;
      }
      
      io.to(roomKey).emit('breakTick', {
        timeLeft: 0,
        running: false
      });
    }
  });

  // Update the break duration change handler
  socket.on('changeBreakDuration', ({ roomId, duration }) => {
    const room = rooms.get(roomId);
    if (room) {
      // Only update if break timer is not running
      if (!room.breakTimer?.isRunning) {
        io.to(roomId).emit('breakDurationUpdated', { 
          duration,
          timeLeft: duration * 60
        });
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Keep error handling logs
process.on('uncaughtException', (error) => {
  console.error('Critical Error:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});
