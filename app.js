const express = require('express');
const path = require('path');

var routes = require('./routes/index')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);
