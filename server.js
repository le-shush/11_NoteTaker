// Importing the Express.js library
const express = require('express');
// Importing the built-in 'path' module from Node.js for file path resolution
const path = require('path');
// Initializing an instance of Express.js
const APIroutes = require('./routes/index.js')
const app = express();
// Defining the port number for the Express.js server to listen on
const PORT = process.env.PORT || 3001;

// Setting up middleware to serve files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', APIroutes);

// Route to serve the main page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Route to serve the notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Starting the Express.js server on the specified port
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);
