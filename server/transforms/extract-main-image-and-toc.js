'use strict';

module.exports = function ($) {

	const tocHtml = $.html($('.table-of-contents').remove());

	// find image or slideshow in the body
	const $firstMainImage = $('figure.n-content-image--full, figure.n-content-image--center, ft-slideshow').eq(0);
	let mainImageHtml;

	// check that it is the first element in the body
	if (
		$firstMainImage.length &&
		!$firstMainImage.prev().length &&
		(!$firstMainImage.parent() || !$firstMainImage.parent().prev().length)
	) {
		mainImageHtml = $.html($firstMainImage.remove());
	}

	let resultObject = {
		mainImageHtml: mainImageHtml,
		tocHtml: tocHtml
	};

	resultObject.bodyHtml = $.html();

	return resultObject;
}
