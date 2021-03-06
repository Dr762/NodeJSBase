#!/usr/bin/node

var spawn = require('child_process').spawn;
var program = require('commander');

program
    .version('0.0.1')
    .option('-s, --source [file name]', 'Source graphic file name')
    .option('-f --file [file name]', 'Resulting file name')
    .parse(process.argv);


if ((program.source === undefined) || (program.file === undefined)) {
    console.error('source and file must be provided')
    process.exit()
}

var photo = program.source;
var file = program.file;

var opts = [
    photo,
    "-bordercolor", "snow",
    "-border", "20",
    "-background", "gray60",
    "-background", "none",
    "-rotate", "6",
    "-background", "black",
    "(", "+clone", "-shadow", "60x8+8+8", ")",
    "+swap",
    "-background", "none",
    "-thumbnail", "240x240",
    "-flatten",
    file
];

var im =spawn('convert',opts);

im.stderr.on('data',(data)=>{
    console.log('stderr:', data);
});

im.on('close',(code)=>{
    console.log('child process exited with code ',code);
});