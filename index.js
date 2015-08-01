var http = require('http'),
    fs = require('fs'),
    sys = require('sys'),
    exec = require('child_process').exec;

var child;

fs.readFile('./http/index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(5000);


    console.log('Server starts: 5000');


    // or more concisely
    function puts(error, stdout, stderr) { console.log(error, stdout, stderr) };

    exec("ffmpeg -framerate 1/4 -i images/cat%03d.jpg -vcodec libx264 -t 30 -pix_fmt yuv420p videos/out.mp4", puts);


});

