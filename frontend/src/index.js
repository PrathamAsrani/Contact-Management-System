import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext.js';
import { PageProvider } from './context/pageContext.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthProvider>
            <PageProvider>
                <App />
                <ToastContainer />
            </PageProvider>
        </AuthProvider>
    </>
);