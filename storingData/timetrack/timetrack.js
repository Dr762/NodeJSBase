/**
 * Created by abondar on 10.01.16.
 */


var qs = require('querystring')

exports.sendHTML = function(response,html){
    response.setHeader('Content-Type','text/html')
    response.setHeader('Content-Length',Buffer.byteLength(html))
    response.end(html)
}

exports.parseRecievedData = function(request,cb){
    var body= ''
    request.setEncoding('utf8')
    request.on('data',function(chunk){body += chunk})
    request.on('end',function(){
        var data = qs.parse(body)
        cb(data)
    })
}

exports.actionForm = function(id,path,label){
    var html = '<form method="POST" action="' + path + '">'
        html+= '<input type="hidden" name="id" value="' + id +'">'
        html+= '<input type="submit"  value="' + label + '" /></form>'

    return html
}

exports.add = function(db,request,response){
    exports.parseRecievedData(request,function(work){
        db.query("INSERT INTO work(hours,date,description )"+
                 " VALUES(?,?,?)",
                [work.hours,work.date,work.description],
        function(error){
            if (error) throw error
            exports.show(db,response)
        })

    })
}

exports.delete = function(db,request,response){
    exports.parseRecievedData(request,function(work){
        db.query("DELETE FROM work WHERE id=?",
        [work.id],
        function(error){
            if (error) throw error
            exports.show(db,response)
        })
    })
}


exports.archive = function(db,request,response){
    exports.parseRecievedData(request,function(work){
        db.query("UPDATE work SET archived=1 WHERE id=?",
        [work.id],
        function(error){
            if (error) throw error
            exports.show(db,response)
        })
    })
}

exports.show = function(db,response,showArchived){

    var query = "SELECT * FROM work  WHERE archived=? ORDER BY date DESC "

    var archiveValue = (showArchived)? 1 : 0
    db.query(query,
        [archiveValue],
        function(error,rows){
            if (error) throw error
            var html = (showArchived)? '' :'<a href="/archived">Archived Work</a><br/>'
            html += exports.workHitlistHTML(rows)
            html += exports.workFormHTML()
            exports.sendHTML(response,html)
        })
}

exports.showArchived = function(db,response){
    exports.show(db,response,true)
}

exports.workHitlistHTML = function(rows){
    var html = '<table>'
    for (var i in rows){
        html += '<tr>'
        html += '<td>' + rows[i].date + '</td>'
        html += '<td>' + rows[i].hours + '</td>'
        html += '<td>' + rows[i].description + '</td>'
        if (!rows[i].archived){
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>'

        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>'
        html += '</tr>'
    }
    html +='</table>'
    return html
}

exports.workFormHTML = function(){
    var html = '<form method="POST" action="/">' +
               '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>'+
               '<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
               '<p>Description<br/>' +
               '<textarea name="description"></textarea></p>' +
               '<input type="submit" value="Add" /></form>'

    return html
}

exports.workArchiveForm = function(id){
    return exports.actionForm(id,'/archive','Archive')
}

exports.workDeleteForm = function(id){
    return exports.actionForm(id,'/delete','Delete')
}

