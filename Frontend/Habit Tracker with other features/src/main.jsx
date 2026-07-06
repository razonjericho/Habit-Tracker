import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { HabitProvider } from '../Context/HabitContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SessionProvider } from '../Context/SessionContext.jsx'
import { AuthenticationProvider } from '../Context/AuthenticationContext.jsx'
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

        <BrowserRouter>
          <AuthenticationProvider>
            <SessionProvider>
              <HabitProvider>
                <App />
              </HabitProvider>
            </SessionProvider>
          </AuthenticationProvider>
        </BrowserRouter>

    </ThemeProvider>
    
  </StrictMode>,
)
