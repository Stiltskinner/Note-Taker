const router = require('express').Router();
const store = require('../db/store');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuidv1 = require('uuidv1');

// GET "/api/notes" responds with all notes from the database
router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => notes.note_id === tipId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

module.exports = router;
