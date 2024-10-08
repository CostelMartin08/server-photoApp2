import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesMessage } from './components/CookiesMessage';
import Card from './components/Card';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <CookiesMessage />
    <App />
  </React.StrictMode>

);



