import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { HabitProvider } from '../Context/HabitContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import SessionProvider from '../Context/SessionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <HabitProvider>
          <App />
        </HabitProvider>
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>,
)
