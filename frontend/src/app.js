import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios';
import LoginPage from "./views/Login/LoginPage.js";
import ContentPage from "./views/Content/ContentPage.js";
import RegisterPage from './views/Register/RegisterPage.js';
import HomePage from './views/Home/HomePage.js';
import SettingsPage from './views/Settings/SettingsPage.js';

const App = () => {
    const [isAuthenticated, setAuthentication] = useState(false);
    const [user, setUser] = useState(null);

    async function fetchData(token) {
        if (token) {
            //if token exists, send user to content
            const response = await axios.get('http://localhost:3001/user/profile', {
                headers: {
                    Authorization: token,
                },
            })
            console.log("response: " + response.userData) //STOPPED HERE WILL PICK BACK UP
            setAuthentication(true)
        } else {
            setAuthentication(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        fetchData(token)
        
    }, []);

    
    
    //still lacking logic to stop from navigating straigh to content through search bar without being logged in
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/content" /> : <LoginPage />} />
                    <Route path="/content" element={isAuthenticated ? <ContentPage /> : <Navigate to="/login" />}/>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    {/* Default route that redirects to Dashboard or Login based on authentication */}
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;