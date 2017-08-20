const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

var routes = require('./routes/index');
var news = require('./routes/news');
var forum = require('./routes/forum');
var topicCreate = require('./routes/topicCreate');

var app = express();

app.locals.filedata = require('./data.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
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

// module.exports = app;
app.listen(8080);
