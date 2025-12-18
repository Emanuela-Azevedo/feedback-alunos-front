import React from 'react'
import '../styles/App.css'
import { AuthProvider } from '../context/AuthContext'
import AppRoutes from '../routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App