//Rhinoインストールしていないため未実行

var url = "http://kujirahand.com";
var savepath = "html/test2.html"

var aUrl = new java.net.URL(url);
var conn = aUrl.openConnection();
var ins = conn.getInputStream();
var file = new java.io.FileOutputStream(savepath);
var out = new java.io.FileOutputStream(file);

var b;
while ((b = ins.read() != -1)){
    out.write(b);
}
out.close();
ins.close();