# Car Logo Detector (BMW, Mercedes-Benz, Tesla, Toyota)

Aplicación web React que usa **Google Teachable Machine** y **TensorFlow.js** para identificar la marca de un automóvil a partir del logotipo visible en cámara o en una imagen cargada. El modelo reconoce BMW, Mercedes-Benz, Tesla y Toyota, y muestra la confianza de la predicción en tiempo real.

## Demo rápida (cómo funciona)
1. Abre la app y permite acceso a la cámara o sube una imagen.
2. La IA analiza el cuadro y muestra la marca detectada con su porcentaje de confianza.
3. Puedes repetir las capturas o probar con distintos logos desde archivo.

## Tecnologías principales
- React 19 + React Scripts 5
- TensorFlow.js + @teachablemachine/image
- React Webcam para captura en vivo
- CSS3 para el tema oscuro y diseño responsive

## Modelo
- Fuente: Teachable Machine  
- URL del modelo: `https://teachablemachine.withgoogle.com/models/s9H-0dM8W/`
- Datos de entrenamiento: 387 imágenes de 4 clases (BMW, Mercedes-Benz, Toyota, Tesla)
- Hiperparámetros documentados en la UI:
  - Épocas: 100
  - Batch size: 32
  - Learning rate: 0.001
  - Accuracy final: ~92.5%

## Funcionalidades
- 📷 Detección en tiempo real con la webcam.
- 📁 Subida de imágenes desde archivo.
- 📊 Confianza por clase en una tabla clara.
- 🎨 Interfaz cuidada con cards y métricas del modelo.
- 📱 Diseño responsive.

## Requisitos
- Node.js 18+ y npm

## Instalación y ejecución
```bash
npm install
npm start
```
La app se abre en `http://localhost:3000`.

Para build de producción:
```bash
npm run build
```

## Estructura relevante
- `src/App.js` — flujo principal, cards de captura y resultados.
- `src/hooks/useTeachableMachine.js` — carga del modelo y función `predict`.
- `src/components/*` — Header, WebcamCapture, PredictionResults.
- `src/images` — íconos utilizados en la UI.
- `public/` — assets públicos y `index.html`.

## Uso en producción / hosting
1. Ejecuta `npm run build` para generar `build/`.
2. Sirve el directorio `build` en tu hosting estático preferido (Netlify, Vercel, GitHub Pages, etc.).

## Créditos
- Juan Esteban Nocua Camacho — Laboratorio de IA, Ingeniería de Sistemas y Computación.
- Modelo entrenado con Google Teachable Machine; inferencia en navegador con TensorFlow.js.

---