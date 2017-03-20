var util = require('util');

var today = new Date();

var test = {
    a: {
        b: {
            c: {
                d: 'test'
            },
            c2: 3.50
        },
        b2: true
    },
    a2: today
};


util.inspect.styles.boolean = 'blue';

console.log("output with util.inspect direct format");
var str = util.inspect(test, {depth:4, colors: true});
console.log(str);

console.log("output with console.dir");
console.dir(test, {depth:4, colors: true});

console.log("output with console.log ");
console.log(test);

console.log("output with console.log + JSON strigify");
console.log(JSON.stringify(test,null,4));