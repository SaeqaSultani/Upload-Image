//import necessary modules
import express from 'express';
import { getPosts,savePosts } from '../utils/helper.js';

const router = express.Router();

export default (upload) => {
    router.get('/', (req, res) => {
        const posts = getPosts();
        res.render('home', { posts });
    });

    router.get('/upload', (req, res) => {
        res.render('upload');
    });

    router.post('/create', upload.array('image',10), (req, res) => {
        const posts = getPosts();

        // Collect image paths into an array
        const imagePaths = req.files.map(file => '/uploads/' + file.filename);

        // Push one post object containing all image paths
        posts.push({
            title: req.body.title,
            date: new Date().toLocaleDateString('en-US'),
            image: imagePaths
        });
        // Save the posts to the JSON file
            savePosts(posts);
            res.redirect('/');
    });     

    router.get('/gallery', (req, res) => {
        const posts = getPosts();
        res.render('gallery', { posts });
      });

    return router;
}