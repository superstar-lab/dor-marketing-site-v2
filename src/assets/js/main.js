$(function () {
      
    // mobile menu toggle logic
    $('.menu-tab').on('click', function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab, .bg-mask, body').toggleClass('active');
    });


    // request demo modal
    $('.close, .modal-header').on('click', function() {
        $('.modal-header, body').removeClass('active');
    });
    
    $('.show').on('click', function(e) {
        e.preventDefault();
        $('.modal-header, body').addClass('active');
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.modal-header, body').removeClass('active');
        }
    });


    // request demo modal
    $('.close, .modal-case-study').on('click', function() {
        $('.modal-case-study, body').removeClass('active');
    });
    
    $('.modal-show').on('click', function(e) {
        e.preventDefault();
        $('.modal-case-study, body').addClass('active');
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.modal-case-study, body').removeClass('active');
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
});


