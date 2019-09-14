var express = require('express');
var router = express.Router();
var httpClient = require('request');
var fs = require('fs');

const liveAPI = 'https://api.zhihu.com/lives/1137494035894730752';

const id = 'niu-dai-68-44';

var maleCount = 0;
var femaleCount = 0;
var nomaleCount = 0;

var offset = 0;

var followerAPI = `https://www.zhihu.com/api/v4/members/${id}/followers?offset=${offset}&limit=20`


/* GET home page. */
router.get('/', (req, res, next) => {
    handler(req, res, next);
});

var handler = (req, res, next) => {
    request(followerNames => {
        console.log('Rendering!!!!!!!!!!!!!!!!!!!!!');
        res.render('followers', {
            subject: '关注者',
            followers: followerNames,
            maleCount: maleCount,
            femaleCount: femaleCount,
            nomaleCount: nomaleCount
        })
    })
}

var request = subscriber => httpClient(followerAPI, { json: true }, (err, _res, _body) => {
    var followers = [];
    helper(followerAPI, followers, data => subscriber(data));
})

var stream = fs.createWriteStream("followers.txt", { flags: 'a' });
console.log(new Date().toISOString());

var helper = (url, followers, _callback) => {
    url = `https://www.zhihu.com/api/v4/members/${id}/followers?offset=${offset}&limit=20`;
    console.log(url);
    httpClient(url, { json: true }, (err, _res, _body) => {
        console.log(_body);
        var profile = _body.data.map(profile => {
            return {
                'url_token': profile.url_token,
                'name': profile.name,
                'gender': profile.gender
            }
        })
        for (p in profile) {
            if (p.gender = -1) {
                maleCount += 1;
            } else if (p.gender = 1) {
                nomaleCount += 1;
            } else if (p.gender = 0) {
                femaleCount += 1;
            }
        }
        stream.write(JSON.stringify(profile) + "\n");
        followers = followers.concat(_body.data.map(o => o.name))
        if (followers.length > 1000) {
            _callback(followers);
            return
        }
        else {
            helper(url, followers, _callback);
            console.log(`FOLLOWERS::::::::::::::::::${followers.length}`)
        }
    })
    offset += 20;
}

module.exports = router;
