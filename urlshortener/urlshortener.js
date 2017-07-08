var Url = require('../models/url');

var urlShortener = function(str){
  var patt = /^https?:\/\/[\w./]+/gi;
  var res_obj = {};
  var c;
    Url.find({}).exec(function(err, urls){
      if(err){
        return err;
      }
      return urls;  //this doesn't work
    });

}

module.exports = urlShortener;