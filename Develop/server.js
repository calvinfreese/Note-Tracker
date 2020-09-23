var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;
var publicFolder = path.resolve(__dirname, "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//without this, a MIME-type error is thrown.
app.use(express.static(__dirname + '/public'));


// Add routing below

app.get("/", function(req, res){
    console.log('index');
    res.sendFile(path.join(publicFolder, "index.html"));
});

app.get("/notes", function(req,res){
    console.log('notes');
    res.sendFile(path.join(publicFolder, "notes.html"));
});




//Do not delete listener
app.listen(PORT, function(){
    console.log("App is listening on PORT " + PORT);
})