import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import '../node_modules/react-bootstrap/dist/react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import {Provider} from 'react-redux'
import store from './ReduxStore/RtkStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            </BrowserRouter>
    </Provider>
);