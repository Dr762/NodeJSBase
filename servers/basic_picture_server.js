var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var name = require('url').parse(req.url,true).query.name;

    if (name===undefined){
        name = "world";
    }

    if (name=="dragon"){
        var file="dragon.jpg";
        fs.stat(file, function (err, stat) {
            if (err){
                console.error(err);
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("No Dragon for now.");
            } else {
                var img = fs.readFileSync(file);
                res.contentType = "image/img";
                res.contentLength = stat.size;
                res.end(img,"binary");
            }
        });
    } else {
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Hello " + name + "\n");
    }
}).listen(8024);

console.log("Web Server is running at port 8024");