/**
 * Created by abondar on 09.01.16.
 */

var http = require('http')
var fs = require('fs')

var server = http.createServer(function (request, response) { //function(request,response) - is a callback
    getTitles(response)
})

server.listen(8000)

function getTitles(response) {
    fs.readFile('./demoBlog/titles.json', function (error, data) {
        if (error) return hadError(error, response)
        getTemplate(JSON.parse(data.toString()), response)

    })
}

function getTemplate(titles, response) {
    fs.readFile('./demoBlog/index.html', function (error, data) {
        if (error) return hadError(error, response)
        formatHtml(titles, data.toString(), response)
    })
}


function formatHtml(titles, tmpl, response) {
    var html = tmpl.replace('%', titles.join('</li><li>'))
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
}

function hadError(error, response) {
    console.error(error)
    response.end('Server Error')
}