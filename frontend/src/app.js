import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import LoginPage from "./views/Login/LoginPage.js";
import ContentPage from "./views/Content/ContentPage.js";
import RegisterPage from './views/Register/RegisterPage.js';
import HomePage from './views/Home/HomePage.js';
import SettingsPage from './views/Settings/SettingsPage.js';

const App = () => {

    //still lacking logic to stop from navigating straigh to content through search bar without being logged in
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/content" element={<ContentPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </>
    );
};

export default App;