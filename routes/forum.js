const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('forum', {

    });
});

module.exports = router;
