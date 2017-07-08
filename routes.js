var express = require('express');
var router = express.Router();
var urlshortener = require('./urlshortener/urlshortener');
const Url = require('./models/url');


router.get('/', function(req, res){
  res.status(200);
  res.sendFile(process.cwd() + '/urlshortener/index.html');
});

router.get('/new/:url(*)', function(req, res){
  var url = req.params.url;
  var patt = /^https?:\/\/[\w./]+/gi;
  var url_obj = {};
  if(patt.test(url)){
    res.status(200);
     Url.findOne({original_url: url}).exec(function(err, doc){
       if(err){
         res.send('error finding single document');
       } else {
         if(doc){ //if the url already exists in the database, return that url
           res.json({
             original_url: doc.original_url,
             short_url: doc.short_url
           });
         } else { //if it doesn't exist, create it with a unique shortened URL number
           Url.find({}).exec(function(err, docs){
             if(err){
               res.send('error getting all documents');
             } else {
               var count = docs.length + 1;
               url_obj = {
                 num: count,
                 original_url: url,
                 short_url: 'https://url-shortener1.glitch.me/' + count
               }
               //res.json(url_obj);
               Url.create(url_obj, function(err, record){
                 if(err){ 
                   console.log('error saving url')
                 } else{
                   res.json({
                     original_url: record.original_url,
                     short_url: record.short_url
                   });
                 }
               });
             }
           });
         }
         
       }
     })
  } else {
    res.status(400);
    res.type('txt').send('Please supply a valid URL');
  }
  
});

router.get('/:id', function(req, res){
  var id = req.params.id;
  Url.findOne({num: id}).exec(function(err, doc){
    if(err){
      res.send('Error finding document number ' + id);
    } else {
      if(doc){
        res.status(308);
        res.redirect(doc.original_url);
      } else {
        res.status(404);
        res.type('txt').send('This url is not in the database, try a different one');
      }
    }
  });
  
});

// Respond not found to all the wrong routes
router.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
router.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})


module.exports = router;