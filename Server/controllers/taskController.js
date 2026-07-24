const Task = require("../models/Task");

// Add a new task
const addTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = new Task({
      title,
      description,
      priority,
    });

    await task.save();

    res.status(201).json({
      message: "Task added successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 👇 ADD THIS HERE
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Toggle Task Status
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status =
      task.status === "Pending"
        ? "Completed"
        : "Pending";

    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Task Statistics
const getTaskStats = async (req, res) => {
  try {
    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      totalTasks,
      pendingTasks,
      completedTasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 👇 Then change module.exports to this
module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleStatus,
  getTaskStats,
};