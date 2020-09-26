var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//without this, a MIME-type error is thrown.
app.use(express.static(__dirname + '/public'));


// Add routing
require('./routes/apiRouting')(app);
require('./routes/htmlRouting')(app);

//Do not delete listener
app.listen(PORT, function(){
    console.log("App is listening on PORT " + PORT);
});