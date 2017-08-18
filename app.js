const express = require('express');
const path = require('path');

var routes = require('./routes/index')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

// module.exports = app;
app.listen(8080);
