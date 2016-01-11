/**
 * Created by abondar on 11.01.16.
 */
module.exports = setup

function setup(format){
    var regexp = /:(\w+)/g

    return function logger(request, response, next) {
        var str = format.replace(regexp,function(match,property){
            return request[property]
        })
        console.log(str)
        next()
    }
}