var express = require('express');
var router = express.Router();
var httpClient = require('request');
var fs = require('fs');

const IMAGE_DIRCTORY = 'public/images'

/* GET home page. */
router.get('/:imageName', function (req, res, next) {
  let imageName = req.params.imageName;
  let answerAPI = `https://pic3.zhimg.com/80/${imageName}.jpg`
  httpClient(answerAPI, { json: false }, (err, _res, body) => {
    // res.set('Content-Type', 'image/jpeg');

  }).pipe(fs.createWriteStream(`${imageName}.jpg`, { flags: 'a' }))
  res.send('image stored');
})



module.exports = router;
