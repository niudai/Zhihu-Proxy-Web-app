var httpClient = require('request');
var fs = require('fs');

const id = 'niu-dai-68-44';

var totalCount = 0;
var maleCount = 0;
var femaleCount = 0;
var nomaleCount = 0;
var vipCount = 0;
var notVipCount = 0;

var offset = 0;

var followerAPI = `https://www.zhihu.com/api/v4/members/${id}/followers?offset=${offset}&limit=20`

const request = () => httpClient(followerAPI, { json: true }, (err, _res, _body) => {
    helper(followerAPI);
})

var stream = fs.createWriteStream("followers.txt", { flags: 'a' });

var outputCountInfo = () => stream.write(
    `TotalCount: ${totalCount}
                 \n Male: ${maleCount} \n
                  Female: ${femaleCount} \n
                  VIPCount: ${vipCount} \n
                  `);


var helper = (url, followers) => {
    url = `https://www.zhihu.com/api/v4/members/${id}/followers?offset=${offset}&limit=20`;
    console.log(url);
    httpClient(url, { json: true }, (err, _res, _body) => {
        if (err) {
            return request();
        }
        if (!_body || _body === undefined || _body.data === undefined) {
            return request();
        }
        var profile = _body.data.map(profile => {
            return {
                'url_token': profile.url_token,
                'name': profile.name,
                'gender': profile.gender,
                'headline': profile.headline,
                'is_vip': profile.vip_info.is_vip
            }
        })
        profile.forEach(p => {
            console.log(JSON.stringify(p));
            stream.write(JSON.stringify(p) + "\n");
            totalCount++;
            if (p.gender == -1) {
                maleCount++;
            } else if (p.gender == 1) {
                nomaleCount++;
            } else if (p.gender == 0) {
                femaleCount++;
            }
            if (p.is_vip) {
                vipCount++;
            } else {
                notVipCount++;
            }
        })
        
        if (_body.data.length <= 0) {
            outputCountInfo();
            return
        }
        else {
            helper(url, followers);
            console.log(`TotalCount: ${totalCount}
                 \n Male: ${maleCount} \n
                  Female: ${femaleCount} \n
                  VIPCount: ${vipCount} \n
                  `)
        }
    })
    offset += 20;
}

module.exports = request;
