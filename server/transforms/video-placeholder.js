"use strict"

const cheerio = require('cheerio');

module.exports = function($) {

	const $videos = $('.n-content-video');

	$videos.replaceWith(i => {
		let $el = cheerio($videos.eq(i)).clone();

		const placeholderEl = cheerio('<div class="n-content-video__placeholder"></div>');
		return $el.prepend(placeholderEl.prepend($el.children()));

	});
	return $;
};
