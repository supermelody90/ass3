const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var router = express.Router();

//get homepage
router.get('/', function(req, res, next) {
    res.render('forum', {
        pageTitle:'ForexForum'
    });
});

router.post('/forum', function(req, res, next) {
    
});

module.exports = router;
