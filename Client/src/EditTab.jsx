import axios from 'axios';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { backendURL } from "./main"

export default function EditTab() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [tab, setTab] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        axios.get(backendURL + `get/${id}`)
            .then((response) => {
                const fetchedItem = response.data;
                setItem(fetchedItem);
                setName(fetchedItem.name);
                setArtist(fetchedItem.artist);
                setTab(fetchedItem.tab);
            })
            .catch((error) => {
                console.error('There was an error fetching the item!', error);
            });
    }, [id]);

    useEffect(() => {
        if (textareaRef.current) {
            adjustTextareaHeight();
        }
    }, [tab]);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea && textarea.style.height !== `${textarea.scrollHeight}px`) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleSongChange = (e) => {
        setName(e.target.value);
        updateEvent(e.target.value, artist, tab);
    };

    const handleArtistChange = (e) => {
        setArtist(e.target.value);
        updateEvent(name, e.target.value, tab);
    };

    const handleTabChange = (e) => {
        setTab(e.target.value);
        updateEvent(name, artist, e.target.value);
    };

    if (!item) {
        return <p>Loading...</p>;
    }

    const updateEvent = (name, artist, tab) => {
        const updatedItem = {
            name: name,
            artist: artist,
            tab: tab
        };

        axios.patch(backendURL + `update/${id}`, updatedItem)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error('There was an error updating the item!', error);
            });
    };

    return (
        <div className="w-full h-full flex flex-col m-10 mt-3">
            <div className='flex flex-row justify-between'>
                <h1 className='font-bold text-purp'>Edit the tab</h1>
                <div className="fixed right-5 mt-5">
                    <Link to="/" className='text-5xl'>🔙</Link>
                </div>
            </div>
            <div className="flex mt-5 mb-1 text-4xl w-1/2">
                <input
                    value={name}
                    onChange={handleSongChange}
                    type="text"
                    placeholder="Song name"
                    required
                    className="w-full h-15 rounded-2xl pl-2 focus:outline outline-purp"
                />
            </div>

            <div className="flex text-2xl w-1/2">
                <p className='ml-2 mt-1'>By&nbsp;</p>
                <input
                    value={artist}
                    onChange={handleArtistChange}
                    type="text"
                    placeholder="Artist"
                    required
                    className="w-full rounded-2xl p-1 pl-2 test focus:outline outline-purp"
                />
            </div>

            <div className="flex my-5 mr-5">
                <textarea
                    ref={textareaRef}
                    value={tab}
                    onChange={handleTabChange}
                    placeholder="Tabulature"
                    required
                    className="flex w-full mt-0 p-2 font-mono overflow-hidden rounded-2xl focus:outline outline-purp"
                />
            </div>
        </div>
    );
}