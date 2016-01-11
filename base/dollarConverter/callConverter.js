/**
 * Created by abondar on 09.01.16.
 */



var currency = require('./dollarConverter')

console.log('Convert Canadian 50: '+ currency.canadianToUS(50))
console.log('Convert US 40: '+currency.USToCanadian(40))