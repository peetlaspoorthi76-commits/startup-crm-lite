import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LeadProvider } from './context/LeadContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LeadProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LeadProvider>
    </AuthProvider>
  </React.StrictMode>,
)