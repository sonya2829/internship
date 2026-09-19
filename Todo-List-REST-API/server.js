const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI =
  "mongodb+srv://sonubirendra02_db_user:Sonu88@cluster0.rlijcpi.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// Test route
app.get("/", (req, res) => {
  res.send("Todo List API is running");
});

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST - Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// PUT - Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.json({
      message: "Todo deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});