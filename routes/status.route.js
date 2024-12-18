import express from "express";
import Task from "../models/tasks.model.js";

const router = express.Router();

router.put('/activetask/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByIdAndUpdate(
            taskId,
            { status: "active" },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated to active", task });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put('/completedtask/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByIdAndUpdate(
            taskId,
            { status: "completed" },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated to completed", task });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put('/failedtask/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByIdAndUpdate(
            taskId,
            { status: "failed" },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated to failed", task });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;