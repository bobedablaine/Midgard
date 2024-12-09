import express from "express"
import { mongoose } from "mongoose"
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import cors from "cors";
import UserProgress from "./model/userProgress.js";
import User from "./model/user.js";
import openaiRoute from './routes/openai.route.js';
import progressRoute from './routes/progress.route.js';
import securityRoute from './routes/url.scanner.js';



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


// Add these test routes

app.use("/progress", progressRoute);

app.use('/security', securityRoute);


mongoConnect();