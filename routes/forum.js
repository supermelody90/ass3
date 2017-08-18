const express = require('express');
var router = express.Router();

//get homepage
router.get('/', function(req, res, next) {
    res.render('forum', {
        pageTitle:'ForexForum'
    });
});

module.exports = router;
