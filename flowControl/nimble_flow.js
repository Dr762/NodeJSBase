/**
 * Created by abondar on 10.01.16.
 */

//nimble flow control

var flow = require('nimble')
var exec = require('child_process').exec

function downloadNodeVersion(version,destination,callback){
    var url = 'http://nodejs.org/dist/node-v'+version +'tar.gz'
    var filepath = destination + '/'+ version + '.tgz'
    exec('curl'+url+'>'+filepath,callback)
}

//run two tasks in a row(one tasks runs two more tasks in parallel)
flow.series([
    function(callback){
        flow.parallel([
            function(callback){
                console.log('Downloading Node v4.2.4...')
                downloadNodeVersion('4.2.4'),'/tmp',callback
            },
            function(callback){
                console.log('Downloading Node v4.2.3...')
                downloadNodeVersion('4.2.3'),'/tmp',callback
            }
        ],callback)
    },
    function(callback){
        console.log('Creating archive of downloaded files...')
        exec(
            'tar cvf node_distros.tar /tmp/4.2.4.tgz /tmp/4.2.3.tgz',
            function (error,stdout,stderr){
                console.log('All done!')
                callback()
            }
        )
    }
])