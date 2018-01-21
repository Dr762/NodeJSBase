var http = require('http');
var server = http.createServer();

server.on("request",function (req, res) {
    console.log("request");
    res.writeHead(200,{"Content-Type": "text/plain"});
    res.end("Hello World\n");
});

server.on("connection",function () {
    console.log("connection");
});

server.listen(8024,function () {
    console.log("listening");
});

console.log("Server running on port 8024");