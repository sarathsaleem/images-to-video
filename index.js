var express = require('express');
var app = express();
var upload = require('jquery-file-upload-middleware');

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

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
