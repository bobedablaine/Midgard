import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar.js';
import "./tools-style.css"

const ToolsPage = () => {
    return (
        <>
            <NavBar />
            <div className="tool-container">
                <h1 className="tool-title">Security Tools</h1>
                <div className="tool-list">
                    <div className="tool-item">
                        <Link to="/tools/url-scanner">
                            <img src="/scanner2.jpg" className="homePicture" alt="Textbook" />
                        </Link>
                        <h2>URL Scanner</h2>
                        <p>Check URLs for potential security threats using VirusTotal and Google Safe Browsing APIs.</p>
                    </div>
                    <div className="tool-item">
                        <Link to="/tools/password-generator">
                            <img src="/password-generator2.jpg" className="homePicture" alt="Textbook" />
                        </Link>
                        <h2>Password Generator</h2> 
                        <p>A tool that creates strong, random passwords to enhance your online security.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToolsPage;