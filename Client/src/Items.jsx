import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export function Itemlist() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [tab, setTab] = useState('');
    const [updatingItem, setUpdatingItem] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/getAll')
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    const addObject = (event) => {
        event.preventDefault();
        const testObject = {
            name: name,
            artist: artist,
            tab: tab
        };
        axios.post('http://localhost:3000/api/post', testObject)
            .then((response) => {
                setItems([...items, response.data]);
                setName('');
                setArtist('');
                setTab('');
            })
            .catch((error) => {
                console.error('There was an error adding the item!', error);
            });
    };

    const deleteEvent = (id) => {
        axios.delete(`http://localhost:3000/api/delete/${id}`)
            .then((response) => {
                setItems(items.filter(item => item._id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the item!', error);
            });
    };



    return (
        <div className='w-full h-full'>
            <Home />
            <div className="container flex-col items-center w-full p-10 ">
                <form onSubmit={addObject} className="mb-4">
                    <div className='flex pb-50'>
                        <div className='w-1/2'>
                            <div className='flex w-full'>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Song name"
                                    required
                                    className="border rounded-md w-1/2 p-2 mr-4"
                                />
                                <input
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    type="text"
                                    placeholder="Artist"
                                    required
                                    className="border rounded-md w-1/2 p-2 ml-4"
                                />
                            </div>
                            <textarea
                                value={tab}
                                onChange={(e) => setTab(e.target.value)}
                                type="text"
                                placeholder="Tabulature"
                                required
                                className="border w-full h-full rounded-md p-2 my-5 mr-5"
                            />
                            <div className="flex justify-center">
                                <button type="submit" className="bg-blue-500 text-white p-2">Add Item</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {items.map((item) => (
                        <Link to={`./${item._id}`} onClick={() => { }}>
                            <div key={item._id} className="border rounded-md p-4">
                                <h2 className="text-xl font-bold">{item.name}</h2>by
                                <h3 className="text-lg">{item.artist}</h3>
                                <button onClick={() => deleteEvent(item._id)} className="bg-yellow-500 text-white p-2 mt-2 ml-2">Delete</button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}


function Home() {
    return (
        <h1 className="fixed text-center top-0 left-0 w-full p-4 center z-10">
            <Link to="/">Click here to go home.</Link>
        </h1>
    );
}