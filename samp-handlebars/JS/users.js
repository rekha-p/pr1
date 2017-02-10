//check out for passportjs.org/docs/username-password for the local strategy, authentication details.

var express = require('express');
var router = express.Router();
var flash = require('req-flash');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
//Register
router.get('/register',function(req, res){
   res.render('register');
});

//login
router.get('/login',function(req, res){
   res.render('login');
});

//Register User
router.post('/register',function(req,res){
  var name= req.body.name;
  var uname= req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;


  //validation
  req.checkBody('name','Name required').notEmpty();
  req.checkBody('email','email required').notEmpty();
  req.checkBody('email','email required').isEmail();
  req.checkBody('password','password required').notEmpty();
  req.checkBody('confirm password','confirm password').notEmpty();
  req.checkBody('confirm password','password do not match').equals(req.body.password);
  //req.checkBody('uname','UserName required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
  	//console.log(uname);
  	console.log(errors);
  	res.render('register',{
  	  errors: errors
     });
   }
  else{
  	console.log('new user');
  	var newUser = new User({
  		name:name,
  		email: email,
  		username: uname,
  		password:password
  	});

  	User.createUser(newUser, function(err, user){
  		if(err) {throw err;}
  		console.log(newUser);
  	});

  	req.flash("success_msg","you are now register and can login");
  	res.redirect('/users/login');
  	//req.flash('success_msg', 'registered');
  }

});




router.get('/logout',function(req,res){
	req.logout();
	req.flash('success_msg', 'you are logged out');
	res.redirect('/users/login');
});


passport.use(new LocalStrategy(
	function(username,password,done){
		User.getUserByUsername(username,function(err,user){
			if(err) throw err;
			if(!user){
				return done(null,false,{message:'Unknown User'});
			}
			User.comparePassword(password,user.password, function(err, isMatch){
				if(err)throw err;
				if(isMatch)return done(null,user);
				else
					 return done(null,false,{message:'Inalid password'});
			});
		});
	} 


		/*User.findOne({username: uname},function(err,user){
			if(err){return done(err);}
			if(!user){return done(null,false,{message:'Incorrect username'});
			if(!user.validPassword(password)){return done(null,false,{message:'Incorrect Password'});}
			return done(null,user);				
		 };
		}*/	
	));



passport.serializeUser(function(user,done){
 done(null,user.id);
});

passport.deserializeUser(function(id,done){
	User.getUserById(id, function(err,user){
		done(err,user);
	});
});

router.post('/login', 
	passport.authenticate('local', {successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),
	function(req,res){

		res.redirect('/');
			
	});

router.get('/logout',function(err, res){
	req.logout();
	req.flash('success_msg', 'you have logged out');
	res.redirect('/users/login');
})
module.exports = router;









































