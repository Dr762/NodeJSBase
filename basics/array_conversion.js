//convert a to b_exp
var eq = require('deep-equal');

let a = [2, 4, 6, 8, 9, 15]
let b_exp = ['4', '16', '64']
console.log("Original Array", a);

var b = a.map(function(x){
  if (x && (x & (x - 1)) === 0){
    return (x**2).toString()
  }
});

b = b.filter(function(x) {
   return x !== undefined;
});

if (eq(b,b_exp)){
console.log(b);
} else {
  console.log("Array b is not correct");
}
