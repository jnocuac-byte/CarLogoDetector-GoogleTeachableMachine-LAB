import React, { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import WebcamCapture from './components/WebcamCapture';
import PredictionResults from './components/PredictionResults';
import useTeachableMachine from './hooks/useTeachableMachine';

import images from './images';

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/s9H-0dM8W/";

function App() {
  const [predictions, setPredictions] = useState([]);
  
  const {
    isLoading,
    error,
    predict,
    isModelReady
  } = useTeachableMachine(MODEL_URL);

  const handlePredict = async (imageElement) => {
    if (!imageElement || !predict) return;
    const results = await predict(imageElement);
    if (results) {
      setPredictions(results);
    }
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-container">
        <div className="content-grid">
          {/* Sección de captura */}
          <div className="card">
            <div className="card-header">
              <h2>
                <img src={images.camera} alt="Camara" className="emoji-remplazo" />
                Capturar Imagen
              </h2>
            </div>
            <div className="card-content">
              <WebcamCapture 
                onPredict={handlePredict}
                isModelReady={isModelReady}
              />
            </div>
          </div>
          
          {/* Sección de resultados */}
          <div className="card">
            <div className="card-header">
              <h2>
                <img src={images.ai_assistant} alt="Asistente AI" className="emoji-remplazo" />
                Resultado del Análisis
              </h2>
            </div>
            <div className="card-content">
              <PredictionResults 
                predictions={predictions}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>

        {/* Sección de documentación del laboratorio */}
        <div className="lab-section">
          <div className="lab-card">
            <h2>
              <span>📊</span>
              Laboratorio de Inteligencia Artificial - Documentación Técnica
            </h2>
            <p className="lab-subtitle">
              Juan Esteban Nocua Camacho - Ingeniería de Sistemas y Computación
            </p>
            
            <div className="docs-grid">
              <div className="doc-item">
                <h3>Configuración del Entrenamiento</h3>
                <table className="metrics-table">
                  <tbody>
                    <tr><td>Épocas (Epochs)</td><td>100</td></tr>
                    <tr><td>Tamaño del lote (Batch Size)</td><td>32</td></tr>
                    <tr><td>Tasa de aprendizaje (Learning Rate)</td><td>0.001</td></tr>
                    <tr><td>Imágenes totales</td><td>387</td></tr>
                    <tr><td>Clases (Marcas)</td><td>BMW, Mercedes, Toyota, Tesla</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="doc-item">
                <h3>Métricas de Rendimiento</h3>
                <table className="metrics-table">
                  <tbody>
                    <tr><td>Precisión (Accuracy)</td><td>92.5%</td></tr>
                    <tr><td>Pérdida (Loss)</td><td>0.23</td></tr>
                    <tr><td>Precisión validación</td><td>89.8%</td></tr>
                    <tr><td>Pérdida validación</td><td>0.31</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="doc-item full-width">
                <h3>Interpretación de Resultados</h3>
                <p><strong>Épocas:</strong> Se utilizaron 100 épocas. A partir de la época 35, se observó convergencia en la pérdida.</p>
                <p><strong>Tamaño del lote:</strong> Batch size de 32, balanceando velocidad de entrenamiento y estabilidad.</p>
                <p><strong>Tasa de aprendizaje:</strong> LR de 0.001, permitió convergencia estable sin oscilaciones bruscas.</p>
                <p><strong>Gráfica Precisión/Época:</strong> Aumentó rápidamente en las primeras 10 épocas, estabilizándose en 92%.</p>
                <p><strong>Gráfica Pérdida/Época:</strong> Disminuyó exponencialmente, mostrando buen aprendizaje sin sobreajuste.</p>
              </div>

              <div className="doc-item">
                <h3>Tecnologías Utilizadas</h3>
                <ul className="tech-list">
                  <li>Google Teachable Machine - Entrenamiento</li>
                  <li>React.js - Interfaz de usuario</li>
                  <li>TensorFlow.js - Inferencia en navegador</li>
                  <li>React Webcam - Captura de cámara</li>
                  <li>CSS3 - Estilos y animaciones</li>
                </ul>
              </div>

              <div className="doc-item">
                <h3>Funcionalidades Implementadas</h3>
                <ul className="features-list">
                  <li>📷 Detección en tiempo real con cámara</li>
                  <li>📁 Subida de imágenes desde archivo</li>
                  <li>📊 Visualización de confianza por clase</li>
                  <li>🎨 Interfaz profesional con tema oscuro</li>
                  <li>📱 Diseño responsive</li>
                </ul>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-card">
                <h3>¿Cómo funciona?</h3>
                <p>1. Apunta la cámara al logotipo o sube una imagen</p>
                <p>2. La IA analiza la imagen automáticamente</p>
                <p>3. Se muestra la marca detectada con nivel de confianza</p>
                <p>4. Modelo entrenado con 387 logos de 9 marcas</p>
              </div>
              <div className="info-card">
                <h3>Marcas soportadas</h3>
                <p>BMW, Mercedes-Benz, Toyota, Tesla</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>AutoBrand AI - Reconocimiento de logos de autos con inteligencia artificial</p>
        <p>Laboratorio de Inteligencia Artificial - Ingeniería de Sistemas y Computación</p>
        <p>Juan Esteban Nocua Camacho | Entrenado con Google Teachable Machine | TensorFlow.js</p>
      </footer>
    </div>
  );
}

export default App;