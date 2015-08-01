var express = require('express');
var app = express();
var upload = require('jquery-file-upload-middleware');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var createVideo = require('./createVideo');
var glob = require('glob');

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
    var images = {
        'default' : []
    };

    glob("http/images/**/*.*", function (er, files) {
        res.json(files.map(function(v){
            return v.replace(/\/?http/, '');
        }));
    });

});

// videos
app.use('/videos', function(req, res, next) {

    var videos = {
        'default' : []
    };

    glob("http/videos/**/*.*", function (er, files) {
        res.json(files.map(function(v){
            return v.replace(/\/?http/, '');
        }));
    });

});

// createvideo
app.use('/createvideo', function(req, res, next) {

    var params = req.body;

    createVideo(params, function () {
        res.send('createdVideo', {'sucess': true })
    });



});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


