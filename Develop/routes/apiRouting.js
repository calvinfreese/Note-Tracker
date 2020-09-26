//require in database file
var notes = require('../db/db');
var uniqid = require('uniqid');
const fs = require('fs');

//export to server.js
module.exports = function(app){
    //Populates json to page from db.json
    app.get('/api/notes', function(req, res){
        res.json(notes);
    });

    //Grabs a specific object(note) from the db.json array based on ID.
    app.get('/api/notes/:note', function(req, res){
        var selectedNote = req.params.note;

        for (var i = 0; i < notes.length; i++) {
            if (selectedNote === notes[i].id) {
            console.log(selectedNote);
              return res.json(notes[i]);
            }
          }
    });

    //When a note is saved, this assigns a unique ID and pushes the note information to db.json and /api/notes.
    app.post('/api/notes', function(req, res){
        newNote = req.body;
        
        //creates uniqid for object
        newNote.id = uniqid.time();

        //push new note to /api/notes
        notes.push(newNote);
        console.log(newNote);
        res.json(newNote);

        //read db.json and then add newNote to the array in db.json
        fs.readFile('./db/db.json', function(err, data){
            if (err) throw err;
            let jsonArr = JSON.parse(data);

            jsonArr.push(newNote);
            
            fs.writeFile('./db/db.json', JSON.stringify(jsonArr), function(err){
                if (err) throw err;
                console.log('stored data to db');
            });

        });
        
    });

    //When method: delete is called(delete button), this grabs the note based off the ID, and removes it from db.json and /api/notes
    app.delete('/api/notes/:noteID', function(req, res){
        var selectedNote = req.params.noteID;

        //read db.json, delete the note based on the index that matches the id, then write the remaining array back to db.json
        fs.readFile('./db/db.json', function(err, data){
            if (err) throw err;
            let jsonArr = JSON.parse(data);
            x = jsonArr.findIndex(obj => obj.id === selectedNote);
            console.log(x);
            jsonArr.splice(x, 1);

            fs.writeFile('./db/db.json', JSON.stringify(jsonArr), function(err){
                if (err) throw err;
                console.log('deleted selected note from json array');
            });
        });
    
        //loops through and finds the note based off index of id, and deletes the note. returns the array.
        for (var i = 0; i < notes.length; i++) {
            if (selectedNote === notes[i].id) {
            notes.splice(i,1);
            return res.json(notes);
            }
        }
        
    });

//end of module.exports function
};



