const express = require('express');
const mongodb = require('mongodb');
const app = express();

const connectionString = 'mongodb+srv://TaskAppUsername:TaskAppPassword123@cluster0.dsmzt.mongodb.net/TaskApp?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, async function(err, client) {
    exports.tasksCollection = await client.db().collection("Tasks")
    exports.usersCollection = 
    app.listen(3000)
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(function(req, res, next) {
//     req.local.messages = flash("errors")
//     req.local.messages = flash("success")
//     next()
// })

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', require('./router'));