var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10; 


//User schema

var UserSchema = mongoose.Schema({
	username:{type: String,index: true},
	password: {type: String},
	email:{type:String},
	name:{type:String}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10,function(err,salt){
		if(err){
			return console.error(err);
		}
         console.log(newUser.name);
	    bcrypt.hash(newUser.password,salt,function(err,hash){
	    	if(err){
			return console.error(err);
		     }
            newUser.password = hash;
            newUser.save(callback);
		});
	    
		/*bcrypt.compare(newUser.password,hash, function(err,isMatch){
			if(err){ return console.error(err);}
			console.log('do they match?', ismatch);
		});*/
	});

	}

	module.exports.getUserByUsername = function(username,callback){
		var query = {username: username};
		User.findOne(query, callback);
	}

	module.exports.comparePassword= function(candidatePassword, hash, callback){
		bcrypt.compare(candidatePassword,hash,function(err,isMatch){
			if(err) {return console.log(err);}
			else{callback(null,isMatch);}
		});
	}

	module.exports.getUserById =function(id, callback){
		User.findById(id, callback);
	}
