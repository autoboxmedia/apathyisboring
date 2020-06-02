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
		i18nURL: 'https://i18n.apathyisboring.com/switchurl',
		i18nbase: window.location.href,
		i18nURIEn: 'apathyisboring.com',
		i18nURIFr: 'lapathiecestplate.com'
	},
	
	init: function() {
		this.expandeableNav();
		this.langControls();
		this.devMode();
	},
	
	expandeableNav: function() {
		if ($(window).width() < 768) {
			$('.navbar-nav li.expandeable .expand-toggle').off('click').click(function(e){
				e.preventDefault();
				$(this).parent().toggleClass('open');
			});
		}
		else {
			$('.navbar-nav li.expandeable').hoverIntent({
			over: function(){
				$(this).addClass('open');
			},
			out: function(){
				$(this).removeClass('open');
			},
			timeout: 500
			});
		}
		
	},
	
	devMode: function(){
		var localDev = false;
		var localUrl = 'https://aib:8890',
			localCss = '/theme.css',
			remoteCss = 'theme.scss',
			localJs = '/main.js',
			remoteJs = 'main.js';
		
		$.ajax(localUrl + localCss, {
			statusCode: {
				200: function(r) {
					localDev = true;
				}
			},
			complete: function(r, status) {
				if (status != 'success' || document.aibDevMode) return;
				document.aibDevMode = true;
				$('head link[href*="'+ remoteCss +'"]').remove();
				$('head').append('<link rel="stylesheet"  href="'+ localUrl + localCss +'" type="text/css" media="all">');
				$('script[src*="'+ remoteJs +'"]').remove();
				$('body').append('<script src="'+ localUrl + localJs +'" ></script>');
				console.log('AiB: local assets swapped in');
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
		if (window.location.hostname.match(aib.settings.i18nURIFr)) currentLang = 'fr';
		return currentLang;
	},
	
	switchLang: function(base) {
		if (typeof base == undefined) base = false;
		if (base) {
			var url;
			if (this.getLang() == 'en') url = this.settings.i18nURIFr;
			else url = this.settings.i18nURIEn;
			window.location.href = 'https://' + url;
			return;
		}
		
		$.ajax({
			type: "GET",
			url: aib.settings.i18nURL + "?url=" + window.location.href,
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
	},
	
	/**
	 * @limit: times to show before ignore
	*/
	showNewbieModal: function(cookieName, limit, cb) {
		let lmt = Cookies.get(cookieName);
		let currentLimit = lmt ? lmt : 0;
		if (currentLimit >= limit) return;
		Cookies.set(cookieName, ++currentLimit);
		cb();
	}
}



	