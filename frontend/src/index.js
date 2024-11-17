import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';
import { BrowserRouter } from 'react-router-dom';
//import './index.css';
import ContentPage from './views/Content/ContentPage.js';
import LoginPage from './views/Login/LoginPage.js';

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     // This is a mock login function. You'd replace this with your actual logic.
//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     return (
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>
//     );
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>

);
