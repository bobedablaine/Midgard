import express from "express"
import { mongoose } from "mongoose"
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import cors from "cors";
import UserProgress from "./model/userProgress.js";
import User from "./model/user.js";
import openaiRoute from './routes/openai.route.js';

dotenv.config();

const app = express();

// Add more specific CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));

const PORT = 3001;

app.use(express.json());

app.use("/openai", openaiRoute);


// Add a test route
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

app.use("/user", userRoute);

const mongoConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://tvuser:sO1XLuLvX9ogZ01z@testcluster0.p9xa7.mongodb.net/");
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Test the server by visiting http://localhost:${PORT}/test`);
        });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};
app.get('/test-progress', async (req, res) => {
    try {
        const users = await User.find({});
        const progress = await UserProgress.find({});
        res.json({
            users: users.map(u => ({ id: u._id, username: u.username })),
            progress: progress
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add these test routes
userRoute.get("/test-progress", async (req, res) => {
    try {
        const progress = await UserProgress.find({});
        console.log('All progress records:', progress);
        res.json(progress);
    } catch (error) {
        console.error('Test progress error:', error);
        res.status(500).json({ error: error.message });
    }
});

userRoute.post("/test-progress", async (req, res) => {
    try {
        // Create a valid ObjectId
        const testUserId = '673e6e1cb8fa14217736f68f';

        const testProgress = new UserProgress({
            userId: testUserId, // Using valid ObjectId now
            activities: [{
                type: 'phishingSimulation',
                score: 80,
                completed: true,
                completedAt: new Date()
            }]
        });
        await testProgress.save();
        res.json({ message: 'Test progress saved', progress: testProgress });
    } catch (error) {
        console.error('Test save error:', error);
        res.status(500).json({ error: error.message });
    }
});

mongoConnect();