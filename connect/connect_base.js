/**
 * Created by abondar on 11.01.16.
 */

//middleware func. next - callback func for indication next middleware fun can start
function logger(request, response, next) {
    console.log('%s %s', request.method, request.url)
    next()
}

function errorHandler(){
    var env = process.env.NODE_ENV || 'development'
    return function (error,request,response,next){
        response.statusCode = 500
        switch (env){
            case 'development':
                response.setHeader('Content-Type','application/json')
                response.end(JSON.stringify(error))
                break
            default:
                response.end('Server error')
        }
    }
}

var connect = require('connect')
var logger = require('./logger')
var router = require('./router')
var app = connect()
var routes = {
    GET: {
        '/users':function(request,response){
            response.end('tobi,loki,ferret')
        },
        '/user/:id':function(request,response,id){
            response.end('user '+id)
        }
    },
    DELETE:{
        '/user/:id': function(request,response,id){
            response.end('deleted user '+id)
        }
    }

}

app.use(logger(':method :url'))
app.use(router(routes))
app.use(errorHandler())

app.use(function(request,response){
    response.setHeader('Set-Cookie','name=sf; ' +
        'Expires= Tue, 08 Jun 2021 10:18:14 GMT')

    response.end()
})
app.listen(3000)
