var fs = require('fs');

var writeStream = fs.createWriteStream('./log.txt', {
    flags: 'a',
    encoding: 'utf8',
    node: 0666
});

writeStream.on('open', function () {
    var counter = 0;

    //get list of files
    fs.readdir('/home/abondar/IdeaProjects/NodeJSBase/', function (err, files) {

        if (err) {
            console.log(err);
        } else {
            files.forEach(function (name) {

                fs.stat('/home/abondar/IdeaProjects/NodeJSBase/'+name, function (err, stats) {
                    if (err) {
                        return err;
                    }

                    if (!stats.isFile()){
                        counter++;
                        return;
                    }

                    writeStream.write('read '+name+ '\n',function (err) {
                        if (err){
                            console.error(err.message);
                        } else {
                            console.log('finished '+ name);
                            counter++;
                            if (counter>=files.length){
                                console.log("all read")
                            }
                        }
                    });
                })


            })
        }


    })
});