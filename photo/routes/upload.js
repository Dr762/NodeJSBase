var express = require('express');
var Photo = require('../model/photo');
var path = require('path');
var fs = require('fs');
var multer  = require('multer');
var join = path.join;
var upload = multer({ dest: './public/photos' });

var router = express.Router();

router.get('/',function(req, res,next){
  res.render('upload',{
    title: 'Photo Upload'
  });

});


router.post('/', upload.single('photo[image]'),function(req, res,next) {
   var img = req.file.filename;
   var name = req.body.photo.name || img;
   var path = join('./public/photos',img);

   fs.rename(req.file.path,path,function(err){
     if (err) return next(err);

     Photo.create({
       name:name,
       path: img
     },
     function(err){
        if (err) return next(err);
        res.redirect('/')
     });
   });
});


module.exports = router;
