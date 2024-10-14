import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Mock login function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const response = await axios.post('http://localhost:3001/user/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            onLogin();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setLoginError('Invalid login credentials');
                } else {
                    setLoginError('An error occurred. Please try again later.');
                }
            } else if (error.request) {
                setLoginError('No response from server. Please try again later.');
            } else {
                setLoginError('An error occurred. Please try again later.');
            }
        }
/*
        if (email === 'mpinzon@csu.fullerton.edu' && password === 'test') {
            onLogin();
        } else {
            setLoginError('Invalid login credentials');
        }
*/
    };


    return (
        <div id="home" className="homeDiv">
            <video autoPlay muted loop id="backgroundVideo">
                <source
                    src="https://res.cloudinary.com/hcv8opupx/video/upload/v1723243584/AdobeStock_570132261_s39xqq.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div className="overlay-content"></div>
            <nav>
                <img src="/image_2024-10-06_115327155-removebg-preview.png" className="logo" alt="Logo" />
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <div className="content">
                <div className="leftSide">
                    <div className="formContainer">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="User ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="checkbox-group">
                                <input type="checkbox" id="saveUserId" />
                                <label htmlFor="saveUserId">Save User ID</label>
                            </div>
                            <button type="submit" className="login-button">Log In</button>
                            {loginError && <p className="error">{loginError}</p>}
                            <div className="link-group">
                                <a href="#">Forgot ID/Password?</a>
                                <a href="#">Security & Help</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="infoSide">
                    <h1>Midgard</h1>
                    <p className="par">Your center of learning.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
