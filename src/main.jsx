import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './global.css'

// Only use StrictMode in development for better performance in production
const isDevelopment = import.meta.env.DEV;

createRoot(document.getElementById('root')).render(
  isDevelopment ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
)
