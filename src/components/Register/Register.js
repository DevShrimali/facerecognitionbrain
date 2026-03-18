import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRouteChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-header'>
          <div className='auth-icon'>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <h2 className='auth-title'>Create account</h2>
          <p className='auth-subtitle'>Get started with face detection for free</p>
        </div>

        <div className='auth-form'>
          <div className='input-group'>
            <label className='input-label' htmlFor='register-name'>Name</label>
            <input
              className='input-field'
              type='text'
              id='register-name'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label className='input-label' htmlFor='register-email'>Email</label>
            <input
              className='input-field'
              type='email'
              id='register-email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label className='input-label' htmlFor='register-password'>Password</label>
            <input
              className='input-field'
              type='password'
              id='register-password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className='auth-submit-btn'
            onClick={() => onRouteChange('home')}
          >
            Create Account
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        <div className='auth-footer'>
          <span className='auth-footer-text'>Already have an account?</span>
          <button
            onClick={() => onRouteChange('signin')}
            className='auth-footer-link'
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;