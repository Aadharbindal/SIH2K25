import React, { useState } from 'react';
import './LoginPage.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // const [userRole, setUserRole] = useState(''); // Removed
  // const [mineLocation, setMineLocation] = useState(''); // Removed
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({}), // No body needed for login, backend verifies token
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess();
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError('Firebase authentication error. Please try again.');
      }
    }
  };

  // const handleGetLocation = () => { // Removed
  //   setMineLocation('Jharia Coalfield, Section A');
  // };

  return (
    <div className="login-page-overlay">
      <div className="login-page-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className='header'>
        <div className="logo-graphic">
            <div className="mountain"></div>
            <div className="letter-r">M</div> {/* Re-added the letter-r div */}
            <div className="signal"></div>
            <div className="hexagons">
              <div className="hexagon"></div>
              <div className="hexagon small"></div>
              <div className="hexagon"></div>
              <div className="hexagon small"></div>
            </div>
          </div>
        <div className="app-brand">
          <h1>MineSafe</h1>
          <p>AI & Geo-Data Platform</p>
        </div>
        </div>
        <h2></h2> {/* Empty h2 as per image, for spacing or potential future use */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="options-row">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-submit-button">Log in</button>
        </form>
        <p className="signup-text">Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
