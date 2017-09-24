var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('login', {
        
    });
});

router.post('/', function(req, res, next) {
    if (req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
            if (error || !user) {
                var err = new Error('Incorrect email or password');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/account');
            }
        });
    } else {
        var err = new Error('All fields required!');
        err.status = 400;
        return next(err);
    }
});

module.exports = router;
