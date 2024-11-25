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
      : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/contacts", contactRoutes);

// Room State Management
const roomState = {
  tasks: new Map(),
  members: new Map(),
  pomodoros: new Map()
};

// Socket Event Handlers
const handlePomodoroTimer = (roomKey, pomodoro) => {
  const interval = setInterval(() => {
    if (pomodoro.running) {
      const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 1000);
      pomodoro.timeLeft = Math.max(0, pomodoro.duration - elapsed);

      io.to(roomKey).emit("pomodoroTick", { timeLeft: pomodoro.timeLeft });

      if (pomodoro.timeLeft === 0) {
        clearInterval(interval);
        pomodoro.running = false;
        io.to(roomKey).emit("pomodoroComplete");
      }
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomKey, username }) => {
    socket.join(roomKey);
    if (!roomState.members.has(roomKey)) {
      roomState.members.set(roomKey, new Map());
      roomState.tasks.set(roomKey, []);
    }
    roomState.members.get(roomKey).set(socket.id, username);
    
    const members = Array.from(roomState.members.get(roomKey).values());
    
    // Get current pomodoro state if exists
    let pomodoroState = null;
    if (roomState.pomodoros.has(roomKey)) {
      const pomodoro = roomState.pomodoros.get(roomKey);
      const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 1000);
      const timeLeft = Math.max(0, pomodoro.duration - elapsed);
      
      pomodoroState = {
        running: pomodoro.running,
        timeLeft: timeLeft,
        duration: pomodoro.duration
      };
    }

    // Send current room state including pomodoro
    socket.emit("roomJoined", {
      members,
      tasks: roomState.tasks.get(roomKey),
      pomodoroState
    });
    
    // If timer is running, immediately start it for the new user
    if (pomodoroState && pomodoroState.running) {
      socket.emit("pomodoroStarted", {
        running: true,
        timeLeft: pomodoroState.timeLeft,
        duration: pomodoroState.duration
      });
    }

    io.to(roomKey).emit("userJoined", { username, members });
  });

  // Pomodoro handlers
  socket.on("startPomodoro", ({ roomKey, duration }) => {
    const pomodoro = {
      running: true,
      timeLeft: duration,
      startTime: Date.now(),
      duration
    };
    roomState.pomodoros.set(roomKey, pomodoro);
    handlePomodoroTimer(roomKey, pomodoro);
    io.to(roomKey).emit("pomodoroStarted", {
      running: true,
      timeLeft: duration,
      duration
    });
  });

  socket.on("resumePomodoro", ({ roomKey, timeLeft }) => {
    if (roomState.pomodoros.has(roomKey)) {
      const pomodoro = roomState.pomodoros.get(roomKey);
      pomodoro.running = true;
      pomodoro.timeLeft = timeLeft;
      pomodoro.startTime = Date.now();
      pomodoro.duration = timeLeft;
      
      handlePomodoroTimer(roomKey, pomodoro);
      io.to(roomKey).emit("pomodoroResumed", {
        running: true,
        timeLeft
      });
    }
  });

  // Add other event handlers (pause, reset, tasks, etc.)
  // ... (keep other essential handlers)

  socket.on("disconnect", () => {
    for (const [roomKey, members] of roomState.members) {
      if (members.has(socket.id)) {
        const username = members.get(socket.id);
        members.delete(socket.id);
        io.to(roomKey).emit("userLeft", { username });
        
        if (members.size === 0) {
          roomState.members.delete(roomKey);
          roomState.tasks.delete(roomKey);
          roomState.pomodoros.delete(roomKey);
        }
      }
    }
  });

  // Add back these essential socket handlers
  socket.on("pausePomodoro", ({ roomKey }) => {
    if (roomState.pomodoros.has(roomKey)) {
      const pomodoro = roomState.pomodoros.get(roomKey);
      pomodoro.running = false;
      
      // Calculate exact time remaining when paused
      const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 1000);
      pomodoro.timeLeft = Math.max(0, pomodoro.duration - elapsed);
      
      io.to(roomKey).emit("pomodoroPaused", {
        running: false,
        timeLeft: pomodoro.timeLeft
      });
    }
  });

  socket.on("resetPomodoro", ({ roomKey }) => {
    if (roomState.pomodoros.has(roomKey)) {
      const pomodoro = roomState.pomodoros.get(roomKey);
      pomodoro.running = false;
      pomodoro.timeLeft = 0;
      pomodoro.startTime = null;
      pomodoro.duration = 0;

      io.to(roomKey).emit("pomodoroReset", {
        running: false,
        timeLeft: 0
      });
    }
  });

  // Task management handlers
  socket.on("addTask", ({ roomKey, task }) => {
    if (!roomState.tasks.has(roomKey)) {
      roomState.tasks.set(roomKey, []);
    }

    const taskData = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      createdBy: socket.id,
    };

    roomState.tasks.get(roomKey).push(taskData);
    io.to(roomKey).emit("taskAdded", taskData);
  });

  socket.on("deleteTask", ({ roomKey, taskId }) => {
    if (roomState.tasks.has(roomKey)) {
      const tasks = roomState.tasks.get(roomKey);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      roomState.tasks.set(roomKey, updatedTasks);
      io.to(roomKey).emit("taskDeleted", taskId);
    }
  });

  socket.on("editTask", ({ roomKey, taskId, newText }) => {
    if (roomState.tasks.has(roomKey)) {
      const tasks = roomState.tasks.get(roomKey);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      );
      roomState.tasks.set(roomKey, updatedTasks);
      io.to(roomKey).emit("taskEdited", { taskId, newText });
    }
  });

  socket.on("leaveRoom", ({ roomKey, username }) => {
    if (roomState.members.has(roomKey)) {
      const members = roomState.members.get(roomKey);
      members.delete(socket.id);
      
      socket.leave(roomKey);
      io.to(roomKey).emit("userLeft", { username });
      
      if (members.size === 0) {
        roomState.members.delete(roomKey);
        roomState.tasks.delete(roomKey);
        roomState.pomodoros.delete(roomKey);
      }
    }
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add basic error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});
