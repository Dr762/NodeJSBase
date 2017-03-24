var fs = require('fs');

var readable = fs.createReadStream('./format_options.js').setEncoding('utf8');

var data = '';
readable.on('data',function (chunk) {
    data += chunk;
});

readable.on('end',function () {
    console.log(data)
});