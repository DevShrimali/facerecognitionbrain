import React, { useState } from 'react';
import './Signin.css';

const Signin = ({ onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-header'>
          <div className='auth-icon'>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </div>
          <h2 className='auth-title'>Welcome back</h2>
          <p className='auth-subtitle'>Sign in to continue detecting faces</p>
        </div>

        <div className='auth-form'>
          <div className='input-group'>
            <label className='input-label' htmlFor='signin-email'>Email</label>
            <input
              className='input-field'
              type='email'
              id='signin-email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label className='input-label' htmlFor='signin-password'>Password</label>
            <input
              className='input-field'
              type='password'
              id='signin-password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className='auth-submit-btn'
            onClick={() => onRouteChange('home')}
          >
            Sign In
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        <div className='auth-footer'>
          <span className='auth-footer-text'>Don't have an account?</span>
          <button
            onClick={() => onRouteChange('register')}
            className='auth-footer-link'
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;