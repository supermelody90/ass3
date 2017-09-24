var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {

    var isLoggedin = false;
    if(!!req.session.userId) {
        isLoggedin = true;
        console.log("this block has been executed!!!");
    }


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
                // return next(err);
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

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
      // delete session object
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
