var express = require('express');
var router = express.Router();
var httpClient = require('request');

let questionId = '345195246';

let answerId = '819299062';

const answerAPI = `https://www.zhihu.com/question/${questionId}/answer/${answerId}`;


/* GET home page. */
router.get('/', function(req, res, next) {
  httpClient(answerAPI, { json: true }, (err, _res, body) => {
    console.log(body);
    res.render('answer', { title: body.subject,  answer: body.description_html})
    console.log(body.subject)
  })
});



module.exports = router;
