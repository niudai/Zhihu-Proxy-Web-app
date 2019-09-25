var express = require('express');
var router = express.Router();
var httpClient = require('request');

const liveAPI = 'https://api.zhihu.com/lives/1137494035894730752';

const id = 'niu-dai-68-44';

const offset = 0;

const followerAPI = `https://www.zhihu.com/api/v4/members/${id}/followers?offset=${offset}&limit=20`


/* GET home page. */
router.get('/', function(req, res, next) {
  httpClient(liveAPI, { json: true }, (err, _res, body) => {
    console.log(body);
    res.sendFile('index', { subject: body.subject,  description_html: body.description_html})
    console.log(body.subject)
  })
});



module.exports = router;
