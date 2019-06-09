$(function () {
    var $typeFilter = $('#type-filter');
    var $currentType = $typeFilter.find('span');
    var $cards = $('#resources-card .card');

    $currentType.on('click', function () {
        $typeFilter.toggleClass('visible');
    });

    var $types = $typeFilter.find('li a');
    $types.on('click', function (e) {
        e.preventDefault();

        var type = $(this).data('type');
        $currentType.html(this.innerText);

        $cards.each(function () {
            var $node = $(this);
            if ($node.data('type') === type || type === 'all_filter') {
                $node.show();
            } else {
                $node.hide();
            }
        });
    });

    $(document).on('click', function (e) {
        if (!$(e.target).parent('#type-filter').length) {
            $typeFilter.removeClass('visible');
        }
    });
});
