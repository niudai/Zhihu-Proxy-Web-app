var express = require('express');
var router = express.Router();
var httpClient = require('request');
var fs = require('fs');

const liveAPI = 'https://api.zhihu.com/lives/1137494035894730752';

const id = 'niu-dai-68-44';

var totalCount = 0;
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
    request(any => {
        console.log('Rendering!!!!!!!!!!!!!!!!!!!!!');
        res.render('followers', {
            subject: '关注者',
            maleCount: maleCount,
            femaleCount: femaleCount,
            nomaleCount: nomaleCount
        })
    })
}

const request = () => httpClient(followerAPI, { json: true }, (err, _res, _body) => {
    helper(followerAPI);
})

var stream = fs.createWriteStream("followers.txt", { flags: 'a' });

var helper = (url, followers) => {
    url = `https://www.zhihu.com/api/v4/members/${id}/followers?offset=${offset}&limit=20`;
    console.log(url);
    httpClient(url, { json: true }, (err, _res, _body) => {
        if (err) {
            return 
        }
        // console.log(_body);
        var profile = _body.data.map(profile => {
            return {
                'url_token': profile.url_token,
                'name': profile.name,
                'gender': profile.gender
            }
        })
        profile.forEach(p => {
            console.log(JSON.stringify(p));
            stream.write(JSON.stringify(p) + "\n");
            totalCount += 1;
            if (p.gender == -1) {
                maleCount += 1;
            } else if (p.gender == 1) {
                nomaleCount += 1;
            } else if (p.gender == 0) {
                femaleCount += 1;
            }
        })
        
        if (offset > 20000) {
            return
        }
        else {
            helper(url, followers);
            console.log(`FOLLOWERS::::::::::::::::::${totalCount}`)
        }
    })
    offset += 20;
}

module.exports = router;
