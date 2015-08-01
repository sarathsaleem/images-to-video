var fs = require('fs'),
    exec = require('child_process').exec;



function createVideo(params) {


    var imagesPath = params.images,
        albumName = params.name;


    var that = this;

    var inputImages = [  __dirname + '/http/images/cats/cat%03d.jpg'];
    var output =  __dirname + "/http/videos/" + albumName + ".mp4";


    // or more concisely
    function puts(error, stdout, stderr) { console.log(error, stdout, stderr) };

    var CMD = "ffmpeg -framerate 1/4 -i "+ inputImages +" -vcodec libx264 -t 30 -pix_fmt yuv420p " +  output;

    console.log(CMD)

    exec(CMD, puts);

}

module.exports = createVideo;

