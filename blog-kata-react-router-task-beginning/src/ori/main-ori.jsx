import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line
import './index.css'
// eslint-disable-next-line
import App from './App-ori.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
