//require in database file
var uniqid = require('uniqid');
const fs = require('fs');

//export to server.js
module.exports = function(app){

    //getNotes() from index.js
    //Populates json to page from db.json
    app.get('/api/notes', function(req, res){
        fs.readFile('./db/db.json', function(err,data){
            if (err) throw err;
            x = JSON.parse(data);
            res.json(x);
        });
    });

    //Grabs a specific object(note) from the db.json array based on ID.
    app.get('/api/notes/:note', function(req, res){
        var selectedNote = req.params.note;

        fs.readFile('./db/db.json', function(err, data){
            if (err) throw err;
            jsonArr = JSON.parse(data);
            for (var i = 0; i < jsonArr.length; i++) {
                if (selectedNote === jsonArr[i].id) {
                console.log(selectedNote);
                return res.json(jsonArr[i]);
                }
              }
        })
        
    });

    //saveNote() from index.js
    //When a note is saved, this assigns a unique ID and pushes the note information to db.json and /api/notes.
    app.post('/api/notes', function(req, res){
        newNote = req.body;
        
        //creates uniqid for object
        newNote.id = uniqid.time();
            
        //read db.json and then add newNote to the array in db.json
        fs.readFile('./db/db.json', function(err, data){
            if (err) throw err;
            let jsonArr = JSON.parse(data);
            jsonArr.push(newNote);
            
            fs.writeFile('./db/db.json', JSON.stringify(jsonArr), function(err){
                if (err) throw err;
                console.log('stored data to db');
                res.json(newNote);
            });
            
        });
        
    });
    //deleteNote() from index.js
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
                res.json(jsonArr);
            });
        });

    });

//end of module.exports function
};



