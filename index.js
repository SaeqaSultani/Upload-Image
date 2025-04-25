// Import necessary modules
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import imageRoutes from './routes/imageRoutes.js';
// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = 3001;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Set EJS as the templating/view engine
app.set('view engine', 'ejs');

// File and folder setup
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if(!fs.existsSync('posts.json')) fs.writeFileSync('posts.json','[]');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
 });

const upload = multer({ storage });


// Route handling

app.use('/', (imageRoutes(upload)));

app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});