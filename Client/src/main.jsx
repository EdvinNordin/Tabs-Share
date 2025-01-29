import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Itemlist from './Items';
import ItemDetail from './ItemDetail'; // Import the new component
import AddNew from './AddNew'; // Import the new component
import './index.css'

export const backendURL = 'https://tabs-share-backend.onrender.com/api/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex">
        <Routes>
          {/*<Route path="/" element={<Home />} />*/}
          <Route path="/" element={<Itemlist />} />
          <Route path="/:id" element={<ItemDetail />} />
          <Route path="/new" element={<AddNew />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
