//calculate cumulative TTL of request.

let requests = [
{requestId: 'poiax',  startedAt: 1489744808, ttl: 8},
{requestId: 'kdfhd',  startedAt: 1489744803, ttl: 3},
{requestId: 'uqwyet', startedAt: 1489744806, ttl: 12},
{requestId: 'qewaz',  startedAt: 1489744810, ttl: 1}
];
let cumulativeTtl_exp = 15;

var cumulativeTtl = 0;
var min = requests[0].startedAt;
var max = 0;

for(var i in requests){
      min = (requests[i].startedAt < min)?requests[i].startedAt:min;
      max = ((requests[i].startedAt + requests[i].ttl) > max)?(requests[i].startedAt + requests[i].ttl):max;
  }
cumulativeTtl = max - min

if (cumulativeTtl === cumulativeTtl_exp){
  console.log(cumulativeTtl)
} else {
  console.log("Actual and expected values differ")
}
