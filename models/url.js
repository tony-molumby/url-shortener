const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create url schema & model
const UrlSchema = new Schema({
  num: {
    type: Number
  },
  original_url: {
    type: String
  },
  short_url: {
    type: String
  }
});

const Url = mongoose.model('url', UrlSchema);

module.exports = Url;

