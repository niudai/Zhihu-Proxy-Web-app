var express = require('express');
var router = express.Router();
var httpClient = require('request');
var fs = require('fs');
const path = require('path');

const IMAGE_DIRCTORY = '/images'

/* GET home page. */
router.get('/:imageName', function (req, res, next) {
  let imageName = req.params.imageName;
  let answerAPI = `https://pic3.zhimg.com/80/${imageName}`
  // httpClient(answerAPI, { json: false }, (err, _res, body) => {
  // }).pipe(fs.createWriteStream(`${IMAGE_DIRCTORY}/${imageName}.jpg`, { flags: 'a' }))
  httpClient(answerAPI, { json: false }, (err, _res, body) => {
  }).pipe(res);
  // res.sendFile(`${IMAGE_DIRCTORY}/${imageName}.jpg`);
  // res.sendFile(path.resolve(`public/images/${imageName}.jpg`));
})

let callback = (dir, res) => {
  
}

module.exports = router;
