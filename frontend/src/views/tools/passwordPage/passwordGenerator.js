import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Shield } from "lucide-react";

const PasswordGeneratorPage = () => {
    const [password, setPassword] = useState("");

    const generatePassword = (length = 12) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let newPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newPassword += characters[randomIndex];
        }
        setPassword(newPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert("Password copied to clipboard!");
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'black',
            padding: '20px'
        }}>
            <Link
                    to="/tools"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        padding: '10px 20px',
                        backgroundColor: '#333',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        width: '800px'
                    }}
                >
                    ← Back to Tools
                </Link>
            <div style={{ marginTop: "40px", padding: "20px", borderRadius: "8px", width: "700px", height: "400px", margin: "0 auto", textAlign: "center", backgroundColor: "white", color: "black"}}>
                <h2>Password Generator</h2>
                <button onClick={() => generatePassword(12)} style={{ margin: "10px" }}>
                    Generate Password
                </button>
                {(
                    <div>
                        <p>
                            <strong>Your Password:</strong> {password}
                        </p>
                        <button onClick={copyToClipboard}>Copy Password</button>
                    </div>
                )}
            <div style={{ marginTop: '40px' }}>
                    <h2 style={{ marginBottom: '16px' }}>Security Information</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <h3 style={{ marginBottom: '12px' }}>Common Threats</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <AlertTriangle size={16} color="#FFB020" />
                                    Simple passwords are vulnerable to brute force and dictionary attacks
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <AlertTriangle size={16} color="#FFB020" />
                                    Reusing passwords lets breaches compromise multiple accounts
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <AlertTriangle size={16} color="#FFB020" />
                                    Phishing or insecure storage exposes passwords to attackers
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '12px' }}>Best Practices</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="#2E7D32" />
                                    Use complex passwords with a mix of characters, numbers, and symbols
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="#2E7D32" />
                                    Create unique passwords for every account to prevent credential reuse
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="#2E7D32" />
                                    Use a Password Manager to store and generate strong, unique passwords easily
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        
    );
};

export default PasswordGeneratorPage;