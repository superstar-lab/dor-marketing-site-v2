$(function () {

    var $body = $('body');
    var $document = $(document);

    // mobile menu toggle logic
    $('.menu-tab').on('click', function() {
        $('.menu-hide').toggleClass('show');
        $('.menu-tab, .bg-mask, body').toggleClass('active');
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

        $modal.addClass('active');
        $body.addClass('no-scroll');

        $modal.on('click', function (e) {
            e.preventDefault();
            if ($modal.is(e.target)) hideModal();
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
});


