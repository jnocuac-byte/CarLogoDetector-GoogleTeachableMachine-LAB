import { useState, useEffect, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';

const useTeachableMachine = (modelURL) => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      if (!modelURL) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const modelURLComplete = modelURL + "model.json";
        const metadataURL = modelURL + "metadata.json";
        
        const loadedModel = await tmImage.load(modelURLComplete, metadataURL);
        modelRef.current = loadedModel;
        setModel(loadedModel);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("No se pudo cargar el modelo. Verifica la URL.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadModel();
  }, [modelURL]);

  const predict = async (imageElement) => {
    if (!modelRef.current || !imageElement) return null;
    
    try {
      const predictionsArray = await modelRef.current.predict(imageElement);
      const formattedPredictions = predictionsArray.map(pred => ({
        className: pred.className,
        probability: pred.probability.toFixed(2),
        percentage: (pred.probability * 100).toFixed(1)
      }));
      
      formattedPredictions.sort((a, b) => b.probability - a.probability);
      setPredictions(formattedPredictions);
      return formattedPredictions;
    } catch (err) {
      console.error("Error making prediction:", err);
      return null;
    }
  };

  return {
    model,
    predictions,
    isLoading,
    error,
    predict,
    isModelReady: model !== null && !isLoading
  };
};

export default useTeachableMachine;