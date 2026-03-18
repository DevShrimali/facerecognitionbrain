import React, { useState, useEffect, useCallback } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import * as faceapi from 'face-api.js';
import Navigation from './components/Navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import AnalysisPanel from './components/AnalysisPanel/AnalysisPanel.js';
import './App.css';

const particleOptions = {
  particles: {
    number: { value: 30, density: { enable: true, area: 1000 } },
    color: { value: '#8b5cf6' },
    links: { enable: true, color: '#8b5cf6', opacity: 0.06, distance: 150 },
    move: { enable: true, speed: 0.4, outModes: { default: "bounce" } },
    opacity: { value: 0.1 },
    size: { value: { min: 1, max: 2 } }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 140, links: { opacity: 0.15 } } }
  }
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detections, setDetections] = useState([]);
  const [particlesInit, setParticlesInit] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/facerecognitionbrain/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/facerecognitionbrain/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/facerecognitionbrain/models'),
      faceapi.nets.ageGenderNet.loadFromUri('/facerecognitionbrain/models'),
    ]).then(() => {
      console.log('✅ All models loaded');
      setModelsLoaded(true);
    }).catch(err => console.log('Model load error:', err));
  }, []);

  const detectFaces = useCallback(async () => {
    const image = document.getElementById('inputimage');
    if (!image || !modelsLoaded) return;
    setDetecting(true);

    try {
      const startTime = Date.now();

      const results = await faceapi
        .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      // Ensure minimum scan duration of 2.5s for visual effect
      const elapsed = Date.now() - startTime;
      if (elapsed < 2500) {
        await new Promise(resolve => setTimeout(resolve, 2500 - elapsed));
      }

      if (results.length > 0) {
        const displaySize = { width: image.width, height: image.height };
        const resized = faceapi.resizeResults(results, displaySize);
        const faces = resized.map((r, i) => {
          const box = r.detection.box;
          const exps = r.expressions;
          const topExp = Object.entries(exps).sort((a, b) => b[1] - a[1])[0];
          return {
            id: i + 1,
            box: {
              leftCol: box.x, topRow: box.y,
              width: box.width, height: box.height,
              rightCol: image.width - (box.x + box.width),
              bottomRow: image.height - (box.y + box.height)
            },
            age: Math.round(r.age),
            gender: r.gender,
            genderProbability: Math.round(r.genderProbability * 100),
            expression: topExp[0],
            expressionScore: Math.round(topExp[1] * 100),
            confidence: Math.round(r.detection.score * 100)
          };
        });
        setDetections(faces);
      } else {
        setDetections([]);
      }
    } catch (err) {
      console.log('Detection error:', err);
      setDetections([]);
    }
    setDetecting(false);
  }, [modelsLoaded]);

  const onInputChange = (e) => setInput(e.target.value);

  const onButtonSubmit = () => {
    if (!input) return;
    setDetections([]);
    setDetecting(true);
    fetch(input)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => { setImageUrl(reader.result); setDetecting(false); };
        reader.readAsDataURL(blob);
      })
      .catch(() => { setImageUrl(input); setDetecting(false); });
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setImageUrl(reader.result); setDetections([]); };
    reader.readAsDataURL(file);
  };

  const onImageLoaded = () => detectFaces();

  const onClear = () => {
    setImageUrl('');
    setDetections([]);
    setInput('');
  };

  const hasResults = imageUrl && detections.length > 0;

  return (
    <div className="App">
      {particlesInit && (
        <Particles id="tsparticles" className='particles' options={particleOptions} />
      )}
      <Navigation modelsLoaded={modelsLoaded} />

      <main className='workspace'>
        {/* Empty State / Hero */}
        {!imageUrl && (
          <div className='hero-section'>
            <div className='hero-badge'>
              <span className='hero-badge-dot'></span>
              AI-Powered
            </div>
            <h1 className='hero-title'>Face Detection & Analysis</h1>
            <p className='hero-subtitle'>
              Detect faces, estimate age, predict gender & read expressions.<br />
              100% client-side — your images never leave your browser.
            </p>

            {!modelsLoaded && (
              <div className='models-loading'>
                <div className='models-loading-bar'></div>
                <span className='models-loading-text'>Loading AI models...</span>
              </div>
            )}
          </div>
        )}

        {/* Input Bar */}
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
          onFileChange={onFileChange}
          onClear={onClear}
          hasImage={!!imageUrl}
        />

        {/* Results Workspace */}
        {imageUrl && (
          <div className={`results-workspace ${(hasResults || detecting) ? 'results-split' : ''}`}>
            <div className='results-image-section'>
              <FaceRecognition
                detections={detections}
                imageUrl={imageUrl}
                onImageLoaded={onImageLoaded}
                scanning={detecting}
              />
            </div>

            {detecting && (
              <div className='results-panel-section'>
                <div className='skeleton-panel'>
                  <div className='skeleton-header'>
                    <div className='skeleton-line skeleton-w60'></div>
                    <div className='skeleton-badge'></div>
                  </div>
                  <div className='skeleton-card'>
                    <div className='skeleton-card-head'>
                      <div className='skeleton-avatar'></div>
                      <div className='skeleton-card-meta'>
                        <div className='skeleton-line skeleton-w40'></div>
                        <div className='skeleton-line skeleton-w60 skeleton-sm'></div>
                      </div>
                    </div>
                    <div className='skeleton-stat'><div className='skeleton-line'></div><div className='skeleton-bar'></div></div>
                    <div className='skeleton-stat'><div className='skeleton-line'></div><div className='skeleton-bar'></div></div>
                    <div className='skeleton-stat'><div className='skeleton-line'></div><div className='skeleton-bar'></div></div>
                  </div>
                </div>
              </div>
            )}

            {hasResults && !detecting && (
              <div className='results-panel-section'>
                <AnalysisPanel detections={detections} />
              </div>
            )}
          </div>
        )}

        {/* Footer Credit */}
        <footer className='app-footer'>
          <span>Designed by </span>
          <a href='https://www.devux.in/' target='_blank' rel='noopener noreferrer'>devux.in</a>
        </footer>
      </main>
    </div>
  );
};

export default App;
