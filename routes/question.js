var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');
var KeyValueParser = require('../util/keyValueParser');

let answerId = '819299062';
let offset = 0;
let includeContent = 'data[*].is_normal,content;';

/* GET home page. */
router.get('/:questionId', function (req, res, next) {
  let questionId = req.params.questionId;
  let answerAPI = `https://www.zhihu.com/api/v4/questions/${questionId}/answers?include=${includeContent}?offset=${offset}`
  httpClient(answerAPI, { json: true }, (err, _res, body) => {
    console.log(answerAPI);
    // console.log(body);
    let answerHtmlRoots = body.data.map(answer => HtmlParser.parse(answer.content));
    // answerHtmlRoots.forEach(root => console.log(root.toString()));
    let imgAttrs = answerHtmlRoots.filter(root => root.querySelector('img')).map(root => root.querySelectorAll('img'));
    // console.log(imgAttrs);
    imgAttrs.forEach(
      attr => {
        attr.forEach(img => {
          // let parser = new KeyValueParser(img.rawAttrs, { quoted: '\"',  aync: false});
          // let items = parser.run();
          img.rawAttributes.src = img.rawAttributes['data-actualsrc'];
          img.rawAttrs = `src = \" ${img.rawAttributes['data-actualsrc']} \"`;
          // img.rawAttrs = `src = \"${items['data-original']}}\"`;
          console.log(img.rawAttributes);
          console.log(img.rawAttr);
        }
        );
    });
    // body.data.forEach((answer, index) => {
    //   // answer.content = answerHtmlRoots[index].toString();
    //   // console.log(answer.content);
    //   console.log(answerHtmlRoots[index].toString());
    // })
    // console.log(imgAttrs);
    // res.send(body.data);
    res.send(answerHtmlRoots.toString());
  });
})



module.exports = router;
