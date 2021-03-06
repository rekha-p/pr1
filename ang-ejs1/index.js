// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000;
var joinPath = require('path.join'); 
var database = require('./config/database'); 			// load the database config

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var Tasks = require('./app/models/tasks.js');
// configuration ===============================================================
// connect to mongoDB database on modulus.io

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



//set view engine
//app.set('view engine', 'HTML');
//app.set('views', joinPath(__dirname,'./public/views'));


// routes ======================================================================
//require('./app/routes.js')(app);
//var tasksService = require('./app/tasksService');
// listen (start app with node server.js) ======================================

app.listen(port);
console.log("App listening on port " + port);

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/tasks',function(req,res){
		res.sendFile(__dirname + '/public/tasks.html');
});	
app.get('/about', function(req,res){
        res.sendFile(__dirname + '/public/about.html');
	});

