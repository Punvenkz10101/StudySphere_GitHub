const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const roomRoutes = require("./routes/roomRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const allowedOrigins = [
    'https://study-sphere-git-hub.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://localhost:3000'
];

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);
app.use("/api/contacts", contactRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    // Handle socket events here
});
