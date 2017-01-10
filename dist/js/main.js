$(document).ready(function() {

	var $header = $("#header");
	var width = $(window).width();
	var scroll = 300;

	if ((width < 768) && (width > 570)) {
		scroll = 200;
	} else if (width <= 570) {
		scroll = 100;
	}

	$(window).scroll(function() {

		if ( $(this).scrollTop() > scroll && !$header.hasClass("js-fixed-geader") ) {
			$header.addClass("js-fixed-header");
		} else if ( $(this).scrollTop() <= scroll && $header.hasClass("js-fixed-header") ) {
			$header.removeClass("js-fixed-header");
		}
	})
})