var mongoose = require('mongoose');

module.exports = mongoose.model('Tasks', {
	name : String,
	startDate:Date,
	endDate:Date,
	 desc: String,
	 status:Boolean
});