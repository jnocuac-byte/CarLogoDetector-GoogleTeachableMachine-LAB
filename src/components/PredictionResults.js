import React from 'react';
import './PredictionResults.css';

const PredictionResults = ({ predictions, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="results-container">
        <div className="loading-spinner"></div>
        <p>Cargando modelo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container error">
        <div className="error-icon">⚠️</div>
        <h3>Error al cargar el modelo</h3>
        <p>{error}</p>
        <p className="error-hint">Verifica que la URL del modelo sea correcta</p>
      </div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return (
      <div className="results-container empty">
        <div className="empty-icon">📸</div>
        <h3>Esperando análisis</h3>
        <p>Apunta la cámara a un logo de auto</p>
      </div>
    );
  }

  const topPrediction = predictions[0];
  const isHighConfidence = parseFloat(topPrediction.probability) > 0.7;

  return (
    <div className="results-container">
      <div className={`top-result ${isHighConfidence ? 'high-confidence' : 'low-confidence'}`}>
        <div className="brand-icon">
          {topPrediction.className.charAt(0)}
        </div>
        <div className="brand-info">
          <h2>{topPrediction.className}</h2>
          <div className="confidence-bar">
            <div 
              className="confidence-fill" 
              style={{ width: `${topPrediction.percentage}%` }}
            ></div>
          </div>
          <p className="confidence-text">
            Confianza: <strong>{topPrediction.percentage}%</strong>
          </p>
        </div>
      </div>

      <div className="other-results">
        <h3>Otras posibilidades</h3>
        {predictions.slice(1, 4).map((pred, index) => (
          <div key={index} className="result-item">
            <span className="result-name">{pred.className}</span>
            <div className="result-bar">
              <div 
                className="result-fill" 
                style={{ width: `${pred.percentage}%` }}
              ></div>
            </div>
            <span className="result-percent">{pred.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionResults;