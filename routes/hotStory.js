var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');
let storyType = { storyType: 'sport', ch: '运动'};

const hotStoryAPI = `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/${storyType.storyType}?desktop=true`


/* GET home page. */
router.get('/', function(req, res, next) {
  httpClient(hotStoryAPI, {json: true }, (err, _res, body) => {
    console.log(hotStoryAPI);
    console.log(body);
    let questions = body.data
    let title = storyType.ch;
    console.log(questions);
    res.render('hotStory', { title,  questions})
  });
});



module.exports = router;
