var express = require('express');
var router = express.Router();
//Index /HomePage


var ensureAuthenticated = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else
		//req.flash('error_msg','your are not logged in');
		res.redirect('/users/login');
}

router.get('/',ensureAuthenticated, function(req, res){
   res.render('index');
});
module.exports = router;