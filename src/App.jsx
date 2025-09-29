import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Sensors from './components/Sensors';
import SensoringPage from './components/SensoringPage';
import AlertsPage from './components/AlertsPage';
import LoginPage from './components/LoginPage'; // Import LoginPage
import SignupPage from './components/SignupPage'; // Import SignupPage
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import PredictionPage from './components/PredictionPage';
import AlertDetailsPage from './components/AlertDetailsPage'; // Import new component

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
  const [showLoginPage, setShowLoginPage] = useState(false); // Add showLoginPage state
  const [showSignupPage, setShowSignupPage] = useState(false); // Add showSignupPage state

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginClick = () => {
    setShowLoginPage(true);
    setShowSignupPage(false); // Close signup page if open
  };

  const handleSignupClick = () => {
    setShowSignupPage(true);
    setShowLoginPage(false); // Close login page if open
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginPage(false);
    // navigate('/prediction'); // Removed automatic navigation to prediction
  };

  const handleSignupSuccess = () => {
    setIsLoggedIn(true); // User is logged in after successful signup
    setShowSignupPage(false);
    setShowLoginPage(false); // Ensure login page is closed as well
    // navigate('/prediction'); // Removed automatic navigation to prediction
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setShowLoginPage(false);
      setShowSignupPage(false);
      // Hide dropdown and remove blur
      // Option 1: Use a callback or state lift, but for now, trigger a custom event
      const event = new CustomEvent('closeDashboardDropdown');
      window.dispatchEvent(event);
      console.log("User logged out successfully.");
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCloseLoginPage = () => {
    setShowLoginPage(false);
  };

  const handleCloseSignupPage = () => {
    setShowSignupPage(false);
  };

  return (
    <div className="app-container">
      <div className={`app-content-wrapper ${(showLoginPage || showSignupPage) ? 'blurred-and-disabled' : ''}`}> {/* Apply blur to wrapper */}
        <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />
        </div>
        <div className={`main-content-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} handleSignupClick={handleSignupClick} handleLogout={handleLogout} />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/sensors/:id" element={<Sensors />} />
            <Route path="/Sensoring" element={<SensoringPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/alerts/:id" element={<AlertDetailsPage />} /> {/* New route for alert details */}
            <Route path="/prediction" element={isLoggedIn ? <PredictionPage /> : <Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      {showLoginPage && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onClose={handleCloseLoginPage}
        />
      )}
      {showSignupPage && (
        <SignupPage
          onSignupSuccess={handleSignupSuccess}
          onClose={handleCloseSignupPage}
        />
      )}
    </div>
  );
}

export default App;
