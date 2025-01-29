import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { backendURL } from "./main"
import axios from 'axios';

export default function Itemlist() {
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
        axios.delete(backendUR + `delete/${id}`)
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
                {/*<Home />*/}
            </div>
            <div className="ml-10">
                <div className="grid grid-cols-5 gap-1">
                    {items.map((item) => (
                        <div key={item._id} className="m-4">
                            <Link key={item._id} to={`./${item._id}`} onClick={() => { }}>
                                <h2 className="text-xl font-bold">{item.name}</h2>by
                                <h3 className="text-lg">{item.artist}</h3>

                            </Link>
                            <button onClick={() => deleteEvent(item._id)} className="bg-yellow-500 text-white p-2 mt-2">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


function NewItem() {
    return (
        <div className='mt-10 ml-13'>
            <Link to="/new">
                <button className='size-fit'>Add new item</button>
            </Link>
        </div>
    );
}

function Home() {
    return (
        <div className="ml-auto m-5">
            <h1>
                <Link to="/">🏠</Link>
            </h1>
        </div>
    );
}
