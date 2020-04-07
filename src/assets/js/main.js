$(function () {

  var $body = $('body');
  var $document = $(document);

  $('.js-hero').click(function() {
    $('.hero__more-context').toggleClass('active');
    $(this).toggleClass('active');
  });

  $('.slider-on-mobile').slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToShow: 1
      }
    }]
  });

	$('.slider').slick({
		dots: false,
		infinite: true,
    speed: 300,
    adaptiveHeight: true,
		prevArrow: '<svg class="button-prev" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="white"/><path d="M44 27L31 40.5L44 54" stroke="#002063" stroke-width="4" stroke-linejoin="round"/></svg>',
		nextArrow: '<svg class="button-next" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="white"/><path d="M35 54L48 40.5L35 27" stroke="#002063" stroke-width="4" stroke-linejoin="round"/></svg>',
    slidesToShow: 1,
    responsive: [{
      breakpoint: 767,
      settings: {
				dots: true,
				arrows: false,
    		slidesToShow: 1,
    		slidesToScroll: 1
    	}
  	}]
  });
  
  $('.slider-3').slick({
		dots: false,
		infinite: true,
    speed: 300,
		prevArrow: '<svg class="button-prev" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="white"/><path d="M44 27L31 40.5L44 54" stroke="#002063" stroke-width="4" stroke-linejoin="round"/></svg>',
		nextArrow: '<svg class="button-next" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="white"/><path d="M35 54L48 40.5L35 27" stroke="#002063" stroke-width="4" stroke-linejoin="round"/></svg>',
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 767,
      settings: {
				dots: true,
				arrows: false,
    		slidesToShow: 1,
    		slidesToScroll: 1
    	}
  	}]
	});

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


