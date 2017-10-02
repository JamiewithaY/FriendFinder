//Dependencies

var express= require("express");
var bodyParser = require("body-parser");
 

//server set up
var app = express();
var PORT = process.env.PORT || 3000

//setting up bodyParser so the server can interpret the data sent to it eaisly
// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static files
// app.use(express.static('./app/public'));

//Setting Route Options: This will give the server direction on how to respond to requests when someone visits the site or requests data from various URL's.
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

//listener
app.listen(PORT,function(){
	console.log("app listening on PORT: " + PORT);
});


