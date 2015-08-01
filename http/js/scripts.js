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

    intUI ();


});


function intUI () {

    $(".createVideo").on('click', function () {
        $('#pageView').fadeOut('slow');
        $('#pageEdit').fadeIn('slow');
        $(this).hide('slow');
        $(".backToGallert").show('slow');
    });

     $(".backToGallert").on('click', function () {
        $('#pageEdit').fadeOut('slow');
        $('#pageView').fadeIn('slow');
        $(this).hide('slow');
        $(".createVideo").show('slow');
    });
}
