'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  data: String,
  likeBy : [String],
  like : { type: Number, default: 0}
});

module.exports = mongoose.model('Image', ImageSchema);