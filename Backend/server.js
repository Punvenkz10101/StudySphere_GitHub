const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

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

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);

// Move roomTasks to the top level scope
const roomTasks = new Map();
const roomMembers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle room creation
  socket.on('createRoom', async (roomData) => {
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
      io.to(roomKey).emit('roomCreated', {
        roomKey,
        creator,
        members: [creator],
        tasks: []
      });
      
      console.log(`Room created: ${roomKey} by ${creator}`);
    } catch (error) {
      console.error('Error creating room:', error);
      socket.emit('error', { message: 'Error creating room' });
    }
  });

  // Handle room joining
  socket.on('joinRoom', async ({ roomKey, username }) => {
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
      socket.emit('roomJoined', {
        roomKey,
        members,
        tasks
      });
      
      // Notify others about new user
      io.to(roomKey).emit('userJoined', { username, members });
      
      console.log(`${username} joined room ${roomKey}`);
      console.log('Current members:', members);
    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit('error', { message: 'Error joining room' });
    }
  });

  // Handle disconnection with room cleanup
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    roomMembers.forEach((members, roomKey) => {
      if (members.has(socket.id)) {
        const username = members.get(socket.id);
        members.delete(socket.id);
        
        // Notify room about user leaving
        io.to(roomKey).emit('userLeft', { username });
        
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
  socket.on('sendMessage', ({ roomKey, message, sender }) => {
    const messageData = {
      id: Date.now(),
      sender,
      content: message,
      timestamp: new Date()
    };
    io.to(roomKey).emit('newMessage', messageData);
  });

  // Todo list handlers
  socket.on('addTask', ({ roomKey, task }) => {
    if (!roomTasks.has(roomKey)) {
      roomTasks.set(roomKey, []);
    }

    const taskData = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      createdBy: socket.id
    };

    roomTasks.get(roomKey).push(taskData);
    console.log('Task added:', taskData, 'in room:', roomKey);
    io.to(roomKey).emit('taskAdded', taskData);
  });

  socket.on('deleteTask', ({ roomKey, taskId }) => {
    if (roomTasks.has(roomKey)) {
      const tasks = roomTasks.get(roomKey);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      roomTasks.set(roomKey, updatedTasks);
      console.log('Task deleted:', taskId, 'in room:', roomKey);
      io.to(roomKey).emit('taskDeleted', taskId);
    }
  });

  socket.on('editTask', ({ roomKey, taskId, newText }) => {
    if (roomTasks.has(roomKey)) {
      const tasks = roomTasks.get(roomKey);
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, text: newText } : task
      );
      roomTasks.set(roomKey, updatedTasks);
      console.log('Task edited:', newText, 'taskId:', taskId, 'in room:', roomKey);
      io.to(roomKey).emit('taskEdited', { taskId, newText });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
