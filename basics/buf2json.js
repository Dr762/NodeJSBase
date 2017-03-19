
"use strict";

let buf = new Buffer("Example");
let json = JSON.stringify(buf);

let buf2 = new Buffer(JSON.parse(json).data);
console.log(buf2.toString())