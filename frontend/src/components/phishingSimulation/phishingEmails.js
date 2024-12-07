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

    // PhishingSimulationPage.js
    const submitProgress = async (finalScore) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Starting submitProgress with score:', finalScore);
            console.log('Token:', token);

            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const payload = {
                activityType: 'phishingSimulation',
                score: Math.round((finalScore / phishingEmails.length) * 100)
            };
            console.log('Sending payload:', payload);

            const response = await axios.post('/progress', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response from server:', response.data);

            if (response.data.success) {
                alert(`Progress saved! Score: ${payload.score}%`);
            }
        } catch (error) {
            console.error('Error in submitProgress:', error.response || error);
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

    const handleNextEmail = () => {
        if (currentEmailIndex < phishingEmails.length - 1) {
            setCurrentEmailIndex(currentEmailIndex + 1);
            setFeedback(null);
        } else {
            console.log('Simulation complete, final score:', score); // Add this log
            setIsCompleted(true);
            submitProgress(score);
        }
    };

    return (
        <div className="phishing-simulation-container">
            <h2>Phishing Email Simulation</h2>
            <div className="email-display">
                <p><strong>Sender:</strong> {currentEmail.sender}</p>
                <p><strong>Subject:</strong> {currentEmail.subject}</p>
                <p><strong>Body:</strong> {currentEmail.body}</p>
            </div>
            <div className="actions">
                {!isCompleted && (
                    <>
                        <button onClick={() => handleAnswer(true)}>This is Phishing</button>
                        <button onClick={() => handleAnswer(false)}>This is Legitimate</button>
                    </>
                )}
            </div>

            {feedback && (
                <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                    <p>{feedback.isCorrect ? "Correct!" : "Incorrect."}</p>
                    <p>{feedback.explanation}</p>
                    <button onClick={handleNextEmail}>
                        {currentEmailIndex < phishingEmails.length - 1 ? 'Next Email' : 'Complete Simulation'}
                    </button>
                </div>
            )}

            <div className="score">
                <p>Current Score: {score}/{phishingEmails.length}</p>
            </div>
        </div>
    );
};

export default PhishingSimulationPage;
