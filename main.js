//=================================
// Flashy Demo
//=================================
$(document).ready(function() {
	'use strict';

	$('.gallery').flashy({
		prevShowClass: 'fx-bounceInLeft',
		nextShowClass: 'fx-bounceInRight',
		prevHideClass: 'fx-bounceOutRight',
		nextHideClass: 'fx-bounceOutLeft'
	});
  
  	$('.gallery1').flashy({
		showClass: 'fx-fadeIn',
		hideClass: 'fx-fadeOut',
    videoAutoPlay: 'true'
	});

	$('.custom').flashy({
		showClass: 'fx-fadeIn',
		hideClass: 'fx-fadeOut',
    videoAutoPlay: 'true'
	});
  	$('.custom1').flashy({
		showClass: 'fx-fadeIn',
		hideClass: 'fx-fadeOut',
    videoAutoPlay: 'true'
	});
	
	aib.init();
	
	
});


aib = {
		init: function() {
			this.devMode();
		},
		
		devMode: function(){
			var localDev = false;
			var localUrl = 'https://aib:8890',
				localCss = '/theme.css',
				remoteCss = 'theme.scss';
			
			$.ajax(localUrl + localCss, {
				statusCode: {
					200: function(r) {
						localDev = true;
					}
				},
				complete: function(r, status) {
					if (status != 'success') return;
					$('head link[href*="'+ remoteCss +'"]').remove();
					$('head').append('<link rel="stylesheet"  href="'+ localUrl + localCss +'" type="text/css" media="all">')
					//.append("<script src=\"http://localhost:35729/livereload.js?snipver=1\"></script>");
					console.log('AiB: local css swapped in');
				}
			});
		}
	}



	