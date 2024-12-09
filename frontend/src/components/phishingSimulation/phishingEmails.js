// PhishingSimulationPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import phishingEmails from './PhishingData.js';
import './styles.css';

const PhishingSimulationPage = () => {
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const currentEmail = phishingEmails[currentEmailIndex];

    const submitProgress = async (finalScore) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Starting submitProgress with score:', finalScore);

            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const payload = {
                activityType: 'phishingSimulation',
                score: Math.round((finalScore / phishingEmails.length) * 100)
            };
            console.log('Sending payload:', payload);

            // Update the axios request to use the full URL and proper configuration
            const response = await axios.post(
                'http://localhost:3001/user/progress',  // Full URL
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response from server:', response.data);

            if (response.data.success) {
                alert(`Progress saved! Score: ${payload.score}%`);
            } else {
                console.error('Progress update failed:', response.data);
                alert('Failed to save progress. Please try again.');
            }
        } catch (error) {
            console.error('Error in submitProgress:', error.response || error);
            console.log('Full error object:', error);
            alert('Error saving progress. Check console for details.');
        }
    };

    const handleAnswer = (isPhishing) => {
        const isCorrect = isPhishing === currentEmail.isPhishing;
        setFeedback({
            isCorrect,
            explanation: currentEmail.explanation,
        });

        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNextEmail = async () => {
        if (currentEmailIndex < phishingEmails.length - 1) {
            setCurrentEmailIndex(currentEmailIndex + 1);
            setFeedback(null);
        } else {
            setIsCompleted(true);
            console.log('Simulation complete, final score:', score);
            await submitProgress(score);
        }
    };

    return (
        <div className="phishing-simulation-container">
            <h2 style={{ color: "black" }}>Phishing Email Simulation</h2>
            <div className="email-display">
                <p><strong>Sender:</strong> {currentEmail.sender}</p>
                <p><strong>Subject:</strong> {currentEmail.subject}</p>
                <p><strong>Body:</strong> {currentEmail.body}</p>
            </div>
            <div className="actions">
                {!feedback && !isCompleted && (
                    <>
                        <button onClick={() => handleAnswer(true)}>This is Phishing</button>
                        <button onClick={() => handleAnswer(false)}>This is Legitimate</button>
                    </>
                )}
            </div>

            {feedback && !isCompleted && (
                <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                    <p>{feedback.isCorrect ? "Correct!" : "Incorrect."}</p>
                    <p>{feedback.explanation}</p>
                    <button onClick={handleNextEmail}>
                        {currentEmailIndex < phishingEmails.length - 1 ? 'Next Email' : 'Complete Simulation'}
                    </button>
                </div>
            )}

            {isCompleted && (
                <div className="completion-message">
                    <h3>Simulation Completed!</h3>
                    <p>Final Score: {Math.round((score / phishingEmails.length) * 100)}%</p>
                </div>
            )}

            <div className="score">
                <p>Current Score: {score}/{phishingEmails.length}</p>
            </div>
        </div>
    );
};

export default PhishingSimulationPage;