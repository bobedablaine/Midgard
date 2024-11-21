import React, { useState } from 'react';
import './styles.css'; // Add styling if needed

const PasswordStrengthTester = () => {
    const [password, setPassword] = useState('');
    const [strengthMessage, setStrengthMessage] = useState('');

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

        // Set feedback message
        setStrengthMessage(messages[strength] || "Very Weak");
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        evaluateStrength(pwd);
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
        </div>
    );
};

export default PasswordStrengthTester;
