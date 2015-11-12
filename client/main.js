'use strict';

require('next-js-setup').bootstrap(function(result) {

	var prompts = require('n-message-prompts');
	var oViewport = require('o-viewport');
	var oDate = require('o-date');
	var nMyFtTray = require('n-myft-tray');
	var oExpander = require('o-expander');

	var layout = require('n-layout');
	var nVideo = require('n-video');

	var slideshow = require('./components/slideshow/main');
	var onwardJourney = require('./components/onward-journey/main');
	var toc = require('./components/toc/main');
	var comments = require('./components/comments/main');
	var share = require('./components/share/main');
	var readingHistory = require('./components/reading-history');
	var scrollDepth = require('./components/article/scroll-depth');

	prompts.init();
	oViewport.listenTo('resize');

	var flags = result.flags;
	layout.init(flags);

	if (document.querySelector('*[data-article-status="error"]')) {
		return;
	}

	var uuid = document.querySelector('article[data-content-id]').getAttribute('data-content-id');
	if (uuid) {
		readingHistory.add(uuid);
	}

	slideshow(document.querySelectorAll('.article ft-slideshow'));

	if (flags.get('contentApiCalls')) {
		onwardJourney.init(flags);
	}

	if (flags.get('articleShareButtons')) {
		share.init(flags);
	}

	if (flags.get('myFTTray')) {
		nMyFtTray.init(flags);
	}

	nVideo.init({
		optimumWidth: 710,
		placeholder: true,
		classes: ['article__video', 'ng-media']
	});

	toc.init(flags);
	oDate.init(document.querySelector('.article'));
	oExpander.init(document.querySelector('.article'), {
		toggleSelector: 'button.o-expander__toggle',
		toggleState: 'all',
		collapsedToggleText: 'Show more',
		expandedToggleText: 'Show less'
	});
	scrollDepth.init(flags);

	window.addEventListener('load', function() {
		comments.init(uuid, flags);
	}, false);
});
