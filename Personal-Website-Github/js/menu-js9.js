/**
 * (c) 2005, @author: vxs - https://twitter.com/vxs_cz 
 */

(function($) {
	$('#site-navigation a').on('click', function(e) {
		var link = $(this).attr('href');

		if ( link.indexOf("#") >= 0 ) {
			var path = link.substr(link.indexOf("#"));
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $(path).offset().top + 1
			}, 800);
		}
	})

	var addActive = function() {
		var selections = $('.home-selection');
		var menuItems = $('#primary-menu > li');

		$.each( selections, function(i,el) {
			if ( $(window).scrollTop() >= $(el).offset().top ) {
 				var id = $(el).attr('id');

				$.each( menuItems, function(i, el) {
					if ( $(el).find('a').attr('href').indexOf(id) >= 0 ) {
						$(el).addClass('active');
					} else {
						$(el).removeClass('active');
					}
				});
			} 

			( $(window).scrollTop() <= parseInt($('#intro').height()) ) ? $(menuItems).removeClass('active') : false;
		});
	};
	$(window).on('scroll', addActive);

	// Mobile hover hack...
	var mobileHover = function () {
	    $('*').on('touchstart', function () {
	        $(this).trigger('hover');
	    }).on('touchend', function () {
	        $(this).trigger('hover');
	    });
	};

	mobileHover();

})(jQuery);