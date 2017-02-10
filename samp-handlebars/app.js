// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000; 				// set the port
var database = require('./config/database'); 			// load the database config

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var crypt = require("bcryptjs"); //used for crypting 
var flashmsg = require("connect-flash");
var cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
var msg = require("express-messages");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var joinPath = require('path.join');
var expressValidator = require('express-validator');
//var flash = require('connect-flash');
var flash = require('req-flash');

var main = require('./JS/index');
var users = require('./JS/users');

//View Engine
app.set('Views', joinPath(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



// configuration ===============================================================
// connect to mongoDB database on modulus.io
mongoose.connect(database.url);

//set static folder
app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users

app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//express Sesssion

app.use(session({
    secret : 'secret',
    saveUninitialized: true,
    resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
	 errorFormatter : function(param, msg, value){
		var namespace = param.split('.'),
		 root = namespace.shift(),
		 formParam = root;

		  while(namespace.length){
		  	formParam += '['+ namespace.shift() + ']';
		  }
		  return {
		  	param : formParam,
		  	msg    : msg,
		  	value  : value
		  	};
		 }
}));

//connect flash
app.use(flash());

//Gloabl Vars
app.use(function(req,res,next){

	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// routes ======================================================================
app.use('/',main);
app.use('/users',users);
// listen (start app with node server.js) ======================================

app.set('port', (process.env.PORT||3000));
app.listen(port);
console.log("App listening on port " + app.get('port'));


