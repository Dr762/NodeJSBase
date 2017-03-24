var net = require('net');
var client = new net.Socket();

client.setEncoding('utf8');

// connect to server
client.connect('8020', 'localhost', function () {
    console.log('conected to server');
    client.write('Browser is for weak');
});

// send data to server on receive
process.stdin.on('data', function (data) {
    client.write(data);
});


// print data from server
client.on('data', function (data) {
    console.log(data);
});


client.on('close', function () {
    console.log('connection is closed');
});


