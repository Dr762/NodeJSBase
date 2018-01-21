var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='polygons.csv';
let polygons = [
  {type:"triangles",numberOfSides:3,allEqual:false},
  {type:"rectangles",numberOfSides:4,allEqual:false},
  {type:"squares",numberOfSides:4,allEqual:true},
  {type:"other",numberOfSides:10,allEqual:false}
];

fs.readFile(inputFile, 'utf8', function (err, data) {
  var dataArray = data.split(/\r?\n/);
  dataArray.forEach(function(polygon) {
      if (polygon.length>0){
      classifyPolygon(polygon);
    }
  });
})


function classifyPolygon(polygon){
  var intPol = polygon.split(',').map(function(item) {
    return parseInt(item, 10);
  });

  switch (intPol.length) {
    case 3:
      console.log(polygons[0]["type"])
      break;
    case 4:
    if (!!intPol.reduce(function(a, b){ return (a === b) ? a : NaN; })) {
          console.log(polygons[2]["type"])
     } else {
         console.log(polygons[1]["type"])
     }
       break;
    default:
      console.log(polygons[3]["type"])
  }

}
