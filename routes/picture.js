var express = require('express');
var router = express.Router();
var httpClient = require('request');
var fs = require('fs');

let offset = 0;
let includeContent = 'data[*].is_normal,content;';

/* GET home page. */
router.get('', function (req, res, next) {
  let answerAPI = `https://pic3.zhimg.com/80/v2-d42f78b022ce1264cb45f3ce66835f74_hd.jpg`
  httpClient(answerAPI, { json: false }, (err, _res, body) => {
    res.on
    res.set('Content-Type', 'image/jpeg');
    var stream = fs.createWriteStream("test.jpg", { flags: 'a' });
    stream.write(body);
    res.status(200);
    res.send(body);
  });
})




module.exports = router;
