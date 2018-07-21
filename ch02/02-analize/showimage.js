var client = require("cheerio-httpcli");
var URL = require("url");

var url = "http://ja.wikipedia.org/wiki/";
url += encodeURIComponent("イヌ");
var param = {};
client.fetch(url, function (err, $, res) {
    if (err) {
        console.log("Error", err);
        return;
    }
    $("img").each(function (idx) {
        var src = $(this).attr("src");
        src = URL.resolve(url,src);
        console.log(src);
    });
});