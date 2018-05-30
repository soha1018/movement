(function () {
    $('input[type=file]').change(function (e) {
        console.log($(e.target).next()[0]);
        $($(e.target).next()[0]).css('display', 'block');
    });

    $('button[type=submit]').click(function (e) {
        $(e.target).css('ddisplay', 'none');
    });
})();