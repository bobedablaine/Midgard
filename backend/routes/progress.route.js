// Create a new file: progress.route.js
import { Router } from "express";
import jwt from 'jsonwebtoken';
import UserProgress from "../model/userProgress.js";

const progressRoute = Router();

const getProgressByToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('Received auth header:', authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authorization header missing or invalid'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;

        console.log('Looking up progress for userId:', userId);
        const userProgressDoc = await UserProgress.findOne({ userId });

        if (!userProgressDoc) {
            return res.json({
                success: true,
                progress: 0,
                chapters: [],
                activities: []
            });
        }

        const currentProgress = userProgressDoc.calculateProgress();

        res.json({
            success: true,
            progress: currentProgress,
            chapters: userProgressDoc.chaptersProgress,
            activities: userProgressDoc.activities
        });
    } catch (error) {
        console.error('Progress retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching progress',
            error: error.message
        });
    }
};

progressRoute.get("/user-progress", getProgressByToken);

export default progressRoute;