var express = require('express');
var Photo = require('../model/photo');
var path = require('path');
var join = path.join;
var dir=join(path.resolve("."),'/public/photos');
var router = express.Router();

router.get('/:id', function(req,res,next){
  var id = req.params.id;
  Photo.findById(id,function(err,photo){
    if (err) return next(err);

    var path = join(dir,photo.path);
    res.download(path, photo.name+'.jpeg');
  });
});

module.exports = router;
