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
//provide an interface 
module.exports = router;
