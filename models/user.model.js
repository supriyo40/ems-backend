import mongoose from "mongoose";
import taskSchema from "./tasks.model.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "username is required"],
    },
    firstName: String,
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "email is required"],
    },
    password:{
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee",
    },
    taskCounts: {
        newTask: {
            type: Number,
            default: 0,
        },
        activeTask: {
            type: Number,
            default: 0,
        },
        completedTask: {
            type: Number,
            default: 0,
        },
        failedTask: {
            type: Number,
            default: 0,
        },
    },
}, {
    timestamps: true,
})

userSchema.pre('save', function (next) {
    if (this.role === 'admin') {
      this.taskCounts = undefined; // Remove taskCounts for admins
    }
    next();
  });

const User = mongoose.model('user', userSchema);
export default User;
