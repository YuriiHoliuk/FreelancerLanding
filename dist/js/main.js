$(document).ready(function() {

	var $header = $("#header");

	$(window).scroll(function() {

		if ( $(this).scrollTop() > 600 && !$header.hasClass("js-fixed-geader") ) {
			$header.addClass("js-fixed-header");
		} else if ( $(this).scrollTop() <= 600 && $header.hasClass("js-fixed-header") ) {
			$header.removeClass("js-fixed-header");
		}
	})
})