var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('register', {
        pageTitle : "ForexForum"
    });
})

router.post('/', function(req, res, next) {
    //make sure the user types the same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('passwords dont match');
        err.status = 400;
        res.send("passwords don't match");
        return next(err);
    }

    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
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
        var err = new Error('All fields required!');
        err.status = 400;
        return next(err);
    }
});

module.exports = router;
