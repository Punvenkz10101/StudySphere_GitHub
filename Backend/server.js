
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const roomRoutes = require("./routes/roomRoutes");
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

try {
 
  mongoose
    .connect(process.env.MONGODB_URI, {

    })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("MongoDB connection error:", err));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

app.use("/api/rooms", (req, res, next) => { console.log("/api/rooms route accessed"); next(); }, roomRoutes); 
app.use('/api/contacts', (req, res, next) => { console.log("/api/contacts route accessed"); next(); }, contactRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
