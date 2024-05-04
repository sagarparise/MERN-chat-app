
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Authprovider from './store/AuthContext'
import SocketProvider from './store/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <SocketProvider>
      <App />
      </SocketProvider>
    </Authprovider>
  </React.StrictMode>,
)
