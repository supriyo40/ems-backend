import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/index.route.js";
import taskRouter from "./routes/task.route.js";
import statusRouter from "./routes/status.route.js";

dotenv.config({
    path: "./.env", // Ensure the path is correct or omit if the file is in the root directory
});

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS setup
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

// Routes
app.get('/', (req, res) => {
    res.send('<h1>yo</h1>');
});


app.use('/api', userRouter);
app.use('/api', taskRouter);
app.use('/api',statusRouter);
export default app;
