const express = require('express');
const todoController = require('./controllers/todoController')
//const ejs = require('ejs');
const bodyParser = require('body-parser');

var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public')); 

//Fire Controllers
todoController(app);

//Listning to port
app.listen(4000);
console.log('Listning to 4000')