var spawn = require('child_process').spawn;
var find = spawn('find',['.','-ls']);
var grep = spawn('grep',['get']);

grep.stdout.setEncoding('utf8');

// pipe find output to grep
find.stdout.pipe(grep.stdin);


// run grep and output results
grep.stdout.on('data',function (data) {
    console.log(data);
});

find.stderr.on('data',function (data) {
    console.log('grep stderr: '+data);
});

grep.stderr.on('data',function (data) {
    console.log('grep stderr: '+data);
});

// exit handling
find.on('close',function (code) {
    if (code !== 0){
        console.log('find process exited with code '+ code);
    }
});

grep.on('exit', function (code) {
    if (code !== 0){
        console.log('grep process exited with code ' + code);
    }
});
