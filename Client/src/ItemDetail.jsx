import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ItemDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        artist: '',
        tab: ''
    });
    const [tab, setTab] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3000/api/get/${id}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the item!', error);
            });
    }, [id]);

    if (!item) {
        return <p>Loading...</p>;
    }

    const formattedTab = item.tab.replace(/\| /g, '|\n');
    const formattedTab2 = formattedTab.replace(/\ e/g, '\ne');

    // Remove everything between each occurrence of '\n' and 'e|'
    const updateEvent = (e) => {
        e.preventDefault();
        const testObject = {
            name: name,
            artist: artist,
            tab: tab
        };
        if (testObject.name === '') testObject.name = (item.name);
        if (testObject.artist === '') testObject.artist = (item.artist);
        if (testObject.tab === '') testObject.tab = (item.tab);

        axios.patch(`http://localhost:3000/api/update/${id}`, testObject)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error('There was an error updating the item!', error);
            });
    };
    // Add a newline after every '| '

    return (
        <div className="w-full h-full flex items-center">
            <h1 className="fixed text-center top-0 left-0 w-full p-4 center z-10">
                <Link to="/items">Back to Items</Link>
            </h1>

            <div className="container flex-col items-center w-full p-10 ">
                <form onSubmit={updateEvent} className="mb-4">
                    <div className='flex pb-50'>
                        <div className='w-1/2'>
                            <div className='flex w-full'>
                                <input
                                    type="text"
                                    placeholder={item.name.toString()}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border rounded-md w-1/2 p-2 mr-4"
                                />
                                <input
                                    type="text"
                                    placeholder={item.artist.toString()}
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    className="border rounded-md w-1/2 p-2 ml-4"
                                />
                            </div>
                            <textarea
                                placeholder={item.tab.toString()}
                                value={tab}
                                onChange={(e) => setTab(e.target.value)}
                                className="border w-full h-full rounded-md p-2 my-5 mr-5"
                            />
                            <div className="flex justify-center">
                                <button type="submit" className="bg-blue-500 text-white p-2">Update</button>

                            </div>
                        </div>
                    </div>
                </form>

                <div className="">
                    <div>
                        <h2 className="text-xl font-bold">{"Song name: \n" + item.name}</h2>
                        <h3 className="text-lg">{"Artist: \n" + item.artist}</h3>
                    </div>
                    <div>
                        <pre className="whitespace-pre-wrap p-4 rounded">
                            {"Tab: \n" + formattedTab2}
                        </pre>
                    </div>
                </div>
            </div>

        </div >
    );
}
export default ItemDetail;