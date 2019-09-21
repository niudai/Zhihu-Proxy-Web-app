var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');

let answerId = '819299062';
let offset = 0;
let includeContent = 'data[*].is_normal,content;';

/* GET home page. */
router.get('/:questionId', function(req, res, next) {
  let questionId = req.params.questionId;
  let answerAPI = `https://www.zhihu.com/api/v4/questions/${questionId}/answers?include=${includeContent}?offset=${offset}`
  httpClient(answerAPI, {json: true }, (err, _res, body) => {
    console.log(answerAPI);
    // console.log(body);
    let answerHtmlRoots = body.data.map(answer => HtmlParser.parse(answer.content));
    // answerHtmlRoots.forEach(root => console.log(root.toString()));
    let imgAttrs = answerHtmlRoots.filter(root => root.querySelector('img')).map(root => root.querySelector('img').rawAttributes);
    imgAttrs.forEach(attr => console.log(attr['data-original']));
    res.send(body.data);
    // let title = body.data[0].question.title
    // console.log(answers);
    // res.render('answer', { title,  answers: answers})
  });
});



module.exports = router;
