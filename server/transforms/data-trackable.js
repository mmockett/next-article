"use strict"

module.exports = function($) {

	// add to n-content-related-box top level

	const $relatedBoxes = $('.n-content-related-box');

	$relatedBoxes.each(i => {
		$relatedBoxes.eq(i).attr('data-trackable', 'related-box');
	});

	// add data-trackable to all links
	const $links = $('a');

	$links.each(i => {
		const $thisLink = $links.eq(i);
		if ($thisLink.hasClass('n-content-related-box__image-link')) {
			$thisLink.attr('data-trackable', 'link-image');
		} else if ($thisLink.hasClass('n-content-related-box__headline-link')) {
			$thisLink.attr('data-trackable', 'link-headline');
		} else {
			$thisLink.attr('data-trackable', 'link');
		}
	});

	return $;
};
