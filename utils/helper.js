// Import necessary modules
import fs from 'fs';

export const getPosts = () => {
    return JSON.parse(fs.readFileSync('posts.json', 'utf-8'));
}

export const savePosts = (posts) => {
    fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2), 'utf-8');
}