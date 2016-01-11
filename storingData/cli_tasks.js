/**
 * Created by abondar on 10.01.16.
 */

//add and list tasks in tasks file
var fs = require('fs')
var path = require('path')
var args = process.argv.splice(2)
var command = args.shift()
var taskDescription = args.join(' ')
var file = path.join(process.cwd(),'/.tasks')

switch (command){
    case 'list':
        listTasks(file)
        break

    case 'add':
        addTasks(file,taskDescription)
        break

    default: console.log('Usage: '+process.argv[0] +' list|add [taskDescription]')
}

function loadOrInitTaskArray(file,cb){
    fs.exists(file,function(exists){
        var tasks = []
        if (exists){
            fs.readFile(file,'utf8',function(error,data){
                if (error) throw error
                var data = data.toString()
                var tasks = JSON.parse(data || '[]')
                cb(tasks)
            })
        } else {
            cb([])
        }
    })
}

function listTasks (file){
    loadOrInitTaskArray(file,function(tasks){
        for (var i in tasks){
            console.log(tasks[i])
        }
    })
}

function storeTasks(file,tasks){
    fs.writeFile(file,JSON.stringify(tasks),'utf8',function(error){
        if (error) throw error
        console.log('Saved.')
    })
}

function addTasks(file,taskDescription){
    loadOrInitTaskArray(file,function(tasks){
        tasks.push(taskDescription)
        storeTasks(file,tasks)
    })
}
