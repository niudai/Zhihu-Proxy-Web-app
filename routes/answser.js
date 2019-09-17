var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');
let questionId = '327155365';

let answerId = '819299062';
let offset = 0;
let includeContent = 'data[*].is_normal,content;';

const answerAPI = `https://www.zhihu.com/api/v4/questions/${questionId}/answers?include=${includeContent}?offset=${offset}`


/* GET home page. */
router.get('/', function(req, res, next) {
  httpClient(answerAPI, {json: true }, (err, _res, body) => {
    console.log(answerAPI);
    console.log(body);
    let answers = body.data
    let title = body.data[0].question.title
    console.log(answers);
    res.render('answer', { title,  answers: answers})
  });
});



module.exports = router;
