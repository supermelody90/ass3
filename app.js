//import the packages
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

//import the url routing models
var routes = require('./routes/index');
var news = require('./routes/news');
var forum = require('./routes/forum');
var topicCreate = require('./routes/topicCreate');

var app = express();

//the global data for reading data from file
app.locals.filedata = require('./data.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use the middleware and set the url routing
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/news', news);
app.use('/forum', forum);
app.use('/topicCreate', topicCreate);

app.use(function(req, res, next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

app.listen(8080);
