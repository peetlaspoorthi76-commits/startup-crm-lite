import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. Import your providers
import { AuthProvider } from './context/AuthContext'
import { LeadProvider } from './context/LeadContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap your App with the Providers */}
    <AuthProvider>
      <LeadProvider>
        <App />
      </LeadProvider>
    </AuthProvider>
  </React.StrictMode>
)