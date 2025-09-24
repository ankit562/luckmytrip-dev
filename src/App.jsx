// src/App.jsx
import React from 'react';
import { LoginForm } from './components/LoginForm';
import MainDashboard from './components/MainDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  return (
      <MainDashboard />
  );
}

function App() {
  return (
        <DataProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<AppContent />} />
                <Route path="/home" element={<Home/>} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </DataProvider>
  );
}

export default App;
