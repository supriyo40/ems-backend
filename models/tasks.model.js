import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle: String,
    taskDescription: String,
    taskDate: Date,
    taskCategory: String,
    status: {
        type: String, 
        enum: ['new', 'active', 'completed', 'failed'], 
        default: 'new' 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
