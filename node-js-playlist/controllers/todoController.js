const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb+srv://deep:deep@cluster0-rqgd0.mongodb.net/todoNodeDB?retryWrites=true&w=majority');

//Create a schema - this is like a blueprint
var todoSchema = mongoose.Schema({
    item: String
});

//Create a model based on schema
var TodoModel = mongoose.model('Todo', todoSchema);

// var itemOne = TodoModel({item: 'Get  Movie Ticket'}).save(function(err) {
//     if(err) throw err;
//     console.log('Item saved.')
// })
//var data = [{item: 'First Task'},{item: 'Second Task'},{item: 'Third Task'}];

var urlEncodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app) {
    app.get('/todo', function(req, res) {
        //Get data from mongoDB and pass it to view
        TodoModel.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {data: data});
        })
        
    });

    app.post('/todo', urlEncodedParser, function(req, res) {
        //Get data from view and pass it to mongoDB
        TodoModel(req.body).save(function(err, data) {
            if(err) throw err;
            res.send(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        //Delete requested item from DB
        TodoModel.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
}