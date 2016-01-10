/**
 * Created by abondar on 10.01.16.
 */

    //http server with ui
var http = require('http')
var qs = require('querystring')
var formidable = require('formidable')
var items = []

var server = http.createServer(function (request, response) {
    if ('/' == request.url) {

        switch (request.method) {
            case 'POST':
                    add(request, response)
                break

            case 'GET':
                show(response)
                break

            default:
                badRequest(response)
        }
    } else{
        notFound(response)
    }
})

server.listen(8000)

function show(response){
    var html = '<ul><head><title>TodoList</title></head><body'
               +'<h1>TodoList</h1>'
               +'<ul>'
               +items.map(function(item){
            return '<li>'+item+'</li>'
        }).join('')
              +'</ul>'
              +'<form method="post" action="/">'
              +'<p><input type="text" name="item"/></p>'
              +'<p><input type="submit" value="Add Item"/></p>' +
             +'</form></body></html> '
    response.setHeader('Content-Type','text/html')
    response.setHeader('Content-Length',Buffer.byteLength(html))
    response.end(html)
}

function notFound(response){
    response.statusCode=404
    response.setHeader('Content-Type','text/plain')
    response.end('Not Found')
}

function badRequest(response){
    response.statusCode = 400
    response.setHeader('Content-Type','text/plain')
    response.end('Bad Request')
}

function add(request,response){
    var body = ''
    request.setEncoding('utf8')
    request.on('data',function(chunk){body +=chunk})
    request.on('end',function(){
        var obj = qs.parse(body)
        items.push(obj.item)
        show(response)
    })


}
