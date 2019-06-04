$(document).ready(function(){
    $('.menu-tab').click(function(){
      $('.menu-hide').toggleClass('show');
      $('.menu-tab').toggleClass('active');
    });
    $('a').click(function(){
      $('.menu-hide').removeClass('show');
      $('.menu-tab').removeClass('active');
    });
  });

  $(".show").on("click", function(){
    $(".mask").addClass("active");
    $("body").addClass("active");
  });
  
  // Function for close the Modal
  
function closeModal(){
    $(".mask").removeClass("active");
    $("body").removeClass("active");
  }
  
  $(".close, .mask").on("click", function(){
    closeModal();
  });
  
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      closeModal();
    }
  });