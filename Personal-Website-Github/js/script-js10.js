/**
 * (c) 2005, @author: vxs - https://twitter.com/vxs_cz 
**/

(function($) {

	var Wallo = {

		init: function() {
			this.cache();
			this.preparation();
			this.menu();
			this.parallax();
			this.singlePortfolio();
			this.portfolioCategories();
			this.scrollUnderIntro();
		},

		cache: function() {
			$menu = $('.site-header');
			$background = $('#intro');
			$selection = $('.parallax');
			$skill = $('#skills > .wrap > div'); 
			$experience = $('#experience-timeline > .row > .item');
			$portfolio = $('.portfolio-item'); 
			$portfolioWrap = $('.portfolio-wrap');
			$catFilter = $('#categories-filter');
			$contact = $('#contact .item');
			$contactSubmit = $('#contact-submit');
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		},

		preparation: function() {
			$background.css( 'backgroundPositionY','0' );
			( isMobile ) ? $background.addClass('bg-scroll') : false;

			$.each($selection, function(index) {
				if ( $(this).offset().top >= ( $(window).scrollTop() + $( window ).height()) ) {
					$(this).css({ opacity: 0, paddingTop: 130 + 'px', paddingBottom: 30 + 'px'});
				}
			});

			$skill.addClass('null');
			$catFilter.find('li').first().addClass('active');


			$.each($experience , function(index) {
				var direction = $(this).attr('data-direction');
				var data = {opacity: 0};
				data[direction] = -200 + 'px';
				$(this).animate(data);
			});

			$portfolio.addClass('js-rotate');

			$.each($contact , function(index) {
				var direction = $(this).attr('data-direction');
				var data = {opacity: 0};
				data[direction] = -200 + 'px';
				$(this).animate(data);
			});

			$contactSubmit.css({ opacity: 0, bottom: -200 + 'px'})
		},

		menu: function() {
			$(window).on('scroll', function() {
				( $(window).scrollTop() > 150 ) ? $menu.addClass('sticky').removeClass('default') : $menu.addClass('default').removeClass('sticky');
				( $(window).scrollTop() > 200 ) ? $menu.addClass('eff') : $menu.removeClass('eff');

				if ( $(window).scrollTop() >= parseInt($('#intro').height()) ) {
					$menu.addClass('on');
				} else {
					$menu.removeClass('on');
				}

			})
		},

		parallax: function() {
			$(window).on('scroll', function() {

				// Intro background image scroll animation ...  
				if (! isMobile ) {
					$background.animate({
						'border-spacing': -1000 
						},
						{ 
						step: function(now, fx) {
					    	$(fx.elem).css("background-position", "center "+ - ( $(window).scrollTop() / 4 ) +"px");
					  	},
					  	duration: 0
					});
				}

				// Global parallax effect ... 
				$.each($selection, function(index) {
					var position = $(this).offset().top,
						currentPosition = $(window).scrollTop() + $( window ).height() -+ 300;

					if ( isMobile ) {
						currentPosition = $(window).scrollTop() + $( window ).height() -+ 100;	
					}

					if ( position < currentPosition ) {
 						$(this).animate({ opacity: 1, paddingTop: 80 + 'px', paddingBottom: 80 + 'px'}, 800, 
							function() {
								// Skills animation ... 
								( $(this).attr('id') === 'about' && $skill.hasClass('null') ) ? $skill.removeClass('null') : false;
								
							}
						);

 						// Experience animation ... 
						if ( $(this).attr('id') === 'experience' ) {
							Wallo.horizontalAnimation($experience, currentPosition);

						};

						// Portfolio animation ... 
						if ( $(this).attr('id') === 'portfolio' ) {
							$.each($portfolio, function(index) {
								if ( $(this).offset().top < currentPosition && $(this).hasClass('js-rotate') ) {
									$(this).removeClass('js-rotate');
								}	
							});
						}

						// Contact animation ... 
						if ( $(this).attr('id') === 'contact' ) {
							Wallo.horizontalAnimation($contact, currentPosition, function() {
								$contactSubmit.animate({ opacity: 1, bottom: 0}, 400);
							});
						};
					}

				});	
			})
		},

		horizontalAnimation: function( elems, currentPosition, callback ) {
			$.each(elems, function(index) {
				if ( $(this).offset().top < currentPosition && $(this).css('opacity') !== '1' ) {
					var direction = $(this).attr('data-direction');
					var data = {opacity: 1};
					data[direction] = 0;
					$(this).animate(data, 400, callback && callback());	
					$(this).siblings('.timeline-divider').removeClass('scale');
				} 
			});
		},

		singlePortfolio: function() {
			$link = $portfolioWrap.find('.direct-link');
	
			$link.on('click', function(e) {
				e.preventDefault();
				href = $(this).attr('href');

				$.ajax({
					url: '' + href + ' #single-page-content',
					dataType: 'html',
					beforeSend: function() {
						$('body').prepend('<div id="portfolio-detail"><div id="pf-loader"></div></div>').css('overflow','hidden');
					}
				})
				.done(function(result) {
					$('#portfolio-detail').append(result).css('overflow-y','auto');
					$('#single-portfolio-content').hide().imagesLoaded(function() {
						$('#pf-loader').fadeOut('fast');
             			$('#single-portfolio-content').show();
         			});

					Wallo.bindEvents();
				});
			});
		},

		bindEvents: function() {
			$('.close-detail').on('click', function() {
				$('#portfolio-detail').remove();
				$('body').css('overflow','auto');
			});
		},

		portfolioCategories: function() {
			$catFilter.find('li').on('click', function() {
				$portfolio.removeClass('js-rotate');
				$catFilter.find('li').addClass('active').not($(this)).removeClass('active'); 
				$portfolioWrap.find('.portfolio-info > a.ion-android-search').attr('rel', 'lightbox');
				filter = $(this).data('category');

				$.each( $portfolio, function(index) {
					if ( $(this).hasClass(filter) ) {
						$(this).siblings('.portfolio-disable').animate({opacity: 0}, 350, function() { $(this).hide()});
					} else {
						$(this).siblings('.portfolio-disable').show().animate({opacity: 1}, 350);
						$(this).find('.portfolio-info > a.ion-android-search').attr('rel', '');
					}			
				});
			})
		}, 

		scrollUnderIntro: function() {
			$('#scroll-down').on('click', function() {
				$('html, body').animate({ scrollTop: $('#intro').height() + 1 }, 800);
			})
			.css('cursor','pointer');
		}

	}

	Wallo.init();

})(jQuery);