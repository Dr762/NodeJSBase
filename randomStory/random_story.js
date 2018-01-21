/**
 * Created by abondar on 10.01.16.
 */
var fs = require('fs')
var request = require('request')
var htmlParser = require('htmlparser')
var configFilename = './rss_feeds.txt'

function checkForRSSFile() {
    fs.exists(configFilename, function (exists) {
        if (!exists) return next(new Error('Missing RSS file: ' + configFilename))
        next(null, configFilename)
    })
}

function readRSSFile(configFileName) {
    fs.readFile(configFileName, function (error, feedList) {
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n")

        var random = Math.floor(Math.random()*feedList.length)
        next(null,feedList[random])

    })
}

function downloadRSSFeed(feedUrl){
    request({uri:feedUrl},function(error,response,body){
        if (error) return next(error)
        if (response.statusCode!=200) return next(new Error('Abnormal response status code'))

        next(null,body)
    })
}

function parseRSSFeed(rss){
    var handler = new htmlParser.RssHandler()
    var parser = new htmlParser.Parser(handler)

    parser.parseComplete(rss)
    if (handler.dom.items.length===0) return next(new Error('No RSS items found'))

    var item = handler.dom.items.shift()
    console.log(item.title)
    console.log(item.link)
}

var tasks = [checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed]

function next(error,result){
    if (error) throw error
    var currentTask = tasks.shift()
    if (currentTask){
        currentTask(result)
    }
}

next()
