//var Todo = require('./models/todo');
var Tasks = require('./models/tasks');
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/tasks', function(req, res) {

		// use mongoose to get all todos in the database
		Tasks.find(function(err, tasks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(tasks); // return all todos in JSON format
		});
	});


	// create todo and send back all todos after creation
	app.post('/api/tasks', function(req, res) {
        var today_date= new Date().toDateString();
		// create a todo, information comes from AJAX request from Angular
		Tasks.create({
			name : req.body.taskname,
			startDate:today_date,
			endDate:null,
			 desc: req.body.task.desc,
			 status:false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Tasks.find(function(err, tasks) {
				if (err)
					res.send(err)
				res.json(tasks);
			});
		});

	});

	// delete a todo
	app.delete('/api/tasks/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

		// application -------------------------------------------------------------
	/*app.get('*', function(req, res) {
		res.sendFile('./public/Dashboard.html'); // load the single view file (angular will handle the page changes on the front-end)
	});*/
};