'use strict';

const cheerio = require('cheerio');

module.exports = function($) {

	const $imgs = $('img');

	$imgs.replaceWith(i => {
		let $el = cheerio($imgs.eq(i)).clone();

		const width = $el.attr('width');
		const height = $el.attr('height');

		let maxWidth;

		if (width < height && width > 350	&& width < 600) {
			maxWidth = 350;
		} else if (width && width < 700) {
			maxWidth = width;
		} else {
			maxWidth = 700;
		}

		// clean up the img tag and use the image service
		$el.removeAttr('width');
		$el.removeAttr('height');
		let imageWidth = (width && width < maxWidth) ? width : maxWidth;
		$el.attr('src', (i, val) => `https://next-geebee.ft.com/image/v1/images/raw/${val}?source=next&fit=scale-down&width=${imageWidth}`);

		// add placeholder
		if (width && height) {
			const ratio = (100 / width) * height;
			return `<div style="max-width:100%;width:${maxWidth}px;margin-left: auto;margin-right: auto;">` +
							`<div class="n-content-image__placeholder" style="padding-top:${ratio}%">` +
							`${$.html($el)}</div></div>`;

		} else {
			return $el;
		}

	});
	return $;
};
