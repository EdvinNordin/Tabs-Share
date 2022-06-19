import PostMessage from '../models/postMessage.js';
//import { getPosts, createPost } from '.../controllers/posts.js';

export const getPosts = async (req, res) => {
    try {
        const portMessage = await PostMessage.find();

        console.log(postMessage);

        res.status(200).json(postMessage);
    } catch(error) {
        res.status(404).json({ message:error.message });

    }
}

export const createPost = (req, res) => {
    res.send('Post Creation');
}