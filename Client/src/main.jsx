import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TabsList from './TabsList';
import EditTab from './EditTab';
import NewTab from './NewTab';
import './index.css'

//export const backendURL = 'http://localhost:3000/api/'
export const backendURL = 'https://tabs-share-backend.onrender.com/api/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex">
        <Routes>
          <Route path="/" element={<TabsList />} />
          <Route path="/:id" element={<EditTab />} />
          <Route path="/new" element={<NewTab />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
