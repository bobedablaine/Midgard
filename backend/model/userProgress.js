// model/userProgress.js
import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chaptersProgress: [{
        chapterIndex: Number,
        subsectionIndex: Number,
        completed: Boolean,
        score: Number,
        completedAt: Date
    }],
    activities: [{
        type: {
            type: String,
            enum: ['phishingSimulation', 'passwordTester', 'quiz'],
            required: true
        },
        score: Number,
        completed: Boolean,
        completedAt: Date
    }],
    overallProgress: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Add the method to the schema before creating the model
userProgressSchema.methods.calculateProgress = function() {
    // Initialize arrays if they don't exist
    this.chaptersProgress = this.chaptersProgress || [];
    this.activities = this.activities || [];

    const totalChapters = 4; // Total number of chapters
    const totalActivities = 2; // Total number of activities

    // Count completed items
    const completedChapters = Array.isArray(this.chaptersProgress)
        ? this.chaptersProgress.filter(cp => cp && cp.completed).length
        : 0;

    const completedActivities = Array.isArray(this.activities)
        ? this.activities.filter(a => a && a.completed).length
        : 0;

    const totalItems = totalChapters + totalActivities;
    const completedItems = completedChapters + completedActivities;

    this.overallProgress = Math.round((completedItems / totalItems) * 100);
    return this.overallProgress;
};

// Create and export the model
const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;