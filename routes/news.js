const express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

//get homepage
router.get('/', function(req, res, next) {
    res.render('news', {
        pageTitle:'ForexForum'
    });
});
//provide an interface 
module.exports = router;


