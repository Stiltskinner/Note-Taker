const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuidv1 = require('uuidv1');

// GET "/api/notes" responds with all notes from the database
router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => notes.id === id);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that id');
    });
});

// POST Route for a new UX/UI note
router.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newnote = {
      title,
      text,
      id: uuidv1(),
    };

    readAndAppend(newnote, './db/db.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the id provided in the URL
      const result = json.filter((note) => note.id !== id);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${id} has been deleted 🗑️`);
    });
});

module.exports = router;