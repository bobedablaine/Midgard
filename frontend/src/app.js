import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom"
import LoginPage from "./views/Login/LoginPage.js";
import ContentPage from "./views/Content/ContentPage.js";
import RegisterPage from './views/Register/RegisterPage.js';

// function App() {
    
//     return (
//         <>
//             {isLoggedIn ? (
//                 <ContentPage />
//             ) : (
//                 <LoginPage onLogin={handleLogin} />
//             )}
//         </>
//         // <BrowserRouter>
//         //     <Routes>
//         //         <Route path="/Login" element={<LoginPage />} />
//         //         <Route path="/Content" element={<ContentPage />} />
//         //     </Routes>
//         // </BrowserRouter>
//     );
// }
const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/content" element={<ContentPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
};

export default App;