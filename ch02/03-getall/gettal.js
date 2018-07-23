var client = require("cheerio-httpcli");
var request = require("request");
var URL = require("url");
var fs = require("fs");
var path = require("path");

var LINK_LEVEL = 3;
var TARGET_URL = "https://nodejs.org/ja/about/";
var list = {};

downloadREC(TARGET_URL, 0);

function downloadREC(url, level) {
    if (level >= LINK_LEVEL) return;
    if (list[url]) return;
    list[url] = true;
    var us = TARGET_URL.split("/");//[ 'https:', '', 'nodejs.org', 'ja', 'about', '' ]
    us.pop(); //[ 'https:', '', 'nodejs.org', 'ja', 'about' ]
    var base = us.join("/"); //https://nodejs.org/ja/about
    if (url.indexOf(base) < 0) return;
    client.fetch(url, {}, function (err, $, res) {
        $("a").each(function (idx) {
            var href = $(this).attr("href");
            if (!href) return;
            href = URL.resolve(url, href);//https://nodejs.org/cdn-cgi/l/email-protection#ff8f8d96899e9c86bf91909b9a958cd1908d98
            href = href.replace(/\#.+$/, "");//https://nodejs.org/cdn-cgi/l/email-protection
            downloadREC(href, level + 1);
        });
        if (url.substr(url.length - 1, 1) == "/") { //urlの末尾から-1した文字から1文字先の文字が"/"だったら
            url += "index.html";
        }
        var savepath = url.split("/").slice(2).join("/");  // https://nodejs.org/ja/about/index.htmlから/で区切った3つ目から表示つまりnodejs.orgから先
        checkSaveDir(savepath);
        if (url.substr(url.length - 1, 1) == "#") { //☆my仕様追加☆urlの末尾から-1した文字から1文字先の文字が"#"だったら返す
            return ;
        }
        console.log(savepath);
        fs.writeFileSync(savepath, $.html()); //ファイル書き込み
    });

    function checkSaveDir(fname) {
        var dir = path.dirname(fname); //nodejs.org/ja/about
        var dirlist = dir.split("/");// [ 'nodejs.org', 'ja', 'about' ]
        var p = "";
        for (var i in dirlist) {
            p += dirlist[i] + "/";
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }
    }
}