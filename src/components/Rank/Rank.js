import React from 'react';
import './Rank.css';

const Rank = () => {
  return (
    <div className='rank-container'>
      <p className='rank-greeting'>Hey Dev, your current entry count is...</p>
      <div className='rank-badge'>
        <span className='rank-number'>#5</span>
      </div>
    </div>
  );
};

export default Rank;