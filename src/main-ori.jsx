import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line import/no-unresolved
import './index.css'
// eslint-disable-next-line import/no-unresolved
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
