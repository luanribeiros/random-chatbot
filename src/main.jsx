import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/styles.global.css'
import Chat from './components/Chat/Chat'

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <div className="app-container">
      <Chat />
    </div>
  </StrictMode>,
)
