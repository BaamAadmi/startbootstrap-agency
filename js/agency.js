(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $(".navbar").removeClass("d-none");
  })

  // $.get("data/kaam.json",function(response){
  //   var str1 = "";
  //   var str2 = "";
  //   console.log(response);
  //   for (var i = 0; i < response.length; i++) {
  //     // response[i]
  //     str1 += '<div class="col-md-4 col-sm-6 portfolio-item">';
  //     str1 += '<a class="portfolio-link" data-toggle="modal" href="#portfolioModal'+(i+1)+'">';
  //     str1 += '<div class="portfolio-hover">';
  //     str1 += '<div class="portfolio-hover-content">';
  //     str1 += '<i class="fa fa-plus fa-3x"></i>';
  //     str1 += '</div></div>';
  //     str1 += '<img class="img-fluid" src="img/portfolio/0'+(i+1)+'-thumbnail.jpg" alt="">';
  //     str1 += '</a>';
  //     str1 += '<div class="portfolio-caption">';
  //     str1 += '<h4>'+response[i].title+'</h4>';
  //     str1 += '<p class="text-muted">'+response[i].subtitle+'</p>';
  //     str1 += '</div>';
  //     str1 += '</div>';
  //
  //     str2 += '<div class="portfolio-modal modal fade" id="portfolioModal'+(i+1)+'" tabindex="-1" role="dialog" aria-hidden="true">';
  //     str2 += '<div class="modal-dialog">';
  //     str2 += '<div class="modal-content">';
  //     str2 += '<div class="close-modal" data-dismiss="modal">';
  //     str2 += '<div class="lr">';
  //     str2 += '<div class="rl"></div>';
  //     str2 += '</div></div><div class="container">';
  //     str2 += '<div class="row">';
  //     str2 += '<div class="col-lg-8 mx-auto">';
  //     str2 += '<div class="modal-body"><h2 class="text-uppercase">'+response[i].title+'</h2><p class="item-intro text-muted">'+response[i].subtitle+'</p>';
  //     str2 += '<iframe width="420" height="345" src="https://www.youtube.com/embed/'+response[i].link+'"></iframe>';
  //     str2 += '<p>'+response[i].description+'</p>';
  //     str2 += '<ul class="list-inline"><li>Date: '+response[i].date+'</li><li>Client: '+response[i].client+'</li><li>Category: '+response[i].category+'</li>';
  //     str2 += '</ul><button class="btn btn-primary" data-dismiss="modal" type="button"><i class="fa fa-times"></i>Close</button>';
  //     str2 += '</div></div></div></div></div></div></div>';
  //   }
  //
  //   $("section#portfolio .portfolio-items").empty().append(str1);
  //   $("body").append(str2);
  //
  // });


// BOOTSTRAP 3.0 - Open YouTube Video Dynamicaly in Modal Window
// Modal Window for dynamically opening videos
$('a[href^="https://www.youtube.com"]').on('click', function(e){
  // Store the query string variables and values
	// Uses "jQuery Query Parser" plugin, to allow for various URL formats (could have extra parameters)
	var queryString = $(this).attr('href').slice( $(this).attr('href').indexOf('?') + 1);
	var queryVars = $.parseQuery( queryString );

	// if GET variable "v" exists. This is the Youtube Video ID
	if ( 'v' in queryVars )
	{
		// Prevent opening of external page
		e.preventDefault();

		// Variables for iFrame code. Width and height from data attributes, else use default.
		var vidWidth = 560; // default
		var vidHeight = 315; // default
		if ( $(this).attr('data-width') ) { vidWidth = parseInt($(this).attr('data-width')); }
		if ( $(this).attr('data-height') ) { vidHeight =  parseInt($(this).attr('data-height')); }
		var iFrameCode = '<iframe width="' + vidWidth + '" height="'+ vidHeight +'" scrolling="no" allowtransparency="true" allowfullscreen="true" src="https://www.youtube.com/embed/'+  queryVars['v'] +'?rel=0&wmode=transparent&showinfo=0" frameborder="0"></iframe>';

		// Replace Modal HTML with iFrame Embed
		$('#mediaModal .modal-body').html(iFrameCode);
		// Set new width of modal window, based on dynamic video content
		$('#mediaModal').on('show.bs.modal', function () {
			// Add video width to left and right padding, to get new width of modal window
			var modalBody = $(this).find('.modal-body');
			var modalDialog = $(this).find('.modal-dialog');
			var newModalWidth = vidWidth + parseInt(modalBody.css("padding-left")) + parseInt(modalBody.css("padding-right"));
			newModalWidth += parseInt(modalDialog.css("padding-left")) + parseInt(modalDialog.css("padding-right"));
			newModalWidth += 'px';
			// Set width of modal (Bootstrap 3.0)
		    $(this).find('.modal-dialog').css('width', newModalWidth);
		});

		// Open Modal
		$('#mediaModal').modal();
	}
});

// Clear modal contents on close.
// There was mention of videos that kept playing in the background.
$('#mediaModal').on('hidden.bs.modal', function () {
	$('#mediaModal .modal-body').html('');
});




})(jQuery); // End of use strict
