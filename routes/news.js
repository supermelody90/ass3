const express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var Client = require('node-rest-client').Client;
var client = new Client();

const SourceURL = "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=4e96f5858cf740708b136911df132a1e";

//get homepage
router.get('/', function(req, res, next) {

    let articleTitle;
    let articleDescription;
    let imgSrc;

    client.get(SourceURL, function(data, response) {
        var articlesArray = data.articles;

        articleTitle = articlesArray[0].title;
        articleDescription = articlesArray[0].description;
        imgSrc = articlesArray[0].urlToImage;

        res.render('news', {
            newsTitle: articleTitle,
            newsDescription: articleDescription,
            newsImage: imgSrc
        });
    });

});

module.exports = router;
