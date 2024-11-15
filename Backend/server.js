// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const roomRoutes = require("./routes/roomRoutes"); // Import roomRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors()); // Enable CORS for frontend requests

// Middleware
app.use(express.json()); // Parse incoming JSON request bodies

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));



// Routes
app.use("/api/rooms", roomRoutes); // Use the room routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
