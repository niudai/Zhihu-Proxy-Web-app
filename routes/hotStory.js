var express = require('express');
var router = express.Router();
var httpClient = require('request');
const storyTypes = [
    { storyType: 'sport', ch: '运动'},
    { storyType: 'science', ch: '科学'},
    { storyType: 'fashion', ch: '时尚'},
    { storyType: 'film', ch: '影视'},
    { storyType: 'digital', ch: '数码'},
    { storyType: 'total', ch: '全站'}
]
let storyType = { storyType: 'sport', ch: '运动'};

let hotStoryAPI = `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/${storyType.storyType}?desktop=true`


/* GET home page. */
router.get('/:storyType', function(req, res, next) {
  storyTypes.forEach(type => {
      console.log(type.storyType + '  |||  ' + req.params.storyType)
      if (type.storyType === req.params.storyType) {
          storyType = type;
      }
  })
  hotStoryAPI = `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/${storyType.storyType}?desktop=true`
  httpClient(hotStoryAPI, {json: true }, (err, _res, body) => {
    console.log(hotStoryAPI);
    // console.log(body);
    let questions = body.data
    // console.log(questions);
    res.send(questions);
    // res.render('hotStory', { title,  questions})
  });
});



module.exports = router;
