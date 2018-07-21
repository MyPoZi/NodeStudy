var client = require("cheerio-httpcli");

var url = "https://www.aozora.gr.jp/index_pages/person81.html";
var param = {};
client.fetch(url, function (err, $, res) {
    if (err) {
        console.log("Error", err);
        return;
    }
    $("a").each(function (idx) {
        var text = $(this).text();
        var href = $(this).attr("href");
        console.log(text+":"+ href);
    });
});