var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/account');
            }
        });
    }
});

module.exports = router;
