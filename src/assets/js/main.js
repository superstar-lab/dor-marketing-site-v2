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

    // bajani eli iraric es logicheskiy hatvacner@ commenterov
    var elements = $('#navigation');
    Stickyfill.add(elements);

    // tabs
    $('.tabs-nav a').on('click', function(event) {
        event.preventDefault();
        
        var tabSelector = $(this).attr('href');
        
        $('.tabs-nav li').removeClass('active');
        $(this).parent('li').addClass('active');
        
        $('.tabs-stage > div').removeClass('active');
        $('.tabs-stage').find(tabSelector).addClass('active');
    });
});

