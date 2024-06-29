import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { QnaContextProvider } from './context/QnaContext';
import { CommentsContextProvider } from './context/CommentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QnaContextProvider>
        <CommentsContextProvider>
          <App />
        </CommentsContextProvider>
      </QnaContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);