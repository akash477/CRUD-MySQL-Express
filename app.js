var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'test'
})


connection.connect(function(err) {
	   if (err) throw err
	   console.log('Connected with mysql server..')
})


//All employees
app.get('/', function(req, res){
	connection.query('SELECT * FROM employees', function(err, result) {
	      if (err) throw err
	      
	  	  res.render('index.ejs', {data: result});
	})
});


//Add employee
app.get('/add-employee', function(req, res) {
	res.render('add-employee.ejs');
});


app.post('/add-employee', function(req, res) {
   connection.query('INSERT INTO employees (name, email, phone) VALUES (?, ?, ?)', [req.body.name, req.body.email, req.body.phone], function(err, result) {
      if (err) throw err
      
      res.redirect('/');
    })
});


//Update Employee
app.get('/update-employee/:id', function(req, res) {
	connection.query('SELECT * FROM employees WHERE idemployees =' + req.params.id, function(err, result) {
	      if (err) throw err
	      
	      for(i=0; i<result.length; i++){
	      	var data = result[i];
	      }
	  	  res.render('update-employee.ejs', {data: data});
	})
});

app.post('/update-employee/:id', function(req, res) {

	var user = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone
	}

	connection.query('UPDATE employees SET ? WHERE idemployees = ' + req.params.id, user, function(err, result) {
	      if (err) throw err
	      
	      res.redirect('/');
	})
});


//Delete employee
app.get('/delete-employee/:id', function(req, res) {
	connection.query('DELETE FROM employees WHERE idemployees =' + req.params.id, function(err, result) {
      if (err) throw err

  	  res.redirect('/');
    })
});



app.listen(8080, function(){
  	console.log('Server Started listening on 8080');
});
