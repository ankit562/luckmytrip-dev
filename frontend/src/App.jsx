import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import TicketPage from './pages/TicketPage';
import ContactUsPage from './pages/ContactUsPage';
import AddToCartPage from './pages/AddToCartPage';
import Dashboard from './pages/dashboard/DashboardPage';
import OtpPage from './pages/OtpPage';
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verification" element={<OtpPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/addtocart" element={<AddToCartPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
