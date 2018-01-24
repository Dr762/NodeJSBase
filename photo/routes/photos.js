var express = require('express');
var router = express.Router();
var Photo = require('../model/photo');
var photos = [];



router.get('/', function(req, res, next) {
  Photo.find({},function(err,photos){
   if (err) return next(err);
   res.render('photos',{
     title:'Photos',
     photos:photos
   });
 });

});


module.exports = router;
