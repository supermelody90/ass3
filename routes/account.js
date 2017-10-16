var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {

    var isLoggedin = false;
    if(!!req.session.userId) {
        isLoggedin = true;
        console.log("this block has been executed!!!");
    }

    //Judge the current visitor is a user or a guest based on session
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not a member, please login or register');
                err.status = 400;
                return res.render('account', {
                    isLoggedin: isLoggedin,
                });
            } else {
                return res.render('account', {
                    isLoggedin: isLoggedin,
                    userName: user.username,
                    userEmail: user.email
                });
            }
        }
    });

});

// logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
      // delete user session
      req.session.destroy(function (err) {
          if (err) {
              return next(err);
          } else {
              return res.redirect('/');
          }
      });
  }
});


module.exports = router;
