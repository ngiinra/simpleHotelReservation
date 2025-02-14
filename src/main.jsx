import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HotelsProvider } from './context/HotelsProvider.jsx'
import {BookmarksProvider} from './context/BookmarksContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HotelsProvider>
        <BookmarksProvider>
          <App />
        </BookmarksProvider>
      </HotelsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
