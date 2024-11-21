import app from "./app.js";
import connectDB from "./db/index.db.js";

const startServer = async () => {
        await connectDB();
        console.log("Database connected successfully");

        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Backend is up and running on port ${PORT}`);
        });
    
};

// Initialize server
startServer();
