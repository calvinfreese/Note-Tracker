//require in database file
var notes = require('../db/db');
var uniqid = require('uniqid');

//export to server.js
module.exports = function(app){
    app.get('/api/notes', function(req, res){
        res.json(notes);
    });

    app.get('/api/notes/:note', function(req, res){
        var selectedNote = req.params.note;

        console.log(selectedNote);

        for (var i = 0; i < notes.length; i++) {
            if (selectedNote === notes[i].id) {
            //   notes.splice(i, 1);
              return res.json(notes[i])
            }
          }
        
    });

    app.post('/api/notes', function(req, res){
        newNote = req.body;

        newNote.id = uniqid.time();

        notes.push(newNote);

        res.json(newNote);
    });

    

};