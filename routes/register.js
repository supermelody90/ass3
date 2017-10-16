var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('register', {
        errorMessage:''
    });
})

router.post('/', function(req, res, next) {

    var errorMessage = '';
    //make sure the user types the same password twice
    if (req.body.password !== req.body.passwordConf) {
        errorMessage = "passwords don't match";
        res.render('register',{
            errorMessage:errorMessage
        });
    }

    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        //validate email input
        if (!req.body.email.includes('.com') || !req.body.email.includes('@')) {
            errorMessage = "Incorrect email address";
            res.render('register',{
                errorMessage:errorMessage
            });
        }
        var userData = {
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
            passwordConf : req.body.passwordConf
        };

        User.create(userData, function(err, user) {
            if(err) {
                return next(err);
            } else {
                req.session.userId = user._id;
                console.log(req.session.userId);
                return res.redirect('/account');
            }
        });
    } else {
        errorMessage = 'All fields required!';
        res.render('register',{
            errorMessage:errorMessage
        });
    }
});

module.exports = router;
