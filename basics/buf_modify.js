var buf1 = new Buffer("Buffer Buffer Buffer!!!");
var len = buf1.length;

// new buffer as slice of old
var buf2 = buf1.slice(19,len);
console.log(buf2.toString());

buf2.fill("*",0,4);
console.log(buf2.toString());

console.log(buf1.toString());