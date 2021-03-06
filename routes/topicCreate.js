const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var router = express.Router();
var fileFromData = require('../data.json');

//get homepage
router.get('/', function(req, res, next) {
    res.render('topicCreate', {

    });
});

//receive data from form then write them into file
router.post('/', function(req, res, next) {
    var reqData = req.body;
    delete reqData.topicSubmit;

    var newData = {
        "contents":reqData.contents,
        "title":reqData.title,
        "username": req.session.username
    };
    fileFromData.topics.push(newData);
    fs.writeFileSync('./data.json', JSON.stringify(fileFromData,null,2), 'utf8');
    res.render('forum', {
        pageTitle:'ForexForum'
    });
});

module.exports = router;
