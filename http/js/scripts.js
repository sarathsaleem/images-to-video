$(document).ready(function () {


    /* copy loaded thumbnails into carousel */
    $('.row .thumbnail').on('load', function () {

    }).each(function (i) {
        if (this.complete) {
            var item = $('<div class="item"></div>');
            var itemDiv = $(this).parents('div');
            var title = $(this).parent('a').attr("title");

            item.attr("title", title);
            $(itemDiv.html()).appendTo(item);
            item.appendTo('.carousel-inner');
            if (i == 0) { // set first item active
                item.addClass('active');
            }
        }
    });



    /* File Upload */
    var url = '/upload/';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
            refreshImages();
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');



    intUI();


});

function rnd(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}

function createVideo() {

    var images = $('.selectedImages div');

    var imageId = [];

    images.each(function (i, imgs) {
        imageId.push($(imgs).attr('name'));
    });

    var createVideoUrl = '/createvideo';


    var videoName = $("input[name=videoName]").val();

    if(!videoName) {
        alert("Enter video name");
        return;
    }

    function videoUpdated() {}

    $.ajax({
        url: createVideoUrl,
        method: "POST",
        data: { images: imageId , name : videoName  },
        dataType: "application/json",
        complete : function (data) {
            alert("Video Created : ");
           location.reload();
        }
    });

}
function refreshImages () {
    function populateimages (data) {
        var imgStr = "";
        data.forEach(function (img) {
             imgStr += '<div class="col-lg-2 col-sm-3 col-xs-4" name="'+ img +'"><a title="Image 1" href="#"><img class="thumbnail img-responsive" src="'+ img +'"></a></div>';
        });
        $('.imageGallery').html(imgStr);
        $('.selectImages').html(imgStr);

    }

    $.get("/images/", function (data) {
       populateimages(data);
    });
}

function refreshVideos () {

    function populateVideos (data) {
        var vdsStr = "";
        data.forEach(function (vds) {

           if (vds.split('.')[1].match(/jpg|jped|png/)) {

             var videoPath = vds.split('.')[0] + '.mp4';

             vdsStr += '<div class="col-lg-2 col-sm-3 col-xs-4" name="" ><a title="Image 1" target="_blank" href="' + videoPath + '"><img class="thumbnail img-responsive" src="'+ vds +'"></a> <a title="Image 1" target="_blank" href="' + videoPath + '" class="play"></a></div>';
           }

        });
        $('.videoGallery').html(vdsStr);
    }

    $.get("/videos/", function (data) {
        populateVideos(data);
    });

}


function intUI() {

    $(".createVideo").on('click', function () {
        $('#pageView').fadeOut('slow', function () {
            $('#pageEdit').fadeIn();
            $(".backToGallery").show();
        });
        $(this).hide('slow');

    });

    $(".backToGallery").on('click', function () {
        $('#pageEdit').fadeOut('slow', function () {
            $('#pageView').fadeIn();
            $(".createVideo").show();
        });
        $(this).hide();
    });


    $('.selectImages').on('click', 'div', function () {
        $(this).toggleClass('active');
        if (!$(this).hasClass('active')) {
            $('.selectedImages div[name="'+ $(this).attr('name') +'"]').remove();
            return;
        }
        var me = $(this).clone();
        $('.selectedImages').append(me);

        if($('.selectedImages img').length) {
            $(".createWrapper").show();
        } else {
            $(".createWrapper").hide();
        }

    });


    $('.createMyVideo').on('click', function () {
         createVideo();
    });


   refreshImages();
   refreshVideos ();
}
