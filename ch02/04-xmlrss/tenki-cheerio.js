var RSS = "https://rss-weather.yahoo.co.jp/rss/days/5610.xml";

var client = require("cheerio-httpcli");

client.fetch(RSS,function (err,$,res) {
    if (err){ console.log(err); return;}
    $("item > title").each(function () {
        var title = $(this).text();
        console.log(title);
    })
});