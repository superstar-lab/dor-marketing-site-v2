$(function () {

    var $body = $('body');
    var $document = $(document);

    // mobile menu toggle logic
    $('.menu-tab').on('click', function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab, .bg-mask, body').toggleClass('active');
    });

    //Mobile Dropdown menu
    $('.header-bottom-menu .dropdown').click(function() {
        $('.dropdown-menu').toggleClass('active');
    });

    $('#header .dropdown').mouseover(function() {
        $('.dropdown-menu').addClass('active');
    });

    $('#header .dropdown').mouseout(function() {
        $('.dropdown-menu').removeClass('active');
    });

    $(window).scroll(function() {
        $('.dropdown-menu').removeClass('active');
    });

    $(document).mouseup(function(e) {
        if (!$('.dropdown-menu').is(e.target) && $('.dropdown-menu').has(e.target).length === 0) {
            $('.dropdown-menu').removeClass('active');
        }
    });

    // modal logic
    $('[data-modal]').on('click', function (e) {
        e.preventDefault();
        var targetSelector = $(this).data('modal');
        var $modal = $(targetSelector);
        var $closeButton = $modal.find('.close');
        
        var $modalInsert = $modal.find('[data-insert]');
        if ($modalInsert.length) {
            var insertSelector = $modalInsert.data('insert');
            var $insertElement = $(insertSelector).clone(true);
            $modalInsert.replaceWith($insertElement);
        }

        var modalId = $modal.attr('id');
        if (modalId) {
            var $contentLabel = $modal.find('.fsLabel').filter(function () {
                return this.innerHTML.trim() === 'content';
            });
            $contentLabel.next('input.fsField').val(modalId);
            $contentLabel.closest('.fsRow').addClass('hidden');
        }

        $modal.addClass('active');
        $body.addClass('no-scroll');

        $modal.on('click', function (e) {
            if ($modal.is(e.target)) {
                e.preventDefault();
                hideModal();
            }
        });

        $closeButton.on('click', function (e) {
            e.preventDefault();
            hideModal();
        });
 
        $document.one('keyup', keyupHandler);

        function hideModal() {
            $modal.removeClass('active');
            $body.removeClass('no-scroll');
            $modal.off();
            $closeButton.off();
        };

        function keyupHandler(e) {
            if (e.keyCode == 27) {
                hideModal();
            } else {
                $document.one('keyup', keyupHandler);
            }
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


    const player = new Plyr('#player');
    player.on('ready', () => { 
        player.toggleControls(false); 
    });
});


