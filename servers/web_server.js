var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var path = require('path');

base = '/home/abondar/IdeaProjects/NodeJSBase/servers';

http.createServer(function (req, res) {
    pathname = path.normalize(base + req.url);
    console.log(pathname);

    fs.stat(pathname, function (err, stats) {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.write('Resource missing 404\n');
            res.end();
        } else if (stats.isFile()) {
            var type = mime.lookup(pathname);
            console.log(type);

            res.setHeader('Content-Type', type);

            var file = fs.createReadStream(pathname);

            file.on("open", function () {
                res.statusCode = 200;
                file.pipe(res);
            });

            file.on("error", function (err) {
                console.log(err);
                res.writeHead(403);
                res.write('File  permission problem');
                res.end();
            });
        } else {
            res.writeHead(403);
            res.write('Directory access is forbidden');
            res.end();
        }
    });
}).listen(8024);

console.log('Server is running on 8024');