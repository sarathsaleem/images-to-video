var fs = require('fs'),
    exec = require('child_process').exec;



function copyFile(source, target,  cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

function createVideo(params, cb) {


    var imagesPath = params.images,
        albumName = params.name;


    var that = this;

    var inputImages = __dirname + '/http/temp/temp%03d.jpg';
    var output =  __dirname + "/http/videos/" + albumName + ".mp4";

    copyFile(__dirname + '/http'+imagesPath[0],  __dirname + "/http/videos/" + albumName + ".jpg", function (err){ });

    var copied = 0;

    for( var i = 0 ; i< imagesPath.length; i++) {
        var from = __dirname + '/http'+imagesPath[i],
            to = __dirname + "/http/temp/temp00" + i + ".jpg";
       // exec('cp ' + from + ' '+ to , puts);
        copyFile(from, to, function (err){ copied++; });

    };


    // or more concisely
    function puts(error, stdout, stderr) { console.log(error, stdout, stderr) };

    var CMD = "ffmpeg -framerate 1/4 -i "+ inputImages +" -vcodec libx264 -t 30 -pix_fmt yuv420p " +  output;

    //console.log(CMD)

    var setTime = setInterval(function() {

        console.log(copied, imagesPath.length)

        if(copied >= imagesPath.length) {
            exec(CMD, puts);
            console.log(CMD);
            cb(CMD);
            clearInterval(setTime);
        }

    },10);

}

module.exports = createVideo;

