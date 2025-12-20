const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// POST - Add Task
router.post("/", async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

// GET - All Tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE - Remove Task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// PATCH - Mark Complete
router.patch("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.status = !task.status;
  await task.save();
  res.json(task);
});

module.exports = router;
