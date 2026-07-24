const express = require("express");

const router = express.Router();

const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleStatus,
  getTaskStats,
} = require("../controllers/taskController");

// GET - Task Statistics
router.get("/stats", getTaskStats);

// GET - All Tasks
router.get("/", getTasks);

// POST - Add Task
router.post("/", addTask);

// PUT - Update Task
router.put("/:id", updateTask);

// DELETE - Delete Task
router.delete("/:id", deleteTask);

// PATCH - Toggle Task Status
router.patch("/:id/status", toggleStatus);

module.exports = router;