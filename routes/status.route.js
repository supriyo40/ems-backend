import express from "express";
import Task from "../models/tasks.model.js";

const router = express.Router();

router.put('/activetask/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
        taskId,                      // Find the task by ID
        { status: "active" },        // Update its status
        { new: true }                // Return the updated task
    );
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated to active", task });
})
router.put('/completedtask/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
        taskId,                      // Find the task by ID
        { status: "completed" },        // Update its status
        { new: true }                // Return the updated task
    );
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated to completed", task });
})
router.put('/failedtask/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
        taskId,                      // Find the task by ID
        { status: "failed" },        // Update its status
        { new: true }                // Return the updated task
    );
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated to failed", task });
})