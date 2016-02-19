"use strict"

module.exports = function($) {

	const $figures = $('figure');

	$figures.each(i => {
		let $el = $figures.eq(i);

		const imageEl = $el.find('img');
		const width = imageEl.attr('width');
		const height = imageEl.attr('height');

		let variant;

		// positioning variant
		if (width && width < 150) {
			variant = "thin";
		} else if (width && width < 350 || ((width < height) && width < 600)) {
			variant = "inline";
		} else if (width && width < 700) {
			variant = "center";
		} else {
			variant = "full";
		}
		$el.addClass(`n-content-image--${variant}`);

	});
	return $;
};
