/**
 * Created by abondar on 10.01.16.
 */


var http = require('http')
var work = require('./timetrack')
var mysql = require('mysql')


var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password : 'aftermath24',
    database: 'timetrack'

})


var server = http.createServer(function (request, response) {

        switch (request.method) {
            case 'POST':
                switch (request.url){
                    case '/':
                        work.add(db,request,response)
                        break
                    case '/archive':
                        work.archive(db,request,response)
                        break
                    case '/delete':
                        work.delete(db,request,response)
                        break
                }
                break

            case 'GET':
                switch (request.url){
                    case '/':
                        work.show(db,response)
                        break
                    case '/archived':
                        work.showArchived(db,response)
                        break

                }
                break
        }
})

db.query("CREATE TABLE IF NOT EXISTS work ("
         +"id INT(10) NOT NULL AUTO_INCREMENT, "
         +"hours DECIMAL(5,2) DEFAULT 0, "
         + "date DATE, "
         +"archived INT(1) DEFAULT 0, "
         +"description LONGTEXT,"
         + "PRIMARY KEY(ID))",
         function(error){
             if (error) throw error
             console.log('Server started...')
             server.listen(8080,'127.0.0.1')
         })
