/**
 * Created by abondar on 10.01.16.
 */


var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = __dirname

var server = http.createServer(function (request, response) {
    var url = parse(request.url)
    var path = join(root, url.pathname)

    fs.stat(path, function (error, stat) {
        if (error) {
            if ('ENOENT' == error.code) {
                response.statusCode=404
                response.end('Not Found')
            } else{
                response.code = 500
                response.end('Internal server error')
            }
        } else {

            response.setHeader('Content-Length',stat.size)
            var stream = fs.createReadStream(path)
            stream.pipe(response)//response.end() is called in pipe

            stream.on('error', function (error) {
                response.statusCode = 500
                response.end('Internal Server Error')
            })

            stream.on('data', function (chunk) {
                response.write(chunk)
            })

        }
    })




})
server.listen(3000)
