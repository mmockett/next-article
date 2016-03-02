"use strict"

module.exports = function($, flags) {

	const $brightCoveVideos = $('.n-content-video--brightcove');

	$brightCoveVideos.each(i => {
		const $el = $brightCoveVideos.eq(i);

		const href = $el.find('a').attr('href');
		const videoId = href.replace('http://video.ft.com/', '')

		let $placeholderEl = $el.find('.n-content-video__placeholder');

		$placeholderEl.attr({
			"data-n-component":"n-video",
			"data-n-video-source":"brightcove",
			"data-n-video-id":videoId
		});

		if (flags.useBrightcovePlayer) {
			$placeholderEl.attr("data-n-video-player","brightcove");
		}

	});
	return $;
};
