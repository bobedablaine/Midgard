// PhishingSimulationPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const PasswordStrengthTester = () => {
    const [password, setPassword] = useState('');
    const [strengthMessage, setStrengthMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const evaluateStrength = (pwd) => {
        let strength = 0;
        const messages = [
            "Very Weak: Try adding more characters.",
            "Weak: Add numbers or symbols.",
            "Moderate: Use upper and lowercase letters, numbers, and symbols.",
            "Strong: Good job! Try making it longer for extra security.",
            "Very Strong: Your password is excellent!"
        ];

        // Check password criteria
        if (pwd.length >= 8) strength += 1;
        if (/[A-Z]/.test(pwd)) strength += 1;
        if (/[a-z]/.test(pwd)) strength += 1;
        if (/[0-9]/.test(pwd)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;

        // Update best score if current strength is higher
        if (strength > bestScore) {
            setBestScore(strength);
        }

        // Set feedback message
        setStrengthMessage(messages[strength] || "Very Weak");

        // Track attempt
        setAttempts(attempts + 1);

        // Consider activity completed after 3 attempts or reaching max strength
        if (attempts >= 2 || strength === 4) {
            submitProgress(strength);
            setIsCompleted(true);
        }
    };

    const submitProgress = async (strengthScore) => {
        try {
            const userId = localStorage.getItem('userId'); // Get userId from your auth system
            const response = await axios.post('/api/users/progress', {
                userId,
                activityType: 'passwordTester',
                score: Math.round((strengthScore / 4) * 100)
            });

            if (response.data.success) {
                console.log('Progress updated successfully');
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        if (!isCompleted) {
            evaluateStrength(pwd);
        }
    };

    return (
        <div className="password-strength-tester">
            <h2>Password Strength Tester</h2>
            <input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={handlePasswordChange}
            />
            <p>Password Strength: <strong>{strengthMessage}</strong></p>
            {isCompleted && (
                <p>Activity completed! Best strength achieved: {bestScore}/4</p>
            )}
            <p>Attempts: {attempts}/3</p>
        </div>
    );
};

export default PasswordStrengthTester;
