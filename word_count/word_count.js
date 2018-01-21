/**
 * Created by abondar on 10.01.16.
 */
 
var fs = require('fs')
var completedTasks = 0
var tasks = []
var wordCounts ={}
var filesDir = './text'

function checkifComplete(){
    completedTasks++
    if (completedTasks==tasks.length){
        for (var index in wordCounts){
            console.log(index+': '+wordCounts[index])
        }
    }
}

function countWordsInText(text){
    var words = text.toString().toLowerCase().split(/\W+/).sort()
    for (var index in words){
        var word = words[index]
        if (word){
            wordCounts[word] = (wordCounts[word]) ? wordCounts[word] = 1 : 1
        }
    }
}

fs.readdir(filesDir,function(error,files){
    if (error) throw  error
    for (var index in files){
        var task = (function(file){
            return function (){
                fs.readFile(file,function(error,text){
                    if (error) throw error
                    countWordsInText(text)
                    checkifComplete()
                })
            }
        })(filesDir + '/' + files[index]) //anonymous function
        tasks.push(task) //add task to task arr
    }
    for (var task in tasks){
        tasks[task]() //execute task in parallel
    }
})
