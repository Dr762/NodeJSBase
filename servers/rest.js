/**
 * Created by abondar on 10.01.16.
 */

var http = require('http')
var url = require('url')
var items = []

var server = http.createServer(function (request, response) {

        switch (request.method) {
            case 'POST':
                var item =''
                request.setEncoding('utf8')

                request.on('data',function(chunk){
                    item +=chunk
                })

                request.on('end',function(chunk){
                    items.push(item)
                    response.end("OK\n")
                })
                break

            case 'GET':
                var body = items.map(function(item,i){
                    return i + ') '+item
                }).join('\n')
                response.setHeader('Content-Length',Buffer.byteLength(body))
                response.setHeader('Content-Type','text/plain; charset="utf-8" ')
                response.end(body)
                break

            case 'DELETE':
                var path = url.parse(request.url).pathname
                var i = parseInt(path.slice(1),10)

                if (isNaN(i)){
                    response.statusCode = 400
                    response.end('Invalid item id')
                } else if (!items[i]){
                    response.statusCode = 404
                    response.end('Item not found')
                } else {
                    items.splice(i,1)
                    response.end('OK\n')
                }
                break
        }

})

server.listen(8000)