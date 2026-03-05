import { createRoot } from 'react-dom/client'
import AppContextProvider from './AppContext.jsx'

import './css/normalize.css'
import "./css/home.css"
import "./css/app.css"
import './css/auth.css'
import "./css/icons.css"
import "./css/game.css"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppContextProvider>
      <App className="normal-mode app-mode"/>
    </AppContextProvider>
  // </StrictMode>
)