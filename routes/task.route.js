import express from "express";
import User from "../models/user.model.js";
import Task from "../models/tasks.model.js";

const router = express.Router();

router.post('/createtask', async (req, res) => {
    try {
        const { taskTitle, taskDescription, taskDate, taskCategory, assignedTo } = req.body;
        const user = await User.findOne({username: assignedTo});
        if (!user) {
            return res.status(400).json({ message: "Employee not found" });
        }
        const task = new Task({
            taskTitle,
            taskDescription,
            taskDate,
            taskCategory,
            assignedTo: user._id,
        });

        await task.save();
        res.status(200).json({ message: "Task assigned successfully", task });
    } catch (error) {
        console.error("Error assigning task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/alltasks', async (req, res) => {
    const tasks = await Task.find();

    const userTaskData = {};

    for(const task of tasks ){
        const  userId = task.assignedTo;
        if(!userTaskData[userId]){
            const user = await User.findById(userId);
            if(user){
                userTaskData[userId] = {
                    username: user.username,
                    taskCounts: { 
                        newTask: 0, 
                        activeTask: 0, 
                        failedTask: 0, 
                        completedTask: 0 
                    },
                };
            }
        }

        if(userTaskData[userId]){
            if (task.status === 'new') userTaskData[userId].taskCounts.newTask += 1;
            if (task.status === 'active') userTaskData[userId].taskCounts.activeTask += 1;
            if (task.status === 'completed') userTaskData[userId].taskCounts.completedTask += 1;
            if (task.status === 'failed') userTaskData[userId].taskCounts.failedTask += 1;
        }
    }

    const data = Object.values(userTaskData);

    res.status(200).json({ message: "Successfully retrieved all data", data });
});


// Route to get tasks of a specific employee
router.get('/tasks/:userId', async (req, res) => {
    const { userId } = req.params;
    const tasks = await Task.find({ assignedTo: userId })
    res.status(200).json({ message: "All tasks of that employee", tasks });
});

router.get('/taskcount/:userId', async (req, res)=>{
    const {userId} = req.params;
    const data = {
        newTask: 0, activeTask: 0, failedTask: 0, completedTask: 0
    };
    const tasks = await Task.find({assignedTo: userId});
    tasks.forEach((task) => {
        if (task.status === 'new') data.newTask += 1;
        if (task.status === 'active') data.activeTask += 1;
        if (task.status === 'completed') data.completedTask += 1;
        if (task.status === 'failed') data.failedTask += 1;
    });

    // Respond with the count
    res.status(200).json({ message: "Returning count of tasks", data });
})

export default router;
