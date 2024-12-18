import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();


const SECRET_KEY = process.env.SECRET_KEY;

router.get("/allemployee", async (req, res) => {
    const users = await User.find({ role: "employee" }).select("username");
    res.status(200).json({ users });
})

router.post("/register", async (req, res) => {
    const { username, firstName, email, password, role } = req.body;
    
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        user = new User({ username, firstName, email, password, role });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "24h" });
        res.status(201).json({ message: "User registered successfully!", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get('/userdetails/:userId', async(req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "24h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully!" });
});

export default router;
