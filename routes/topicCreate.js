const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var router = express.Router();
var fileFromData = require('../data.json');

//get homepage
router.get('/', function(req, res, next) {
    res.render('topicCreate', {
        pageTitle:'ForexForum'
    });
});

router.post('/', function(req, res, next) {
    var reqData = req.body;
    delete reqData.topicSubmit;
    var newData = {
        "contents":reqData.contents,
        "userName":reqData.userName
    };
    fileFromData.topics.push(newData);
    console.log(fileFromData);
    fs.writeFileSync('./data.json', JSON.stringify(fileFromData,null,2), 'utf8');
    res.render('forum', {
        pageTitle:'ForexForum'
    });
});

module.exports = router;
