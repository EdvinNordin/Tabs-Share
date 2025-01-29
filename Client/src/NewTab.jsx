import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { backendURL } from "./main"

export default function NewTab() {
    const [name, setName] = useState('')
    const [artist, setArtist] = useState('')
    const [tab, setTab] = useState('')
    const navigate = useNavigate();
    const textareaRef = useRef(null);

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

        const text = textarea.value;
        if (textarea && text === '') {
            textarea.style.height = '100%'
        }
    };

    const addObject = (e) => {
        e.preventDefault()
        const Object = {
            name: name,
            artist: artist,
            tab: tab
        }

        axios.post(backendURL + 'post/', Object)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                console.error('There was an error adding the item!', error);
            });
    }

    return (
        <div className="w-full h-full flex flex-col mx-10 mt-3">

            <div className='flex flex-row mt-5 justify-between'>
                <h1 className='font-bold'>Add a song</h1>
                <div className="">
                    <Link to="/" className='text-5xl fixed right-5'>🔙</Link>
                </div>
            </div>

            <form onSubmit={addObject} className="mt-4">
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row w-1/2'>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                required
                                className="w-1/2 p-2 mr-4"
                            />
                            <input
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                type="text"
                                placeholder="Artist"
                                required
                                className="w-1/2 p-2 ml-4"
                            />
                        </div>
                    </div>
                    <div className='flex flex-row pb-10 mt-2'>
                        <textarea
                            ref={textareaRef}
                            value={tab}
                            onChange={(e) => setTab(e.target.value)}
                            type="text"
                            placeholder="Tabulature"
                            required
                            className="w-1/2 p-2 ty-5 mr-5"
                        />
                        <div className="flex items-end mb-3">
                            <button type="submit" className="bg-blue-500 text-white p-2 size-fit">Add Item</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
