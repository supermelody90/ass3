var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('login', {
        errorMessage:''
    });
});

router.post('/', function(req, res, next) {
    var errorMessage = '';

    //first validate if the input is empty
    if (req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
            if (error || !user) {
                errorMessage = 'Incorrect email or password';
                res.render('login',{
                    errorMessage:errorMessage
                });
            } else {
                req.session.userId = user._id;
                req.session.username = user.username;
                return res.redirect('/account');
            }
        });
    } else {
        errorMessage = 'All fields required';
        res.render('login',{
            errorMessage:errorMessage
        });
    }
});

module.exports = router;
