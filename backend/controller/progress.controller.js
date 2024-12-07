import UserProgress from "../model/userProgress.js";
import jwt from 'jsonwebtoken';

export const updateProgress = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authorization header missing or invalid'
            });
        }

        const token = authHeader.slice(7);
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token in progress controller:', decoded);
        } catch (jwtError) {
            console.error('Token verification failed:', jwtError);
            return res.status(401).json({
                message: 'Invalid token',
                error: jwtError.message
            });
        }

        const userId = decoded.userId;
        if (!userId) {
            return res.status(400).json({
                message: 'User ID not found in token'
            });
        }

        let userProgressDoc = await UserProgress.findOne({ userId });
        if (!userProgressDoc) {
            userProgressDoc = new UserProgress({ userId });
        }

        if (!userProgressDoc) {
            console.log('Creating new progress doc for userId:', userId);
            userProgressDoc = new UserProgress({ userId });
        }

        const { activityType, score } = req.body;

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

        userProgressDoc.calculateProgress();
        await userProgressDoc.save();

        console.log('Updated progress:', userProgressDoc);
        res.json({
            success: true,
            progress: userProgressDoc.overallProgress,
            message: 'Progress updated successfully'
        });
        // Calculate and save the new progress
        const newProgress = userProgressDoc.calculateProgress();
        console.log('New calculated progress:', newProgress);

        await userProgressDoc.save();

        res.json({
            success: true,
            progress: userProgressDoc.overallProgress,
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
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const userProgressDoc = await UserProgress.findOne({ userId });

        if (!userProgressDoc) {
            return res.json({
                success: true,
                progress: 0,
                chapters: [],
                activities: []
            });
        }

        res.json({
            success: true,
            progress: userProgressDoc.overallProgress,
            chapters: userProgressDoc.chaptersProgress,
            activities: userProgressDoc.activities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching progress',
            error: error.message
        });
    }
};