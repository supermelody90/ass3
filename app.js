//import the packages
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const validator = require('express-validator');
const helmet = require('helmet');

var app = express();

//connect to database
mongoose.connect('mongodb://localhost/ass3');
var db = mongoose.connection;

//handle database err
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

//use sessions for tracking login
app.use(session({
    secret : 'default',
    resave : false,
    saveUninitialized : true,
    store : new MongoStore({
        mongooseConnection: db
    })
}));

//import the url routing models
var routes = require('./routes/index');
var news = require('./routes/news');
var forum = require('./routes/forum');
var topicCreate = require('./routes/topicCreate');
var account = require('./routes/account');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');

//the global data for reading data from file
app.locals.filedata = require('./data.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use the middleware and set the url routing
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(validator());
app.use(helmet());
//the xssFilter helps to protect against XSS attack
app.use(helmet.xssFilter());
//xframe is used to protect against clickjacking attack
app.use(helmet.frameguard('deny'));
app.use(helmet.hidePoweredBy());
app.use(helmet.noCache());

app.use('/', routes);
app.use('/news', news);
app.use('/forum', forum);
app.use('/topicCreate', topicCreate);
app.use('/account', account);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);

app.use(function(req, res, next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

app.listen(8080);
