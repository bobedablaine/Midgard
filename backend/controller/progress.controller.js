import UserProgress from "../model/userProgress.js";
import jwt from 'jsonwebtoken';


export const updateProgress = async (req, res) => {
    try {
        // Get the authorization header
        const authHeader = req.headers.authorization;
        console.log('Received auth header:', authHeader); // Debug log

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('Missing or invalid auth header'); // Debug log
            return res.status(401).json({
                message: 'Authorization header missing or invalid'
            });
        }

        const token = authHeader.split(' ')[1];
        console.log('Extracted token:', token); // Debug log

        let decoded;
        try {
            // Make sure to use the same secret key as in login
            decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded token:', decoded); // Debug log
        } catch (jwtError) {
            console.error('Token verification failed:', jwtError);
            return res.status(401).json({
                message: 'Invalid token',
                error: jwtError.message
            });
        }

        const userId = decoded.userId;
        console.log('User ID from token:', userId); // Debug log

        let userProgressDoc = await UserProgress.findOne({ userId });
        if (!userProgressDoc) {
            userProgressDoc = new UserProgress({ userId });
        }

        const { activityType, score } = req.body;
        console.log('Received activity data:', { activityType, score }); // Debug log

        if (activityType) {
            const activityIndex = userProgressDoc.activities.findIndex(a => a.type === activityType);
            if (activityIndex >= 0) {
                userProgressDoc.activities[activityIndex] = {
                    type: activityType,
                    score,
                    completed: true,
                    completedAt: new Date()
                };
            } else {
                userProgressDoc.activities.push({
                    type: activityType,
                    score,
                    completed: true,
                    completedAt: new Date()
                });
            }
        }

        const newProgress = userProgressDoc.calculateProgress();
        await userProgressDoc.save();

        console.log('Saved progress document:', userProgressDoc); // Debug log

        res.json({
            success: true,
            progress: newProgress,
            message: 'Progress updated successfully'
        });
    } catch (error) {
        console.error('Progress update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating progress',
            error: error.message
        });
    }
};

export const getProgress = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from request
        console.log('Getting progress for userId:', userId);

        const userProgressDoc = await UserProgress.findOne({ userId });
        console.log('Found progress document:', userProgressDoc);

        if (!userProgressDoc) {
            return res.json({
                success: true,
                progress: 0,
                chapters: [],
                activities: []
            });
        }

        const currentProgress = userProgressDoc.calculateProgress();
        console.log('Calculated progress:', currentProgress);

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