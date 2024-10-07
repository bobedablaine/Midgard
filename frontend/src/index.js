import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import ContentPage from './views/Content/ContentPage.js';
import LoginPage from './views/Login/LoginPage.js';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // This is a mock login function. You'd replace this with your actual logic.
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <React.StrictMode>
            {isLoggedIn ? (
                <ContentPage />
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
