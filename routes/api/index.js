var express = require('express');
var app = express.Router();

var record = require('./record');

app.get('/photos/categories', record.getPhotoCategories);
app.get('/photos', record.getPhotos);

app.get('/videos/categories', record.getVideoCategories);
app.get('/videos/', record.getVideos);
module.exports = app;