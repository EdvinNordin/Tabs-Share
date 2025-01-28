import { Routes, Route, Link } from "react-router-dom";
import { Itemlist } from './Items';
import ItemDetail from './ItemDetail'; // Import the new component
//import './App.css';

function Home() {
  return (
    <h1>
      <Link to="/items">Click here to see the items.</Link>
    </h1>
  );
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Itemlist />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  );
}