import React, { useRef, useState, useCallback } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onFileChange, onClear, hasImage }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onButtonSubmit();
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create a synthetic event-like object for onFileChange
      const syntheticEvent = { target: { files: [file] } };
      onFileChange(syntheticEvent);
    }
  }, [onFileChange]);

  return (
    <div
      className={`ilf-container ${isDragging ? 'ilf-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className='ilf-content'>
        <div className='ilf-bar'>
          <button type='button' className='ilf-upload-btn' onClick={handleBrowseClick} title='Upload image'>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </button>

          <div className='ilf-divider'></div>

          <input
            className='ilf-input'
            type='text'
            placeholder='Paste image URL or drag & drop...'
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
          />

          {hasImage && (
            <button type='button' className='ilf-clear-btn' onClick={onClear} title='Clear'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}

          <button type='button' className='ilf-detect-btn' onClick={onButtonSubmit}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Detect
          </button>
        </div>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <div className='ilf-drag-overlay'>
          <div className='ilf-drag-content'>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span>Drop your image here</span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageLinkForm;