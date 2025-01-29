import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { backendURL } from "./main"
import axios from 'axios';

export default function TabsList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(backendURL + 'getAll')
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    const deleteEvent = (id) => {
        axios.delete(backendURL + `delete/${id}`)
            .then((response) => {
                setItems(items.filter(item => item._id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the item!', error);
            });
    };

    return (
        <div className='w-full h-full'>
            <div className='flex flex-row'>
                <NewItem />
            </div>
            <div className="ml-10 mt-40 grid grid-cols-6 gap-1">
                {items.map((item) => (
                    <div key={item._id} className="flex flex-col m-4 justify-between">
                        <div>
                            <Link key={item._id} to={`./${item._id}`} onClick={() => { }}>
                                <h2 className="text-3xl font-bold">{item.name}</h2>by
                                <h3 className="text-2xl">{item.artist}</h3>
                            </Link>
                        </div>
                        <button onClick={() => deleteEvent(item._id)} className="text-white p-2 mt-2 w-1/3">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function NewItem() {
    return (
        <div className='my-10 mr-8 text-2xl fixed right-5'>
            <Link to="/new">
                <button className='size-fit'>Add new tab</button>
            </Link>
        </div>
    );
}
