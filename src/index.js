import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import '../node_modules/react-bootstrap/dist/react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import AuthContextProvider from './Store/AuthContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthContextProvider>
        <BrowserRouter>
            <App />
            </BrowserRouter>
    </AuthContextProvider>
);