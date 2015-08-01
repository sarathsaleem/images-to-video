var express = require('express');
var app = express();
var upload = require('jquery-file-upload-middleware');

var createVideo = require('./createVideo');

app.use(express.static('http'));

// upload
app.use('/upload', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/http/images/'
        },
        uploadUrl: function () {
            return '/http/images/'
        }
    })(req, res, next);
});

// images
app.get('/images', function(req, res, next) {

});

// videos
app.use('/videos', function(req, res, next) {

});

// createvideo
app.use('/createvideo', function(req, res, next) {


    var paras = req.params;
    console.log(paras)

    createVideo();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);


});


