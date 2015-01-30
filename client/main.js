/*global fetch, console*/
'use strict';
var flags = require('next-feature-flags-client');

require('isomorphic-fetch');
require('ft-next-wrapper');
require('next-header');
var authors = require('./components/authors');

require('next-article-card-component');
var Gallery = require('o-gallery');
var fetchres = require('fetchres');

function emit(name, data) {
	var event = document.createEvent('Event');
	event.initEvent(name, true, true);
	if (data) {
		event.detail = data;
	}
	document.dispatchEvent(event);
}

function clearNotification() {
	var uuid = document.querySelector('[data-capi-id]').getAttribute('data-capi-id');
	if (uuid) {
		emit('notifications:remove', { uuid: uuid });
	}
}

clearNotification();

function init() {
	flags.init().then(function () {
		var allFlags = flags.getAll();

		if (allFlags.articlesFromContentApiV2 && allFlags.articlesFromContentApiV2.isSwitchedOn) {
			[].slice.call(document.querySelectorAll('.article-card__body a[href]')).forEach(function (el) {
				var href = /\/([a-f0-9-]+)\.html#slide0$/.exec(el.getAttribute('href'));
				if (el.innerHTML && href) {
					fetch('/embedded-components/slideshow/' + href[1])
						.then(fetchres.text)
						.then(function (data) {
							var container = document.createElement("div");
							container.innerHTML = data;
							el.parentNode.replaceChild(container, el);
							return container;
						})
						.then(function (el) {
							return Gallery.init(el);
						})
						.catch(function (err) {
							setTimeout(function () {
								console.log(err);
							});
						});
				}
			});
		}
		if (allFlags.userPreferences && allFlags.userPreferences.isSwitchedOn) {
			require('next-user-preferences');
		}


		if (allFlags.contentApiCalls && allFlags.contentApiCalls.isSwitchedOn) {
			require('./components/more-on/main');
		}

		if (allFlags.beacon && allFlags.beacon.isSwitchedOn) {
			require('next-beacon-component');
		}

		if (allFlags.articlesFromContentApiV2 && allFlags.articlesFromContentApiV2.isSwitchedOn) {
			require('./components/video/main');
		}

		if (allFlags.streamsFromContentApiV2 && allFlags.streamsFromContentApiV2.isSwitchedOn) {
			require('./components/capi2-related/main');
		}

		if (allFlags.articleTemplate2 && allFlags.articleTemplate2.isSwitchedOn) {
			authors(document.querySelector('.article__meta__byline'));
		}

	});
}

if (window.ftNextInitCalled){
	init();
} else {
	document.addEventListener('polyfillsLoaded', init);
}
