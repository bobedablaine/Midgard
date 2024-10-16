import React, { useState } from 'react';
import phishingEmails from './PhishingData';
import './styles.css';

const PhishingSimulationPage = () => {
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const currentEmail = phishingEmails[currentEmailIndex];

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
            alert(`Simulation complete! Your final score: ${score}/${phishingEmails.length}`);
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
    <button onClick={() => handleAnswer(true)}>This is Phishing</button>
    <button onClick={() => handleAnswer(false)}>This is Legitimate</button>
    </div>

    {feedback && (
        <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
        <p>{feedback.isCorrect ? "Correct!" : "Incorrect."}</p>
        <p>{feedback.explanation}</p>
        <button onClick={handleNextEmail}>Next Email</button>
    </div>
    )}

    <div className="score">
        <p>Current Score: {score}/{phishingEmails.length}</p>
    </div>
    </div>
);
};

export default PhishingSimulationPage;
