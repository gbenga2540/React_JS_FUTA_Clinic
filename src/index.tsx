import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './Fonts/Fonts.scss';
import App from './App/App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <>
        <App />
        <ToastContainer />
    </>,
);
