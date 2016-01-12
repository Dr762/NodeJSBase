/**
 * Created by abondar on 12.01.16.
 */

var app = require('http').createServer(handler)
var io = require('socket.io').listen(app)
var fs = require('fs')

var html = fs.readFileSync('index.html','utf8')

function handler(request,response){
    response.setHeader('Content-Type','text/html')
    response.setHeader('Content-Length',Buffer.byteLength(html,'utf8'))
    response.end(html)

}

function tick(){
    var now =new Date().toUTCString()
    io.sockets.send(now)
}

setInterval(tick,1000)

app.listen(8000)