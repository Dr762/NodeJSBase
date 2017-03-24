// create cert, private and public key before you run this demo

var fs = require('fs');
var https = require('https');

var privateKey = fs.readFileSync('site.key').toString();
var certificate = fs.readFileSync('final.crt').toString();

var options = {
    key: privateKey,
    cert: certificate
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Hello Secure World\n");

}).listen(443);


