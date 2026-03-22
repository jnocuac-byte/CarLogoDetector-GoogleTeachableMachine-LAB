import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css';

const WebcamCapture = ({ onPredict, isModelReady, onImageUpload }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [activeMode, setActiveMode] = useState('webcam'); // 'webcam' or 'upload'
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const captureAndPredict = useCallback(async () => {
    if (!webcamRef.current || !isModelReady || activeMode !== 'webcam') return;
    
    setIsCapturing(true);
    
    try {
      const video = webcamRef.current.video;
      if (video && onPredict) {
        await onPredict(video);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    } finally {
      setIsCapturing(false);
    }
  }, [isModelReady, onPredict, activeMode]);

  useEffect(() => {
    if (!isModelReady || activeMode !== 'webcam') return;
    
    const interval = setInterval(() => {
      captureAndPredict();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isModelReady, captureAndPredict, activeMode]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    // Crear un elemento imagen para predecir
    const img = new Image();
    img.onload = async () => {
      if (onPredict) {
        await onPredict(img);
      }
      if (onImageUpload) {
        onImageUpload(imageUrl);
      }
    };
    img.src = imageUrl;
  };

  const switchToWebcam = () => {
    setActiveMode('webcam');
    setUploadedImage(null);
  };

  const switchToUpload = () => {
    setActiveMode('upload');
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "environment"
  };

  return (
    <div className="webcam-container">
      <div className="mode-selector">
        <button 
          className={`mode-btn ${activeMode === 'webcam' ? 'active' : ''}`}
          onClick={switchToWebcam}
        >
          📷 Cámara en vivo
        </button>
        <button 
          className={`mode-btn ${activeMode === 'upload' ? 'active' : ''}`}
          onClick={switchToUpload}
        >
          📁 Subir imagen
        </button>
      </div>

      {activeMode === 'webcam' ? (
        <>
          <div className="webcam-wrapper">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam"
              mirrored={true}
            />
            <div className={`webcam-overlay ${isCapturing ? 'capturing' : ''}`}>
              <div className="scan-line"></div>
            </div>
          </div>
          <button 
            className="capture-btn"
            onClick={captureAndPredict}
            disabled={!isModelReady || isCapturing}
          >
            {isCapturing ? 'Analizando...' : '🔍 Analizar Ahora'}
          </button>
          <p className="webcam-hint">
            Apunta la cámara al logotipo del auto
          </p>
        </>
      ) : (
        <div className="upload-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div 
            className="upload-area"
            onClick={triggerFileInput}
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="uploaded-preview" />
            ) : (
              <>
                <div className="upload-icon">📤</div>
                <p>Haz clic para subir una imagen</p>
                <span className="upload-hint">Formatos: JPG, PNG, WEBP</span>
              </>
            )}
          </div>
          {uploadedImage && (
            <button 
              className="capture-btn"
              onClick={() => {
                const img = new Image();
                img.src = uploadedImage;
                img.onload = () => onPredict && onPredict(img);
              }}
              disabled={!isModelReady}
            >
              🔍 Analizar Imagen
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;