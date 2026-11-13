const taskRoutes = require("./routes/tasks");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Import Authentication Routes
const authRoutes = require("./routes/auth");

// Middleware
app.use(cors());
app.use(express.json());


// Authentication API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Full Stack To-Do Backend is running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) =>
    console.log("MongoDB Connection Error:", error.message)
  );

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
