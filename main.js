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
	settings: {
		i18nURL: 'https://aibi18n.autoboxdev.com?q=switchurl',
		i18nbase: window.location.href,
		i18nURIEn: 'aibautobox-autobox.nationbuilder.com',
		i18nURIFr: 'aibautoboxfr-autobox.nationbuilder.com'
	},
	
	init: function() {
		this.hoverNav();
		this.langControls();
		this.devMode();
	},
	
	hoverNav: function() {
		if ($(window).width() < 768) return;
		$('.navbar-nav li.dropdown > a, .navbar-nav .dropdown-menu').hover(function(){
			$(this).parent().addClass('open');
		},
		function(){
			$(this).parent().removeClass('open');
		});
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
				console.log('AiB: local css swapped in');
			}
		});
	},
	
	langControls: function() {
		var currentLang = this.getLang();
		var switchLabel = (currentLang == 'en') ? 'FR' : 'EN';
		var switchLink = $('<ul class="language-switch"><li><a href="#">'+ switchLabel +'</a></li></ul>')
			.click(function(e){e.preventDefault(); aib.switchLang()});
		$('body').append(switchLink);
	},
	
	getLang: function() {
		var currentLang = 'en';
		if (window.location.href.match(aib.settings.i18nURIFr)) currentLang = 'fr';
		return currentLang;
	},
	
	switchLang: function(base) {
		if (typeof base == undefined) base = false;
		if (base) {
			var url;
			if (this.getLang() == 'en') url = this.settings.i18nURIFr;
			else url = this.settings.i18nURIEn;
			window.location.pathname = url;
			return;
		}
		
		$.ajax({
			type: "GET",
			url: aib.settings.i18nURL + "&url=" + window.location.href,
			success: function(msg){
				var data = $.parseJSON(msg);
				if (data.urls.length) {
					var destURL = '//' + decodeURIComponent(data.urls[0]);
					window.location.href = destURL;
				} else {
					aib.switchLang(true);
				}
				
			},
			error: function() {
				aib.switchLang(true);
			}
		});
	}
}



	