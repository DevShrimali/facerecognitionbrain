import React from 'react';
import './AnalysisPanel.css';

const expressionEmoji = {
  happy: '😊', sad: '😢', angry: '😠', fearful: '😨',
  disgusted: '🤢', surprised: '😮', neutral: '😐'
};

const AnalysisPanel = ({ detections }) => {
  return (
    <div className='ap-container'>
      <div className='ap-header'>
        <h3 className='ap-title'>Analysis Results</h3>
        <span className='ap-count'>{detections.length} face{detections.length > 1 ? 's' : ''}</span>
      </div>

      <div className='ap-faces'>
        {detections.map((face) => (
          <div key={face.id} className='ap-face-card'>
            <div className='ap-face-header'>
              <div className='ap-face-avatar'>
                {expressionEmoji[face.expression] || '😐'}
              </div>
              <div className='ap-face-meta'>
                <span className='ap-face-name'>Face #{face.id}</span>
                <span className='ap-face-conf'>{face.confidence}% confidence</span>
              </div>
            </div>

            <div className='ap-stats'>
              <div className='ap-stat'>
                <div className='ap-stat-header'>
                  <span className='ap-stat-label'>Age</span>
                  <span className='ap-stat-value'>~{face.age} yrs</span>
                </div>
                <div className='ap-stat-bar'>
                  <div className='ap-stat-fill ap-fill-age' style={{ width: `${Math.min(face.age, 80) / 80 * 100}%` }}></div>
                </div>
              </div>

              <div className='ap-stat'>
                <div className='ap-stat-header'>
                  <span className='ap-stat-label'>Gender</span>
                  <span className='ap-stat-value'>{face.gender}</span>
                </div>
                <div className='ap-stat-bar'>
                  <div className='ap-stat-fill ap-fill-gender' style={{ width: `${face.genderProbability}%` }}></div>
                </div>
                <span className='ap-stat-percent'>{face.genderProbability}%</span>
              </div>

              <div className='ap-stat'>
                <div className='ap-stat-header'>
                  <span className='ap-stat-label'>Expression</span>
                  <span className='ap-stat-value'>{face.expression}</span>
                </div>
                <div className='ap-stat-bar'>
                  <div className='ap-stat-fill ap-fill-expr' style={{ width: `${face.expressionScore}%` }}></div>
                </div>
                <span className='ap-stat-percent'>{face.expressionScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPanel;
