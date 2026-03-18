import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ detections, imageUrl, onImageLoaded, scanning }) => {
  return (
    <div className='fr-container'>
      {imageUrl && (
        <div className='fr-image-wrap'>
          <img
            id='inputimage'
            className='fr-image'
            alt='detected face'
            src={imageUrl}
            crossOrigin='anonymous'
            onLoad={onImageLoaded}
          />

          {/* Scanning overlay */}
          {scanning && (
            <div className='fr-scan-overlay'>
              <div className='fr-scan-line'></div>
              <div className='fr-scan-grid'></div>
            </div>
          )}

          {/* Detection boxes */}
          {detections.map((face, i) => (
            <div
              key={i}
              className='fr-box'
              style={{
                top: face.box.topRow,
                left: face.box.leftCol,
                width: face.box.width,
                height: face.box.height
              }}
            >
              <div className='fr-corner fr-c-tl'></div>
              <div className='fr-corner fr-c-tr'></div>
              <div className='fr-corner fr-c-bl'></div>
              <div className='fr-corner fr-c-br'></div>
              <span className='fr-tag'>#{face.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;