var express = require('express');
var router = express.Router();
var httpClient = require('request');
var HtmlParser = require('node-html-parser');
var imageUrlConverter = require('../util/imageUrlConverter');

let offset = 0;
let includeContent = 'data[*].is_normal,content,created_time,updated_time,excerpt';

/* GET home page. */
router.get('/answer/:urlToken', function (req, res, next) {
  let urlToken = req.params.urlToken;
  let answerAPI = `https://www.zhihu.com/api/v4/members/${urlToken}/answers?include=${includeContent}&offset=${offset}`
  console.log('Works!!');
  httpClient(answerAPI, { json: true }, (err, _res, body) => {
    console.log(answerAPI);
    let answerHtmlRoots = body.data.map(answer => HtmlParser.parse(answer.content));
    let imgAttrs = answerHtmlRoots.filter(root => root.querySelector('img')).map(root => root.querySelectorAll('img'));
    
    // convert img src in answer inner html
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

    // convert img src for avatar
    body.data.forEach( answer => {
      answer.author.avatar_url = imageUrlConverter(answer.author.avatar_url);
    })

    // convert 
    body.data.forEach((answer, index) => answer.content = answerHtmlRoots[index].toString());
    res.send(body);
  });
})





module.exports = router;
