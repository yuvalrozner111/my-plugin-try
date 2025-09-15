import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StoresContext, stores } from './contexts/StoresContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoresContext.Provider value={stores}>
      <Suspense fallback={<div>Loading translations...</div>}>
        <App />
      </Suspense>
    </StoresContext.Provider>
  </StrictMode>,
);
