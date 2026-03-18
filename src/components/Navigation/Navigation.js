import React from 'react';
import './Navigation.css';

const Navigation = ({ modelsLoaded }) => {
  return (
    <nav className='nav'>
      <div className='nav-inner'>
        <div className='nav-left'>
          <div className='nav-brand'>
            <div className='nav-icon'>🧠</div>
            <span className='nav-name'>SmartBrain</span>
          </div>
          <div className='nav-divider'></div>
          <span className='nav-page'>Workspace</span>
        </div>
        <div className='nav-right'>
          <div className={`nav-status ${modelsLoaded ? 'nav-status-ready' : ''}`}>
            <span className='nav-status-dot'></span>
            <span className='nav-status-text'>{modelsLoaded ? 'Models Ready' : 'Loading...'}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;