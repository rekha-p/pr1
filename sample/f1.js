var express = require('express'); 
var app = express();
var port     = process.env.PORT || 3001; 
var joinPath = require('path.join');
//var ej1 = require("ejs");
//Now, Inside you server.js set the view Engine to ejs as follows
app.set('view engine', 'ejs');
app.set('views', joinPath(__dirname,'views'));

//app.engine('ejs', ej({defaultLayout:'v1'}));


app.set('port', (process.env.PORT||3001));
app.listen(port);
console.log("App listening on port " + app.get('port'));


//Create a route for your app.
//index page
app.get('/', function(req, res){ 
	//way of sending data/param object to the rendering page
 //res.render('index',{user: "Great User",title:"homepage"});

var users=[ { name: 'John' },{ name: 'Mike' }, { name: 'Samantha'} ];
var greet ='Hello';
 res.render('index', {users, greet} );
   
 });

//About page
app.get('/about', function(req, res) {
    res.render('about');
});
