$(function () {
    // mobile menu toggle logic
    $('.menu-tab, .header-logo-1').on('click', function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab, .bg-mask, body').toggleClass('active');
    });

    // request demo modal
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

    // sticky header
    var elements = $('#navigation');
    Stickyfill.add(elements);

    // scroll spy
    var mainHeader = document.getElementById('header');
    var stickyHeader = document.getElementById('navigation');
    var spy = new Gumshoe('#navigation a', {
        offset: function () {
            return mainHeader.getBoundingClientRect().height + stickyHeader.getBoundingClientRect().height;
        }
    });

    // tabs
    // $('.tabs-nav a').on('click', function(event) {
    //     event.preventDefault();
        
    //     var tabSelector = $(this).attr('href');
        
    //     $('.tabs-nav li').removeClass('active');
    //     $(this).parent('li').addClass('active');
        
    //     $('.tabs-stage > div').removeClass('active');
    //     $('.tabs-stage').find(tabSelector).addClass('active');
    // });
});

