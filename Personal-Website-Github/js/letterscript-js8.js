/**
 * (c) 2005, @author: vxs - https://twitter.com/vxs_cz 
 */

'use strict';

(function($) {

	var LetterName = {
	
		init: function(selector) {
			this.name = selector.name;
			this.mouse = selector.mouse;

			if ( ! $(this.name).html() == '' ) {
				this.letters = $(this.name).html().split('');
				$(this.name).html('').css('margin-left','30px');
				$(this.mouse).hide();
				this.renderLetters(this.name);

			} else {
				return false;
			}
			
		},

		renderLetters: function(name) {
			var self = this;

			$.each( this.letters, function(index, letter) {
				$(self.name).append('<span>' + letter + '</span>').find('span').hide();	
			});

			$(this.name).append('<div class="cursor blik"></div>');
			this.animation();
		},

		animation: function() {
			var self = this,
				letters = $(this.name).find('span'),
				delay = 0;

			var each = function() {
				$('.cursor').removeClass('blik');

				for (var i = 0; i < letters.length; i++) {
					var ran = Math.floor((Math.random() * 450) + 100);
					$(letters[i]).delay(delay).show( 50, function() {

						if ( letters[letters.length - 1].style.display == 'inline-block' ) {
							$('.cursor').addClass('blik');
							
							setTimeout(function() {
								$('.cursor').css('visibility','hidden');
								$(self.mouse).fadeIn(500);
							},500)
						} 
					});
					delay += ran;
				}
			}
			setTimeout(each, 1000);
			
		}

	};

	if ( $( "#preloader" ).length ) {
		$('#preloader').bind('preloader/fadeout', function() {
			LetterName.init({
				name: '.wrap-home > h1',
				mouse: '#scroll-down'
			});
		}); 
	} else {
		LetterName.init({
			name: '.wrap-home > h1',
			mouse: '#scroll-down'
		});
	}

})(jQuery);



