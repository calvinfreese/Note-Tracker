//require in database file
var notes = require('../db/db');
var uniqid = require('uniqid');
const fs = require('fs');

//export to server.js
module.exports = function(app){
    app.get('/api/notes', function(req, res){
        res.json(notes);
    });

    app.get('/api/notes/:note', function(req, res){
        var selectedNote = req.params.note;

        

        for (var i = 0; i < notes.length; i++) {
            if (selectedNote === notes[i].id) {
            console.log(selectedNote);
              return res.json(notes[i])
            }
          }
        
    });

    app.post('/api/notes', function(req, res){
        newNote = req.body;

        newNote.id = uniqid.time();

        notes.push(newNote);
        console.log(newNote);
        res.json(newNote);

        fs.readFile('./db/db.json', function(err, data){
            if (err) throw err;
            let jsonArr = JSON.parse(data);

            jsonArr.push(newNote);
            
            fs.writeFile('./db/db.json', JSON.stringify(jsonArr), function(err){
                if (err) throw err;
                console.log('stored data to db');
            })

        });
        
    });

    app.delete('/api/notes/:noteID', function(req, res){
        var selectedNote = req.params.noteID;

        for (var i = 0; i < notes.length; i++) {
            if (selectedNote === notes[i].id) {
            notes.splice(i,1);
            return res.json(notes)
            }
        }
        
    });
//end of function
};



