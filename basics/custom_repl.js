var repl = require('repl');

var context = repl.start({
    prompt: '>> ',
    ignoreUndefied: true,
    replMode: repl.REPL_MODE_STRICT
}).context;


//preload moules
context.request = require('request');
context.underscore = require('underscore');
context.http = require('http');
