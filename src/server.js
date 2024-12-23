import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url'; // Required to get __dirname in ES modules
import favicon from 'serve-favicon';

const app = express();
const PORT = 3000;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse incoming POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Serve the index.html file on GET request to root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

// Handle form submission on POST request to /submit
app.post('/submit', (req, res) => {
    const formData = req.body;

    console.log('Form Data:', formData);

    if (formData.message) { // Simple validation check for a message
        res.status(200).json({ success: true, message: 'Thank you for your message!' });
    } else {
        res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }
});


// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
