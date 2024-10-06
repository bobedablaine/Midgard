import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './app.js';
import ContentPage from './views/Content/ContentPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContentPage />
  </React.StrictMode>
);
