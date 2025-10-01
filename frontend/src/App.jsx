import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"

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
import { Loading } from './components/Loading';
import { useEffect } from 'react';
import { fetchProfile } from './features/auth/authUserSlice';
import Journey from './pages/dashboard/home/Journey';
import Jackpot from './pages/dashboard/home/Jackpot';
import SpinLuck from './pages/dashboard/home/SpinLuck';
// import { fetchProfile } from './feature/auth/authSlice';
// import { useEffect } from 'react';





function App() {
  const dispatch = useDispatch();
  const { user, isInitialized, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading || !isInitialized) {
    return <Loading />;
  }

  return (
    <div className=''>
      <Routes>
        <Route path="/home/journey" element={<Journey/>}/>
        <Route path="/home/jackpot" element={<Jackpot/>}/>
        <Route path="/home/spinluck" element={<SpinLuck/>}/>
        
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/otp-verification" element={<OtpPage />} />

        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/explore" element={user ? <ExplorePage /> : <Navigate to="/login" />} />
        <Route path="/ticket" element={user ? <TicketPage /> : <Navigate to="/login" />} />
        <Route path="/contactus" element={user ? <ContactUsPage /> : <Navigate to="/login" />} />
        <Route path="/addtocart" element={user ? <AddToCartPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;


        // {/* 
        // <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} />
        // <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} /> */}