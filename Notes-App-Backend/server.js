
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());

// Notes Routes
const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) =>
    console.log("MongoDB Connection Error:", error.message)
  );

// Test Route
app.get("/", (req, res) => {
  res.send("Notes App Backend is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
