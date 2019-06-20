$(function () {

    $('.trigger').on('click', function () {
        $(".video")[0].src += "1";
        $(".trigger").toggleClass('hidden');
    });
      
    // mobile menu toggle logic
    $('.menu-tab').on('click', function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab, .bg-mask, body').toggleClass('active');
    });

    // request demo modal
    $('.close, .modal').on('click', function() {
        $('.modal, body').removeClass('active');
    });
    
    $('.show').on('click', function(e) {
        e.preventDefault();
        $('.modal, body').addClass('active');
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.modal, body').removeClass('active');
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


