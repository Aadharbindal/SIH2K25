import React, { useEffect, useState } from 'react';
import Map from './Map';
import GroundVibrationChart from './GroundVibrationChart';
import RecentAlerts from './RecentAlerts';
import QuickStatistics from './QuickStatistics';
import StatusCardsContainer from './StatusCardsContainer';
import IndiaRiskMap from './IndiaRiskMap';
import RiskDistributionChart from './RiskDistributionChart';
import GroundVibrationDetailPage from './GroundVibrationDetailPage'; // Import the new detail page
// import LoginPage from './LoginPage'; // Removed as LoginPage is now in App.jsx
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ isLoggedIn, handleLoginClick, handleSignupClick, handleLogout }) => {
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showGroundVibrationDetail, setShowGroundVibrationDetail] = useState(false); // New state for detail page

  useEffect(() => {
    const closeDropdown = () => setShowNotificationsDropdown(false);
    window.addEventListener('closeDashboardDropdown', closeDropdown);
    return () => window.removeEventListener('closeDashboardDropdown', closeDropdown);
  }, []);

  const toggleNotificationsDropdown = () => {
    setShowNotificationsDropdown(prevState => !prevState);
  };

  const handleGroundVibrationClick = () => {
    setShowGroundVibrationDetail(true);
  };

  const handleBackToDashboard = () => {
    setShowGroundVibrationDetail(false);
  };

  // const handleLoginClick = () => { // Removed
  //   setShowLoginPage(true);
  // };

  // const handleLoginSuccess = () => { // Removed
  //   setIsLoggedIn(true);
  //   setShowLoginPage(false);
  // };

  // const handleCloseLoginPage = () => { // Removed
  //   setShowLoginPage(false);
  // };

  return (
    <div className="dashboard"> {/* Remove conditional blur from here */}
      <header className="dashboard-header">
        <div className="dashboard-title-container">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <div className="auth-container">
          {isLoggedIn ? (
            <div className="user-profile-container">
              <div className="user-icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </div>
              <div className="notification-arrow" onClick={toggleNotificationsDropdown}>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              {showNotificationsDropdown && (
                <div className={`notification-dropdown ${showNotificationsDropdown ? 'show' : ''}`}> {/* Apply 'show' class conditionally */}
                  <div className="dropdown-item">Notifications</div>
                  <div className="dropdown-item" onClick={handleLogout}>Sign-out</div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="signup-button" onClick={handleSignupClick}>Sign Up</button>
              {/* <span className="auth-separator">/</span> */}
              <button className="login-button" onClick={handleLoginClick}>Login</button>
            </>
          )}
        </div>
      </header>
      {showGroundVibrationDetail ? (
        <GroundVibrationDetailPage onBackToDashboard={handleBackToDashboard} />
      ) : (
        <div className={`dashboard-content-wrapper ${showNotificationsDropdown ? 'blurred-background' : ''}`}> {/* New wrapper for content to apply blur */}
          <div className="dashboard-content"> 
            <StatusCardsContainer />
            <div className="main-dashboard-grid">
              <div className="map-and-legend">
                <IndiaRiskMap />
              </div>
              <div className="right-panel">
                <div className="risk-distribution-section">
                  {/* Risk Distribution Chart Placeholder */}
                  <RiskDistributionChart />
                </div>
              </div>
            </div>
            <div className="bottom-row-sections">
              <div className="ground-vibration-chart-section" onClick={handleGroundVibrationClick}>
                <GroundVibrationChart />
              </div>
              <div className="recent-alerts-section">
                <RecentAlerts />
              </div>
              <div className="quick-statistics-section">
                <QuickStatistics />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* showLoginPage conditional rendering removed, LoginPage now in App.jsx */}
    </div>
  );
};

export default Dashboard;
