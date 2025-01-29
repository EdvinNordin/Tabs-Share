import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './Routing'
import './index.css'

export const backendURL = 'http://localhost:3000/api/'
//export const backendURL = 'https://tabs-share-backend.onrender.com/api/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing />
  </StrictMode>,
)
