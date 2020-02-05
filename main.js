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
});
