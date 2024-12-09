import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield } from "lucide-react";

const URLScannerPage = () => {
    const [url, setUrl] = useState('');
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        setScanning(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            console.log('Starting :', token);

            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
            const response = await fetch('http://localhost:3001/security/scan-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Failed to scan URL: ' + err.message);
        } finally {
            setScanning(false);
        }
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
            {/* Back to Tools Button */}
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

            {/* Main Content Card */}
            <div style={{
                width: '800px',
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: "black"
            }}>
                <h2 style={{
                    color: 'black',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    Check any URL for potential security threats before visiting.
                </h2>

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL to scan (e.g., https://example.com)"
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            color: 'black'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={scanning}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: scanning ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {scanning ? 'Scanning...' : 'Scan URL'}
                    </button>
                </form>

                {error && (
                    <div style={{
                        color: 'red',
                        padding: '10px',
                        marginBottom: '20px',
                        border: '1px solid red',
                        borderRadius: '5px'
                    }}>
                        {error}
                    </div>
                )}

                {results && results.virusTotal && (
                    <div style={{ marginTop: '20px' }}>
                        <h2 style={{ marginBottom: '16px' }}>Scan Results</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{
                                padding: '16px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}>
                                <h3 style={{ marginBottom: '8px' }}>VirusTotal Scan</h3>
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    backgroundColor: results.virusTotal.status === 'clean' ? '#E8F5E9' : '#FFE8E8',
                                    color: results.virusTotal.status === 'clean' ? '#2E7D32' : '#D63939'
                                }}>
                                    {results.virusTotal.status}
                                </span>
                                <p style={{ marginTop: '8px', color: '#666' }}>
                                    Detection Ratio: {results.virusTotal.detectRatio}
                                </p>
                            </div>
                        </div>
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
                                    Phishing attempts to steal personal information
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <AlertTriangle size={16} color="#FFB020" />
                                    Malware downloads that can infect your device
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <AlertTriangle size={16} color="#FFB020" />
                                    Scam websites that attempt to defraud users
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '12px' }}>Best Practices</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="#2E7D32" />
                                    Always verify URLs before clicking
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="#2E7D32" />
                                    Check for HTTPS and valid certificates
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="#2E7D32" />
                                    Be wary of shortened URLs and redirects
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default URLScannerPage;