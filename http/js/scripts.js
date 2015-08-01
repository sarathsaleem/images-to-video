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
    var url = 'api/upload/';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
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

    var images = $('.selectedImages img');

    var imageId = [];

    images.each(function (i, imgs) {
        imageId.push($(imgs).attr('name-id'));
    });

    var createVideoUrl = '/createvideo';

    function videoUpdated() {}

    $.ajax({
        url: createVideoUrl,
        method: "POST",
        data: { images: imageId   },
        dataType: "application/json",
        sucess : function () {
            console.log("Data Loaded: " + data);
        }
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


    $('.selectImages div').on('click', function () {
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

}
