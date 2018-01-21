/**
 * Created by abondar on 09.01.16.
 */

var events = require('events')

var net = require('net')
var util = require('util')


var channel = new events.EventEmitter();

channel.clients = {}
channel.subscriptions = {}

channel.setMaxListeners(50)
channel.on('error', function (error) {
    console.error('Error: ' + error.message)
})

channel.on('join', function (id, client) {
    var welcome = "Welcome,currently online" + this.listeners('broadcast').length
    client.write(welcome)
    channel.clients[id] = client
    channel.subscriptions[id] = function (senderId, message) {
        if (id != senderId) {
            channel.clients[id].write(message)
        }
    }
    channel.on('broadcast', this.subscriptions[id])
})


channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id])

    channel.emit('broadcast', id, id + 'has left ')

})

channel.on('shutdown', function () {
    channel.emit('broadcast', '', "Chat is closed")
    channel.removeAllListeners('broadcast')
})

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort

    channel.emit('join', id, client)


       client.on('data', function (data) {
        data = data.toString()
        if (data == "shutdown\r\n") {
            channel.emit('shutdown')
        }
        channel.emit('broadcast', id, data)
    })

    client.on('close', function () {
        channel.emit('leave', id)
    })

})

server.listen(8080)