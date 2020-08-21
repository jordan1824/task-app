const express = require('express');
const mongodb = require('mongodb');
const app = express();

const connectionString = 'mongodb+srv://TaskAppUsername:TaskAppPassword123@cluster0.dsmzt.mongodb.net/TaskApp?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    exports.tasksCollection = client.db().collection("Tasks")
    app.listen(3000)
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', require('./router'));