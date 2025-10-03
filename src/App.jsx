// src/App.jsx
import React from 'react';
import { LoginForm } from './components/LoginForm';
import MainDashboard from './components/MainDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ExploreNow from './pages/Explorenow.jsx'; // New import
import Tickets from './pages/tickets';
import ContactUs from './pages/Contactus.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Howtoplay from './pages/Howtoplay.jsx';
import Faqs from './pages/Faqs.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import Support from './pages/Support.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

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
                <Route path="/" element={<Home/>} />

                <Route path="/explore" element={<ExploreNow />} />
                <Route path="/Tickets" element={<Tickets />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Howtoplay" element={<Howtoplay />} />
                <Route path="/Faqs" element={<Faqs />} />
                <Route path="/TermsConditions" element={<TermsConditions />} />
                <Route path="/Support" element={<Support />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </DataProvider>
  );
}

export default App;
