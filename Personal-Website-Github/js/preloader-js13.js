/**
 * (c) 2005, @author: vxs - https://twitter.com/vxs_cz 
 */

$(window).load(function(){
	$('body').imagesLoaded(function() {
		setTimeout(function() {
			$('#preloader').fadeOut(300).trigger( "preloader/fadeout" );
		}, 1000);
	})
});

