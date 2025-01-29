import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TabsList from './TabsList';
import EditTab from './EditTab';
import NewTab from './NewTab';
import './index.css'

export default function Routing() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Routes>
                    <Route path="/" element={<TabsList />} />
                    <Route path="/:id" element={<EditTab />} />
                    <Route path="/new" element={<NewTab />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}