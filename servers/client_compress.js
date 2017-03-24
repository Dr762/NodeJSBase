var http = require('http');
var zlib = require('zlib');
var fs = require ('fs');

var gzip = zlib.createGzip();

var options = {
    hostname: 'localhost',
    port: 8024,
    method: 'POST',
    headers: {
        'Content-Type': 'application/javascript',
        'Content-Encoding': 'gzip,deflate'
    }
};

var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    var data = '';

    res.on('data',function (chunk) {
        data += chunk;
    });

    res.on('end', function () {
        console.log(data)
    });

});

req.on('error', function (e) {
   console.log('problem with request: ' + e.message);
});

var readable = fs.createReadStream('./test.png');

readable.pipe(gzip).pipe(req);