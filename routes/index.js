// Create router to handle api calls
const router = require('express').Router();
// Install npm package uuid to create unique id for each note
const { v4: uuidv4 } = require('uuid');
// Require fs to read and write to db.json
const fs = require('fs');
// Require db.json to pass info to frontend
const db = require('../../db/db.json');

router.get('/api/notes', (req, res) => {
    res.json(db);
});


// Add post route to add notes
router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    db.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        res.json(db);
    });
});


// Add delete route to delete notes
router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const index = db.findIndex(note => note.id === id);
    db.splice(index, 1);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        res.json(db);
    });
});
