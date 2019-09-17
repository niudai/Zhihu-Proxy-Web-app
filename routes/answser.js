var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');
let questionId = '345195246';

let answerId = '819299062';

const answerAPI = `https://www.zhihu.com/question/${questionId}/answer/${answerId}`;


/* GET home page. */
router.get('/', function(req, res, next) {
  httpClient(answerAPI, { }, (err, _res, body) => {
    
    // console.log(body);
    const root = HtmlParser.parse(body);
    console.log(root.firstChild.structure);
    console.log(root.querySelector('#js-initialData').);
    res.render('answer', { title: '答案',  answer: body})
  });
});



module.exports = router;
