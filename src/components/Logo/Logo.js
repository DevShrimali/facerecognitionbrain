import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './Brain.png';

const Logo = () => {
  return (
    <div className='logo-container'>
      <Tilt
        className="logo-tilt"
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#8b5cf6"
        glarePosition="all"
        scale={1.05}
      >
        <div className="logo-inner">
          <img className='logo-img' alt='brain logo' src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;