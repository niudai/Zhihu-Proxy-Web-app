var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');

let offset = 0;
let includeContent = 'data[*].is_normal,content;';

/* GET home page. */
router.get('/:questionId', function (req, res, next) {
  let questionId = req.params.questionId;
  let answerAPI = `https://www.zhihu.com/api/v4/questions/${questionId}/answers?include=${includeContent}?offset=${offset}`
  httpClient(answerAPI, { json: true }, (err, _res, body) => {
    console.log(answerAPI);
    let answerHtmlRoots = body.data.map(answer => HtmlParser.parse(answer.content));
    let imgAttrs = answerHtmlRoots.filter(root => root.querySelector('img')).map(root => root.querySelectorAll('img'));
    imgAttrs.forEach(
      attr => {
        attr.forEach(img => {
          let src = imageUrlConverter(img.rawAttributes['data-actualsrc']);
          img.rawAttributes.src = src;
          img.rawAttributes.style = 'style = \"width: 90%\"';
          img.rawAttrs = `src = \"${src}\" style = \"width: 90%\"`;
          console.log(img.rawAttributes);
          console.log(img.rawAttr);
        }
        );
    });
    body.data.forEach((answer, index) => answer.content = answerHtmlRoots[index].toString());
    res.send(body);
  });
})

imageUrlConverter = s => {
  if (s) {
    subString = s.substring(s.lastIndexOf('/') + 1, s.length);
    console.log(subString);
    finalString = 'pic/' + subString;
    return finalString;
  } else return '';
}



module.exports = router;
