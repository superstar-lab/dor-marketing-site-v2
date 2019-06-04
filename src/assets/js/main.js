$(function () {
    $('.menu-tab, .header-logo-1').on('click', function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab, .bg-mask, body').toggleClass('active');
    });

    $('.close, .mask').on('click', function() {
        $('.mask, body').removeClass('active');
    });
    
    $('.show').on('click', function() {
        $('.mask, body').addClass('active');
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.mask, body').removeClass('active');
        }
    });
});
