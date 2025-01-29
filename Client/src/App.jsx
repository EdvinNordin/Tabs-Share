import { Routes, Route, Link } from "react-router-dom";
import { Itemlist } from './Items';
import ItemDetail from './ItemDetail'; // Import the new component
import AddNew from './AddNew'; // Import the new component

function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <h1>
        <Link to="/items">Check out all the crazy tabs here!</Link>
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Itemlist />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/new" element={<AddNew />} />
      </Routes>
    </div>
  );
}