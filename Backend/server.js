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
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
try {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully!"))
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

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

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

      console.log(`Room created: ${roomKey} by ${creator}`);
    } catch (error) {
      console.error("Error creating room:", error);
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

      console.log(`${username} joined room ${roomKey}`);
      console.log("Current members:", members);

      if (roomPomodoros.has(roomKey)) {
        const pomodoro = roomPomodoros.get(roomKey);
        if (pomodoro.running) {
          const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 1000);
          const remaining = Math.max(0, pomodoro.duration - elapsed);

          socket.emit("pomodoroState", {
            running: pomodoro.running,
            time: remaining,
            startTime: pomodoro.startTime,
            duration: pomodoro.duration,
          });
        }
      }
    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("error", { message: "Error joining room" });
    }
  });

  // Handle disconnection with room cleanup
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

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
        }

        console.log(`${username} left room ${roomKey}`);
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
    console.log("Task added:", taskData, "in room:", roomKey);
    io.to(roomKey).emit("taskAdded", taskData);
  });

  socket.on("deleteTask", ({ roomKey, taskId }) => {
    if (roomTasks.has(roomKey)) {
      const tasks = roomTasks.get(roomKey);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      roomTasks.set(roomKey, updatedTasks);
      console.log("Task deleted:", taskId, "in room:", roomKey);
      io.to(roomKey).emit("taskDeleted", taskId);
    }
  });

  socket.on("editTask", ({ roomKey, taskId, newText }) => {
    if (roomTasks.has(roomKey)) {
      const tasks = roomTasks.get(roomKey);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      );
      roomTasks.set(roomKey, updatedTasks);
      console.log("Task edited:", newText, "taskId:", taskId, "in room:", roomKey);
      io.to(roomKey).emit("taskEdited", { taskId, newText });
    }
  });

  socket.on("startPomodoro", ({ roomKey, duration }) => {
    console.log(`Starting pomodoro in room ${roomKey} for ${duration} seconds`);

    if (!roomPomodoros.has(roomKey)) {
      roomPomodoros.set(roomKey, {
        running: false,
        timeLeft: 0,
        startTime: null,
        duration: 0,
      });
    }

    const pomodoro = roomPomodoros.get(roomKey);
    pomodoro.running = true;
    pomodoro.timeLeft = duration;
    pomodoro.startTime = Date.now();
    pomodoro.duration = duration;

    // Start interval for server-side time tracking
    const interval = setInterval(() => {
      if (pomodoro.running) {
        const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 1000);
        pomodoro.timeLeft = Math.max(0, pomodoro.duration - elapsed);

        // Emit time update to all clients in the room
        io.to(roomKey).emit("pomodoroTick", {
          timeLeft: pomodoro.timeLeft,
        });

        // Stop if timer reaches 0
        if (pomodoro.timeLeft === 0) {
          clearInterval(interval);
          pomodoro.running = false;
          io.to(roomKey).emit("pomodoroComplete");
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Broadcast initial state to all users in the room
    io.to(roomKey).emit("pomodoroStarted", {
      running: true,
      timeLeft: duration,
      startTime: pomodoro.startTime,
      duration: pomodoro.duration,
    });
  });

  socket.on("pausePomodoro", ({ roomKey }) => {
    if (roomPomodoros.has(roomKey)) {
      const pomodoro = roomPomodoros.get(roomKey);
      pomodoro.running = false;

      io.to(roomKey).emit("pomodoroPaused", {
        running: false,
        timeLeft: pomodoro.timeLeft,
      });
    }
  });

  socket.on("resetPomodoro", ({ roomKey }) => {
    if (roomPomodoros.has(roomKey)) {
      const pomodoro = roomPomodoros.get(roomKey);
      pomodoro.running = false;
      pomodoro.timeLeft = 0;
      pomodoro.startTime = null;
      pomodoro.duration = 0;

      io.to(roomKey).emit("pomodoroReset", {
        running: false,
        timeLeft: 0,
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
