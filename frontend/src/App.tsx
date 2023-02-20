import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Toast } from './components';
import { AllRoutes } from './router';
import { AuthProvider } from './store/providers/AuthProvider';
import { ToastProvider } from './store/providers/ToastProvider';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Toast />
            <AllRoutes />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
