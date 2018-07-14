download(
    "https://ja.wikipedia.org/wiki/JavaScript",
    "html/JavaScript.html",
    function() {console.log("ok,JavaScript.");});
download(
    "https://ja.wikipedia.org/wiki/Node.js",
    "html/Node.js.html",
    function() {console.log("ok,Node.js.");});

function download(url,savepath,callback) {
    var https = require("https");
    var fs = require("fs");
    var outfile = fs.createWriteStream(savepath);
    var req = https.get(url,function (res) {
        res.pipe(outfile);
        res.on("end",function () {
            outfile.close;
            callback();
        });
    });
}