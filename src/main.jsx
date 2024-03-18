import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './firebase/config.js'
import { ChakraProvider } from '@chakra-ui/react'
import ThemeProvider from './context/ThemeContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
