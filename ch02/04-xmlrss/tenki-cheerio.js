var RSS = "https://rss-weather.yahoo.co.jp/rss/days/4410.xml";

var client = require("cheerio-httpcli");
var request = require('request');

client.fetch(RSS, function (err, $, res) {
    if (err) {
        console.log(err);
        return;
    }
    $("item > title").each(function () {
        var title = $(this).text();
        var options = {
            uri: 'https://hooks.slack.com/services/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',
            headers: {'Content-Type': 'application/json'},
            json: {
                username: '天気サーバー',
                icon_emoji: ':sunny:',
                text: title
            }
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log('error: ' + response.statusCode + '\n' + response.body);
            }
        });
    });
});